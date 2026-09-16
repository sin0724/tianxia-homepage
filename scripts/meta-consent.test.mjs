// Offline only: no browser script, real contact, email, or Meta API is sent.
// Run: node --test scripts/meta-consent.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compile = (file) => ts.transpileModule(
  fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

const consentCode = compile("src/lib/metaConsent.ts");
const pixelCode = compile("src/lib/metaPixel.ts");
const routeCode = compile("src/app/api/contact/route.ts");

function evaluate(code, globals = {}, imports = {}) {
  const loadedModule = { exports: {} };
  vm.runInNewContext(code, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: (name) => {
      assert.ok(name in imports, `Unexpected import: ${name}`);
      return imports[name];
    },
    ...globals,
  });
  return loadedModule.exports;
}

function browserHarness(choice) {
  const jar = new Map(choice ? [["tianxia_meta_consent", choice]] : []);
  const scripts = [];
  const document = {
    get cookie() { return [...jar].map(([name, value]) => `${name}=${value}`).join("; "); },
    set cookie(value) {
      const [pair] = value.split(";");
      const [name, content] = pair.split("=");
      if (value.includes("Max-Age=0")) jar.delete(name);
      else jar.set(name, content);
    },
    getElementById: (id) => scripts.find((script) => script.id === id),
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
  };
  const window = { location: { protocol: "https:", hostname: "www.example.invalid", pathname: "/" }, dispatchEvent() {} };
  const globals = { document, window, Event, localStorage: { setItem() {} } };
  const consent = evaluate(consentCode, globals);
  const pixel = evaluate(pixelCode, globals, { "@/lib/metaConsent": consent });
  return { jar, scripts, window, consent, pixel };
}

test("missing, denied and unknown consent never load the Pixel or queue a Lead", () => {
  for (const choice of [undefined, "denied", "true", "GRANTED"]) {
    const h = browserHarness(choice);
    h.pixel.enableMetaPixel("test-pixel");
    h.pixel.trackMetaLead("test-event");
    assert.equal(h.scripts.length, 0);
    assert.equal(h.window.fbq, undefined);
    assert.equal(h.consent.isMetaConsentGranted(choice), false);
  }
});

test("explicit consent loads once, preserves event ID, and stops future events on withdrawal", () => {
  const h = browserHarness();
  h.consent.saveMetaConsent("granted");
  assert.equal(h.jar.get("tianxia_meta_consent"), "granted");
  h.pixel.enableMetaPixel("test-pixel");
  h.pixel.enableMetaPixel("test-pixel");
  assert.equal(h.scripts.length, 1);
  assert.equal(h.window.fbq.queue.filter(([type]) => type === "init").length, 1);
  assert.equal(h.window.fbq.queue.filter(([type, event]) => type === "track" && event === "PageView").length, 1);

  const sent = [];
  h.window.fbq.callMethod = (...args) => sent.push(args);
  h.pixel.trackMetaLead("shared-event-id");
  assert.equal(sent[0][1], "Lead");
  assert.equal(sent[0][3].eventID, "shared-event-id");

  h.jar.set("_fbp", "old-pixel-cookie");
  h.jar.set("_fbc", "old-click-cookie");
  h.consent.saveMetaConsent("denied");
  h.pixel.disableMetaPixel();
  h.pixel.trackMetaLead("after-withdrawal");
  h.window.fbq("track", "PageView");
  assert.equal(sent.length, 2);
  assert.equal(sent[1].join(","), "consent,revoke");
  assert.equal(h.jar.has("_fbp"), false);
  assert.equal(h.jar.has("_fbc"), false);
});

test("admin and non-public routes never load or send Pixel events even with saved consent", () => {
  for (const pathname of ["/admin", "/admin/dashboard", "/api/admin/contacts", "/unlisted-private-route"]) {
    const h = browserHarness("granted");
    h.window.location.pathname = pathname;
    h.pixel.enableMetaPixel("test-pixel");
    h.pixel.trackMetaLead("internal-event");
    assert.equal(h.scripts.length, 0);
    assert.equal(h.window.fbq, undefined);
  }
});

test("withdrawal while the script loads drops queued events instead of sending them later", () => {
  const h = browserHarness("granted");
  h.pixel.enableMetaPixel("test-pixel");
  h.pixel.trackMetaLead("queued-event");
  h.consent.saveMetaConsent("denied");
  h.pixel.disableMetaPixel();
  assert.equal(h.window.fbq.queue.length, 1);
  assert.equal(h.window.fbq.queue[0].join(","), "consent,revoke");
  h.pixel.enableMetaPixel("test-pixel");
  assert.equal(h.window.fbq.queue.length, 1);
});

function contactHarness() {
  const saved = [];
  const sent = [];
  const consent = evaluate(consentCode);
  const route = evaluate(routeCode, { process: { env: {} }, console }, {
    "next/server": { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } },
    crypto: { randomUUID: () => "generated-test-event" },
    "@/lib/db": { db: { contact: { create: async (value) => saved.push(value) } } },
    "@/lib/rateLimit": { rateLimit: () => true, clientIp: () => "unknown" },
    "@/lib/metaCapi": { sendLeadEvent: (value) => sent.push(value) },
    "@/lib/metaConsent": consent,
  });
  return {
    saved,
    sent,
    run: (choice) => route.POST({
      json: async () => ({ brand: "테스트", name: "테스트", phone: "00000000000", email: "test@example.invalid", message: "테스트 문의", eventId: "same-browser-event", advertisingConsent: true }),
      headers: { get: () => undefined },
      cookies: { get: (name) => name === consent.META_CONSENT_COOKIE && choice !== undefined ? { value: choice } : undefined },
    }),
  };
}

test("contact remains available without optional advertising consent and CAPI stays off", async () => {
  const h = contactHarness();
  for (const choice of [undefined, "denied", "true", "GRANTED"]) {
    const result = await h.run(choice);
    assert.equal(result.status, 200);
    assert.equal(result.body.ok, true);
  }
  assert.equal(h.saved.length, 4);
  assert.equal(h.sent.length, 0);
});

test("CAPI uses the same granted HTTP cookie and dedup ID, then stops for rejected requests", async () => {
  const h = contactHarness();
  assert.equal((await h.run("granted")).status, 200);
  assert.equal(h.sent.length, 1);
  assert.equal(h.sent[0].eventId, "same-browser-event");
  assert.equal((await h.run("denied")).status, 200);
  assert.equal(h.saved.length, 2);
  assert.equal(h.sent.length, 1);
});

test("server HTML no longer embeds an unconditional Meta script or noscript beacon", () => {
  const layout = fs.readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(layout, /connect\.facebook\.net|facebook\.com\/tr|fbq\(/);
});

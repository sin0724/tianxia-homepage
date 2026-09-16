import { getBrowserMetaConsent, isPublicMetaPath } from "@/lib/metaConsent";

type PixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: PixelFunction;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: PixelFunction;
    _fbq?: PixelFunction;
  }
}

let initialized = false;
let pageViewTracked = false;

function canSendMeta(): boolean {
  return getBrowserMetaConsent() === "granted" && isPublicMetaPath(window.location.pathname);
}

export function enableMetaPixel(pixelId: string): void {
  if (!canSendMeta()) return;

  if (!window.fbq) {
    const pixel: PixelFunction = Object.assign((...args: unknown[]) => {
      if (String(args[0]).startsWith("track") && !canSendMeta()) return;
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue.push(args);
    }, { queue: [] as unknown[][], loaded: true, version: "2.0" });
    pixel.push = pixel;
    window.fbq = pixel;
    window._fbq = pixel;
  }

  window.fbq("consent", "grant");
  if (!initialized) {
    // 자동 폼 감지 대신 명시적인 PageView/Lead만 보낸다.
    window.fbq("set", "autoConfig", false, pixelId);
    window.fbq("init", pixelId);
    initialized = true;
  }
  if (!pageViewTracked) {
    window.fbq("track", "PageView");
    pageViewTracked = true;
  }

  if (!document.getElementById("tianxia-meta-pixel")) {
    const script = document.createElement("script");
    script.id = "tianxia-meta-pixel";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
}

export function disableMetaPixel(): void {
  const pixel = window.fbq;
  if (pixel) {
    // 다운로드 중 철회하면 아직 전송하지 않은 이벤트도 큐에서 제거한다.
    if (!pixel.callMethod) {
      pixel.queue.length = 0;
      initialized = false;
    }
    pixel("consent", "revoke");
  }
  pageViewTracked = false;

  // Pixel이 만들 수 있는 호스트/상위 도메인 쿠키를 함께 지운다.
  const parts = window.location.hostname.split(".");
  const domains = ["", ...parts.map((_, index) => `; Domain=${parts.slice(index).join(".")}`)];
  for (const name of ["_fbp", "_fbc"]) {
    for (const domain of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain}; SameSite=Lax`;
    }
  }
}

export function trackMetaLead(eventId: string): void {
  if (!canSendMeta()) return;
  window.fbq?.("track", "Lead", {}, { eventID: eventId });
}

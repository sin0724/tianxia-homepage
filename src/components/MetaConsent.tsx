"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  getBrowserMetaConsent,
  isPublicMetaPath,
  META_CONSENT_CHANGED,
  META_CONSENT_SETTINGS,
  saveMetaConsent,
  type MetaConsentChoice,
} from "@/lib/metaConsent";
import { disableMetaPixel, enableMetaPixel } from "@/lib/metaPixel";

function subscribe(onChange: () => void) {
  window.addEventListener(META_CONSENT_CHANGED, onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.removeEventListener(META_CONSENT_CHANGED, onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function MetaConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(META_CONSENT_SETTINGS))}>
      광고 개인정보 설정
    </button>
  );
}

export default function MetaConsent({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const publicPage = isPublicMetaPath(pathname);
  const consent = useSyncExternalStore(subscribe, getBrowserMetaConsent, () => null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const open = () => setEditing(true);
    window.addEventListener(META_CONSENT_SETTINGS, open);
    return () => window.removeEventListener(META_CONSENT_SETTINGS, open);
  }, []);

  useEffect(() => {
    if (publicPage && getBrowserMetaConsent() === "granted") enableMetaPixel(pixelId);
    else disableMetaPixel();
  }, [consent, pixelId, publicPage]);

  function choose(choice: MetaConsentChoice) {
    saveMetaConsent(choice);
    // React 갱신을 기다리지 않고 철회 즉시 전송을 중단한다.
    if (choice === "denied") disableMetaPixel();
    else enableMetaPixel(pixelId);
    setEditing(false);
  }

  if (!publicPage) return null;

  if (consent !== null && !editing) {
    return (
      <MetaConsentSettingsButton className="fixed bottom-3 left-3 z-[150] rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] text-zinc-300 shadow-lg hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
    );
  }

  const buttonClass = "min-h-11 flex-1 rounded-lg border border-zinc-500 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-50 transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  return (
    <section aria-label="광고 성과 측정 동의" className="fixed bottom-3 left-3 right-3 z-[150] max-w-xl rounded-xl border border-zinc-700 bg-zinc-950 p-5 text-zinc-200 shadow-2xl sm:left-5 sm:right-auto sm:bottom-5">
      <p className="text-sm font-semibold text-zinc-50">광고 성과 측정 (선택)</p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-300">
        동의하면 미국 Meta에 페이지 방문·문의 완료 정보, 쿠키 및 기기 정보와 문의 시 해시 처리된 이메일·전화번호를 전송하여 성과 측정·맞춤 광고·서비스 개선에 이용합니다.
        거부해도 문의와 사이트 이용이 가능합니다. 설정에서 언제든 철회할 수 있습니다.
      </p>
      <a href="/privacy#advertising" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs underline underline-offset-4 hover:text-white">개인정보 처리방침과 국외 이전 안내</a>
      <div className="mt-4 flex gap-3">
        <button type="button" className={buttonClass} onClick={() => choose("denied")}>거부</button>
        <button type="button" className={buttonClass} onClick={() => choose("granted")}>동의</button>
      </div>
    </section>
  );
}

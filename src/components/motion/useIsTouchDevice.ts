"use client";

import { useSyncExternalStore } from "react";

function subscribeHoverNone(callback: () => void) {
  const mq = window.matchMedia("(hover: none)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** 터치 기기 여부 — SSR에서는 터치 기기로 간주 */
export function useIsTouchDevice() {
  return useSyncExternalStore(
    subscribeHoverNone,
    () => window.matchMedia("(hover: none)").matches,
    () => true
  );
}

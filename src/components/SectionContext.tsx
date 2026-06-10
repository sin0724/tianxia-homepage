"use client";

import { createContext, useContext } from "react";

export interface SectionState {
  /** 현재 화면에 보이는 활성 섹션인지 (프리로드 사본은 false) */
  isActive: boolean;
  /** 이미 방문했던 섹션에 재진입한 경우 — 가벼운 모션으로 강등 */
  isRevisit: boolean;
}

const SectionContext = createContext<SectionState>({
  isActive: true,
  isRevisit: false,
});

export const SectionProvider = SectionContext.Provider;

export function useSectionState() {
  return useContext(SectionContext);
}

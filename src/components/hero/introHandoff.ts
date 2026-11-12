/**
 * 인트로 로더 ↔ 101 파티클 사이의 약속.
 *
 * 로더의 숫자가 101에 닿으면, 그 숫자를 이루던 획이 파티클이 되어 타워로 조립된다.
 * 두 컴포넌트가 서로를 직접 알 필요가 없게 window 이벤트로만 주고받는다.
 *
 *   1) 파티클이 준비되면 HERO_READY를 쏘고 window.__tx101Ready를 켠다
 *      → 로더는 그 전까지 92에서 기다린다
 *   2) 로더가 101에 닿으면 INTRO_HANDOFF를 쏜다 (숫자를 그린 캔버스와 그 위치를 실어서)
 *      → 파티클이 숫자 픽셀을 읽어 그 자리에 서고, detail.accepted를 true로 바꾼다
 *   3) accepted면 로더는 그냥 사라지고, 아니면(파티클이 아직 없으면) 예전처럼 위로 걷힌다
 */

export const HERO_READY = "tx:101-ready";
export const INTRO_HANDOFF = "tx:intro-handoff";

export type IntroHandoffDetail = {
  /** 숫자 101이 그려진 캔버스 (화면 전체 크기) */
  canvas: HTMLCanvasElement;
  /** 캔버스 안에서 숫자가 차지하는 영역 — 캔버스 픽셀 단위 */
  box: { x: number; y: number; w: number; h: number };
  /** 캔버스 픽셀 ÷ 화면 px */
  scale: number;
  /** 파티클이 넘겨받았으면 true로 바꾼다 */
  accepted: boolean;
};

declare global {
  interface Window {
    __tx101Ready?: boolean;
  }
}

/**
 * 서비스 랜딩 페이지 레지스트리 — 사이트맵·내부 링크·관련 페이지 블록의 단일 출처.
 * 새 랜딩을 추가하면 이 배열에만 등록하면 나머지가 따라온다.
 */
export interface LandingPage {
  path: string;
  /** 내부 링크 앵커 텍스트 */
  label: string;
  /** 관련 페이지 카드의 한 줄 설명 */
  blurb: string;
  /** 사이트맵 우선순위 */
  priority: number;
}

export const LANDING_PAGES: LandingPage[] = [
  {
    path: "/taiwan-marketing",
    label: "대만 마케팅",
    blurb: "KOL·Dcard·Threads·KOC·쇼피·공동구매까지 대만 마케팅 전 과정.",
    priority: 0.9,
  },
  {
    path: "/kol-marketing",
    label: "대만 KOL 마케팅",
    blurb: "Dcard·Threads·KOC 시딩까지 대만 소셜 채널 전반의 바이럴 마케팅.",
    priority: 0.9,
  },
  {
    path: "/shopee",
    label: "대만 쇼피 입점 지원",
    blurb: "전용 링크 입점, 번체 중국어 상품 현지화, KOL 공동구매 연계.",
    priority: 0.8,
  },
  {
    path: "/taiwan-marketing/dcard",
    label: "Dcard 마케팅",
    blurb: "대만 최대 익명 커뮤니티 Dcard 바이럴·시딩 운영 방식.",
    priority: 0.7,
  },
  {
    path: "/taiwan-marketing/gonggu",
    label: "대만 공동구매 마케팅",
    blurb: "KOL 릴스·스토리로 단기간 판매를 만드는 공동구매 캠페인.",
    priority: 0.7,
  },
];

export function otherLandingPages(currentPath: string): LandingPage[] {
  return LANDING_PAGES.filter((page) => page.path !== currentPath);
}

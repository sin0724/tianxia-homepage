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
    label: "대만 인플루언서 마케팅",
    blurb: "대만 KOL·KOC 섭외와 매칭, 릴스·Dcard·Threads 캠페인, 공동구매까지.",
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
    label: "대만 디카드 마케팅",
    blurb: "대만 익명 커뮤니티 Dcard(디카드) 바이럴·시딩·후기 운영.",
    priority: 0.7,
  },
  {
    path: "/taiwan-marketing/threads",
    label: "대만 쓰레드 마케팅",
    blurb: "대만 Threads(스레드) 계정 운영과 KOL·KOC 포스팅, 확산 설계.",
    priority: 0.7,
  },
  {
    path: "/taiwan-marketing/review-campaign",
    label: "대만 체험단",
    blurb: "대만 인플루언서·KOC 체험단 모집부터 제품 발송, 후기 발행까지.",
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

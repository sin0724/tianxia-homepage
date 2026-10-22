// ============================================================
// 크리에이터 로스터 — /creators 페이지와 홈 크리에이터 캐러셀의 단일 출처
//
// 두 갈래를 합친다.
//   1) SITE_CONFIG.creators — 기존에 직접 섭외한 치어리더(인스타 핸들 + 사진)
//   2) talents-data.json    — 대만 伊林娛樂(Eelin, eelin.com.tw) 소속 아티스트·치어리더·모델.
//      에이전시와 이미지·프로필 사용권 계약을 맺은 로스터다(2026-10 기준).
//      한국 광고주가 보는 페이지라 프로필·소속 팀·경력 모두 한국어로 옮겼다(이름만 원문 병기).
//      사진은 public/talents/<id>/ 에 있다 (cover = 목록 카드, profile = 상세 대표, g1.. = 갤러리).
// ============================================================

import { SITE_CONFIG } from "@/lib/config";
import data from "@/lib/talents-data.json";

export type TalentCategory = "cheerleader" | "actress" | "actor" | "model";

export interface TalentImage {
  src: string;
  w: number;
  h: number;
}

export interface Talent {
  id: string;
  category: TalentCategory;
  nameTw: string;
  nameEn: string;
  /** 키·생일·언어 등 기본 프로필 (한국어로 옮긴 값) */
  info: { label: string; value: string }[];
  /** 소속 팀·소개 (치어리더는 주로 소속 팀) */
  team: string;
  /** 경력. 【제목】 줄은 섹션 소제목 */
  work: string;
  socials: { type: string; url: string }[];
  cover: TalentImage;
  profile: TalentImage | null;
  gallery: TalentImage[];
}

export const TALENTS = data as Talent[];

export const CATEGORY_LABEL: Record<TalentCategory, string> = {
  cheerleader: "치어리더",
  actress: "아티스트",
  actor: "아티스트",
  model: "모델",
};

/**
 * /creators 상단 필터. 아티스트는 남녀를 한 탭으로 묶는다.
 * KOL은 로스터를 공개하지 않고 캠페인마다 매칭하므로 탭이 아니라 문의 폼을 바로 여는 버튼으로 둔다.
 */
export const CATEGORY_TABS = [
  { key: "all", label: "전체" },
  { key: "cheerleader", label: "치어리더" },
  { key: "artist", label: "아티스트" },
  { key: "model", label: "모델" },
] as const;

export type CategoryTabKey = (typeof CATEGORY_TABS)[number]["key"];

/** 카드가 실제로 속하는 분류 */
export type RosterTab = Exclude<CategoryTabKey, "all">;

export function tabOf(category: TalentCategory): RosterTab {
  return category === "actress" || category === "actor" ? "artist" : category;
}

export function getTalent(id: string) {
  return TALENTS.find((t) => t.id === id);
}

export function displayName(t: Pick<Talent, "nameTw" | "nameEn">) {
  return t.nameEn ? `${t.nameEn} ${t.nameTw}` : t.nameTw;
}

/** 카드 한 장을 그리는 데 필요한 최소 정보 — 두 출처를 같은 모양으로 맞춘다 */
export interface CreatorCardItem {
  key: string;
  label: string;
  sub?: string;
  tab: RosterTab;
  photo: string;
  href: string;
  /** 인스타 등 외부 링크면 새 창으로 연다 */
  external: boolean;
}

const OWN_CREATORS: CreatorCardItem[] = SITE_CONFIG.creators.map((c) => {
  const tab =
    "category" in c && c.category === "artist" ? "artist" : "cheerleader";
  return {
    key: `ig-${c.handle}`,
    label: `@${c.handle}`,
    sub: tab === "artist" ? "아티스트" : "치어리더",
    tab,
    photo: c.photo,
    href: `https://instagram.com/${c.handle}`,
    external: true,
  };
});

const AGENCY_CREATORS: CreatorCardItem[] = TALENTS.map((t) => ({
  key: t.id,
  label: displayName(t),
  sub: CATEGORY_LABEL[t.category],
  tab: tabOf(t.category),
  photo: t.cover.src,
  href: `/creators/${t.id}`,
  external: false,
}));

/** /creators 그리드 전체 목록. 분류별로 기존 섭외 인원을 에이전시 인원보다 앞에 둔다. */
export const ALL_CREATORS: CreatorCardItem[] = (
  ["cheerleader", "artist", "model"] as const
).flatMap((tab) => [
  ...OWN_CREATORS.filter((c) => c.tab === tab),
  ...AGENCY_CREATORS.filter((c) => c.tab === tab),
]);

/** 홈 크리에이터 섹션 미리보기 — config의 featuredCreators 순서대로. 전체 로스터는 /creators에서 본다. */
export const HOME_CREATORS: CreatorCardItem[] = SITE_CONFIG.featuredCreators
  .map((key) => ALL_CREATORS.find((c) => c.key === key))
  .filter((c): c is CreatorCardItem => Boolean(c));

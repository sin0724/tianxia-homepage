import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import InquiryButton from "@/components/creators/InquiryButton";
import CreatorGrid from "@/components/creators/CreatorGrid";
import { SITE_CONFIG } from "@/lib/config";
import { ALL_CREATORS } from "@/lib/talents";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";
import SiteFooter from "@/components/SiteFooter";

// 홈의 "Creators We Work With" 섹션을 독립 페이지로 뺀 것.
// 홈 캐러셀은 치어리더만 보여 주고, 아티스트·모델까지 포함한 전체 로스터는 여기서 본다.
const PATH = "/creators";
const DESCRIPTION =
  "티엔샤와 함께하는 대만 치어리더·아티스트·모델 로스터. 현지 엔터테인먼트 에이전시와 계약한 크리에이터로 브랜드 캠페인, 촬영, 행사를 진행합니다.";

export const metadata: Metadata = {
  title: {
    absolute: "Creators We Work With | 대만 치어리더·아티스트·모델 — 티엔샤",
  },
  description: DESCRIPTION,
  keywords: [
    "대만 치어리더",
    "대만 모델",
    "대만 아티스트",
    "대만 크리에이터",
    "대만 인플루언서 섭외",
    "대만 모델 섭외",
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "Creators We Work With — 티엔샤",
    description: DESCRIPTION,
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "Creators We Work With",
  description: DESCRIPTION,
});

export default function CreatorsPage() {
  const { eyebrow, title, desc } = SITE_CONFIG.creatorsHeadline;

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <Navbar solid />
      <main className="min-h-screen bg-zinc-950 text-zinc-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
          <p className="text-red-500/70 text-[11px] font-mono tracking-[0.3em] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            {title}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-[56ch] whitespace-pre-line">
              {desc}
            </p>
          </div>
          <div className="h-px bg-zinc-800 my-10 md:my-12" />

          <CreatorGrid items={ALL_CREATORS} />

          <section className="mt-16 border-t border-zinc-800 pt-12">
            <h2 className="text-2xl font-black mb-4">
              캠페인에 맞는 크리에이터를 찾고 계신가요?
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
              브랜드와 제품, 캠페인 일정에 맞춰 치어리더·아티스트·모델 섭외와
              촬영, 현장 행사까지 함께 기획합니다. 원하는 크리에이터가 있다면
              이름을 적어 문의해 주세요.
            </p>
            <InquiryButton label="섭외 문의하기" />
          </section>
        </div>
        <SiteFooter />
      </main>
    </>
  );
}

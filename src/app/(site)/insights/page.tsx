import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import ContactCta from "@/components/landing/ContactCta";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";
import { INSIGHTS } from "@/lib/insights";

const PATH = "/insights";
const DESCRIPTION =
  "대만 마케팅 전문 에이전시 티엔샤가 정리한 대만마케팅 인사이트. 번체 현지화, Dcard 후기, KOC 시딩, LINE 공식계정, 한국 브랜드 포지셔닝까지 대만 시장 진출에 필요한 실무 칼럼.";

export const metadata: Metadata = {
  title: { absolute: "대만 마케팅 인사이트 | 대만마케팅 실무 칼럼 — 티엔샤" },
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
    types: { "application/rss+xml": `${BASE_URL}/rss.xml` },
  },
  openGraph: {
    title: "대만 마케팅 인사이트 — 티엔샤 TIANXIA",
    description: DESCRIPTION,
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 마케팅 인사이트",
  description: DESCRIPTION,
});

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <LandingHero
          eyebrow="Taiwan Marketing Insights"
          title="대만 마케팅 인사이트"
          titleAccent="PLAY TAIWAN"
          lead="대만 시장에서 직접 캠페인을 운영하며 확인한 것들을 정리합니다. 한국 브랜드가 대만마케팅을 준비할 때 알아야 할 현지화, 채널, KOL·KOC 운영 방식을 다룹니다."
        />

        <section className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="sr-only">칼럼 목록</h2>
          <ul className="grid gap-6">
            {INSIGHTS.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`${PATH}/${item.slug}`}
                  className="block border border-zinc-800 p-6 hover:border-red-600/60 transition-colors"
                >
                  <p className="text-[11px] font-mono text-zinc-500 mb-2">
                    <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                  </p>
                  <h3 className="text-lg font-bold text-zinc-50 mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <ContactCta
          title="우리 브랜드에 맞는 대만 마케팅이 궁금하다면"
          desc="제품과 목표를 알려주시면 채널 구성과 진행 일정을 제안드립니다."
        />
      </div>
    </main>
  );
}

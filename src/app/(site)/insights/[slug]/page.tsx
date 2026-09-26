import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ContactCta from "@/components/landing/ContactCta";
import FaqSection from "@/components/landing/FaqSection";
import { BASE_URL, buildArticleJsonLd } from "@/lib/seo";
import { INSIGHTS, getInsight } from "@/lib/insights";
import { LANDING_PAGES } from "@/lib/landing-pages";

type Props = { params: Promise<{ slug: string }> };

// 레지스트리에 없는 slug는 404 (빌드 시 전부 정적 생성)
export const dynamicParams = false;

export function generateStaticParams() {
  return INSIGHTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getInsight(slug);
  if (!item) return {};
  const url = `${BASE_URL}/insights/${item.slug}`;
  return {
    title: { absolute: `${item.seoTitle ?? item.title} | 티엔샤` },
    description: item.description,
    keywords: item.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description: item.description,
      url,
      type: "article",
      publishedTime: `${item.publishedAt}T09:00:00+09:00`,
      modifiedTime: `${item.updatedAt ?? item.publishedAt}T09:00:00+09:00`,
    },
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const item = getInsight(slug);
  if (!item) notFound();

  const path = `/insights/${item.slug}`;
  const related = LANDING_PAGES.filter((p) => item.relatedPaths.includes(p.path));
  const others = INSIGHTS.filter((i) => i.slug !== item.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd
        data={buildArticleJsonLd({
          path,
          title: item.title,
          description: item.description,
          publishedAt: item.publishedAt,
          updatedAt: item.updatedAt,
          keywords: item.keywords,
          faq: item.faq,
        })}
      />
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <nav aria-label="breadcrumb" className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
          <Link href="/" className="hover:text-red-400 transition-colors">tianxia.kr</Link>
          <span className="mx-2">/</span>
          <Link href="/insights" className="hover:text-red-400 transition-colors">인사이트</Link>
        </nav>

        <header className="mt-10">
          <p className="text-red-500/70 text-[11px] font-mono tracking-[0.3em] uppercase">
            Taiwan Marketing Insights
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight leading-[1.25]">
            {item.title}
          </h1>
          <p className="mt-4 text-xs text-zinc-500">
            티엔샤 TIANXIA · <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          </p>
        </header>

        <aside className="mt-10 border border-zinc-800 bg-zinc-900/40 p-6">
          <p className="text-xs font-bold text-red-400 mb-3">핵심 요약</p>
          <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed list-disc pl-5">
            {item.summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>

        <div className="mt-12 space-y-10">
          {item.body.map((block, i) => (
            <section key={block.h2 ?? i}>
              {block.h2 && <h2 className="text-xl md:text-2xl font-black mb-4">{block.h2}</h2>}
              {block.paragraphs?.map((p) => (
                <p key={p} className="text-[15px] text-zinc-300 leading-[1.9] mb-4">
                  {p}
                </p>
              ))}
              {block.list && (
                <ul className="space-y-2 text-[15px] text-zinc-300 leading-relaxed list-disc pl-5">
                  {block.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
              {block.link && (
                <Link
                  href={block.link.href}
                  className="mt-4 inline-block text-sm font-bold text-red-400 hover:text-red-300 underline-offset-4 hover:underline"
                >
                  {block.link.label} →
                </Link>
              )}
            </section>
          ))}
        </div>

        {item.faq && item.faq.length > 0 && (
          <FaqSection items={item.faq} title="자주 묻는 질문" />
        )}

        {related.length > 0 && (
          <section className="mt-16 border-t border-zinc-800 pt-12">
            <h2 className="text-xl font-black mb-6">관련 서비스</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="block border border-zinc-800 p-5 hover:border-red-600/60 transition-colors"
                >
                  <h3 className="text-base font-bold text-zinc-50 mb-1">{page.label}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{page.blurb}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-xl font-black mb-6">다른 대만 마케팅 인사이트</h2>
          <ul className="space-y-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/insights/${o.slug}`} className="text-sm text-zinc-300 hover:text-red-400 underline-offset-4 hover:underline">
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/insights" className="mt-6 inline-block text-xs font-mono text-zinc-500 hover:text-red-400">
            전체 인사이트 보기 →
          </Link>
        </section>

        <ContactCta
          title={item.cta?.title ?? "대만 마케팅, 티엔샤와 상담하세요"}
          desc={item.cta?.desc ?? "브랜드와 제품, 목표를 알려주시면 대만 현지 채널 구성과 진행 일정을 제안드립니다."}
          label={item.cta?.label}
        />
      </article>
    </main>
  );
}

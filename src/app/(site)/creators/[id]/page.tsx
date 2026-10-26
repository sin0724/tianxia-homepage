import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  TiktokLogo,
  LinkSimple,
} from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import InquiryButton from "@/components/creators/InquiryButton";
import TalentGallery from "@/components/creators/TalentGallery";
import { BASE_URL } from "@/lib/seo";
import {
  CATEGORY_LABEL,
  TALENTS,
  displayName,
  getTalent,
  tabOf,
} from "@/lib/talents";
import SiteFooter from "@/components/SiteFooter";

type Props = { params: Promise<{ id: string }> };

// 로스터에 없는 id는 404 (빌드 시 전부 정적 생성)
export const dynamicParams = false;

export function generateStaticParams() {
  return TALENTS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = getTalent(id);
  if (!t) return {};
  const name = displayName(t);
  const role = CATEGORY_LABEL[t.category];
  const url = `${BASE_URL}/creators/${t.id}`;
  const description = `대만 ${role} ${name} 프로필. 티엔샤를 통해 브랜드 캠페인·촬영·행사 섭외를 문의할 수 있습니다.`;
  return {
    title: { absolute: `${name} | 대만 ${role} — 티엔샤 크리에이터` },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${name} — 대만 ${role}`,
      description,
      url,
      type: "profile",
      images: [{ url: `${BASE_URL}${(t.profile ?? t.cover).src}` }],
    },
  };
}

const SOCIAL_ICON: Record<string, typeof InstagramLogo> = {
  ig: InstagramLogo,
  fb: FacebookLogo,
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
};

export default async function TalentPage({ params }: Props) {
  const { id } = await params;
  const t = getTalent(id);
  if (!t) notFound();

  const name = displayName(t);
  const role = CATEGORY_LABEL[t.category];
  const hero = t.profile ?? t.cover;

  // 같은 분류 안에서 이전/다음 프로필
  const siblings = TALENTS.filter(
    (x) => tabOf(x.category) === tabOf(t.category),
  );
  const idx = siblings.findIndex((x) => x.id === t.id);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];

  return (
    <>
      <Navbar solid />
      <main className="min-h-screen bg-zinc-950 text-zinc-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-20 md:pb-28">
          <nav
            aria-label="breadcrumb"
            className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500"
          >
            <Link
              href="/creators"
              className="hover:text-red-400 transition-colors"
            >
              ← Creators
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span>{role}</span>
          </nav>

          <div className="mt-8 grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 md:gap-16 items-start">
            <div className="relative bg-zinc-900 overflow-hidden md:sticky md:top-24">
              <Image
                src={hero.src}
                alt={name}
                width={hero.w}
                height={hero.h}
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="w-full h-auto"
              />
            </div>

            <div>
              <p className="text-red-500/70 text-[11px] font-mono tracking-[0.3em] uppercase">
                {role}
              </p>
              <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
                {t.nameEn || t.nameTw}
              </h1>
              {t.nameEn && (
                <p className="mt-2 text-xl md:text-2xl text-zinc-400 font-bold">
                  {t.nameTw}
                </p>
              )}

              {t.team && (
                <p className="mt-6 text-sm md:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
                  {t.team}
                </p>
              )}

              {t.info.length > 0 && (
                <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-zinc-800 pt-8">
                  {t.info.map((i) => (
                    <div key={i.label}>
                      <dt className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
                        {i.label}
                      </dt>
                      <dd className="mt-1.5 text-sm md:text-base text-zinc-100">
                        {i.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {t.socials.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {t.socials.map((s) => {
                    const Icon = SOCIAL_ICON[s.type] ?? LinkSimple;
                    return (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 h-10 px-4 border border-zinc-700 text-sm text-zinc-300 hover:border-red-500 hover:text-red-400 transition-colors"
                      >
                        <Icon size={18} weight="fill" />
                        {s.type === "ig"
                          ? "Instagram"
                          : s.type === "fb"
                            ? "Facebook"
                            : s.type === "youtube"
                              ? "YouTube"
                              : "Link"}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* 섭외 문의는 프로필 바로 아래 한 곳에만 둔다. 누르면 문의 폼이 바로 뜬다 */}
              <div className="mt-10 border-t border-zinc-800 pt-8">
                <InquiryButton label={`${name} 섭외 문의`} creator={`${name} (${role})`} />
                <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                  일정 확인부터 계약·현장 진행까지 티엔샤가 맡습니다.
                </p>
              </div>

              {t.work && (
                <section className="mt-12">
                  <h2 className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500">
                    Works · 경력
                  </h2>
                  {/* 【제목】 한 줄은 소제목으로 그린다 */}
                  <div className="mt-4 text-sm leading-7 text-zinc-300">
                    {t.work.split("\n").map((line, i) => {
                      const heading = line.match(/^【(.+)】$/);
                      if (heading) {
                        return (
                          <p
                            key={i}
                            className="mt-6 first:mt-0 mb-1 text-xs font-bold text-red-400"
                          >
                            {heading[1]}
                          </p>
                        );
                      }
                      return line ? <p key={i}>{line}</p> : null;
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>

          {t.gallery.length > 0 && (
            <section className="mt-20 md:mt-28">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6 md:mb-8">
                Gallery
              </h2>
              <TalentGallery images={t.gallery} name={name} />
            </section>
          )}

          {siblings.length > 1 && (
            <nav
              aria-label="다른 크리에이터"
              className="mt-20 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-8"
            >
              <Link href={`/creators/${prev.id}`} className="group">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
                  ← Prev
                </span>
                <p className="mt-1 font-bold group-hover:text-red-400 transition-colors truncate">
                  {displayName(prev)}
                </p>
              </Link>
              <Link href={`/creators/${next.id}`} className="group text-right">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
                  Next →
                </span>
                <p className="mt-1 font-bold group-hover:text-red-400 transition-colors truncate">
                  {displayName(next)}
                </p>
              </Link>
            </nav>
          )}
        </div>
        <SiteFooter />
      </main>
    </>
  );
}

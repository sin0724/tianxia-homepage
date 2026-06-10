import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "대만 KOL 마케팅 · Dcard · Threads · KOC 시딩 — 티엔샤",
  description:
    "대만 KOL·KOC 마케팅 전문. Dcard 바이럴, Threads 마케팅, KOC 시딩, 공동구매 캠페인까지. 대만 소셜 채널 전반의 바이럴 마케팅을 티엔샤가 진행합니다.",
  alternates: { canonical: "https://tianxia.kr/kol-marketing" },
  openGraph: {
    title: "대만 KOL 마케팅 · Dcard · Threads · KOC 시딩 — 티엔샤",
    description:
      "Dcard 바이럴, Threads 마케팅, KOC 시딩, 공동구매 캠페인. 대만 소셜 채널 전반의 바이럴 마케팅.",
    url: "https://tianxia.kr/kol-marketing",
  },
};

const channels = [
  {
    name: "KOL 마케팅",
    en: "Key Opinion Leader",
    desc: "팔로워 수만~수십만의 대만 인플루언서가 브랜드 콘텐츠를 제작해 Instagram, TikTok 등에 게시합니다. 브랜드 인지도와 신뢰도를 빠르게 구축하는 데 효과적입니다.",
    tags: ["Instagram", "TikTok", "YouTube"],
  },
  {
    name: "Dcard 마케팅",
    en: "대만 No.1 익명 커뮤니티",
    desc: "대만 최대 익명 커뮤니티 Dcard는 대만 2030 소비자의 정보 탐색 채널입니다. 자연스러운 바이럴 게시글·댓글로 브랜드 인지도를 높이고 구매 욕구를 자극합니다.",
    tags: ["바이럴 포스팅", "제품 리뷰", "커뮤니티 시딩"],
  },
  {
    name: "Threads 마케팅",
    en: "Meta Threads",
    desc: "빠르게 성장 중인 대만 Threads 채널을 활용한 바이럴 마케팅. 짧은 텍스트와 이미지 기반 콘텐츠로 빠른 확산과 반응을 유도합니다.",
    tags: ["숏폼 콘텐츠", "바이럴", "브랜드 인지"],
  },
  {
    name: "KOC 시딩",
    en: "Key Opinion Consumer",
    desc: "수천~수만 팔로워의 일반 소비자 인플루언서(KOC)에게 제품을 체험하게 해 진정성 높은 후기를 생성합니다. 광고 대비 신뢰도가 높아 구매 전환에 효과적입니다.",
    tags: ["제품 체험", "리얼 후기", "입소문"],
  },
  {
    name: "공동구매 마케팅",
    en: "Co-Buy Campaign",
    desc: "KOL이 Instagram 릴스·스토리·프로필을 통해 직접 공동구매를 열어 판매를 일으킵니다. 단기간 집중 판매와 강력한 바이럴 효과를 동시에 확보할 수 있습니다.",
    tags: ["릴스", "스토리", "공동구매"],
  },
];

const process = [
  { step: "01", title: "브랜드 분석", desc: "제품·타겟·예산 파악 및 채널 전략 수립" },
  { step: "02", title: "KOL·KOC 매칭", desc: "브랜드 핏과 팔로워 특성 분석 후 최적 인플루언서 연결" },
  { step: "03", title: "콘텐츠 기획", desc: "채널별(Dcard·Threads·릴스·스토리) 콘텐츠 방향 설계" },
  { step: "04", title: "캠페인 실행", desc: "게시·시딩·공동구매 오픈 동시 진행" },
  { step: "05", title: "성과 리포트", desc: "도달 수·반응률·판매 전환 데이터 공유" },
];

export default function KolMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <Link
          href="/"
          className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-500 hover:text-red-400 transition-colors"
        >
          ← tianxia.kr
        </Link>

        <p className="mt-10 text-red-500/70 text-[11px] font-mono tracking-[0.3em] uppercase">
          KOL · KOC · Viral Marketing
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
          대만 KOL·KOC 마케팅<br />
          <span className="text-red-500">Dcard · Threads · 공동구매</span>
        </h1>

        <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          티엔샤는 대만의 주요 소셜 채널 전반에서 바이럴 마케팅을 진행합니다.
          Instagram KOL 캠페인부터 Dcard 커뮤니티 시딩, Threads 바이럴, KOC 제품 체험, 공동구매 판매까지
          대만 소비자가 실제로 사용하는 모든 채널을 커버합니다.
        </p>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-8">대만 마케팅 채널 & 서비스</h2>
          <div className="space-y-6">
            {channels.map((c) => (
              <div key={c.name} className="border border-zinc-800 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{c.name}</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{c.en}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {c.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-red-800/40 text-red-400/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-2">왜 대만에서 KOL·KOC 마케팅인가?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            대만 소비자는 광고보다 실제 사용자의 추천을 신뢰합니다. Dcard에서의 커뮤니티 반응,
            KOC의 진정성 있는 후기, KOL의 공동구매 추천이 구매 결정에 직접적인 영향을 미칩니다.
            티엔샤는 대만 현지 네트워크를 통해 브랜드에 맞는 인플루언서를 빠르게 연결하고,
            각 채널의 특성에 맞는 콘텐츠 전략으로 실질적인 판매 성과를 만듭니다.
          </p>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-8">진행 프로세스</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {process.map((p) => (
              <div key={p.step}>
                <p className="text-red-500/60 text-[10px] font-mono tracking-[0.2em] mb-2">{p.step}</p>
                <h3 className="text-sm font-bold mb-1">{p.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-4">대만 바이럴 마케팅 시작하기</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
            KOL·KOC·Dcard·Threads 중 어떤 채널이 우리 브랜드에 맞는지 모르셔도 됩니다.
            티엔샤가 브랜드 분석 후 최적의 채널 조합을 제안드립니다.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-6 py-3 bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors"
          >
            무료 상담 신청
          </Link>
        </div>

      </div>
    </main>
  );
}

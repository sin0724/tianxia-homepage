import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "대만 쇼피(Shopee) 입점 지원 · 공동구매 마케팅 — 티엔샤",
  description:
    "티엔샤 전용 링크로 대만 쇼피 입점 시 트래킹·혜택 지원. 상품 현지화, KOL 공동구매 마케팅까지 대만 이커머스 진출 전 과정을 함께합니다.",
  alternates: { canonical: "https://tianxia.kr/shopee" },
  openGraph: {
    title: "대만 쇼피(Shopee) 입점 지원 · 공동구매 마케팅 — 티엔샤",
    description:
      "티엔샤 전용 링크로 대만 쇼피 입점. 상품 현지화·KOL 공동구매 마케팅까지 원스톱 지원.",
    url: "https://tianxia.kr/shopee",
  },
};

const steps = [
  {
    num: "01",
    title: "쇼피 입점 지원",
    desc: "티엔샤 전용 입점 링크로 셀러 계정을 등록하면 판매 데이터 트래킹과 쇼피의 다양한 입점 지원 혜택을 받을 수 있습니다.",
  },
  {
    num: "02",
    title: "상품 현지화·최적화",
    desc: "상품명·상세페이지를 번체 중국어로 번역하고, 대만 소비자 검색 패턴에 맞는 키워드로 최적화합니다.",
  },
  {
    num: "03",
    title: "KOL 섭외·매칭",
    desc: "브랜드와 제품 카테고리에 맞는 대만 KOL을 섭외·매칭합니다. 팔로워 특성과 채널 적합성을 분석해 최적의 KOL을 연결합니다.",
  },
  {
    num: "04",
    title: "공동구매 릴스·스토리 판매",
    desc: "KOL이 Instagram 릴스·스토리·프로필 링크를 통해 공동구매를 열고 직접 판매를 일으킵니다. 단기간 집중 판매로 초기 리뷰와 판매량을 확보합니다.",
  },
];

const benefits = [
  "티엔샤 전용 링크 — 입점 트래킹 및 쇼피 지원 혜택",
  "번체 중국어 상품 현지화 (번역·키워드·상세페이지)",
  "대만 KOL 섭외·매칭·캠페인 관리",
  "공동구매 캠페인 기획 및 실행",
  "쇼피 판매 데이터 리포트",
];

export default function ShopeePage() {
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
          Shopee & Co-Buy
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
          대만 쇼피 입점 지원<br />
          <span className="text-red-500">공동구매 마케팅까지</span>
        </h1>

        <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          대만 쇼피(Shopee) 진출의 첫 단추부터 KOL 공동구매 바이럴까지, 티엔샤가 전 과정을 함께합니다.
          티엔샤 전용 입점 링크를 통해 등록하면 판매 트래킹과 쇼피의 다양한 지원 혜택을 받을 수 있습니다.
        </p>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-8">진행 프로세스</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="border border-zinc-800 p-6">
                <p className="text-red-500/60 text-[10px] font-mono tracking-[0.2em] mb-3">{s.num}</p>
                <h3 className="text-base font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-6">티엔샤 쇼피 입점 지원 혜택</h2>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-zinc-400">
                <span className="text-red-500 mt-0.5 flex-shrink-0">—</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-2">대만 쇼피 시장 현황</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            쇼피(Shopee)는 대만 최대 이커머스 플랫폼으로, 대만 온라인 쇼핑의 핵심 채널입니다.
            한국 브랜드에 대한 대만 소비자의 관심이 높아지는 가운데, KOL이 직접 공동구매를 열어
            팔로워에게 추천하는 방식은 초기 리뷰 확보와 브랜드 인지 두 가지를 동시에 달성할 수 있는
            가장 효과적인 대만 이커머스 진출 전략입니다.
          </p>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-4">쇼피 입점부터 공동구매까지, 지금 시작하세요</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
            대만 쇼피 입점을 고려 중이시거나 공동구매 마케팅에 관심이 있으시면 티엔샤에 문의해 주세요.
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

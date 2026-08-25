import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import RelatedPages from "@/components/landing/RelatedPages";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

const PATH = "/shopee";

export const metadata: Metadata = {
  title: { absolute: "대만 쇼피(Shopee) 입점 지원 | 공동구매 마케팅 — 티엔샤" },
  description:
    "티엔샤 전용 링크로 대만 쇼피 입점 시 트래킹·혜택 지원. 상품 현지화, KOL 공동구매 마케팅까지 대만 이커머스 진출 전 과정을 함께합니다.",
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 쇼피(Shopee) 입점 지원 · 공동구매 마케팅 — 티엔샤",
    description:
      "티엔샤 전용 링크로 대만 쇼피 입점. 상품 현지화·KOL 공동구매 마케팅까지 원스톱 지원.",
    url: `${BASE_URL}${PATH}`,
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

const prep = [
  {
    title: "상품명과 키워드",
    desc: "대만 소비자가 실제로 검색하는 번체 중국어 표현으로 상품명을 구성해야 검색에 걸립니다. 한국어 상품명을 직역하면 검색량이 없는 단어가 되는 경우가 많아, 카테고리별 검색어를 먼저 확인하고 반영합니다.",
  },
  {
    title: "상세페이지 현지화",
    desc: "성분과 사용법 설명은 물론이고, 대만에서 통용되는 단위와 표기 방식으로 맞춰야 합니다. 이미지 안의 한국어 텍스트도 함께 교체해야 신뢰도가 떨어지지 않습니다.",
  },
  {
    title: "가격과 배송 설계",
    desc: "관세와 배송비를 포함한 최종 부담액 기준으로 경쟁 제품과 비교됩니다. 묶음 구성이나 무료배송 기준선을 어떻게 잡느냐가 전환율에 직접 영향을 줍니다.",
  },
  {
    title: "초기 리뷰 확보",
    desc: "쇼피는 리뷰가 없는 신규 상품이 노출과 전환 모두에서 불리합니다. 입점 직후 KOC 시딩이나 공동구매로 초기 구매와 리뷰를 빠르게 쌓는 설계가 필요합니다.",
  },
];

const visibility = [
  {
    title: "검색 키워드 일치",
    desc: "쇼피 내 검색은 상품명과 태그에 들어간 단어를 기준으로 동작합니다. 대만 소비자가 실제로 입력하는 번체 중국어 표현이 상품명에 들어가 있어야 검색 결과에 나타납니다.",
  },
  {
    title: "판매량과 리뷰 수",
    desc: "같은 키워드에서 상위에 노출되는 상품은 대부분 판매 이력과 리뷰가 쌓여 있습니다. 신규 상품이 불리한 구조라, 초기에 판매를 만들어 주는 캠페인이 사실상 필수입니다.",
  },
  {
    title: "응답률과 배송 지표",
    desc: "문의 응답 속도와 배송 처리 기간이 셀러 지표로 관리되며 노출에도 영향을 줍니다. 해외 발송이라면 예상 배송 기간을 정확히 안내해 분쟁을 줄이는 편이 유리합니다.",
  },
  {
    title: "가격 경쟁력",
    desc: "동일 카테고리 내 가격 비교가 쉬운 플랫폼입니다. 배송비를 포함한 최종 부담액 기준으로 비교되기 때문에, 무료배송 기준선이나 묶음 구성으로 체감 가격을 조정하는 방식이 자주 쓰입니다.",
  },
];

const faq = [
  {
    q: "대만에 법인이 없어도 쇼피에 입점할 수 있나요?",
    a: "가능합니다. 해외 셀러 형태로 등록할 수 있으며, 티엔샤 전용 입점 링크를 통해 등록하시면 판매 데이터 트래킹과 쇼피의 입점 지원 혜택을 함께 받으실 수 있습니다. 필요한 서류와 절차는 상담 단계에서 안내해 드립니다.",
  },
  {
    q: "입점까지 얼마나 걸리나요?",
    a: "계정 등록 자체는 서류가 준비되면 오래 걸리지 않지만, 상품 현지화와 상세페이지 준비에 통상 2~3주가 필요합니다. 취급 품목 수에 따라 달라지므로 상품 리스트를 공유해 주시면 일정을 산정해 드립니다.",
  },
  {
    q: "쇼피 입점만 도와주시나요, 판매도 함께 진행되나요?",
    a: "입점 지원과 상품 현지화까지만 진행하실 수도 있고, KOL 섭외와 공동구매 캠페인까지 이어서 진행하실 수도 있습니다. 다만 신규 상품은 리뷰와 판매 이력이 없으면 노출이 잘 되지 않기 때문에, 초기 판매를 만드는 캠페인을 함께 진행하시는 편을 권합니다.",
  },
  {
    q: "상품명을 그대로 번역해서 올리면 안 되나요?",
    a: "권하지 않습니다. 직역한 상품명은 대만 소비자가 실제로 검색하는 단어와 다른 경우가 많아 검색에 노출되지 않습니다. 카테고리별로 실제 검색되는 번체 중국어 표현을 확인한 뒤 상품명과 키워드에 반영합니다.",
  },
  {
    q: "공동구매와 쇼피 판매는 어떻게 연결되나요?",
    a: "KOL이 릴스와 스토리로 공동구매를 열고, 프로필 링크나 스토리 링크를 통해 쇼피 상품 페이지로 유입시키는 구조입니다. 단기간에 판매와 리뷰가 함께 쌓이기 때문에 이후 쇼피 내 검색 노출에도 도움이 됩니다.",
  },
  {
    q: "어떤 품목이 대만 쇼피에서 잘 팔리나요?",
    a: "티엔샤가 주로 다루는 F&B, 뷰티, 헬스케어 품목은 한국 브랜드에 대한 신뢰가 높아 반응이 좋은 편입니다. 다만 부피가 크거나 배송 비용 비중이 높은 제품, 통관 제약이 있는 성분이 포함된 제품은 사전 검토가 필요합니다.",
  },
  {
    q: "판매 데이터는 어떻게 확인하나요?",
    a: "티엔샤 전용 링크로 입점하신 경우 유입과 판매 데이터를 함께 확인할 수 있습니다. 캠페인을 진행하면 어떤 KOL과 콘텐츠에서 유입이 발생하고 구매로 이어졌는지 정리해 리포트로 전달드립니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 쇼피 입점 지원",
  description:
    "티엔샤 전용 링크로 대만 쇼피 입점 시 트래킹·혜택 지원. 상품 현지화, KOL 공동구매 마케팅까지 대만 이커머스 진출 전 과정을 함께합니다.",
  services: steps.map((s) => ({ name: s.title, description: s.desc })),
  faq,
});

export default function ShopeePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
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

        <Section
          title="입점 전에 정리해야 할 것"
          lead="쇼피는 등록 자체보다 등록 이후의 노출이 어렵습니다. 입점 단계에서 아래 네 가지를 정리해 두면 초기 판매가 훨씬 수월해집니다."
        >
          <CardGrid items={prep} />
        </Section>

        <Section
          title="쇼피에서 노출을 만드는 요소"
          lead="입점 이후 상품이 검색에 걸리고 상위에 노출되기까지는 별도의 조건이 작동합니다. 아래 네 가지가 초기 성패를 가릅니다."
        >
          <CardGrid items={visibility} />
        </Section>

        <FaqSection items={faq} title="대만 쇼피 입점 자주 묻는 질문" />

        <RelatedPages currentPath={PATH} />

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

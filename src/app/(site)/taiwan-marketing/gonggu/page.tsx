import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import RelatedPages from "@/components/landing/RelatedPages";
import ContactCta from "@/components/landing/ContactCta";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

const PATH = "/taiwan-marketing/gonggu";

export const metadata: Metadata = {
  title: { absolute: "대만 공동구매 마케팅 | KOL 릴스·스토리 판매 — 티엔샤" },
  description:
    "대만 KOL이 직접 여는 공동구매 캠페인. 상품 현지화부터 KOL 섭외, 릴스·스토리 판매, 정산까지 원스톱으로 진행합니다. 대만 마케팅 에이전시 티엔샤.",
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 공동구매 마케팅 — KOL 릴스·스토리 판매",
    description:
      "라이브커머스 없이도 대만 KOL 팔로워를 통해 단기간 집중 판매를 만드는 공동구매 캠페인.",
    url: `${BASE_URL}${PATH}`,
  },
};

const whatis = [
  {
    title: "KOL이 직접 여는 판매",
    desc: "브랜드가 광고를 집행하는 방식이 아니라, KOL이 자신의 팔로워에게 제품을 소개하고 정해진 기간 동안 주문을 모아 판매하는 형식입니다. 추천하는 사람이 명확하기 때문에 일반 광고보다 구매 전환이 높게 나옵니다.",
  },
  {
    title: "짧고 집중된 기간",
    desc: "보통 며칠에서 일주일 정도의 기간을 정해 진행합니다. 기간이 제한되어 있어 구매 결정이 미뤄지지 않고, 그 기간 동안 스토리와 릴스가 반복 노출되며 반응이 누적됩니다.",
  },
  {
    title: "라이브커머스 없이 가능",
    desc: "실시간 방송을 준비하지 않아도 됩니다. 릴스와 스토리, 프로필 링크만으로 진행되기 때문에 브랜드 쪽 준비 부담이 적고, KOL의 스케줄을 맞추기도 상대적으로 수월합니다.",
  },
  {
    title: "판매와 콘텐츠를 동시에",
    desc: "캠페인이 끝나도 제작된 릴스와 후기가 남습니다. 초기 판매와 리뷰, 브랜드 콘텐츠를 한 번의 캠페인에서 함께 얻을 수 있습니다.",
  },
];

const flow = [
  {
    eyebrow: "01",
    title: "제품 선정과 구성 설계",
    desc: "공동구매에 적합한 제품인지, 어떤 구성과 가격으로 열지 정합니다. 단품보다 묶음 구성이 반응이 좋은 경우가 많고, 배송비를 포함한 최종 부담액이 경쟁력을 좌우합니다.",
  },
  {
    eyebrow: "02",
    title: "상품 현지화",
    desc: "제품명과 설명을 번체 중국어로 정리하고, 대만 소비자가 궁금해할 정보를 미리 준비합니다. 성분과 사용법, 배송 일정에 대한 질문이 캠페인 중에 집중적으로 들어옵니다.",
  },
  {
    eyebrow: "03",
    title: "KOL 섭외와 매칭",
    desc: "공동구매 진행 경험이 있고 팔로워와의 신뢰가 두터운 KOL을 우선 검토합니다. 팔로워 수보다 과거 공동구매 실적과 댓글 반응의 질이 더 중요한 지표입니다.",
  },
  {
    eyebrow: "04",
    title: "콘텐츠 제작과 오픈",
    desc: "KOL이 릴스로 제품을 소개하고, 스토리로 기간과 구매 방법을 반복 안내합니다. 프로필 링크를 통해 쇼피 상품 페이지나 주문 폼으로 연결합니다.",
  },
  {
    eyebrow: "05",
    title: "마감·정산·리포트",
    desc: "주문을 집계하고 배송과 정산을 정리합니다. 어떤 콘텐츠에서 주문이 발생했는지, 어느 시점에 반응이 몰렸는지 정리해 다음 캠페인 설계에 반영합니다.",
  },
];

const fit = [
  {
    title: "적합한 제품",
    desc: "구매 부담이 크지 않고 반복 구매가 가능한 제품, 사용 전후가 눈에 보이는 제품, 묶음 구성이 자연스러운 제품이 유리합니다. 식품과 스킨케어, 헬스케어 제품이 대표적입니다.",
  },
  {
    title: "신중히 검토할 제품",
    desc: "부피가 커서 배송비 비중이 높은 제품, 사이즈나 색상 선택이 복잡한 제품, 통관 제약이 있는 성분이 포함된 제품은 사전 검토가 필요합니다.",
  },
  {
    title: "필요한 준비",
    desc: "예상 주문량에 대응할 재고와 배송 체계가 갖춰져 있어야 합니다. 공동구매는 짧은 기간에 주문이 몰리기 때문에, 배송이 지연되면 KOL의 신뢰까지 함께 손상됩니다.",
  },
  {
    title: "쇼피와의 연계",
    desc: "쇼피에 입점되어 있으면 공동구매 유입을 그대로 받을 수 있고, 캠페인으로 쌓인 판매와 리뷰가 이후 쇼피 내 검색 노출에도 도움이 됩니다.",
  },
];

const faq = [
  {
    q: "대만 공동구매 마케팅이 정확히 무엇인가요?",
    a: "대만 KOL이 자신의 Instagram 팔로워를 대상으로 정해진 기간 동안 제품 주문을 모아 판매하는 방식입니다. 릴스로 제품을 소개하고 스토리로 구매 방법을 안내하며, 프로필 링크를 통해 주문 페이지로 연결합니다. 라이브 방송 없이 진행할 수 있습니다.",
  },
  {
    q: "라이브커머스와 어떻게 다른가요?",
    a: "라이브커머스는 실시간 방송으로 판매하는 방식이라 장비와 스케줄 조율 부담이 큽니다. 공동구매는 릴스와 스토리라는 일반 콘텐츠 형식을 쓰기 때문에 준비 부담이 훨씬 적고, 기간 내내 반복 노출된다는 장점이 있습니다.",
  },
  {
    q: "어느 정도 기간이 필요한가요?",
    a: "제품 현지화와 KOL 섭외, 콘텐츠 제작에 통상 3~4주가 필요하고, 공동구매 오픈 기간은 며칠에서 일주일 정도입니다. 재고와 배송 준비 기간까지 고려하면 전체적으로 한 달 반 정도를 잡는 편이 안정적입니다.",
  },
  {
    q: "재고를 미리 대만에 보내야 하나요?",
    a: "진행 방식에 따라 다릅니다. 쇼피에 입점해 현지 물류를 쓰는 경우와 주문을 모은 뒤 한국에서 발송하는 경우가 모두 가능합니다. 제품 특성과 예상 물량에 따라 어느 쪽이 유리한지 상담 단계에서 함께 검토합니다.",
  },
  {
    q: "KOL 선정은 어떤 기준으로 하나요?",
    a: "공동구매 진행 경험과 실적을 우선 봅니다. 팔로워 수가 많아도 판매 경험이 없으면 주문으로 이어지지 않는 경우가 있습니다. 댓글에서 팔로워와 주고받는 대화의 질, 과거 추천 제품과의 카테고리 일치도도 함께 검토합니다.",
  },
  {
    q: "성과는 어떻게 정산하고 확인하나요?",
    a: "주문 집계와 정산 내역을 정리해 전달드립니다. 어떤 콘텐츠에서 주문이 발생했는지, 오픈 이후 어느 시점에 반응이 몰렸는지도 함께 정리해 다음 캠페인의 콘텐츠 구성과 오픈 타이밍에 반영합니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 공동구매 마케팅",
  description:
    "대만 KOL이 직접 여는 공동구매 캠페인. 상품 현지화부터 KOL 섭외, 릴스·스토리 판매, 정산까지 원스톱으로 진행합니다.",
  services: [
    {
      name: "공동구매 캠페인 기획",
      description:
        "제품 구성과 가격, 오픈 기간을 설계하고 예상 물량에 맞춘 재고·배송 방식을 함께 정리합니다.",
    },
    {
      name: "공동구매 KOL 섭외",
      description:
        "공동구매 진행 경험과 실적, 팔로워 반응의 질을 기준으로 제품에 맞는 대만 KOL을 섭외합니다.",
    },
    {
      name: "릴스·스토리 판매 운영",
      description:
        "릴스 제품 소개와 스토리 안내, 프로필 링크 연결까지 캠페인 기간 전체의 콘텐츠 운영을 관리합니다.",
    },
  ],
  faq,
  parent: { path: "/taiwan-marketing", name: "대만 마케팅" },
});

export default function GongguPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          backHref="/taiwan-marketing"
          backLabel="← 대만 마케팅"
          eyebrow="Co-Buy Campaign"
          title="대만 공동구매 마케팅"
          titleAccent="KOL 릴스·스토리 판매"
          lead="대만 KOL이 팔로워에게 직접 제품을 소개하고 정해진 기간 동안 주문을 모아 판매하는 방식입니다. 라이브커머스 없이도 단기간에 집중된 판매와 초기 리뷰를 함께 확보할 수 있습니다."
          tags={["KOL 공동구매", "릴스·스토리", "상품 현지화", "쇼피 연계"]}
        />

        <Section
          title="공동구매 마케팅이란"
          lead="대만에서 공동구매는 특별한 이벤트가 아니라 KOL이 팔로워와 거래하는 익숙한 방식으로 자리잡았습니다."
        >
          <CardGrid items={whatis} />
        </Section>

        <Section
          title="진행 흐름"
          lead="제품 선정에서 정산까지 다섯 단계로 진행합니다. 재고와 배송 준비가 함께 움직여야 하기 때문에 일정은 여유 있게 잡습니다."
        >
          <CardGrid items={flow} />
        </Section>

        <Section
          title="어떤 브랜드에 맞나요"
          lead="공동구매는 모든 제품에 적합하지는 않습니다. 진행 전에 아래 조건을 먼저 확인합니다."
        >
          <CardGrid items={fit} />
        </Section>

        <FaqSection items={faq} title="대만 공동구매 자주 묻는 질문" />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="대만 KOL 공동구매를 준비하고 계신가요"
          desc="제품 정보와 예상 물량, 희망 시점을 알려주시면 적합한 KOL 구성과 일정을 제안드립니다."
        />

      </div>
    </main>
  );
}

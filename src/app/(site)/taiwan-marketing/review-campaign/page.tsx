import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import RelatedPages from "@/components/landing/RelatedPages";
import ContactCta from "@/components/landing/ContactCta";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

const PATH = "/taiwan-marketing/review-campaign";
const DESCRIPTION =
  "대만 체험단 마케팅 전문 티엔샤. 대만 현지 인플루언서·KOC 체험단 모집부터 제품 발송, 번체 후기 가이드, Instagram·Threads·Dcard 후기 발행까지. 대만 인플루언서가 한국을 방문하는 방문형 체험단도 운영합니다.";

export const metadata: Metadata = {
  title: { absolute: "대만 체험단 마케팅 | 대만 인플루언서·KOC 체험단 모집·운영 — 티엔샤" },
  description: DESCRIPTION,
  keywords: [
    "대만 체험단", "대만 체험단 마케팅", "대만 인플루언서 체험단", "대만 KOC 체험단",
    "대만 리뷰 마케팅", "대만 제품 체험단", "대만 방문 체험단", "KOC 시딩", "대만 마케팅",
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 체험단 마케팅 — 대만 인플루언서·KOC 체험단",
    description:
      "대만 현지 인플루언서·KOC 체험단으로 검색했을 때 보이는 후기를 만듭니다. 제품 배송형·매장 방문형·한국 방문형 체험단 운영.",
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const types = [
  {
    title: "제품 배송형 체험단",
    desc: "대만 현지 인플루언서·KOC에게 제품을 보내 사용 후기를 받는 가장 기본적인 대만 체험단입니다. 뷰티, 건강식품, 생활용품처럼 사용 경험이 중요한 제품에 적합합니다.",
  },
  {
    title: "대만 매장·팝업 방문형",
    desc: "대만 현지 매장이나 팝업스토어에 인플루언서를 초대해 방문 후기를 만듭니다. 오프라인 매장 오픈, 백화점 팝업 초기 집객에 효과적입니다.",
  },
  {
    title: "한국 방문형 체험단",
    desc: "대만 인플루언서가 한국의 병원, 매장, 레스토랑을 직접 방문해 경험을 콘텐츠로 남깁니다. 대만 관광객을 한국 현지로 불러와야 하는 병원·F&B 브랜드에 맞는 방식입니다.",
  },
];

const why = [
  {
    title: "검색했을 때 보이는 후기",
    desc: "대만 소비자는 제품을 알게 된 뒤 Instagram, Threads, Dcard에서 실제 사용 후기를 찾아봅니다. 체험단 후기가 충분히 쌓여 있어야 관심이 구매로 넘어갑니다.",
  },
  {
    title: "광고보다 높은 신뢰",
    desc: "수천에서 수만 팔로워 규모의 KOC 후기는 친구의 추천처럼 읽힙니다. 대형 KOL 광고보다 도달은 작지만 신뢰와 저장·공유 반응이 높습니다.",
  },
  {
    title: "적은 예산으로 많은 콘텐츠",
    desc: "여러 명의 체험단이 각자의 시선으로 콘텐츠를 만들기 때문에 같은 예산으로 다양한 후기 콘텐츠를 확보할 수 있고, 반응 좋은 콘텐츠는 광고 소재로 재활용할 수 있습니다.",
  },
  {
    title: "KOL 캠페인의 효과를 받쳐 준다",
    desc: "KOL이 관심을 만드는 시점에 체험단 후기가 함께 깔려 있으면 검색한 소비자가 확신을 얻습니다. KOL과 체험단을 같은 일정으로 묶을 때 전환이 가장 좋습니다.",
  },
];

const how = [
  {
    eyebrow: "01",
    title: "목표·인원 설계",
    desc: "후기를 어느 채널에, 어느 기간 안에, 몇 건 모을지 정합니다. 후기는 흩어지면 묻히기 때문에 짧은 기간에 촘촘하게 모이도록 설계합니다.",
  },
  {
    eyebrow: "02",
    title: "대만 체험단 모집·선정",
    desc: "팔로워 수보다 팔로워 구성(대만 거주 비율, 연령대), 평소 콘텐츠 카테고리, 댓글 반응의 질을 보고 선정합니다.",
  },
  {
    eyebrow: "03",
    title: "번체 가이드 전달",
    desc: "제품의 핵심 포인트와 꼭 들어가야 할 검색어를 번체자 가이드로 전달합니다. 문구를 강요하지 않고 각자의 말투로 쓰도록 여지를 둡니다.",
  },
  {
    eyebrow: "04",
    title: "제품 발송·방문 진행",
    desc: "대만 현지 발송 또는 매장·한국 방문 일정을 조율합니다. 제품 카테고리에 따라 대만 수입·통관 요건이 다를 수 있어 사전에 확인합니다.",
  },
  {
    eyebrow: "05",
    title: "후기 발행·리포트",
    desc: "발행된 후기의 링크와 반응(조회·저장·댓글), 반응이 좋았던 콘텐츠를 정리해 전달하고, 2차 활용 가능한 콘텐츠를 추립니다.",
  },
];

const faq = [
  {
    q: "대만 체험단과 대만 KOL 마케팅은 무엇이 다른가요?",
    a: "대만 KOL 마케팅은 팔로워가 많은 인플루언서 한두 명으로 도달과 인지를 만드는 방식이고, 대만 체험단은 여러 명의 KOC·마이크로 인플루언서가 실제 사용 후기를 남겨 신뢰를 쌓는 방식입니다. 대만에서는 두 가지를 같은 시기에 함께 쓰는 경우가 많습니다.",
  },
  {
    q: "대만 체험단은 몇 명 정도로 진행하나요?",
    a: "목표와 카테고리에 따라 다릅니다. 검색했을 때 후기가 한 화면을 채우는 수준을 기준으로 인원을 정하며, 처음에는 소규모로 반응을 확인한 뒤 반응이 좋은 유형의 체험단을 늘리는 방식을 권합니다.",
  },
  {
    q: "제품은 어떻게 대만으로 보내나요?",
    a: "대만 현지 수령지로 일괄 발송한 뒤 체험단에게 나눠 보내거나, 한국에서 각자에게 직접 발송합니다. 화장품·식품처럼 카테고리에 따라 대만 수입 요건이 다를 수 있어 진행 전에 발송 방식을 함께 확인합니다.",
  },
  {
    q: "대만 인플루언서가 한국에 방문하는 체험단도 가능한가요?",
    a: "가능합니다. 한국 병원, 매장, 레스토랑처럼 대만 관광객이 한국에서 직접 경험해야 하는 브랜드는 대만 인플루언서를 한국으로 초청해 방문 후기를 만드는 방식이 효과적입니다. 일정과 동선 조율도 함께 진행합니다.",
  },
  {
    q: "후기에 협찬 표기를 해야 하나요?",
    a: "네, 체험을 제공받은 후기라는 점을 밝히도록 안내합니다. 대만 소비자는 숨긴 광고에 민감하고, 표기를 한 뒤에도 솔직한 사용 경험을 담은 후기가 더 오래 신뢰를 얻습니다.",
  },
  {
    q: "체험단 후기를 광고 소재로 써도 되나요?",
    a: "사전에 2차 활용 범위를 합의하면 가능합니다. 반응이 좋았던 후기 콘텐츠를 광고, 쇼피 상세페이지, 브랜드 SNS에 활용할 수 있도록 섭외 단계에서 조건을 정리합니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 체험단 마케팅",
  description: DESCRIPTION,
  services: types.map((t) => ({ name: `대만 체험단 — ${t.title}`, description: t.desc })),
  faq,
  parent: { path: "/taiwan-marketing", name: "대만 마케팅" },
});

export default function ReviewCampaignPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          backHref="/taiwan-marketing"
          backLabel="← 대만 마케팅"
          eyebrow="Taiwan Review Campaign"
          title="대만 체험단 마케팅"
          titleAccent="인플루언서 · KOC 체험단"
          lead="대만 체험단은 대만 현지 인플루언서와 KOC가 제품을 직접 써 보고 후기를 남기는 마케팅입니다. 티엔샤는 체험단 모집과 선정, 번체 후기 가이드, 제품 발송, 후기 발행과 리포트까지 대만 체험단 전 과정을 운영합니다."
          tags={["제품 배송형", "매장 방문형", "한국 방문형", "KOC 시딩"]}
        />

        <Section
          title="대만 체험단 유형"
          lead="브랜드가 대만 소비자를 어디서 만나야 하는지에 따라 체험단 방식이 달라집니다."
        >
          <CardGrid items={types} columns={3} />
        </Section>

        <Section
          title="왜 대만 체험단인가"
          lead="대만 인플루언서 마케팅에서 체험단은 인지를 신뢰로 바꾸는 역할을 맡습니다."
        >
          <CardGrid items={why} />
        </Section>

        <Section
          title="대만 체험단 진행 방식"
          lead="모집부터 리포트까지 한 흐름으로 진행합니다."
        >
          <CardGrid items={how} />
        </Section>

        <FaqSection items={faq} title="대만 체험단 자주 묻는 질문" />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="대만 체험단으로 검색되는 후기를 만드세요"
          desc="제품과 목표를 알려주시면 체험단 유형과 인원, 진행 일정을 제안드립니다."
        />

      </div>
    </main>
  );
}

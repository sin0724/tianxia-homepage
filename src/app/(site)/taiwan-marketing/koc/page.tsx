import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import InlineCta from "@/components/landing/InlineCta";
import RelatedInsights from "@/components/landing/RelatedInsights";
import RelatedPages from "@/components/landing/RelatedPages";
import ContactCta from "@/components/landing/ContactCta";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

// Primary intent: 대만 KOC / KOC 시딩·리뷰 전략.
// "대만 체험단" 운영 형태(배송·매장·한국 방문)는 /taiwan-marketing/review-campaign이 담당하므로
// 이 페이지는 KOC 정의·선정 기준·채널 조합에 집중하고 체험단 페이지로 링크한다.
const PATH = "/taiwan-marketing/koc";
const DESCRIPTION =
  "대만 현지 KOC를 활용한 체험단, 제품 시딩, 방문형 리뷰 캠페인을 운영합니다. 브랜드와 맞는 KOC 모집부터 콘텐츠 관리까지 티엔샤가 진행합니다.";

export const metadata: Metadata = {
  title: { absolute: "대만 KOC 마케팅 | 체험단·시딩·리뷰 — 티엔샤" },
  description: DESCRIPTION,
  keywords: [
    "대만 KOC", "대만 KOC 마케팅", "대만 KOC 체험단", "대만 시딩",
    "대만 리뷰 마케팅", "대만 KOC 모집", "대만 인플루언서 체험단",
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 KOC 마케팅 — 티엔샤",
    description:
      "대만 소비자의 실제 경험이 브랜드 검색과 구매 결정으로 이어지도록 KOC 체험·시딩 캠페인을 설계합니다.",
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const fit = [
  { title: "화장품·스킨케어", desc: "사용감, 발색, 피부 변화처럼 직접 써 본 사람의 설명이 구매 판단에 쓰이는 제품." },
  { title: "병원·클리닉 방문", desc: "상담 과정, 통역, 대기, 사후 관리처럼 방문해 본 사람만 말할 수 있는 정보가 필요한 경우." },
  { title: "식음료", desc: "맛과 양, 매장 분위기, 가성비에 대한 여러 사람의 평가가 쌓여야 선택되는 카테고리." },
  { title: "오프라인 매장·여행", desc: "대만 여행객이 방한 전에 찾아보는 매장, 체험, 숙소처럼 위치와 동선 정보가 함께 필요한 경우." },
];

const process = [
  { eyebrow: "01", title: "목표·제품 확인", desc: "후기를 어느 채널에, 어느 시점까지, 어떤 내용으로 쌓을지 먼저 정합니다. 목표가 인지인지 검색 결과 확보인지에 따라 KOC 구성이 달라집니다." },
  { eyebrow: "02", title: "모집 조건 설계", desc: "거주 지역, 주력 채널, 콘텐츠 카테고리, 배송형·방문형 여부를 조건으로 정리합니다." },
  { eyebrow: "03", title: "대만 KOC 모집·검토", desc: "지원한 계정을 하나씩 확인해 브랜드와 맞지 않는 계정은 제외합니다." },
  { eyebrow: "04", title: "체험·배송·방문 조율", desc: "제품 발송 일정이나 매장·병원 방문 일정을 KOC별로 맞춥니다." },
  { eyebrow: "05", title: "콘텐츠 가이드 전달", desc: "꼭 전달할 정보와 표기 사항을 번체 가이드로 전달하되, 문장은 각자의 말투로 쓰도록 둡니다." },
  { eyebrow: "06", title: "발행·결과 정리", desc: "발행 여부와 링크, 반응을 정리해 전달하고, 반응이 좋았던 계정과 형식을 다음 캠페인에 반영합니다." },
];

const types = [
  { title: "배송형 KOC", desc: "대만 현지 KOC에게 제품을 보내 사용 후기를 받습니다. 여러 지역의 KOC가 동시에 참여할 수 있어 짧은 기간에 후기를 모으기 좋습니다. 대만 배송과 통관 일정을 캠페인 일정에 함께 반영해야 합니다." },
  { title: "방문형 KOC", desc: "KOC가 매장, 병원, 팝업스토어를 직접 방문해 경험을 콘텐츠로 남깁니다. 공간과 서비스 경험이 핵심인 업종에 맞고, 방문 일정과 현장 응대 준비가 결과를 좌우합니다." },
];

const criteria = [
  { title: "계정 공개와 최근 활동", desc: "공개 계정인지, 최근까지 꾸준히 게시하고 있는지를 먼저 봅니다." },
  { title: "콘텐츠 톤", desc: "평소 글과 사진의 분위기가 브랜드가 전달하려는 인상과 어긋나지 않는지 확인합니다." },
  { title: "카테고리 적합성", desc: "평소 다루는 주제가 제품 카테고리와 닿아 있어야 팔로워가 후기를 자연스럽게 받아들입니다." },
  { title: "팔로워 수보다 활동성과 핏", desc: "팔로워 규모만으로 고르지 않습니다. 댓글 대화가 오가는지, 브랜드와 어울리는지를 함께 봅니다." },
];

const faq = [
  { q: "대만 KOC와 KOL의 차이는 무엇인가요?", a: "KOL은 팔로워 규모가 크고 도달과 인지 확보에 강한 인플루언서입니다. KOC는 비교적 일상적인 계정을 가진 소비자형 크리에이터로, 실제 사용 경험을 공유해 검색했을 때 보이는 후기를 쌓는 데 쓰입니다. 목표에 따라 한쪽만 쓰기도 하고 함께 쓰기도 합니다." },
  { q: "팔로워 수가 많아야 KOC로 참여할 수 있나요?", a: "아닙니다. KOC는 팔로워 수보다 계정의 최근 활동, 콘텐츠 톤, 브랜드와의 적합성을 기준으로 선정합니다." },
  { q: "제품 배송형과 매장 방문형 모두 가능한가요?", a: "가능합니다. 대만 현지로 제품을 보내는 배송형과 매장·병원·팝업을 직접 방문하는 방문형 모두 진행하며, 업종과 목표에 따라 한 가지를 고르거나 함께 운영합니다." },
  { q: "대만 현지 KOC 모집도 가능한가요?", a: "가능합니다. 대만 현지에 거주하는 KOC를 조건에 맞춰 모집하고, 지원한 계정을 검토해 브랜드와 맞는 계정으로 구성합니다." },
  { q: "콘텐츠는 어떤 플랫폼에 게시하나요?", a: "주로 Instagram(피드·릴스·스토리)과 Threads에 게시하고, 캠페인에 따라 Dcard 후기 글이나 블로그를 함께 활용합니다. 어떤 채널을 쓸지는 목표와 카테고리에 따라 정합니다." },
  { q: "비용은 어떻게 결정되나요?", a: "모집 규모, 콘텐츠 형태, 배송/방문 여부, 사용 채널, 캠페인 기간 등에 따라 달라집니다. 캠페인 조건을 확인한 뒤 맞춤 실행안과 견적을 안내드립니다." },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 KOC 마케팅",
  description: DESCRIPTION,
  services: [
    { name: "대만 KOC 시딩 캠페인", description: "대만 현지 KOC에게 제품을 보내 실제 사용 경험을 Instagram·Threads 등에 공유하도록 설계하고 운영합니다." },
    { name: "대만 방문형 KOC 캠페인", description: "대만 KOC가 매장·병원·팝업을 직접 방문해 경험 콘텐츠를 발행하도록 일정 조율과 가이드 전달을 진행합니다." },
  ],
  faq,
  parent: { path: "/taiwan-marketing", name: "대만 마케팅" },
});

export default function KocMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          backHref="/taiwan-marketing"
          backLabel="← 대만 마케팅"
          eyebrow="Taiwan KOC Marketing"
          title="대만 KOC 마케팅"
          lead="대만 소비자의 실제 경험이 브랜드 검색과 구매 결정으로 이어지도록 KOC 체험·시딩 캠페인을 설계합니다."
          tags={["KOC 시딩", "배송형·방문형", "리뷰 콘텐츠", "대만 현지 모집"]}
          primaryCta="KOC 캠페인 상담하기"
          secondaryCta={{ label: "진행 방식 확인하기", href: "#process" }}
        />

        <Section title="대만 KOC 마케팅이란">
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed max-w-2xl">
            <p>
              대만 KOC 마케팅은 현지 소비자형 크리에이터(KOC, Key Opinion Consumer)가 제품이나 서비스를
              직접 체험하고 자신의 SNS에 경험을 공유하도록 설계하는 방식입니다.
            </p>
            <p>
              팔로워가 많은 KOL이 넓은 도달로 브랜드를 알린다면, KOC는 비교적 일상적인 계정에서 소비자 관점의
              후기를 남깁니다. 여러 KOC의 후기가 쌓이면 대만 소비자가 브랜드를 검색했을 때 참고할 수 있는
              경험 기반 콘텐츠가 됩니다.
            </p>
          </div>
        </Section>

        <Section
          title="어떤 캠페인에 KOC가 적합한가"
          lead="직접 써 보거나 방문해 본 사람의 이야기가 구매 판단에 쓰이는 카테고리에서 KOC가 역할을 합니다. 모든 브랜드에 같은 방식이 맞지는 않기 때문에, 상담 단계에서 KOC 단독이 맞는지 다른 채널과 조합해야 하는지 함께 검토합니다."
        >
          <CardGrid items={fit} />
        </Section>

        <Section id="process" title="티엔샤 KOC 캠페인 진행 방식">
          <CardGrid items={process} columns={3} />
        </Section>

        <Section
          title="배송형과 방문형 KOC"
          lead="제품을 보내는 방식과 직접 방문하는 방식은 준비할 것과 얻을 수 있는 콘텐츠가 다릅니다."
        >
          <CardGrid items={types} />
          <p className="mt-6 text-sm text-zinc-500 leading-relaxed">
            체험단 운영 형태(배송형, 대만 매장 방문형, 한국 방문형)와 모집·발송 과정은{" "}
            <Link href="/taiwan-marketing/review-campaign" className="text-red-400 hover:underline underline-offset-4">
              대만 체험단
            </Link>{" "}
            페이지에서 자세히 볼 수 있습니다.
          </p>
        </Section>

        <Section
          title="KOC 선정 시 무엇을 보는가"
          lead="지원한 계정을 하나씩 확인하고, 브랜드와 맞지 않는 계정은 제외합니다."
        >
          <CardGrid items={criteria} />
        </Section>

        <InlineCta
          text="우리 제품에 배송형이 맞는지, 방문형이 맞는지부터 확인해 보세요."
          label="KOC 캠페인 상담"
        />

        <Section title="KOL과 KOC는 어떻게 다른가">
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed max-w-2xl">
            <p>
              KOL은 많은 팔로워에게 한 번에 브랜드를 알리는 역할을, KOC는 여러 사람의 실제 경험으로 신뢰를
              쌓는 역할을 맡습니다. 어느 한쪽이 항상 낫지는 않으며, 출시 초기처럼 인지와 후기가 동시에
              필요한 시점에는 두 방식을 같은 일정으로 묶기도 합니다.
            </p>
            <p>
              KOL 섭외와 캠페인 운영은{" "}
              <Link href="/kol-marketing" className="text-red-400 hover:underline underline-offset-4">
                대만 인플루언서 마케팅
              </Link>
              에서 확인할 수 있습니다.
            </p>
          </div>
        </Section>

        <Section title="Dcard·Threads와 함께 운영하는 이유">
          <CardGrid
            columns={3}
            items={[
              { title: "KOC 콘텐츠", desc: "Instagram과 Threads에 올라온 KOC 후기가 브랜드 경험을 여러 시선으로 보여 줍니다." },
              { title: "Threads 확산", desc: "짧은 글로 빠르게 공유되는 Threads에서 KOC의 경험이 대화로 이어집니다.", href: "/taiwan-marketing/threads" },
              { title: "Dcard 후기 자산", desc: "구매 전에 검색하는 Dcard에 남은 후기는 캠페인이 끝난 뒤에도 검색 결과에 남습니다.", href: "/taiwan-marketing/dcard" },
            ]}
          />
        </Section>

        <FaqSection items={faq} title="대만 KOC 마케팅 자주 묻는 질문" />

        <RelatedInsights
          slugs={["taiwan-koc-marketing-guide", "taiwan-kol-vs-koc", "koc-seeding-density"]}
        />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="대만 KOC를 어떻게 활용할지 먼저 확인해보세요"
          desc="제품과 목표를 알려주시면 KOC 단독 진행이 적합한지, KOL·Threads·Dcard를 함께 사용하는 편이 좋은지 검토해 제안드립니다."
          label="캠페인 상담하기"
        />

      </div>
    </main>
  );
}

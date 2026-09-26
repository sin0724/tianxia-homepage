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

// Primary intent: 병원·의료기관 전반의 대만 마케팅.
// 피부과·성형외과 특화 내용은 /taiwan-marketing/clinic이 담당한다.
// 의료 광고 특성상 효능·결과·환자 유치 보장 표현을 쓰지 않는다.
const PATH = "/taiwan-marketing/medical";
const DESCRIPTION =
  "한국 병원·의료기관의 대만 시장 마케팅을 지원합니다. 대만 KOL·KOC, Instagram, Threads, Dcard 등 채널을 조합해 현지 고객 접점을 설계합니다.";

export const metadata: Metadata = {
  title: { absolute: "대만 병원 마케팅 | 대만 환자 대상 의료 마케팅 — 티엔샤" },
  description: DESCRIPTION,
  keywords: [
    "대만 병원 마케팅", "대만 의료 마케팅", "대만 환자 마케팅", "대만 의료관광 마케팅",
    "대만 병원 광고", "대만인 환자 유치",
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 병원 마케팅 — 티엔샤",
    description:
      "한국 의료기관을 찾는 대만 소비자의 정보 탐색 과정에 맞춰 KOL·KOC·SNS·커뮤니티를 연결합니다.",
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const touchpoints = [
  { title: "SNS 콘텐츠", desc: "Instagram 릴스나 Threads 글에서 한국 병원 방문 경험을 처음 접하게 됩니다." },
  { title: "커뮤니티 후기", desc: "Dcard 같은 커뮤니티에서 병원 이름이나 진료 분야를 검색해 다른 사람의 경험을 찾아볼 수 있습니다." },
  { title: "병원 채널", desc: "병원의 공식 계정, 웹사이트, 상담 창구에서 진료 정보와 예약 방법을 확인합니다." },
  { title: "상담과 예약", desc: "언어 지원과 예약·상담 방식이 준비되어 있어야 앞 단계에서 생긴 관심이 실제 문의로 이어집니다." },
];

const channels = [
  { title: "Instagram / KOL", desc: "병원과 진료 분야를 넓게 알리는 역할. 병원의 분위기와 방문 과정을 영상으로 보여 줍니다.", href: "/kol-marketing" },
  { title: "KOC 방문 콘텐츠", desc: "여러 KOC가 실제 방문 경험을 각자의 시선으로 남겨, 검색했을 때 참고할 콘텐츠를 만듭니다.", href: "/taiwan-marketing/koc" },
  { title: "Threads", desc: "짧은 경험 공유와 댓글 대화로 병원 이야기가 자연스럽게 오가게 합니다.", href: "/taiwan-marketing/threads" },
  { title: "Dcard", desc: "정보를 찾는 이용자가 검색하는 커뮤니티. 남은 글이 캠페인 이후에도 검색됩니다.", href: "/taiwan-marketing/dcard" },
  { title: "검색 자산", desc: "번체 콘텐츠와 병원 채널의 정보가 쌓여 있어야 관심을 가진 사람이 다음 정보를 찾을 수 있습니다." },
];

const process = [
  { eyebrow: "01", title: "병원·진료 분야·타깃 확인", desc: "진료 분야, 위치, 언어 지원, 대상으로 하는 대만 소비자를 정리합니다." },
  { eyebrow: "02", title: "표현 가능 범위 확인", desc: "캠페인 전에 의료광고 관련 규정과 플랫폼 정책을 기준으로 쓸 수 있는 표현과 없는 표현을 정리합니다." },
  { eyebrow: "03", title: "채널 전략", desc: "목표에 맞춰 KOL, KOC, Threads, Dcard의 비중과 순서를 정합니다." },
  { eyebrow: "04", title: "KOL·KOC 모집·섭외", desc: "병원과 진료 분야에 맞는 크리에이터를 모집하고 방문 일정을 조율합니다." },
  { eyebrow: "05", title: "콘텐츠 가이드", desc: "전달할 정보와 피해야 할 표현, 협찬 표기 방법을 번체 가이드로 전달합니다." },
  { eyebrow: "06", title: "발행·반응 확인", desc: "발행 내용을 확인하고 댓글과 문의 반응을 살핍니다." },
  { eyebrow: "07", title: "결과 정리", desc: "콘텐츠별 반응과 문의 경로를 정리해 다음 캠페인 설계에 반영합니다." },
];

const checks = [
  { title: "결과를 보장하는 표현", desc: "시술·치료 결과를 확정적으로 약속하거나 과장하는 표현은 쓰지 않습니다." },
  { title: "전후 사진과 의료광고 규정", desc: "전후 사진, 체험기 형식의 콘텐츠는 관련 의료광고 규정을 캠페인 실행 전에 확인해야 합니다." },
  { title: "플랫폼 정책", desc: "Instagram, Threads, Dcard는 의료·건강 관련 콘텐츠와 협찬에 대한 정책이 각각 있어 채널별로 확인합니다." },
  { title: "협찬·광고 표기", desc: "크리에이터가 병원에서 서비스를 제공받았다면 그 사실을 콘텐츠에 표기합니다." },
  { title: "개인정보 보호", desc: "방문자와 다른 환자의 개인정보가 콘텐츠에 노출되지 않도록 촬영 범위를 정합니다." },
  { title: "실제 조건과 표현의 일치", desc: "콘텐츠에 소개되는 서비스와 조건이 실제로 제공되는 내용과 같아야 합니다." },
];

const faq = [
  { q: "피부과·성형외과 외 병원도 가능한가요?", a: "가능합니다. 한의원, 치과, 검진센터 등 진료 분야에 따라 적합한 채널과 콘텐츠 형식이 달라지므로, 분야와 조건을 확인한 뒤 진행 가능 범위를 안내드립니다. 피부과·성형외과는 별도 페이지에서 자세히 다룹니다." },
  { q: "대만 KOC 방문 체험도 가능한가요?", a: "가능합니다. 대만 KOC가 병원을 직접 방문해 상담·진료 과정을 경험하고 콘텐츠로 남기는 방문형 캠페인을 진행합니다. 방문 일정과 현장 응대, 촬영 범위를 사전에 병원과 조율합니다." },
  { q: "KOL과 KOC 중 어떤 방식이 적합한가요?", a: "병원을 넓게 알리는 것이 목표라면 KOL, 검색했을 때 참고할 방문 경험을 쌓는 것이 목표라면 KOC가 맞습니다. 두 방식을 같은 시기에 함께 운영하기도 합니다." },
  { q: "Dcard와 Threads도 함께 진행할 수 있나요?", a: "가능합니다. Threads에서는 짧은 경험 공유와 대화를, Dcard에서는 검색되는 후기를 만드는 방식으로 역할을 나눠 운영합니다." },
  { q: "예약/상담 시스템도 확인해야 하나요?", a: "확인하는 편이 좋습니다. 콘텐츠로 관심이 생겨도 번체·중국어 상담 창구나 예약 방법이 준비되어 있지 않으면 문의로 이어지기 어렵습니다. 캠페인 전에 언어 지원과 예약 동선을 함께 점검합니다." },
  { q: "비용은 어떻게 산정되나요?", a: "진료 분야, 참여 크리에이터의 규모와 인원, 방문형 여부, 콘텐츠 형식, 사용 채널, 캠페인 기간에 따라 달라집니다. 병원의 조건을 확인한 뒤 맞춤 실행안과 견적을 안내드립니다." },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 병원 마케팅",
  description: DESCRIPTION,
  services: [
    { name: "대만 병원 마케팅", description: "한국 병원·의료기관을 대상으로 대만 KOL·KOC, Instagram, Threads, Dcard를 조합해 대만 소비자 접점을 설계합니다." },
    { name: "대만 KOC 병원 방문 캠페인", description: "대만 KOC가 병원을 방문해 상담·진료 경험을 콘텐츠로 남기도록 일정 조율과 가이드 전달을 진행합니다." },
  ],
  faq,
  parent: { path: "/taiwan-marketing", name: "대만 마케팅" },
});

export default function MedicalMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          backHref="/taiwan-marketing"
          backLabel="← 대만 마케팅"
          eyebrow="Taiwan Medical Marketing"
          title="대만 병원 마케팅"
          lead="한국 의료기관을 찾는 대만 소비자의 정보 탐색 과정에 맞춰 KOL·KOC·SNS·커뮤니티를 연결합니다."
          tags={["KOL·KOC", "방문형 캠페인", "Threads·Dcard", "번체 콘텐츠"]}
          primaryCta="병원 마케팅 상담하기"
          secondaryCta={{ label: "진행 방식 확인하기", href: "#process" }}
        />

        <Section title="대만 병원 마케팅이란">
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            대만 병원 마케팅은 한국 병원·의료기관이 대만 소비자에게 알려지고, 관심을 가진 사람이 필요한 정보를
            찾아 상담까지 이어질 수 있도록 채널과 콘텐츠를 설계하는 일입니다. 티엔샤는 대만 KOL·KOC, Instagram,
            Threads, Dcard를 병원의 진료 분야와 조건에 맞게 조합합니다.
          </p>
        </Section>

        <Section
          title="대만 소비자는 한국 병원을 어떻게 알아보는가"
          lead="대만 소비자가 한국 병원 정보를 접하는 경로는 여러 갈래입니다. 각 단계에서 필요한 정보가 준비되어 있어야 관심이 다음 단계로 이어집니다."
        >
          <CardGrid items={touchpoints} />
        </Section>

        <Section title="병원 마케팅에서 채널별 역할">
          <CardGrid items={channels} />
        </Section>

        <Section id="process" title="티엔샤 병원 마케팅 진행 방식">
          <CardGrid items={process} />
        </Section>

        <Section title="방문형 KOC 캠페인">
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            병원은 직접 방문해 본 사람의 이야기가 중요한 분야입니다. 대만 KOC가 상담 과정, 통역, 대기, 공간
            분위기처럼 방문해야 알 수 있는 정보를 각자의 시선으로 남기도록 설계합니다. KOC 모집과 선정 기준은{" "}
            <Link href="/taiwan-marketing/koc" className="text-red-400 hover:underline underline-offset-4">
              대만 KOC 마케팅
            </Link>
            에서 볼 수 있습니다.
          </p>
        </Section>

        <InlineCta
          text="진료 분야와 대상 고객을 알려주시면 어떤 채널부터 시작할지 함께 정리해 드립니다."
          label="병원 마케팅 상담"
        />

        <Section
          title="의료 콘텐츠에서 특히 확인해야 하는 것"
          lead="의료 분야는 표현과 형식에 제약이 많습니다. 아래 항목은 캠페인 실행 전에 관련 규정과 플랫폼 정책을 기준으로 확인이 필요한 부분입니다."
        >
          <CardGrid items={checks} />
        </Section>

        <Section title="병원별로 채널 전략이 달라지는 이유">
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            같은 병원 마케팅이라도 진료 분야, 병원의 위치, 통역과 예약 체계, 대상으로 하는 연령대와 방문 목적에
            따라 맞는 채널과 콘텐츠가 다릅니다. 짧은 방문으로 경험을 보여 주기 좋은 분야가 있고, 상담 과정을 차분히
            설명해야 하는 분야가 있습니다. 피부과·성형외과는{" "}
            <Link href="/taiwan-marketing/clinic" className="text-red-400 hover:underline underline-offset-4">
              대만 피부과·성형외과 마케팅
            </Link>{" "}
            페이지에서 따로 다룹니다.
          </p>
        </Section>

        <FaqSection items={faq} title="대만 병원 마케팅 자주 묻는 질문" />

        <RelatedInsights
          slugs={["taiwan-hospital-marketing-guide", "taiwan-kol-vs-koc", "taiwan-marketing-cost-guide"]}
        />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="병원의 진료 분야와 대만 타깃을 알려주세요"
          desc="병원별 조건을 확인한 뒤 어떤 채널과 콘텐츠 구조가 적합한지 제안드립니다."
          label="대만 병원 마케팅 상담"
        />

      </div>
    </main>
  );
}

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

// Primary intent: 피부과·성형외과(클리닉) 특화. 병원 전반은 /taiwan-marketing/medical.
// 시술 결과·효과 보장, 과장 표현을 쓰지 않는다.
const PATH = "/taiwan-marketing/clinic";
const DESCRIPTION =
  "대만 소비자를 대상으로 한국 피부과·성형외과 마케팅을 진행합니다. KOL, 방문형 KOC, Threads, Dcard를 브랜드와 시술 특성에 맞게 조합합니다.";

export const metadata: Metadata = {
  title: { absolute: "대만 피부과·성형외과 마케팅 | KOL·KOC·Threads — 티엔샤" },
  description: DESCRIPTION,
  keywords: [
    "대만 피부과 마케팅", "대만 성형외과 마케팅", "대만 피부과 광고", "대만 성형외과 광고",
    "대만 피부과 KOC", "대만 피부과 인플루언서", "대만인 피부과 마케팅",
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 피부과·성형외과 마케팅 — 티엔샤",
    description:
      "방한 전 검색부터 실제 방문 경험 콘텐츠까지, 대만 소비자의 병원 선택 과정에 필요한 접점을 설계합니다.",
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const info = [
  { title: "위치와 동선", desc: "숙소나 여행 동선에서 얼마나 가까운지, 찾아가기 쉬운지." },
  { title: "상담과 언어", desc: "중국어 상담이나 통역이 가능한지, 상담이 어떤 순서로 진행되는지." },
  { title: "시술 정보", desc: "어떤 시술을 다루는지, 과정과 회복에 대해 무엇을 알아 두어야 하는지." },
  { title: "방문 경험", desc: "대기, 공간 분위기, 응대 방식처럼 방문해 본 사람이 전할 수 있는 정보." },
  { title: "실제 콘텐츠", desc: "병원이 직접 만든 소개보다 다른 사람이 남긴 방문 콘텐츠." },
  { title: "예약 방식", desc: "어떤 채널로, 어떤 언어로, 얼마나 쉽게 예약할 수 있는지." },
];

const roles = [
  { title: "KOL — 인지도와 도달", desc: "많은 팔로워에게 클리닉과 방문 과정을 알립니다. 클리닉 이름을 처음 접하게 만드는 역할입니다.", href: "/kol-marketing" },
  { title: "KOC — 다양한 실제 경험", desc: "여러 KOC가 각자의 방문 경험을 남겨, 검색했을 때 여러 시선의 콘텐츠를 볼 수 있게 합니다.", href: "/taiwan-marketing/koc" },
];

const channelRoles = [
  { title: "Threads", desc: "방문 후기를 짧게 공유하고 댓글로 질문과 답이 오가는 채널입니다.", href: "/taiwan-marketing/threads" },
  { title: "Dcard", desc: "클리닉이나 시술 이름을 검색했을 때 보이는 커뮤니티 후기를 남기는 채널입니다.", href: "/taiwan-marketing/dcard" },
];

const process = [
  { eyebrow: "01", title: "진료과·시술 확인", desc: "캠페인에서 소개할 진료 분야와 시술, 표현 가능 범위를 정리합니다." },
  { eyebrow: "02", title: "타깃 설정", desc: "대상으로 하는 연령대, 방한 목적, 관심 시술을 정합니다." },
  { eyebrow: "03", title: "크리에이터 구성", desc: "KOL과 KOC의 구성과 인원을 정하고 모집·섭외를 진행합니다." },
  { eyebrow: "04", title: "예약·방문 조율", desc: "크리에이터별 방문 일정과 현장 응대, 촬영 범위를 클리닉과 맞춥니다." },
  { eyebrow: "05", title: "콘텐츠", desc: "전달할 정보와 피해야 할 표현, 협찬 표기를 번체 가이드로 전달합니다." },
  { eyebrow: "06", title: "발행", desc: "Reels, Threads, Dcard 등 채널별 발행 일정을 맞춥니다." },
  { eyebrow: "07", title: "결과 정리", desc: "콘텐츠별 반응과 문의 경로를 정리해 다음 캠페인에 반영합니다." },
];

const quality = [
  { title: "브랜드 핏", desc: "평소 콘텐츠의 분위기가 클리닉이 전하려는 인상과 맞는지." },
  { title: "활동성", desc: "최근까지 꾸준히 게시하고, 팔로워와 대화가 오가는 계정인지." },
  { title: "방문 가능 일정", desc: "캠페인 기간 안에 실제로 방문할 수 있는지." },
  { title: "콘텐츠 품질", desc: "사진·영상의 완성도와 설명의 충실도." },
  { title: "가이드 이행 가능성", desc: "표현 제한과 협찬 표기 같은 필수 사항을 지킬 수 있는지." },
  { title: "채널 조합", desc: "Instagram, Threads, Dcard 중 어느 채널에 강한 계정인지와 전체 구성의 균형." },
];

const faq = [
  { q: "대만인 방문형 체험단을 모집할 수 있나요?", a: "가능합니다. 대만 KOC·KOL이 클리닉을 직접 방문해 상담과 시술 과정을 경험하고 콘텐츠로 남기는 방문형 캠페인을 진행합니다. 방문 일정과 촬영 범위는 클리닉과 사전에 조율합니다." },
  { q: "한국에 이미 체류 중인 대만 KOC도 가능한가요?", a: "조건에 맞는 계정이라면 함께 검토합니다. 체류 기간과 방문 가능 일정, 팔로워 중 대만 거주자의 비중 등을 확인해 캠페인 목적에 맞는지 판단합니다." },
  { q: "팔로워가 적은 KOC도 활용하나요?", a: "활용합니다. KOC는 팔로워 수보다 최근 활동, 콘텐츠 품질, 클리닉과의 적합성을 기준으로 선정합니다. 여러 KOC의 방문 경험이 모이면 검색했을 때 참고할 콘텐츠가 됩니다." },
  { q: "Reels와 Threads를 함께 진행할 수 있나요?", a: "가능합니다. 같은 크리에이터가 Instagram Reels로 방문 과정을 보여 주고 Threads에 짧은 후기를 남기는 방식으로 함께 운영할 수 있습니다." },
  { q: "Dcard도 병행할 수 있나요?", a: "가능합니다. Dcard는 클리닉이나 시술 이름을 검색했을 때 보이는 후기를 남기는 역할을 합니다. 커뮤니티 규칙과 플랫폼 정책을 확인한 뒤 진행합니다." },
  { q: "정확한 비용은 어떻게 확인하나요?", a: "클리닉의 시술 분야, 모집 인원, 콘텐츠 형식, 캠페인 기간 등에 따라 달라지므로 고정 금액을 공개하지 않습니다. 상담 시 조건을 확인한 뒤 맞춤 견적을 안내드립니다." },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 피부과·성형외과 마케팅",
  description: DESCRIPTION,
  services: [
    { name: "대만 피부과·성형외과 마케팅", description: "한국 피부과·성형외과를 대상으로 대만 KOL, 방문형 KOC, Threads, Dcard를 시술 특성에 맞게 조합합니다." },
    { name: "대만 KOC 클리닉 방문 캠페인", description: "대만 KOC가 클리닉을 방문해 상담·시술 경험을 콘텐츠로 남기도록 일정 조율과 가이드 전달을 진행합니다." },
  ],
  faq,
  parent: { path: "/taiwan-marketing", name: "대만 마케팅" },
});

export default function ClinicMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          backHref="/taiwan-marketing"
          backLabel="← 대만 마케팅"
          eyebrow="Taiwan Clinic Marketing"
          title="대만 피부과·성형외과 마케팅"
          lead="방한 전 검색부터 실제 방문 경험 콘텐츠까지, 대만 소비자의 병원 선택 과정에 필요한 접점을 설계합니다."
          tags={["KOL", "방문형 KOC", "Reels·Threads", "Dcard"]}
          primaryCta="클리닉 마케팅 상담하기"
          secondaryCta={{ label: "진행 방식 확인하기", href: "#process" }}
        />

        <Section title="대만 피부과·성형외과 마케팅이란">
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            대만 피부과·성형외과 마케팅은 한국 클리닉을 알아보는 대만 소비자가 필요한 정보와 실제 방문 경험을
            찾을 수 있도록 KOL, 방문형 KOC, Threads, Dcard를 조합해 설계하는 일입니다. 티엔샤는 클리닉의 진료
            분야와 시술 특성에 맞춰 채널과 크리에이터 구성을 정합니다.
          </p>
        </Section>

        <Section
          title="대만 고객이 한국 클리닉을 선택할 때 필요한 정보"
          lead="가격만으로 클리닉을 고르기는 어렵습니다. 신뢰를 만드는 정보가 여러 채널에 준비되어 있어야 합니다."
        >
          <CardGrid items={info} columns={3} />
        </Section>

        <Section title="클리닉 마케팅에서 KOC가 중요한 이유">
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            클리닉은 방문해 본 사람만 전할 수 있는 정보가 많은 분야입니다. 상담이 어떻게 진행됐는지, 통역은
            편했는지, 공간과 응대는 어땠는지 같은 이야기는 클리닉의 공식 소개보다 방문자의 콘텐츠에서 더 잘
            전달됩니다. 여러 KOC가 각자의 경험을 남기면 하나의 광고보다 다양한 시선의 콘텐츠가 쌓입니다.
          </p>
        </Section>

        <Section title="KOL과 KOC의 역할">
          <CardGrid items={roles} />
        </Section>

        <Section title="Threads와 Dcard의 역할">
          <CardGrid items={channelRoles} />
        </Section>

        <Section id="process" title="캠페인 진행 방식">
          <CardGrid items={process} />
        </Section>

        <InlineCta
          text="시술 분야와 대상 고객을 알려주시면 KOL·KOC 구성과 채널 조합을 먼저 정리해 드립니다."
          label="클리닉 마케팅 상담"
        />

        <Section
          title="단순 체험단 수량보다 중요한 것"
          lead="인원을 늘리는 것보다 어떤 계정이 어떤 콘텐츠를 남기는지가 결과를 좌우합니다."
        >
          <CardGrid items={quality} columns={3} />
        </Section>

        <Section title="광고·의료 표현 유의사항">
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed max-w-2xl">
            <p>
              시술 결과를 확정적으로 약속하거나 과장하는 표현, 효과를 보장하는 문구는 쓰지 않습니다. 전후 사진,
              체험기 형식, 할인·이벤트 안내처럼 제약이 있는 형식은 캠페인 실행 전에 관련 의료광고 규정과 플랫폼
              정책을 확인한 뒤 진행합니다. 크리에이터가 서비스를 제공받았다면 협찬 사실을 표기합니다.
            </p>
            <p>
              병원 마케팅 전반의 확인 항목은{" "}
              <Link href="/taiwan-marketing/medical" className="text-red-400 hover:underline underline-offset-4">
                대만 병원 마케팅
              </Link>
              에서 볼 수 있습니다.
            </p>
          </div>
        </Section>

        <FaqSection items={faq} title="대만 피부과·성형외과 마케팅 자주 묻는 질문" />

        <RelatedInsights
          slugs={["taiwan-hospital-marketing-guide", "taiwan-koc-marketing-guide", "taiwan-kol-vs-koc"]}
        />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="대만 고객 대상 클리닉 캠페인을 설계해보세요"
          desc="클리닉의 진료 분야와 대상 고객을 알려주시면 어떤 크리에이터 구성과 채널 조합이 맞는지 제안드립니다."
          label="상담 문의"
        />

      </div>
    </main>
  );
}

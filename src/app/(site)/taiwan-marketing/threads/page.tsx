import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import RelatedPages from "@/components/landing/RelatedPages";
import ContactCta from "@/components/landing/ContactCta";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

const PATH = "/taiwan-marketing/threads";
const DESCRIPTION =
  "대만 쓰레드(Threads) 마케팅 전문 티엔샤. 대만은 Threads 이용이 특히 활발한 시장입니다. 브랜드 계정 운영, KOL·KOC 쓰레드 포스팅, 트렌드 대응까지 대만 스레드 마케팅을 현지 화법으로 진행합니다.";

export const metadata: Metadata = {
  title: { absolute: "대만 쓰레드 마케팅 | 대만 Threads(스레드) 바이럴·계정 운영 — 티엔샤" },
  description: DESCRIPTION,
  keywords: [
    "대만 쓰레드 마케팅", "대만 스레드 마케팅", "대만 Threads 마케팅", "Threads 마케팅",
    "쓰레드 마케팅", "대만 SNS 마케팅", "대만 바이럴 마케팅", "대만 마케팅",
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 쓰레드(Threads) 마케팅 — 티엔샤",
    description:
      "대만에서 빠르게 퍼지는 텍스트 SNS, Threads. 브랜드 계정 운영과 KOL·KOC 포스팅으로 초기 인지를 만듭니다.",
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const why = [
  {
    title: "짧은 글이 빠르게 퍼진다",
    desc: "Threads는 짧은 문장과 이미지 몇 장으로 구성된 게시글이 알고리즘을 타고 팔로워 밖으로 확산되는 구조입니다. 영상 제작 없이도 초기 브랜드 인지를 빠르게 만들 수 있습니다.",
  },
  {
    title: "대만은 Threads가 활발한 시장",
    desc: "대만은 Threads 이용이 특히 활발한 시장으로 꼽힙니다. 대만 젊은 층 사이에서는 '脆(추이)'라는 애칭으로 불릴 만큼 일상적인 채널이 되었고, 트렌드와 화제가 가장 먼저 도는 곳 중 하나입니다.",
  },
  {
    title: "대화형 톤이 통하는 채널",
    desc: "광고처럼 다듬어진 문장보다 친구에게 말하듯 쓴 글이 반응을 얻습니다. 댓글과 인용으로 대화가 이어질수록 노출이 커지기 때문에, 브랜드도 사람처럼 말하는 방식이 필요합니다.",
  },
  {
    title: "Instagram과 자연스럽게 연결",
    desc: "Threads는 Instagram 계정으로 시작하는 서비스라 KOL과 KOC가 기존 팔로워를 기반으로 바로 발행할 수 있습니다. Instagram 릴스 캠페인과 함께 설계하면 같은 메시지가 두 채널에서 동시에 퍼집니다.",
  },
];

const how = [
  {
    eyebrow: "01",
    title: "브랜드 톤 설계",
    desc: "대만 쓰레드 사용자가 쓰는 구어체와 유행어를 기준으로 브랜드가 말하는 방식을 정합니다. 번체자와 대만식 표현으로 쓰는 것이 기본입니다.",
  },
  {
    eyebrow: "02",
    title: "브랜드 계정 운영",
    desc: "주기적인 게시글 발행, 댓글 대화, 트렌드 참여로 브랜드 Threads 계정을 키웁니다. 판매 공지보다 대화가 이어지는 글의 비중을 높게 가져갑니다.",
  },
  {
    eyebrow: "03",
    title: "KOL·KOC 쓰레드 포스팅",
    desc: "브랜드 계정만으로는 도달이 느리기 때문에, 카테고리에 맞는 대만 KOL·KOC가 자신의 Threads에 사용 경험을 올리도록 캠페인을 설계합니다.",
  },
  {
    eyebrow: "04",
    title: "트렌드·화제 대응",
    desc: "대만 Threads에서 도는 밈과 화제에 브랜드가 자연스럽게 참여할 수 있는 지점을 찾습니다. 확산 속도가 빠른 채널이라 대응 속도가 성과를 좌우합니다.",
  },
  {
    eyebrow: "05",
    title: "반응 분석과 확장",
    desc: "조회·댓글·인용·팔로워 증가를 보고 반응이 좋은 주제와 형식을 추립니다. 잘된 메시지는 Instagram, Dcard 콘텐츠로 확장해 재활용합니다.",
  },
];

const cautions = [
  {
    title: "광고 톤은 바로 티가 난다",
    desc: "홍보 문구를 그대로 올린 글은 반응이 거의 없거나 비판 댓글로 이어집니다. 제품 이야기보다 사용자가 공감할 경험과 관점을 먼저 꺼내야 합니다.",
  },
  {
    title: "민감한 이슈와는 거리를 둔다",
    desc: "확산이 빠른 만큼 논란도 빠르게 번집니다. 정치·양안 관계처럼 민감한 주제나 대만과 중국을 혼동하는 표현은 브랜드에 큰 부담이 되므로 발행 전에 현지 검수를 거칩니다.",
  },
  {
    title: "협찬은 밝힌다",
    desc: "KOL·KOC 포스팅이 협찬이라면 그 사실을 표기합니다. 대만 소비자는 숨긴 광고에 민감하고, 표기한 뒤에도 솔직한 경험을 담은 글이 더 오래 신뢰를 얻습니다.",
  },
  {
    title: "한 번에 끝나는 채널이 아니다",
    desc: "Threads는 꾸준히 대화한 계정이 커지는 구조입니다. 단발 캠페인보다 최소 몇 달 단위로 운영할 때 브랜드 계정이 자산으로 남습니다.",
  },
];

const faq = [
  {
    q: "쓰레드와 스레드, Threads는 같은 서비스인가요?",
    a: "네, 같은 서비스입니다. Meta가 만든 텍스트 기반 SNS인 Threads를 한국에서는 '스레드' 또는 '쓰레드'로 부르고, 대만에서는 '脆(추이)'라는 애칭으로도 부릅니다. 티엔샤의 대만 쓰레드 마케팅은 대만 사용자를 대상으로 한 Threads 캠페인과 계정 운영을 말합니다.",
  },
  {
    q: "대만 Threads 마케팅은 어떤 브랜드에 적합한가요?",
    a: "대화와 공감으로 풀 수 있는 이야기가 있는 브랜드에 잘 맞습니다. 뷰티·F&B처럼 사용 경험을 짧게 공유하기 좋은 카테고리, 신제품 출시처럼 초기 인지가 급한 상황에서 효과적입니다. 긴 설명이 필요한 제품은 Dcard나 KOL 영상과 함께 쓰는 편이 좋습니다.",
  },
  {
    q: "브랜드 계정이 없어도 진행할 수 있나요?",
    a: "가능합니다. 브랜드 계정 없이 대만 KOL·KOC의 Threads 포스팅만으로 캠페인을 진행할 수 있습니다. 다만 장기적으로 대만 고객과 직접 대화할 창구가 필요하다면 브랜드 계정 개설과 운영을 함께 권해 드립니다.",
  },
  {
    q: "Instagram 마케팅과 함께 해야 하나요?",
    a: "함께할 때 효과가 큽니다. Threads는 Instagram 계정으로 운영되기 때문에 같은 KOL이 릴스와 Threads 글을 동시에 발행할 수 있고, 한쪽에서 생긴 관심이 다른 쪽으로 이어집니다.",
  },
  {
    q: "한국어로 쓴 글을 번역해서 올려도 되나요?",
    a: "권하지 않습니다. Threads는 구어체와 유행어가 반응을 좌우하는 채널이라 직역한 문장은 바로 어색하게 읽힙니다. 메시지는 유지하되 대만 사용자가 쓰는 말투로 새로 씁니다.",
  },
  {
    q: "성과는 어떻게 확인하나요?",
    a: "게시글 조회, 댓글·인용·리포스트 수, 브랜드 계정 팔로워 증가, 프로필 링크 클릭을 기본으로 보고, 쇼피 등 판매 채널 유입 변화를 함께 확인해 리포트로 전달합니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 쓰레드 마케팅",
  description: DESCRIPTION,
  services: [
    {
      name: "대만 Threads 브랜드 계정 운영",
      description: "번체자·대만식 구어체로 브랜드 Threads 계정을 운영하고 댓글 대화와 트렌드 참여로 계정을 키웁니다.",
    },
    {
      name: "대만 KOL·KOC 쓰레드 포스팅",
      description: "카테고리에 맞는 대만 KOL·KOC가 Threads에 사용 경험을 발행하도록 캠페인을 설계하고 운영합니다.",
    },
  ],
  faq,
  parent: { path: "/taiwan-marketing", name: "대만 마케팅" },
});

export default function ThreadsMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          backHref="/taiwan-marketing"
          backLabel="← 대만 마케팅"
          eyebrow="Threads Marketing"
          title="대만 쓰레드 마케팅"
          titleAccent="Threads 바이럴 · 계정 운영"
          lead="Threads(쓰레드·스레드)는 대만에서 트렌드가 가장 빠르게 도는 텍스트 SNS입니다. 티엔샤는 브랜드 계정 운영, 대만 KOL·KOC 쓰레드 포스팅, 트렌드 대응까지 대만 사용자의 화법으로 대만 쓰레드 마케팅을 진행합니다."
          tags={["브랜드 계정 운영", "KOL·KOC 포스팅", "트렌드 대응", "번체 구어체"]}
        />

        <Section
          title="왜 대만 쓰레드 마케팅인가"
          lead="대만 마케팅에서 Threads는 초기 인지를 가장 적은 제작 비용으로 만들 수 있는 채널입니다."
        >
          <CardGrid items={why} />
        </Section>

        <Section
          title="대만 Threads 마케팅 진행 방식"
          lead="게시글 몇 개를 올리는 일이 아니라, 브랜드가 대만 사용자와 대화하는 방식을 만드는 과정입니다."
        >
          <CardGrid items={how} />
        </Section>

        <Section
          title="대만 스레드 마케팅, 진행 전에 알아두실 점"
          lead="확산이 빠른 채널은 실수도 빠르게 퍼집니다."
        >
          <CardGrid items={cautions} />
        </Section>

        <FaqSection items={faq} title="대만 쓰레드 마케팅 자주 묻는 질문" />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="대만 Threads에서 브랜드가 대화하게 만드세요"
          desc="제품과 목표를 알려주시면 브랜드 계정 운영과 KOL·KOC 포스팅 중 어떤 조합이 맞는지 제안드립니다."
        />

      </div>
    </main>
  );
}

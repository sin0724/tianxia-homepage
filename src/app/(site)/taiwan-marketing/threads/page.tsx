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

const PATH = "/taiwan-marketing/threads";
const DESCRIPTION =
  "대만 Threads에서 현지 이용자와 KOC 기반의 콘텐츠 확산을 설계합니다. 주제 선정, 콘텐츠 기획, 발행, 반응 분석까지 티엔샤가 운영합니다.";

export const metadata: Metadata = {
  title: { absolute: "대만 Threads 마케팅 | 스레드 바이럴·KOC — 티엔샤" },
  description: DESCRIPTION,
  keywords: [
    "대만 Threads 마케팅", "대만 스레드 마케팅", "대만 쓰레드 마케팅", "대만 Threads 바이럴",
    "대만 스레드 바이럴", "대만 SNS 마케팅", "대만 KOC Threads",
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 Threads 마케팅 — 티엔샤",
    description:
      "빠르게 소비되고 확산되는 대만 Threads의 문법에 맞춰 브랜드가 자연스럽게 발견되는 흐름을 만듭니다.",
    url: `${BASE_URL}${PATH}`,
    type: "website",
  },
};

const uses = [
  {
    title: "짧은 글로 대화를 시작한다",
    desc: "Threads는 짧은 문장과 이미지 몇 장으로 구성된 글이 댓글과 인용으로 이어지며 팔로워 밖으로 퍼지는 구조입니다. 영상을 만들지 않아도 브랜드 이야기를 시작할 수 있습니다.",
  },
  {
    title: "현지 이용자의 말투로 쓴다",
    desc: "대만 이용자들은 Threads를 '脆(추이)'라는 애칭으로 부를 만큼 일상적으로 씁니다. 번체자와 대만식 구어체로 쓰는 것이 기본입니다.",
  },
  {
    title: "KOL·KOC 계정으로 넓힌다",
    desc: "브랜드 계정만으로는 도달이 느립니다. 카테고리에 맞는 대만 KOL·KOC가 자신의 Threads에 경험을 올리도록 설계해 여러 계정에서 동시에 이야기가 시작되게 합니다.",
  },
  {
    title: "반응을 보고 다음 글을 정한다",
    desc: "댓글과 인용에서 나온 질문과 반응을 다음 콘텐츠 주제로 삼습니다. 반응이 좋았던 메시지는 Instagram, Dcard 콘텐츠로 확장합니다.",
  },
];

const roles = [
  {
    title: "Instagram — 비주얼과 계정 자산",
    desc: "릴스와 피드로 제품과 브랜드의 모습을 보여 주고, 프로필과 하이라이트에 정보를 쌓아 두는 채널입니다.",
  },
  {
    title: "Threads — 대화와 실시간 반응",
    desc: "짧은 글과 댓글로 이야기가 오가고, 화제가 빠르게 공유되는 채널입니다. 두 채널은 같은 계정으로 이어져 있어 함께 설계하기 좋습니다.",
  },
];

const notAds = [
  {
    title: "홍보 문구는 바로 티가 난다",
    desc: "광고 문구를 그대로 올린 글은 반응이 없거나 비판 댓글로 이어지기 쉽습니다. 제품 이야기보다 이용자가 공감할 경험과 관점을 먼저 꺼냅니다.",
  },
  {
    title: "문맥이 자연스러워야 한다",
    desc: "지금 대만 Threads에서 오가는 화제와 말투에 맞지 않는 글은 어색하게 읽힙니다. 직역한 문장 대신 현지 화법으로 새로 씁니다.",
  },
  {
    title: "민감한 이슈와는 거리를 둔다",
    desc: "정치·양안 관계처럼 민감한 주제나 대만과 중국을 혼동하는 표현은 브랜드에 큰 부담이 됩니다. 발행 전에 현지 검수를 거칩니다.",
  },
  {
    title: "협찬은 밝힌다",
    desc: "KOL·KOC 포스팅이 협찬이라면 그 사실을 표기합니다. 표기한 뒤에도 솔직한 경험을 담은 글이 더 오래 신뢰를 얻습니다.",
  },
];

const process = [
  { eyebrow: "01", title: "브랜드·제품 분석", desc: "제품의 강점과 대만 이용자에게 설명이 필요한 부분을 정리합니다." },
  { eyebrow: "02", title: "현지 화제·문맥 분석", desc: "대만 Threads에서 지금 오가는 주제와 말투를 보고 브랜드가 들어갈 지점을 찾습니다." },
  { eyebrow: "03", title: "계정·참여자 구성", desc: "브랜드 계정 운영 여부와 참여할 KOL·KOC 구성을 정합니다." },
  { eyebrow: "04", title: "원고·콘텐츠 설계", desc: "번체자와 대만식 구어체로 원고와 이미지 구성을 설계합니다." },
  { eyebrow: "05", title: "발행", desc: "계정별 발행 일정을 맞춰 이야기가 한 시기에 모이도록 합니다." },
  { eyebrow: "06", title: "댓글·반응 확인", desc: "댓글과 인용을 확인하고 필요한 경우 대화를 이어 갑니다." },
  { eyebrow: "07", title: "결과 정리·다음 콘텐츠 반영", desc: "조회, 댓글, 인용, 프로필 클릭을 정리하고 반응이 좋았던 주제를 다음 콘텐츠에 반영합니다." },
];

const faq = [
  {
    q: "대만 Threads 마케팅은 어떤 브랜드에 적합한가요?",
    a: "대화와 공감으로 풀 수 있는 이야기가 있는 브랜드에 잘 맞습니다. 뷰티·F&B처럼 사용 경험을 짧게 공유하기 좋은 카테고리나, 신제품 출시처럼 초기 인지가 필요한 상황에서 활용하기 좋습니다. 긴 설명이 필요한 제품은 Dcard나 KOL 영상과 함께 쓰는 편이 좋습니다.",
  },
  {
    q: "Threads와 Instagram 중 어디를 먼저 해야 하나요?",
    a: "목표에 따라 다릅니다. 제품을 보여 주는 콘텐츠와 계정 자산이 먼저 필요하면 Instagram, 대화와 화제를 먼저 만들고 싶다면 Threads가 출발점이 됩니다. 두 채널은 같은 계정으로 이어져 있어 함께 설계하기 좋습니다.",
  },
  {
    q: "대만 현지 계정으로 진행하나요?",
    a: "대만 이용자를 대상으로 번체자와 대만식 표현으로 진행합니다. 브랜드 계정 없이 대만 KOL·KOC의 Threads 포스팅만으로 진행할 수도 있고, 브랜드 계정 개설과 운영을 함께할 수도 있습니다.",
  },
  {
    q: "KOC와 함께 진행할 수 있나요?",
    a: "가능합니다. KOC가 자신의 Threads에 실제 경험을 올리면 브랜드 계정보다 자연스럽게 읽히고, 여러 계정에서 이야기가 동시에 시작됩니다.",
  },
  {
    q: "콘텐츠 작성도 티엔샤가 진행하나요?",
    a: "네. 브랜드 계정 원고와 KOL·KOC 가이드를 번체자·대만식 구어체로 작성하고, 발행 전에 현지 검수를 거칩니다.",
  },
  {
    q: "비용은 어떻게 정해지나요?",
    a: "브랜드 계정 운영 여부, 참여하는 KOL·KOC 규모와 인원, 콘텐츠 수, 운영 기간에 따라 달라집니다. 목표와 조건을 확인한 뒤 맞춤 실행안과 견적을 안내드립니다.",
  },
  {
    q: "쓰레드와 스레드, Threads는 같은 서비스인가요?",
    a: "네, 같은 서비스입니다. Meta가 만든 텍스트 기반 SNS인 Threads를 한국에서는 '스레드' 또는 '쓰레드'로 부르고, 대만에서는 '脆(추이)'라는 애칭으로도 부릅니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 Threads 마케팅",
  description: DESCRIPTION,
  services: [
    {
      name: "대만 Threads 브랜드 계정 운영",
      description: "번체자·대만식 구어체로 브랜드 Threads 계정을 운영하고 댓글 대화와 화제 참여로 계정을 키웁니다.",
    },
    {
      name: "대만 KOL·KOC Threads 포스팅",
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
          eyebrow="Taiwan Threads Marketing"
          title="대만 Threads 마케팅"
          lead="빠르게 소비되고 확산되는 대만 Threads의 문법에 맞춰 브랜드가 자연스럽게 발견되는 흐름을 만듭니다. 티엔샤는 대만 스레드(쓰레드) 마케팅을 주제 선정부터 발행, 반응 분석까지 대만 이용자의 화법으로 운영합니다."
          tags={["브랜드 계정 운영", "KOL·KOC 포스팅", "화제 대응", "번체 구어체"]}
          primaryCta="Threads 캠페인 상담하기"
          secondaryCta={{ label: "진행 방식 확인하기", href: "#process" }}
        />

        <Section title="대만에서 Threads를 마케팅에 활용하는 방법">
          <CardGrid items={uses} />
        </Section>

        <Section
          title="Threads와 Instagram의 역할 차이"
          lead="어느 한쪽이 더 낫다기보다 맡는 역할이 다릅니다."
        >
          <CardGrid items={roles} />
        </Section>

        <Section
          title="Threads에서 광고처럼 보이면 안 되는 이유"
          lead="대화가 중심인 채널이라, 광고처럼 읽히는 순간 대화가 끊깁니다."
        >
          <CardGrid items={notAds} />
        </Section>

        <Section id="process" title="티엔샤 Threads 마케팅 진행 방식">
          <CardGrid items={process} />
        </Section>

        <InlineCta
          text="브랜드 계정 운영과 KOL·KOC 포스팅 중 어떤 조합이 맞는지 먼저 확인해 보세요."
          label="Threads 캠페인 상담"
        />

        <Section title="KOC와 Threads를 함께 활용하는 방식">
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            KOC가 제품을 써 보거나 매장을 방문한 뒤 그 경험을 Threads에 짧게 남기면, 브랜드 계정의 글보다
            자연스럽게 읽히고 댓글에서 대화가 이어집니다. 같은 시기에 여러 KOC가 글을 올리도록 일정을 맞추면
            브랜드 이야기가 한 번에 여러 곳에서 보이게 됩니다. KOC 모집과 선정 기준은{" "}
            <Link href="/taiwan-marketing/koc" className="text-red-400 hover:underline underline-offset-4">
              대만 KOC 마케팅
            </Link>
            에서 볼 수 있습니다.
          </p>
        </Section>

        <Section title="Dcard와 Threads의 차이">
          <CardGrid
            items={[
              { title: "Threads — 빠른 확산과 대화", desc: "지금 오가는 화제 속에서 브랜드가 발견되고, 댓글과 인용으로 이야기가 퍼집니다." },
              { title: "Dcard — 검색과 커뮤니티 후기", desc: "구매 전에 정보를 찾는 이용자가 게시판을 검색하고 후기를 읽습니다. 남은 글이 오래 검색됩니다.", href: "/taiwan-marketing/dcard" },
            ]}
          />
        </Section>

        <FaqSection items={faq} title="대만 Threads 마케팅 자주 묻는 질문" />

        <RelatedInsights
          slugs={["taiwan-threads-marketing-guide", "taiwan-koc-marketing-guide", "dcard-reviews-as-assets"]}
        />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="대만 Threads에 맞는 캠페인 구조를 확인하세요"
          desc="제품과 목표를 알려주시면 브랜드 계정 운영과 KOL·KOC 포스팅 중 어떤 조합이 맞는지 제안드립니다."
          label="상담 문의"
        />

      </div>
    </main>
  );
}

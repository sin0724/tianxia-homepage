import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import RelatedPages from "@/components/landing/RelatedPages";
import ContactCta from "@/components/landing/ContactCta";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

const PATH = "/taiwan-marketing/dcard";

export const metadata: Metadata = {
  title: { absolute: "Dcard 마케팅 | 대만 최대 커뮤니티 바이럴 — 티엔샤" },
  description:
    "대만 최대 익명 커뮤니티 Dcard 마케팅 전문. 커뮤니티 특성에 맞는 시딩·리뷰·댓글 운영으로 구매 직전 단계의 신뢰를 만듭니다. 대만 마케팅 에이전시 티엔샤.",
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "Dcard 마케팅 — 대만 최대 커뮤니티 바이럴",
    description:
      "대만 2030이 구매 전에 검색하는 Dcard. 커뮤니티 문법에 맞는 시딩과 리뷰 설계로 신뢰를 만듭니다.",
    url: `${BASE_URL}${PATH}`,
  },
};

const why = [
  {
    title: "구매 직전에 들르는 채널",
    desc: "대만 소비자는 제품을 알게 된 뒤 구매를 결정하기 전에 Dcard에서 후기를 확인하는 경우가 많습니다. Instagram이 인지를 만든다면 Dcard는 그 인지를 검증하는 자리입니다. 여기서 아무 언급도 발견되지 않으면 구매가 멈춥니다.",
  },
  {
    title: "익명 기반의 솔직한 톤",
    desc: "실명 계정과 달리 이해관계가 드러나지 않기 때문에 이용자들이 후기를 더 신뢰합니다. 반대로 광고처럼 읽히는 글은 즉시 지적당하므로, 채널의 문법을 지키는 것이 무엇보다 중요합니다.",
  },
  {
    title: "검색에 남는 자산",
    desc: "Dcard 게시글은 대만에서 브랜드명을 검색했을 때 상위에 노출되는 경우가 많습니다. 한 번 쌓인 후기는 캠페인이 끝난 뒤에도 계속 유입을 만듭니다.",
  },
  {
    title: "카테고리별 게시판 구조",
    desc: "뷰티, 미용의료, 식품 등 주제별 게시판이 나뉘어 있어 타겟이 명확합니다. 관심 없는 이용자에게 낭비되는 노출이 적습니다.",
  },
];

const how = [
  {
    eyebrow: "01",
    title: "게시판·주제 선정",
    desc: "제품 카테고리에 맞는 게시판을 고르고, 해당 게시판에서 최근 반응이 좋았던 글의 형식을 분석합니다. 같은 내용이라도 어느 게시판에 올리느냐에 따라 반응 폭이 크게 달라집니다.",
  },
  {
    eyebrow: "02",
    title: "실사용 기반 후기 확보",
    desc: "제품을 실제로 사용한 이용자의 경험을 바탕으로 후기를 만듭니다. 사용해 보지 않은 사람이 쓴 글은 구체성이 없어 커뮤니티에서 금방 걸러집니다.",
  },
  {
    eyebrow: "03",
    title: "커뮤니티 문법에 맞춘 작성",
    desc: "제품 자랑이 아니라 고민과 해결 과정의 형식으로 씁니다. 장점만 나열된 글보다 아쉬운 점이 함께 있는 글이 더 신뢰를 얻고 반응도 좋습니다.",
  },
  {
    eyebrow: "04",
    title: "댓글 반응 관리",
    desc: "질문 댓글에 답이 달리지 않으면 게시글의 신뢰가 떨어집니다. 발행 이후 며칠간 댓글 흐름을 지켜보며 필요한 정보를 보완합니다.",
  },
  {
    eyebrow: "05",
    title: "반응 분석과 재활용",
    desc: "어떤 표현과 구성이 반응을 얻었는지 정리해 다음 게시글과 다른 채널 콘텐츠에 반영합니다. Dcard에서 검증된 메시지는 KOL 콘텐츠에서도 잘 작동합니다.",
  },
];

const cautions = [
  {
    title: "협찬은 표기해야 합니다",
    desc: "대만도 유상 협찬 콘텐츠에 대한 표기 의무가 강화되는 추세이며, 커뮤니티 이용자들도 미표기 광고에 민감합니다. 표기를 숨기려다 적발되면 브랜드 이미지에 오히려 손해가 큽니다. 티엔샤는 표기를 전제로 콘텐츠를 설계합니다.",
  },
  {
    title: "단기간 대량 게시는 역효과",
    desc: "짧은 기간에 비슷한 글이 여러 개 올라오면 이용자들이 먼저 알아챕니다. 게시 간격과 작성자 구성을 분산해 자연스러운 흐름을 유지해야 합니다.",
  },
  {
    title: "부정 반응도 자산입니다",
    desc: "아쉬운 점을 지적하는 댓글을 지우려 하기보다 성실하게 답하는 편이 결과적으로 신뢰를 높입니다. 실제 개선으로 이어지면 그 자체가 다음 콘텐츠의 소재가 됩니다.",
  },
  {
    title: "제품이 준비되지 않으면 미룹니다",
    desc: "품질이나 배송에 문제가 있는 상태에서 커뮤니티 노출을 늘리면 부정 후기가 검색 결과에 남습니다. Dcard는 되돌리기 어려운 채널이라 준비가 끝난 뒤 진행하는 편이 안전합니다.",
  },
];

const faq = [
  {
    q: "Dcard가 정확히 어떤 서비스인가요?",
    a: "Dcard는 대만에서 널리 쓰이는 익명 커뮤니티로, 대학생과 2030 세대를 중심으로 성장했습니다. 뷰티, 미용의료, 식품, 연애, 취업 등 주제별 게시판이 나뉘어 있으며, 대만 소비자가 제품을 구매하기 전에 후기를 찾아보는 대표적인 채널입니다.",
  },
  {
    q: "Dcard 마케팅은 어떤 브랜드에 효과적인가요?",
    a: "구매 전에 후기를 찾아보게 되는 제품군에서 특히 효과가 큽니다. 화장품과 스킨케어, 건강기능식품, 미용의료 서비스처럼 실패했을 때의 부담이 큰 카테고리가 대표적입니다. 반대로 저가 충동구매 제품은 효율이 상대적으로 낮습니다.",
  },
  {
    q: "광고라는 표기를 꼭 해야 하나요?",
    a: "권장합니다. 대만에서도 유상 협찬 콘텐츠 표기에 대한 요구가 강해지고 있고, 커뮤니티 이용자들이 미표기 광고를 매우 민감하게 받아들입니다. 표기를 하더라도 내용이 구체적이고 솔직하면 반응은 충분히 나옵니다.",
  },
  {
    q: "Instagram KOL 마케팅과 병행해야 하나요?",
    a: "함께 쓰는 편이 좋습니다. Instagram이 제품을 알리는 역할이라면 Dcard는 알게 된 제품을 검증하는 역할입니다. 인지만 만들고 검증할 자료가 없으면 구매 직전에 이탈이 생기고, 반대로 후기만 있고 인지가 없으면 검색 자체가 일어나지 않습니다.",
  },
  {
    q: "게시글이 삭제되거나 신고당하면 어떻게 되나요?",
    a: "커뮤니티 규정을 어긴 게시글은 삭제될 수 있습니다. 그래서 게시판별 규정과 최근 분위기를 확인한 뒤 진행하며, 광고 티가 강한 구성은 애초에 피합니다. 문제가 생기면 원인을 정리해 다음 게시글 설계에 반영합니다.",
  },
  {
    q: "효과는 어떻게 측정하나요?",
    a: "게시글 조회와 댓글 반응, 브랜드명 검색량 변화, 쇼피 등 판매 채널의 유입 변화를 함께 봅니다. Dcard는 즉각적인 클릭 전환보다 검색 시 노출되는 신뢰 자산에 가깝기 때문에, 캠페인 기간보다 조금 길게 두고 평가합니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "Dcard 마케팅",
  description:
    "대만 최대 익명 커뮤니티 Dcard 마케팅. 커뮤니티 특성에 맞는 시딩·리뷰·댓글 운영으로 구매 직전 단계의 신뢰를 만듭니다.",
  services: [
    {
      name: "Dcard 커뮤니티 시딩",
      description:
        "제품 카테고리에 맞는 게시판을 선정하고 실사용 경험 기반의 후기를 확보해 커뮤니티 문법에 맞게 발행합니다.",
    },
    {
      name: "Dcard 댓글 반응 관리",
      description:
        "발행 이후 댓글 흐름을 관찰하며 질문에 대응하고 필요한 정보를 보완해 게시글의 신뢰도를 유지합니다.",
    },
  ],
  faq,
  parent: { path: "/taiwan-marketing", name: "대만 마케팅" },
});

export default function DcardMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          backHref="/taiwan-marketing"
          backLabel="← 대만 마케팅"
          eyebrow="Dcard Marketing"
          title="Dcard 마케팅"
          titleAccent="대만 커뮤니티 바이럴"
          lead="Dcard는 대만 2030 소비자가 제품을 구매하기 전에 후기를 확인하는 익명 커뮤니티입니다. 티엔샤는 게시판 선정부터 실사용 기반 후기 확보, 댓글 반응 관리까지 커뮤니티의 문법에 맞춰 Dcard 마케팅을 진행합니다."
          tags={["커뮤니티 시딩", "리뷰 콘텐츠", "댓글 관리", "브랜드 버즈"]}
        />

        <Section
          title="왜 Dcard인가"
          lead="대만 마케팅에서 Dcard가 다른 채널로 대체되기 어려운 이유는 역할이 다르기 때문입니다."
        >
          <CardGrid items={why} />
        </Section>

        <Section
          title="Dcard 마케팅 진행 방식"
          lead="게시글 하나를 올리는 작업이 아니라, 게시판 분석부터 발행 후 댓글 관리까지 이어지는 과정입니다."
        >
          <CardGrid items={how} />
        </Section>

        <Section
          title="진행 전에 알아두실 점"
          lead="Dcard는 한 번 남은 반응이 검색 결과에 오래 남는 채널입니다. 그만큼 조심해야 할 지점이 분명합니다."
        >
          <CardGrid items={cautions} />
        </Section>

        <FaqSection items={faq} title="Dcard 마케팅 자주 묻는 질문" />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="Dcard에서 브랜드가 검색되게 만드세요"
          desc="제품 카테고리와 목표를 알려주시면 어떤 게시판에서 어떤 형식으로 접근할지 제안드립니다."
        />

      </div>
    </main>
  );
}

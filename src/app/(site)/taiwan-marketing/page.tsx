import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LandingHero from "@/components/landing/LandingHero";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import RelatedPages from "@/components/landing/RelatedPages";
import ContactCta from "@/components/landing/ContactCta";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

const PATH = "/taiwan-marketing";

export const metadata: Metadata = {
  title: { absolute: "대만 마케팅 전문 에이전시 | KOL·쇼피·공동구매 — 티엔샤" },
  description:
    "한국 브랜드의 대만 시장 진출 파트너 티엔샤. KOL 마케팅, Dcard·Threads 바이럴, KOC 시딩, 쇼피 입점, 공동구매 마케팅까지 대만 마케팅 전 과정을 지원합니다.",
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 마케팅 전문 에이전시 — 티엔샤 TIANXIA",
    description:
      "한국 브랜드의 대만 시장 진출 파트너 티엔샤. KOL·Dcard·Threads·KOC·쇼피·공동구매까지 원스톱 대만 마케팅.",
    url: `${BASE_URL}${PATH}`,
  },
};

const services = [
  {
    title: "KOL 마케팅",
    desc: "대만 현지 인플루언서(KOL)를 섭외해 브랜드를 대만 소비자에게 소개합니다. 팔로워 규모와 콘텐츠 카테고리를 분석해 브랜드 핏에 맞는 KOL을 매칭합니다.",
  },
  {
    title: "Dcard 마케팅",
    desc: "대만 최대 익명 커뮤니티 Dcard에서 브랜드 버즈를 만듭니다. 실제 사용자처럼 자연스럽게 녹아드는 시딩·바이럴 콘텐츠로 신뢰도를 높입니다.",
  },
  {
    title: "Threads 마케팅",
    desc: "대만 Threads 채널을 통한 바이럴 마케팅. 짧고 임팩트 있는 콘텐츠로 빠르게 확산되는 대만 소셜 트렌드를 활용합니다.",
  },
  {
    title: "KOC 시딩",
    desc: "대만 일반 소비자 인플루언서(KOC)에게 제품을 체험하게 해 진정성 있는 후기와 추천 콘텐츠를 생성합니다. 광고보다 높은 신뢰도로 구매 전환을 유도합니다.",
  },
  {
    title: "쇼피 입점 지원",
    desc: "티엔샤 전용 입점 링크로 대만 쇼피(Shopee)에 등록하면 판매 트래킹과 다양한 혜택을 받을 수 있습니다. 상품 현지화(번역·키워드)도 함께 진행합니다.",
  },
  {
    title: "공동구매 마케팅",
    desc: "KOL이 릴스·스토리·프로필을 활용해 공동구매 형태로 판매를 일으킵니다. 단기간 집중 판매와 바이럴 효과를 동시에 얻을 수 있습니다.",
  },
];

const targets = [
  { name: "F&B", desc: "레스토랑, 식음료, 카페, 건강식품 브랜드" },
  { name: "뷰티", desc: "스킨케어, 코스메틱, 헤어, 헬스케어 브랜드" },
  { name: "병원·메디컬", desc: "성형외과, 피부과, 한의원, 메디컬 디바이스" },
];

const channels = [
  {
    title: "Dcard",
    desc: "대만 2030 세대가 제품을 검색하고 후기를 확인하는 익명 커뮤니티입니다. 광고 티가 나는 콘텐츠에 민감한 채널이라, 실사용 맥락이 담긴 시딩과 자연스러운 게시글 설계가 성패를 가릅니다. 구매 직전 단계의 검증 채널로 기능합니다.",
  },
  {
    title: "Instagram",
    desc: "대만 KOL 마케팅의 중심 채널입니다. 릴스와 스토리가 도달의 대부분을 담당하며, 스토리 링크와 프로필 링크를 통한 공동구매가 실제 판매로 직결됩니다. 브랜드 인지와 전환을 한 채널에서 처리할 수 있습니다.",
  },
  {
    title: "Threads",
    desc: "대만에서 빠르게 자리잡은 텍스트 기반 채널입니다. 짧은 문장과 이미지로 구성된 콘텐츠가 알고리즘을 타고 빠르게 확산되어, 초기 브랜드 인지 확보에 적합합니다.",
  },
  {
    title: "Shopee",
    desc: "대만 온라인 쇼핑의 핵심 플랫폼입니다. KOL 콘텐츠로 만든 수요를 실제 매출로 받아내는 착지점 역할을 하며, 상품명과 상세페이지의 번체 중국어 최적화가 검색 노출을 좌우합니다.",
  },
];

const process = [
  {
    eyebrow: "01",
    title: "브랜드·제품 진단",
    desc: "제품 카테고리, 가격대, 경쟁 상황, 한국에서의 판매 데이터를 검토해 대만 시장에서의 포지셔닝 가능성을 판단합니다. 현지화가 필요한 요소를 이 단계에서 먼저 정리합니다.",
  },
  {
    eyebrow: "02",
    title: "채널 전략 수립",
    desc: "인지 확보가 급한지, 초기 리뷰 확보가 급한지, 즉각적인 판매가 목표인지에 따라 채널 조합이 달라집니다. Dcard·Instagram·Threads·Shopee를 목표에 맞춰 배분합니다.",
  },
  {
    eyebrow: "03",
    title: "KOL·KOC 섭외와 매칭",
    desc: "팔로워 수만 보지 않고 팔로워 구성, 평균 반응률, 과거 협업 이력, 콘텐츠 톤을 함께 검토합니다. 브랜드 카테고리와 어긋나는 KOL은 도달이 나와도 전환이 따라오지 않습니다.",
  },
  {
    eyebrow: "04",
    title: "콘텐츠 제작·발행",
    desc: "번체 중국어 카피와 현지 정서에 맞는 구성으로 콘텐츠를 제작합니다. 한국어 원본을 그대로 번역한 콘텐츠는 대만 소비자에게 광고로 읽히기 때문에, 현지 화법으로 다시 씁니다.",
  },
  {
    eyebrow: "05",
    title: "성과 측정·후속 운영",
    desc: "도달과 반응뿐 아니라 쇼피 유입과 판매 데이터를 함께 봅니다. 반응이 좋았던 KOL과 콘텐츠 형식을 다음 캠페인에 반영해 회차를 거듭할수록 효율을 높입니다.",
  },
];

const reasons = [
  {
    title: "대만 전담 에이전시",
    desc: "동남아 여러 국가를 함께 다루지 않고 대만 한 시장만 봅니다. 채널 트렌드와 KOL 지형 변화, 커뮤니티 분위기처럼 현장에서만 알 수 있는 정보가 축적되어 있습니다.",
  },
  {
    title: "인지부터 판매까지 한 곳에서",
    desc: "KOL 콘텐츠로 인지를 만들고, 쇼피 입점으로 판매 채널을 열고, 공동구매로 전환을 일으키는 과정을 한 팀이 이어서 진행합니다. 단계마다 다른 업체를 쓰면 생기는 정보 손실이 없습니다.",
  },
  {
    title: "업종 특화 경험",
    desc: "F&B, 뷰티, 병원·메디컬 세 업종에 집중해 왔습니다. 업종마다 규제와 표현 제약, 반응이 나오는 콘텐츠 형식이 달라 경험이 그대로 결과 차이로 이어집니다.",
  },
  {
    title: "콘텐츠 제작 내재화",
    desc: "스튜디오구프를 통해 브랜드 영상과 숏폼을 직접 제작합니다. KOL에게 맡기기 어려운 브랜드 자산 영상을 별도 외주 없이 같은 흐름에서 만들 수 있습니다.",
  },
];

const faq = [
  {
    q: "대만 마케팅은 어떤 순서로 진행되나요?",
    a: "브랜드·제품 진단으로 시작해 채널 전략 수립, KOL·KOC 섭외와 매칭, 번체 중국어 콘텐츠 제작과 발행, 성과 측정과 후속 운영 순으로 진행합니다. 첫 상담에서 목표와 일정을 확인한 뒤 어떤 채널 조합이 적합한지 제안드립니다.",
  },
  {
    q: "대만 마케팅에 어느 정도 기간이 걸리나요?",
    a: "KOL 섭외와 콘텐츠 제작에 통상 3~4주가 필요하고, 발행 이후 반응을 확인하는 데 2주 정도가 더 걸립니다. 공동구매처럼 판매 목표가 뚜렷한 캠페인은 준비 기간을 포함해 한 달 반 정도를 잡는 편이 안정적입니다.",
  },
  {
    q: "대만에 법인이 없어도 진행할 수 있나요?",
    a: "가능합니다. KOL 마케팅과 Dcard·Threads 바이럴은 현지 법인 없이 진행할 수 있습니다. 쇼피 입점은 해외 셀러 형태로 등록이 가능하며, 티엔샤 전용 링크를 통해 입점 절차와 필요한 서류를 안내해 드립니다.",
  },
  {
    q: "한국에서 쓰던 콘텐츠를 그대로 번역해서 써도 되나요?",
    a: "권하지 않습니다. 한국어 카피를 직역한 콘텐츠는 대만 소비자에게 광고로 인식되어 반응이 크게 떨어집니다. 티엔샤는 원본의 메시지를 유지하되 대만 현지 화법과 정서에 맞게 다시 쓰는 방식으로 작업합니다.",
  },
  {
    q: "어떤 업종이 대만 시장에서 반응이 좋나요?",
    a: "티엔샤가 집중하는 F&B, 뷰티, 병원·메디컬 세 업종은 한국 브랜드에 대한 대만 소비자의 신뢰가 특히 높은 영역입니다. 다만 같은 업종 안에서도 가격대와 제품 성격에 따라 적합한 채널이 달라지므로 진단 단계에서 함께 검토합니다.",
  },
  {
    q: "KOL 마케팅과 KOC 시딩은 무엇이 다른가요?",
    a: "KOL은 수만에서 수십만 팔로워를 가진 인플루언서로 도달과 인지 확보에 강합니다. KOC는 수천에서 수만 규모의 일반 소비자 인플루언서로, 여러 명이 동시에 후기를 올려 검색했을 때 보이는 신뢰도를 만드는 데 유리합니다. 보통 두 가지를 함께 씁니다.",
  },
  {
    q: "성과는 어떻게 확인할 수 있나요?",
    a: "콘텐츠별 도달과 반응, 프로필·스토리 링크 클릭, 쇼피 유입과 판매 데이터를 정리해 리포트로 전달합니다. 어떤 KOL과 어떤 콘텐츠 형식이 실제 판매로 이어졌는지 구분해 다음 캠페인 설계에 반영합니다.",
  },
  {
    q: "상담은 어떻게 신청하나요?",
    a: "홈페이지 문의 폼으로 브랜드와 제품, 목표를 남겨 주시면 담당자가 연락드립니다. 제품 정보와 희망 시점을 함께 알려주시면 첫 상담에서 바로 채널 구성과 진행 일정을 제안드릴 수 있습니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 마케팅",
  description:
    "한국 브랜드의 대만 시장 진출 파트너 티엔샤. KOL 마케팅, Dcard·Threads 바이럴, KOC 시딩, 쇼피 입점, 공동구매 마케팅까지 대만 마케팅 전 과정을 지원합니다.",
  services: services.map((s) => ({ name: s.title, description: s.desc })),
  faq,
});

export default function TaiwanMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <JsonLd data={pageJsonLd} />
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <LandingHero
          eyebrow="Taiwan Marketing"
          title="대만 마케팅 전문 에이전시"
          titleAccent="티엔샤 TIANXIA"
          lead="티엔샤는 한국 브랜드의 대만 시장 진출을 전담하는 마케팅 에이전시입니다. 대만 현지 KOL 네트워크, Dcard·Threads 채널 바이럴, KOC 시딩, 쇼피 입점 지원, 공동구매 마케팅을 통해 브랜드와 대만 소비자를 연결합니다."
          tags={["KOL 마케팅", "Dcard 바이럴", "Threads 마케팅", "KOC 시딩", "쇼피 입점", "공동구매"]}
        />

        <Section title="대만 마케팅 서비스">
          <CardGrid items={services} />
        </Section>

        <Section
          title="대만 마케팅이 필요한 이유"
          lead="대만은 한국 문화에 대한 관심이 높고, 한국 브랜드에 대한 신뢰도가 강한 시장입니다. 그러나 대만 소비자는 Dcard, PTT, Instagram, Threads 등 고유한 채널을 통해 정보를 소비하며, 현지 KOL·KOC를 통한 추천이 구매 결정에 결정적인 영향을 미칩니다. 티엔샤는 5년 이상의 대만 마케팅 경험과 현지 네트워크를 바탕으로 이 채널들을 전략적으로 활용합니다."
        />

        <Section
          title="대만 소비자가 실제로 쓰는 채널"
          lead="같은 제품이라도 어떤 채널에서 어떤 방식으로 노출되느냐에 따라 반응이 크게 갈립니다. 대만에서 구매 결정에 영향을 주는 채널은 다음 네 가지가 핵심입니다."
        >
          <CardGrid items={channels} />
        </Section>

        <Section
          title="대만 마케팅 진행 프로세스"
          lead="브랜드마다 출발점이 다르기 때문에 모든 단계를 똑같이 진행하지는 않습니다. 다만 아래 흐름을 기준으로 어디에 비중을 둘지 상담 단계에서 함께 정합니다."
        >
          <CardGrid items={process} />
        </Section>

        <Section title="지원 업종">
          <CardGrid
            items={targets.map((t) => ({ title: t.name, desc: t.desc }))}
            columns={3}
          />
        </Section>

        <Section title="티엔샤를 선택하는 이유">
          <CardGrid items={reasons} />
        </Section>

        <FaqSection items={faq} title="대만 마케팅 자주 묻는 질문" />

        <RelatedPages currentPath={PATH} />

        <ContactCta
          title="대만 마케팅 파트너 티엔샤와 함께하세요"
          desc="70개 이상의 브랜드와 함께한 티엔샤의 대만 마케팅 전문성으로 귀사 브랜드의 대만 진출을 시작하세요."
        />

      </div>
    </main>
  );
}

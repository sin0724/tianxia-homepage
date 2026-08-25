import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Section from "@/components/landing/Section";
import CardGrid from "@/components/landing/CardGrid";
import FaqSection from "@/components/landing/FaqSection";
import RelatedPages from "@/components/landing/RelatedPages";
import { BASE_URL, buildPageJsonLd } from "@/lib/seo";

const PATH = "/kol-marketing";

export const metadata: Metadata = {
  title: { absolute: "대만 KOL 마케팅 | Dcard·Threads·KOC 시딩 — 티엔샤" },
  description:
    "대만 KOL·KOC 마케팅 전문. Dcard 바이럴, Threads 마케팅, KOC 시딩, 공동구매 캠페인까지. 대만 소셜 채널 전반의 바이럴 마케팅을 티엔샤가 진행합니다.",
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    title: "대만 KOL 마케팅 · Dcard · Threads · KOC 시딩 — 티엔샤",
    description:
      "Dcard 바이럴, Threads 마케팅, KOC 시딩, 공동구매 캠페인. 대만 소셜 채널 전반의 바이럴 마케팅.",
    url: `${BASE_URL}${PATH}`,
  },
};

const channels = [
  {
    name: "KOL 마케팅",
    en: "Key Opinion Leader",
    desc: "팔로워 수만~수십만의 대만 인플루언서가 브랜드 콘텐츠를 제작해 Instagram, TikTok 등에 게시합니다. 브랜드 인지도와 신뢰도를 빠르게 구축하는 데 효과적입니다.",
    tags: ["Instagram", "TikTok", "YouTube"],
  },
  {
    name: "Dcard 마케팅",
    en: "대만 No.1 익명 커뮤니티",
    desc: "대만 최대 익명 커뮤니티 Dcard는 대만 2030 소비자의 정보 탐색 채널입니다. 자연스러운 바이럴 게시글·댓글로 브랜드 인지도를 높이고 구매 욕구를 자극합니다.",
    tags: ["바이럴 포스팅", "제품 리뷰", "커뮤니티 시딩"],
  },
  {
    name: "Threads 마케팅",
    en: "Meta Threads",
    desc: "빠르게 성장 중인 대만 Threads 채널을 활용한 바이럴 마케팅. 짧은 텍스트와 이미지 기반 콘텐츠로 빠른 확산과 반응을 유도합니다.",
    tags: ["숏폼 콘텐츠", "바이럴", "브랜드 인지"],
  },
  {
    name: "KOC 시딩",
    en: "Key Opinion Consumer",
    desc: "수천~수만 팔로워의 일반 소비자 인플루언서(KOC)에게 제품을 체험하게 해 진정성 높은 후기를 생성합니다. 광고 대비 신뢰도가 높아 구매 전환에 효과적입니다.",
    tags: ["제품 체험", "리얼 후기", "입소문"],
  },
  {
    name: "공동구매 마케팅",
    en: "Co-Buy Campaign",
    desc: "KOL이 Instagram 릴스·스토리·프로필을 통해 직접 공동구매를 열어 판매를 일으킵니다. 단기간 집중 판매와 강력한 바이럴 효과를 동시에 확보할 수 있습니다.",
    tags: ["릴스", "스토리", "공동구매"],
  },
];

const process = [
  { step: "01", title: "브랜드 분석", desc: "제품·타겟·예산 파악 및 채널 전략 수립" },
  { step: "02", title: "KOL·KOC 매칭", desc: "브랜드 핏과 팔로워 특성 분석 후 최적 인플루언서 연결" },
  { step: "03", title: "콘텐츠 기획", desc: "채널별(Dcard·Threads·릴스·스토리) 콘텐츠 방향 설계" },
  { step: "04", title: "캠페인 실행", desc: "게시·시딩·공동구매 오픈 동시 진행" },
  { step: "05", title: "성과 리포트", desc: "도달 수·반응률·판매 전환 데이터 공유" },
];

const tiers = [
  {
    title: "메가 KOL (10만 팔로워 이상)",
    desc: "단기간에 넓은 인지를 확보해야 할 때 씁니다. 노출은 크지만 팔로워 구성이 넓어 전환율은 상대적으로 낮습니다. 신제품 출시나 브랜드 인지가 거의 없는 초기 진입에 적합합니다.",
  },
  {
    title: "미들 KOL (1만~10만 팔로워)",
    desc: "대만 KOL 마케팅에서 가장 자주 쓰는 구간입니다. 팔로워와의 거리가 가까워 반응률이 높고, 공동구매를 열었을 때 실제 판매로 이어지는 비율이 좋습니다. 가장 안정적으로 결과가 나오는 구간입니다.",
  },
  {
    title: "마이크로 KOL (1만 팔로워 미만)",
    desc: "특정 카테고리에 집중된 팔로워를 보유해 타겟이 뚜렷합니다. 여러 명을 동시에 운영해 검색했을 때 여러 후기가 보이도록 만드는 데 효과적입니다.",
  },
  {
    title: "KOC (일반 소비자 인플루언서)",
    desc: "제품을 체험하고 실사용 후기를 남기는 역할입니다. 개별 도달은 작지만 다수가 동시에 움직일 때 만들어지는 신뢰 효과가 큽니다. 구매 직전 검증 단계에 영향을 줍니다.",
  },
];

const factors = [
  {
    title: "팔로워 수보다 반응률",
    desc: "팔로워가 많아도 좋아요와 댓글이 따라오지 않는 계정이 있습니다. 최근 게시물의 평균 반응률과 댓글의 질을 확인해야 실제 영향력을 판단할 수 있습니다.",
  },
  {
    title: "카테고리 적합성",
    desc: "뷰티 계정에 F&B 제품을 올리면 도달은 나와도 전환이 따라오지 않습니다. 팔로워가 그 계정에 기대하는 콘텐츠와 제품이 맞아야 합니다.",
  },
  {
    title: "콘텐츠 형식 선택",
    desc: "릴스는 도달, 스토리는 전환, 피드는 브랜드 자산으로 각각 역할이 다릅니다. 목표에 따라 어떤 형식에 무게를 둘지 달라져야 합니다.",
  },
  {
    title: "발행 시점과 밀도",
    desc: "여러 KOL이 시차를 두고 흩어져 올리는 것보다, 짧은 기간에 겹쳐 노출되도록 설계할 때 커뮤니티 반응이 만들어집니다.",
  },
];

const faq = [
  {
    q: "대만 KOL은 어떤 기준으로 선정하나요?",
    a: "팔로워 수, 최근 게시물의 평균 반응률, 팔로워 구성, 과거 협업 이력, 콘텐츠 톤을 함께 봅니다. 특히 브랜드 카테고리와 계정의 성격이 맞는지를 중요하게 검토합니다. 카테고리가 어긋나면 도달이 나와도 구매로 이어지지 않습니다.",
  },
  {
    q: "KOL 마케팅과 KOC 시딩 중 무엇을 먼저 해야 하나요?",
    a: "브랜드 인지가 거의 없는 상태라면 KOL로 인지를 먼저 만들고, 검색했을 때 후기가 보이도록 KOC를 함께 붙이는 순서를 권합니다. 이미 어느 정도 알려진 브랜드라면 KOC 시딩만으로도 구매 전환을 끌어올릴 수 있습니다.",
  },
  {
    q: "Dcard 마케팅은 일반 SNS 마케팅과 어떻게 다른가요?",
    a: "Dcard는 익명 커뮤니티라 광고성 게시물에 대한 거부감이 강합니다. 브랜드를 전면에 내세우기보다 실제 사용 맥락 안에서 자연스럽게 언급되도록 설계해야 하며, 댓글 반응까지 함께 관리해야 효과가 납니다. 자세한 내용은 Dcard 마케팅 페이지에서 확인하실 수 있습니다.",
  },
  {
    q: "Threads 마케팅은 어떤 브랜드에 적합한가요?",
    a: "짧은 호흡의 콘텐츠로도 도달이 잘 나와 초기 인지 확보가 필요한 브랜드에 적합합니다. 짧은 텍스트와 이미지로 메시지를 전달할 수 있는 제품일수록 유리하며, 설명이 길게 필요한 제품은 Instagram 릴스와 함께 쓰는 편이 낫습니다.",
  },
  {
    q: "캠페인 진행에 얼마나 걸리나요?",
    a: "KOL 섭외와 콘텐츠 제작에 3~4주, 발행 후 반응 확인에 2주 정도가 필요합니다. 섭외 가능한 KOL의 스케줄에 따라 달라지므로, 특정 시점에 맞춰야 하는 캠페인은 여유를 두고 문의해 주시는 편이 좋습니다.",
  },
  {
    q: "콘텐츠 2차 활용이 가능한가요?",
    a: "KOL과의 계약 조건에 따라 달라집니다. 브랜드 광고 소재로 재활용하거나 자사 채널에 게시하려면 사전에 사용 범위와 기간을 협의해야 합니다. 섭외 단계에서 미리 정리해 드립니다.",
  },
  {
    q: "성과 리포트에는 어떤 내용이 담기나요?",
    a: "콘텐츠별 도달 수와 반응률, 스토리·프로필 링크 클릭, 공동구매를 진행한 경우 판매 수량과 매출을 정리합니다. 어떤 KOL과 어떤 형식이 실제 판매로 이어졌는지 구분해 다음 캠페인 설계에 반영합니다.",
  },
];

const pageJsonLd = buildPageJsonLd({
  path: PATH,
  name: "대만 KOL 마케팅",
  description:
    "대만 KOL·KOC 마케팅 전문. Dcard 바이럴, Threads 마케팅, KOC 시딩, 공동구매 캠페인까지. 대만 소셜 채널 전반의 바이럴 마케팅을 티엔샤가 진행합니다.",
  services: channels.map((c) => ({ name: c.name, description: c.desc })),
  faq,
});

export default function KolMarketingPage() {
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
          KOL · KOC · Viral Marketing
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
          대만 KOL·KOC 마케팅<br />
          <span className="text-red-500">Dcard · Threads · 공동구매</span>
        </h1>

        <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          티엔샤는 대만의 주요 소셜 채널 전반에서 바이럴 마케팅을 진행합니다.
          Instagram KOL 캠페인부터 Dcard 커뮤니티 시딩, Threads 바이럴, KOC 제품 체험, 공동구매 판매까지
          대만 소비자가 실제로 사용하는 모든 채널을 커버합니다.
        </p>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-8">대만 마케팅 채널 & 서비스</h2>
          <div className="space-y-6">
            {channels.map((c) => (
              <div key={c.name} className="border border-zinc-800 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{c.name}</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{c.en}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {c.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-red-800/40 text-red-400/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-2">왜 대만에서 KOL·KOC 마케팅인가?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            대만 소비자는 광고보다 실제 사용자의 추천을 신뢰합니다. Dcard에서의 커뮤니티 반응,
            KOC의 진정성 있는 후기, KOL의 공동구매 추천이 구매 결정에 직접적인 영향을 미칩니다.
            티엔샤는 대만 현지 네트워크를 통해 브랜드에 맞는 인플루언서를 빠르게 연결하고,
            각 채널의 특성에 맞는 콘텐츠 전략으로 실질적인 판매 성과를 만듭니다.
          </p>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-8">진행 프로세스</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {process.map((p) => (
              <div key={p.step}>
                <p className="text-red-500/60 text-[10px] font-mono tracking-[0.2em] mb-2">{p.step}</p>
                <h3 className="text-sm font-bold mb-1">{p.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Section
          title="KOL 등급별 활용 전략"
          lead="팔로워 규모에 따라 잘하는 일이 다릅니다. 한 등급에만 몰기보다 목표에 맞게 섞을 때 결과가 안정적입니다."
        >
          <CardGrid items={tiers} />
        </Section>

        <Section
          title="성과를 가르는 요소"
          lead="같은 조건으로 진행해도 결과가 크게 갈립니다. 캠페인 설계에서 특히 신경 쓰는 지점은 다음과 같습니다."
        >
          <CardGrid items={factors} />
        </Section>

        <FaqSection items={faq} title="대만 KOL 마케팅 자주 묻는 질문" />

        <RelatedPages currentPath={PATH} />

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-4">대만 바이럴 마케팅 시작하기</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
            KOL·KOC·Dcard·Threads 중 어떤 채널이 우리 브랜드에 맞는지 모르셔도 됩니다.
            티엔샤가 브랜드 분석 후 최적의 채널 조합을 제안드립니다.
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

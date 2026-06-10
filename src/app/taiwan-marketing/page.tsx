import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "대만 마케팅 전문 에이전시 — 티엔샤 TIANXIA",
  description:
    "한국 브랜드의 대만 시장 진출 파트너 티엔샤. KOL 마케팅, Dcard·Threads 바이럴, KOC 시딩, 쇼피 입점, 공동구매 마케팅까지 대만 마케팅 전 과정을 지원합니다.",
  alternates: { canonical: "https://tianxia.kr/taiwan-marketing" },
  openGraph: {
    title: "대만 마케팅 전문 에이전시 — 티엔샤 TIANXIA",
    description:
      "한국 브랜드의 대만 시장 진출 파트너 티엔샤. KOL·Dcard·Threads·KOC·쇼피·공동구매까지 원스톱 대만 마케팅.",
    url: "https://tianxia.kr/taiwan-marketing",
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

export default function TaiwanMarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <Link
          href="/"
          className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-500 hover:text-red-400 transition-colors"
        >
          ← tianxia.kr
        </Link>

        <p className="mt-10 text-red-500/70 text-[11px] font-mono tracking-[0.3em] uppercase">
          Taiwan Marketing
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
          대만 마케팅 전문 에이전시<br />
          <span className="text-red-500">티엔샤 TIANXIA</span>
        </h1>

        <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          티엔샤는 한국 브랜드의 대만 시장 진출을 전담하는 마케팅 에이전시입니다.
          대만 현지 KOL 네트워크, Dcard·Threads 채널 바이럴, KOC 시딩, 쇼피 입점 지원,
          공동구매 마케팅을 통해 브랜드와 대만 소비자를 연결합니다.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {["KOL 마케팅", "Dcard 바이럴", "Threads 마케팅", "KOC 시딩", "쇼피 입점", "공동구매"].map((tag) => (
            <span key={tag} className="text-[11px] font-mono px-3 py-1 border border-zinc-700 text-zinc-400">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-8">대만 마케팅 서비스</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="border border-zinc-800 p-6">
                <h3 className="text-base font-bold text-zinc-50 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-2">대만 마케팅이 필요한 이유</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-8">
            대만은 한국 문화에 대한 관심이 높고, 한국 브랜드에 대한 신뢰도가 강한 시장입니다.
            그러나 대만 소비자는 Dcard, PTT, Instagram, Threads 등 고유한 채널을 통해 정보를 소비하며,
            현지 KOL·KOC를 통한 추천이 구매 결정에 결정적인 영향을 미칩니다.
            티엔샤는 5년 이상의 대만 마케팅 경험과 현지 네트워크를 바탕으로 이 채널들을 전략적으로 활용합니다.
          </p>

          <h2 className="text-2xl font-black mb-6">지원 업종</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {targets.map((t) => (
              <div key={t.name} className="border border-zinc-800 p-5">
                <h3 className="font-bold text-red-400 mb-1">{t.name}</h3>
                <p className="text-sm text-zinc-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black mb-4">대만 마케팅 파트너 티엔샤와 함께하세요</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
            70개 이상의 브랜드와 함께한 티엔샤의 대만 마케팅 전문성으로
            귀사 브랜드의 대만 진출을 시작하세요.
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

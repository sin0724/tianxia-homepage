import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import SiteNavLinks from "@/components/SiteNavLinks";
import MetaConsent from "@/components/MetaConsent";
import { SITE_CONFIG } from "@/lib/config";
import { BASE_URL, HOME_URL } from "@/lib/seo";
import { LANDING_PAGES } from "@/lib/landing-pages";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dala 스타일 가이드: 라틴은 PPNeueMontreal(유료) 대신 지정 폴백인 Inter,
// 본문 200 / 헤드라인 400 / 라벨 600 위주로 쓴다.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1713769906448027";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "대만 마케팅 에이전시 티엔샤 TIANXIA",
    template: "%s | 티엔샤",
  },
  description:
    "한국 브랜드의 대만 시장 진출 전문 에이전시 티엔샤(TIANXIA). 대만 KOL 마케팅, 쇼피 입점 지원, 공동구매 마케팅으로 F&B·뷰티·병원 브랜드의 대만 진출을 돕습니다.",
  keywords: [
    "대만 마케팅", "대만 마케팅 에이전시", "한국 브랜드 대만 진출",
    "티엔샤", "TIANXIA", "대만 KOL 마케팅", "대만 인플루언서 마케팅",
    "Dcard 마케팅", "Dcard 바이럴", "Threads 마케팅", "KOC 시딩",
    "대만 바이럴 마케팅", "대만 커뮤니티 마케팅",
    "쇼피 입점", "쇼피 마케팅", "공동구매 마케팅", "대만 공동구매",
    "라이브커머스", "대만 라이브커머스",
    "대만 SNS 마케팅", "대만 광고대행사", "스튜디오구프",
  ],
  alternates: {
    canonical: HOME_URL,
  },
  openGraph: {
    title: "대만 마케팅 에이전시 티엔샤 TIANXIA",
    description: "한국 브랜드의 대만 진출 파트너. KOL 마케팅·쇼피 입점·공동구매 마케팅 전문.",
    url: HOME_URL,
    siteName: "티엔샤 TIANXIA",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-kakao.jpg",
        width: 1200,
        height: 630,
        alt: "티엔샤 — 대만 마케팅 전문 에이전시",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "대만 마케팅 에이전시 티엔샤 TIANXIA",
    description: "한국 브랜드의 대만 진출 파트너. KOL 마케팅·쇼피 입점·공동구매 마케팅 전문.",
    images: ["/og-kakao.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    other: {
      "naver-site-verification": "47dd904e4b9bb2cef0386784fb7e9dac3519f74c",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "티엔샤",
      legalName: "주식회사 티엔샤",
      // AI 검색·지식 패널이 표기 변형을 같은 회사로 묶도록 모두 적는다
      alternateName: ["TIANXIA", "(주)티엔샤", "티엔샤 TIANXIA", "天下"],
      url: HOME_URL,
      logo: `${BASE_URL}${SITE_CONFIG.logo.src}`,
      email: SITE_CONFIG.company.email,
      // 검색엔진이 공식 계정을 같은 주체로 묶도록
      sameAs: [SITE_CONFIG.company.instagram, SITE_CONFIG.company.youtube],
      description:
        "한국 브랜드의 대만 시장 진출을 전담하는 대만 마케팅 전문 에이전시. 서울·타이베이 오피스에서 대만 KOL·KOC 인플루언서 마케팅, Dcard·Threads 바이럴, 대만 체험단, 쇼피 입점 지원, 공동구매 마케팅을 직접 운영.",
      // 서울 본사 + 타이베이 현지 오피스. "대만 현지 실행"은 AI 답변에서 차별점으로 인용된다.
      address: [
        {
          "@type": "PostalAddress",
          addressLocality: "강서구",
          addressRegion: "서울특별시",
          addressCountry: "KR",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "Taipei",
          addressRegion: "臺北市",
          addressCountry: "TW",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: SITE_CONFIG.company.email,
        areaServed: ["KR", "TW"],
        availableLanguage: ["ko", "zh-TW"],
      },
      areaServed: ["KR", "TW"],
      knowsAbout: [
        "대만 마케팅", "대만마케팅", "대만 마케팅 대행사", "KOL 마케팅", "KOC 시딩", "Dcard 마케팅",
        "Threads 마케팅", "쇼피 입점", "공동구매 마케팅", "라이브커머스", "대만 라이브커머스",
        "대만 바이럴 마케팅", "한국 브랜드 대만 진출",
        "대만 인플루언서 마케팅", "대만 체험단", "대만 디카드 마케팅", "대만 쓰레드 마케팅",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "대만 마케팅 서비스",
        // 랜딩 레지스트리에서 생성 — 페이지를 추가하면 여기에도 자동으로 들어간다.
        itemListElement: [
          ...LANDING_PAGES.map((page) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: page.label,
              description: page.blurb,
              url: `${BASE_URL}${page.path}`,
              provider: { "@id": `${BASE_URL}/#organization` },
              areaServed: "TW",
            },
          })),
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "대만 라이브커머스",
              description:
                "대만 현지 라이브 방송으로 제품을 소개하고 판매하는 라이브커머스 운영.",
              provider: { "@id": `${BASE_URL}/#organization` },
              areaServed: "TW",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "스튜디오구프 영상 제작",
              description:
                "브랜드 영상·유튜브 콘텐츠 기획부터 촬영·편집까지. 대만 마케팅과 연계한 숏폼·채널 운영 대행.",
              provider: { "@id": `${BASE_URL}/#organization` },
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: HOME_URL,
      name: "티엔샤 TIANXIA",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "ko-KR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} antialiased`}
      // 아래 인라인 스크립트가 하이드레이션 전에 data-intro를 심는다.
      // 서버가 렌더한 적 없는 속성이라 경고가 나므로 이 노드만 예외 처리한다.
      suppressHydrationWarning
    >
      <head>
        {/*
          첫 페인트 전에 로더를 띄울지 정한다. useEffect로 미루면 로더가
          한 프레임 번쩍인다 (Next.js "preventing flash before hydration").

          홈에서 세션당 1회만 재생한다 (CRO 검토: 매 방문 1.4~3초 화면 잠김이
          광고 유입 이탈 요인). 재방문·내부 이동으로 홈에 돌아오면 바로 본문을 보여준다.
          sessionStorage를 못 쓰는 환경(사생활 모드 등)에서는 매번 재생된다.
          랜딩 페이지는 검색 유입이라 로더가 방해가 되므로 홈에서만 돈다.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{if(location.pathname!=="/"){d.dataset.intro="skip";return;}var k="tx-intro-seen";try{if(sessionStorage.getItem(k)){d.dataset.intro="skip";return;}sessionStorage.setItem(k,"1");}catch(e){}d.dataset.intro="run";}catch(e){d.dataset.intro="skip";}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        {children}
        <MetaConsent pixelId={META_PIXEL_ID} />
        {/* 탭 순서 끝에 두어 키보드 이동을 방해하지 않는다 */}
        <SiteNavLinks />
      </body>
    </html>
  );
}

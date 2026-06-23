import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tianxia.kr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
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
    "대만 SNS 마케팅", "대만 광고대행사", "스튜디오구프",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
    description: "한국 브랜드의 대만 진출 파트너. KOL 마케팅·쇼피 입점·공동구매 마케팅 전문.",
    url: BASE_URL,
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
    title: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "티엔샤는 어떤 회사인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "티엔샤(TIANXIA)는 한국 브랜드의 대만 시장 진출을 전담하는 마케팅 에이전시입니다. 대만 현지 KOL 네트워크, 쇼피 입점 지원, 공동구매 마케팅을 통해 F&B·뷰티·병원 브랜드를 대만 소비자와 연결합니다.",
      },
    },
    {
      "@type": "Question",
      name: "대만 마케팅은 어떻게 진행되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "티엔샤는 KOL·KOC 마케팅, Dcard 커뮤니티 바이럴, Threads 마케팅, 공동구매 캠페인 등 대만 소비자가 실제로 사용하는 채널 전반을 커버합니다. 브랜드 분석 후 최적의 채널 조합을 제안하고 콘텐츠 기획부터 판매 전환까지 전 과정을 대행합니다.",
      },
    },
    {
      "@type": "Question",
      name: "Dcard 마케팅이란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dcard는 대만 최대 익명 커뮤니티로 대만 2030 소비자가 제품 정보를 탐색하는 핵심 채널입니다. 티엔샤는 자연스러운 바이럴 게시글과 커뮤니티 시딩으로 브랜드 인지도를 높이고 구매 욕구를 자극합니다.",
      },
    },
    {
      "@type": "Question",
      name: "KOC 시딩이란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "KOC(Key Opinion Consumer)는 수천~수만 팔로워를 보유한 일반 소비자 인플루언서입니다. KOC에게 제품을 체험하게 해 진정성 높은 후기 콘텐츠를 생성합니다. 광고보다 신뢰도가 높아 구매 전환에 효과적입니다.",
      },
    },
    {
      "@type": "Question",
      name: "쇼피(Shopee) 입점 지원이란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "티엔샤 전용 입점 링크를 통해 대만 쇼피에 등록하면 판매 트래킹과 다양한 입점 혜택을 받을 수 있습니다. 상품 현지화(번역·상세페이지·키워드 최적화)도 함께 지원합니다.",
      },
    },
    {
      "@type": "Question",
      name: "공동구매 마케팅이란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "대만 KOL이 인스타그램 릴스·스토리·프로필을 통해 직접 상품을 홍보하고 공동구매 형태로 판매를 일으키는 방식입니다. 라이브커머스 없이도 KOL 팔로워를 통한 강력한 바이럴 판매가 가능합니다.",
      },
    },
    {
      "@type": "Question",
      name: "어떤 업종을 지원하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "F&B(식음료·레스토랑·카페), 뷰티(스킨케어·코스메틱·헬스케어), 병원(성형·피부과·메디컬) 브랜드의 대만 마케팅을 전문으로 합니다.",
      },
    },
    {
      "@type": "Question",
      name: "한국 브랜드가 대만 시장에 진출하려면 어떻게 해야 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "티엔샤를 통하면 쇼피 입점 지원부터 상품 현지화, KOL 섭외·매칭, 공동구매 마케팅까지 원스톱으로 진행할 수 있습니다. 홈페이지 문의 폼을 통해 상담을 신청하실 수 있습니다.",
      },
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "티엔샤",
      alternateName: "TIANXIA",
      url: BASE_URL,
      logo: `${BASE_URL}/티엔샤_투명배경_흰글씨.png`,
      email: "hello@tnxia.com",
      description:
        "한국 브랜드의 대만 시장 진출을 돕는 마케팅 에이전시. 대만 KOL 마케팅, 쇼피 입점 지원, 공동구매 마케팅 전문.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "서울",
        addressRegion: "서울특별시",
        addressCountry: "KR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@tnxia.com",
        areaServed: ["KR", "TW"],
        availableLanguage: ["ko", "zh-TW"],
      },
      areaServed: ["KR", "TW"],
      knowsAbout: [
        "대만 마케팅", "KOL 마케팅", "KOC 시딩", "Dcard 마케팅",
        "Threads 마케팅", "쇼피 입점", "공동구매 마케팅",
        "대만 바이럴 마케팅", "한국 브랜드 대만 진출",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "서비스",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "대만 KOL 마케팅",
              description:
                "대만 현지 KOL·인플루언서를 활용한 SNS 마케팅. 릴스·스토리 콘텐츠로 브랜드 인지도와 판매를 동시에 높입니다.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "쇼피 입점 지원",
              description:
                "티엔샤 전용 링크를 통한 대만 쇼피(Shopee) 입점 지원. 트래킹 및 다양한 입점 혜택 제공.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "공동구매 마케팅",
              description:
                "대만 KOL이 직접 진행하는 공동구매 캠페인. 상품 현지화부터 KOL 섭외·매칭, 릴스·스토리 판매 전환까지 원스톱 진행.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "스튜디오구프 영상 제작",
              description:
                "브랜드 영상·유튜브 콘텐츠 기획부터 촬영·편집까지. 대만 마케팅과 연계한 숏폼·채널 운영 대행.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
      description:
        "한국 브랜드의 대만 시장 진출 전문 에이전시 티엔샤. 대만 KOL 마케팅, 쇼피 입점 지원, 공동구매 마케팅 전문.",
      inLanguage: "ko-KR",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      primaryImageOfPage: `${BASE_URL}/og-kakao.jpg`,
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
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
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

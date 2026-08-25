import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SiteNavLinks from "@/components/SiteNavLinks";
import { BASE_URL, HOME_URL } from "@/lib/seo";

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

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1713769906448027";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "(주)티엔샤 TIANXIA — 대만 마케팅 에이전시",
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
    canonical: HOME_URL,
  },
  openGraph: {
    title: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "티엔샤",
      alternateName: "TIANXIA",
      url: HOME_URL,
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
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* Meta 픽셀 — 전 페이지 PageView + 문의 폼 Lead 이벤트(ContactSection)의 기반 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
          }}
        />
      </head>
      <body>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <CustomCursor />
        {children}
        {/* 탭 순서 끝에 두어 키보드 이동을 방해하지 않는다 */}
        <SiteNavLinks />
      </body>
    </html>
  );
}

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tianxia.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
    template: "%s | 티엔샤",
  },
  description:
    "한국 브랜드를 대만 시장으로. F&B, 뷰티, 병원 브랜드의 대만 현지 마케팅 파트너 티엔샤(TIANXIA)입니다.",
  keywords: [
    "대만 마케팅", "티엔샤", "TIANXIA", "스튜디오구프", "대만 광고대행사",
    "KOL 마케팅", "대만 SNS 마케팅", "한국 브랜드 대만 진출", "대만 인플루언서",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
    description: "한국 브랜드를 대만 시장으로. 현지의 감각으로 팬을 만듭니다.",
    url: BASE_URL,
    siteName: "티엔샤 TIANXIA",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "티엔샤 — 대만 마케팅 전문 에이전시",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "(주)티엔샤 — 대만 마케팅 전문 에이전시",
    description: "한국 브랜드를 대만 시장으로. 현지의 감각으로 팬을 만듭니다.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

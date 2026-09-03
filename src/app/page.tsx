import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { BASE_URL, HOME_URL } from "@/lib/seo";
import FullPageScroll from "@/components/FullPageScroll";
import HeroSection from "@/components/sections/HeroSection";
import CreatorsSection from "@/components/sections/CreatorsSection";
import AboutSection from "@/components/sections/AboutSection";
import ShopeeSection from "@/components/sections/ShopeeSection";
import ServicesSection from "@/components/sections/ServicesSection";
import OfficeSection from "@/components/sections/OfficeSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";

// 홈 전용 구조화 데이터.
// 이전에는 루트 레이아웃에 있어서 /taiwan-marketing 등 모든 하위 페이지가
// 자신의 url을 홈으로 선언하는 WebPage 노드를 함께 내보내고 있었다.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: HOME_URL,
      name: "(주)티엔샤 TIANXIA — 대만 마케팅 에이전시",
      description:
        "한국 브랜드의 대만 시장 진출 전문 에이전시 티엔샤. 대만 KOL 마케팅, 쇼피 입점 지원, 공동구매 마케팅 전문.",
      inLanguage: "ko-KR",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      primaryImageOfPage: `${BASE_URL}/og-kakao.jpg`,
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Navbar />
      <FullPageScroll
        sections={[
          <HeroSection key="hero" />,
          <CreatorsSection key="creators" />,
          <AboutSection key="about" />,
          <ShopeeSection key="shopee" />,
          <ServicesSection key="services" />,
          <OfficeSection key="office" />,
          <WorkSection key="work" />,
          <ContactSection key="contact" />,
        ]}
      />
    </>
  );
}

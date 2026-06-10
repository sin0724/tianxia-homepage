import Navbar from "@/components/Navbar";
import FullPageScroll from "@/components/FullPageScroll";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ShopeeSection from "@/components/sections/ShopeeSection";
import ServicesSection from "@/components/sections/ServicesSection";
import OfficeSection from "@/components/sections/OfficeSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <FullPageScroll
        sections={[
          <HeroSection key="hero" />,
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

// ============================================================
// 사이트 전체 콘텐츠 설정 파일
// 텍스트, 이미지, 비디오를 이곳에서 일괄 교체할 수 있습니다.
// ============================================================

export const SITE_CONFIG = {
  company: {
    name: "(주)티엔샤",
    nameEn: "TIANXIA",
    tagline: "대만을 향한 마케팅",
    subTagline: "한국 브랜드의 무대를 대만으로.\n현지의 감각으로 팬을 만듭니다.",
    email: "hello@tnxia.com",
    phone: "02-000-0000",
    address: "서울특별시",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },

  // -------------------------------------------------------
  // Hero 배경 영상
  // public/videos/ 폴더에 파일을 넣고 파일명만 수정하세요
  // 예: hero.mp4, hero.webm
  // -------------------------------------------------------
  heroVideo: "/videos/hero.mp4",
  heroPoster: "/posters/hero-poster.jpg",

  // -------------------------------------------------------
  // 로고
  // -------------------------------------------------------
  logo: {
    src: "/티엔샤_투명배경_흰글씨.png",
    alt: "티엔샤 로고",
    width: 140,
    height: 40,
  },

  // -------------------------------------------------------
  // 소개 섹션 - 타겟 산업별 영상
  // public/videos/ 폴더에 파일을 넣고 video 경로 수정
  // -------------------------------------------------------
  aboutTargets: [
    {
      industry: "F&B",
      desc: "레스토랑, 식음료, 카페 브랜드",
      video: "/videos/about-fb.mp4",
      poster: "/posters/about-fb-poster.jpg",
    },
    {
      industry: "뷰티",
      desc: "스킨케어, 코스메틱, 헬스케어",
      video: "/videos/about-beauty.mp4",
      poster: "/posters/about-beauty-poster.jpg",
    },
    {
      industry: "병원",
      desc: "성형, 피부과, 메디컬 브랜드",
      video: "/videos/about-hospital.mp4",
      poster: "/posters/about-hospital-poster.jpg",
    },
  ],

  // -------------------------------------------------------
  // 통계
  // -------------------------------------------------------
  stats: [
    { value: "50+", label: "브랜드 파트너" },
    { value: "200+", label: "캠페인 진행" },
    { value: "5+", label: "대만 마케팅 경력(년)" },
    { value: "3", label: "핵심 타겟 산업" },
  ],

  // -------------------------------------------------------
  // 서비스
  // -------------------------------------------------------
  services: {
    taiwan: {
      title: "대만 마케팅",
      subtitle: "Taiwan Marketing",
      description:
        "현지 인플루언서, SNS, 검색광고까지. 대만 시장의 언어로 당신의 브랜드를 이야기합니다.",
      items: [
        "인플루언서 & KOL 마케팅",
        "SNS 콘텐츠 제작",
        "검색 광고 (SEO / SEM)",
        "바이럴 마케팅",
        "퍼포먼스 마케팅",
      ],
      image: "/services/taiwan-marketing.jpg",
      placeholderSeed: "taiwan-city-night-marketing",
      cardLogo: "/티엔샤 정방형로고.png",
    },
    studio: {
      title: "스튜디오구프",
      subtitle: "Studio Goof",
      description:
        "브랜드의 이야기를 영상으로. 기획부터 편집까지 유튜브 콘텐츠 전 과정을 함께합니다.",
      items: [
        "유튜브 채널 기획 & 제작",
        "브랜드 영상",
        "인터뷰 & 다큐",
        "숏폼 콘텐츠",
        "채널 운영 대행",
      ],
      image: "/services/studio-goof.jpg",
      placeholderSeed: "video-production-studio-camera",
      // 카드 배경 로고
      cardLogo: "/스튜디오구프로고.jpeg",
    },
  },

  // -------------------------------------------------------
  // 포트폴리오 작업물
  // 이미지 교체: public/works/ 폴더에 파일 추가 후 image 경로 수정
  // -------------------------------------------------------
  works: [
    {
      id: 1,
      title: "F&B 브랜드 대만 런칭",
      category: "대만 마케팅",
      image: "/works/work-1.jpg",
      placeholderSeed: "taiwan-restaurant-food-branding",
      youtubeUrl: "https://youtu.be/yohJXjHmWq4",
    },
    {
      id: 2,
      title: "뷰티 브랜드 KOL 캠페인",
      category: "대만 마케팅",
      image: "/works/work-2.jpg",
      placeholderSeed: "beauty-cosmetics-taiwan-influencer",
      youtubeUrl: "https://youtu.be/BIqrxd5TZnc",
    },
    {
      id: 3,
      title: "병원 브랜드 유튜브 채널",
      category: "스튜디오구프",
      image: "/works/work-3.jpg",
      placeholderSeed: "medical-hospital-youtube-video",
      youtubeUrl: "https://youtu.be/OkQz12vEfOk",
    },
    {
      id: 4,
      title: "F&B 유튜브 채널 운영",
      category: "스튜디오구프",
      image: "/works/work-4.jpg",
      placeholderSeed: "food-beverage-youtube-content",
      youtubeUrl: "https://youtu.be/dYTea-xXkxA",
    },
    {
      id: 5,
      title: "뷰티 브랜드 통합 마케팅",
      category: "대만 마케팅",
      image: "/works/work-5.jpg",
      placeholderSeed: "beauty-brand-taiwan-campaign",
      youtubeUrl: "https://youtu.be/pi-BkiMWpKs",
    },
    {
      id: 6,
      title: "대만 병원 디지털 마케팅",
      category: "대만 마케팅",
      image: "/works/work-6.jpg",
      placeholderSeed: "taiwan-hospital-digital-marketing",
      youtubeUrl: "https://youtu.be/3oCJKSPi0-Y",
    },
    {
      id: 7,
      title: "브랜드 캠페인 영상",
      category: "스튜디오구프",
      image: "/works/work-7.jpg",
      placeholderSeed: "brand-campaign-video-studio",
      youtubeUrl: "https://youtu.be/3lAKXQ2DpA0",
    },
    {
      id: 8,
      title: "대만 SNS 바이럴",
      category: "대만 마케팅",
      image: "/works/work-8.jpg",
      placeholderSeed: "taiwan-social-viral-marketing",
      youtubeUrl: "https://youtu.be/jL5GCXGF2z8",
    },
    {
      id: 9,
      title: "인플루언서 콘텐츠",
      category: "스튜디오구프",
      image: "/works/work-9.jpg",
      placeholderSeed: "influencer-content-production",
      youtubeUrl: "https://youtu.be/AAqAh4qhXeg",
    },
  ],

  // -------------------------------------------------------
  // 클라이언트 로고 (public/clients/ 폴더에 파일 추가 후 logo 경로 수정)
  // -------------------------------------------------------
  clients: [
    { name: "Client 1", logo: "/clients/client-1.jpg" },
    { name: "Client 2", logo: "/clients/client-2.jpg" },
    { name: "Client 3", logo: "/clients/client-3.jpg" },
    { name: "Client 4", logo: "/clients/client-4.jpg" },
    { name: "Client 5", logo: "/clients/client-5.jpg" },
    { name: "Client 6", logo: "/clients/client-6.jpg" },
    { name: "Client 7", logo: "/clients/client-7.jpg" },
    { name: "Client 8", logo: "/clients/client-8.jpg" },
    { name: "Client 9", logo: "/clients/client-9.jpg" },
    { name: "Client 10", logo: "/clients/client-10.jpg" },
    { name: "Client 11", logo: "/clients/client-11.jpg" },
    { name: "Client 12", logo: "/clients/client-12.jpg" },
    { name: "Client 13", logo: "/clients/client-13.jpg" },
    { name: "Client 14", logo: "/clients/client-14.jpg" },
    { name: "Client 15", logo: "/clients/client-15.jpg" },
    { name: "Client 16", logo: "/clients/client-16.jpg" },
    { name: "Client 17", logo: "/clients/client-17.jpg" },
    { name: "Client 18", logo: "/clients/client-18.jpg" },
    { name: "Client 19", logo: "/clients/client-19.jpg" },
    { name: "Client 20", logo: "/clients/client-20.jpg" },
    { name: "Client 21", logo: "/clients/client-21.jpg" },
    { name: "Client 22", logo: "/clients/client-22.jpg" },
    { name: "Client 23", logo: "/clients/client-23.jpg" },
    { name: "Client 24", logo: "/clients/client-24.jpg" },
  ],
};

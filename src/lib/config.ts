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
    email: "b-567@naver.com",
    phone: "02-000-0000",
    address: "서울특별시",
    instagram: "https://www.instagram.com/tianxia_tw",
    // 스튜디오구프 채널 (@스튜디오구프) — 한글 핸들이라 퍼센트 인코딩된 형태로 둔다
    youtube: "https://www.youtube.com/@%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%EA%B5%AC%ED%94%84",
  },

  // -------------------------------------------------------
  // Hero 배경 영상
  // public/videos/ 폴더에 파일을 넣고 파일명만 수정하세요
  // 예: hero.mp4, hero.webm
  // -------------------------------------------------------
  // 프로덕션은 upload-videos.ps1이 압축본을 이 이름으로 업로드함
  heroVideo: "/videos/hero.mp4",
  heroPoster: "/posters/hero-poster.jpg",

  // -------------------------------------------------------
  // 쇼피 & 공동구매 섹션 배경 영상
  // public/videos/ 폴더에 파일을 넣고 파일명 수정
  // -------------------------------------------------------
  shopeeVideo: "/videos/shopee.mp4",
  shopeePoster: "",

  // -------------------------------------------------------
  // 브랜드 필름 (히어로 다음, 로고 마퀴 아래 독립 섹션)
  //
  // 원본은 8K/120fps HEVC라 브라우저가 디코딩하지 못한다.
  // 웹용 H.264 1080p30으로 변환한 파일을 여기서 가리킨다.
  // 원본을 교체할 때는 아래 명령으로 다시 변환할 것:
  //   ffmpeg -i <원본> -an -vf "fps=30,scale=1920:-2:flags=lanczos"
  //     -c:v libx264 -profile:v high -crf 21 -preset medium
  //     -pix_fmt yuv420p -movflags +faststart public/videos/0906.mp4
  // -------------------------------------------------------
  filmVideo: "/videos/0906.mp4",
  filmPoster: "/posters/0906-poster.jpg",

  // -------------------------------------------------------
  // 로고
  // -------------------------------------------------------
  // 원본(새로운 흰색로고.png)은 흰 배경 위 검은 워드마크라 어두운 네비에서 안 보인다.
  // 배경을 투명하게 빼고 글자를 흰색으로 반전한 뒤 여백까지 잘라낸 파일이다.
  logo: {
    src: "/티엔샤_워드마크_흰색.png",
    alt: "티엔샤 로고",
    width: 152,
    height: 40,
  },

  // -------------------------------------------------------
  // 크리에이터 섹션
  //
  // 추가하는 법:
  //   1) public/creators/ 에 사진을 넣습니다 (3:4 세로, 파일명은 영문/숫자/_/. 만)
  //   2) 아래 배열에 { handle, photo } 한 줄 추가
  //
  // handle 은 인스타 아이디입니다. 카드에는 @handle 로 표시되고
  // 클릭하면 https://instagram.com/<handle> 로 이동합니다.
  // 인원수는 제한이 없습니다 — 몇 명이든 마퀴가 알아서 채웁니다.
  // -------------------------------------------------------
  creatorsHeadline: {
    eyebrow: "Our Creators",
    // 아래 한 줄만 바꾸면 헤드라인이 교체됩니다
    title: "Creators We Work With",
    // 헤드라인 아래 설명. 줄바꿈한 그대로 화면에 나옵니다.
    desc: `현지 연예기획사·MCN·엔터테인먼트 네트워킹 풀을 보유합니다.
다양한 분야의 크리에이터와 협업해 브랜드 캠페인을 진행합니다.`,
  },

  creators: [
    { handle: "000.4.2", photo: "/creators/000.4.2.jpg" },
    { handle: "0960kim0960", photo: "/creators/0960kim0960.jpg" },
    { handle: "_min_go", photo: "/creators/_min_go.jpg" },
    { handle: "h0_barbie", photo: "/creators/h0_barbie.jpg" },
    { handle: "kimtaerini", photo: "/creators/kimtaerini.jpg" },
    { handle: "leehozeong", photo: "/creators/leehozeong.jpg" },
    { handle: "luvy00n", photo: "/creators/luvy00n.jpg" },
    { handle: "minjeong_w_", photo: "/creators/minjeong_w_.jpg" },
    { handle: "ppap.eva19", photo: "/creators/ppap.eva19.jpg" },
    { handle: "wlgus2qh", photo: "/creators/wlgus2qh.jpg" },
  ],

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
    { value: "70+", label: "브랜드 파트너" },
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
  // 클라이언트 로고
  //
  // public/clients/ 의 원본(흰 배경 JPG)에서 배경을 빼고 어두운 화면에서
  // 읽히도록 보정한 결과가 public/clients-cutout/ 이다.
  //   · 배경색은 테두리에서 추정해 제거 (흰 배경이 아닌 로고도 있다)
  //   · 검은 잉크는 흰색으로 — 안 그러면 어두운 배경에서 사라진다
  //   · 유채색은 색상을 지키고 밝기 바닥만 올림
  // 화면에서는 기본이 흰 실루엣이고 호버 시 이 색이 드러난다.
  // -------------------------------------------------------
  clients: [
    { name: "Client 1", logo: "/clients-cutout/client-1.png" },
    { name: "Client 2", logo: "/clients-cutout/client-2.png" },
    { name: "Client 3", logo: "/clients-cutout/client-3.png" },
    { name: "Client 4", logo: "/clients-cutout/client-4.png" },
    { name: "Client 5", logo: "/clients-cutout/client-5.png" },
    { name: "Client 6", logo: "/clients-cutout/client-6.png" },
    { name: "Client 7", logo: "/clients-cutout/client-7.png" },
    { name: "Client 8", logo: "/clients-cutout/client-8.png" },
    { name: "Client 9", logo: "/clients-cutout/client-9.png" },
    { name: "Client 10", logo: "/clients-cutout/client-10.png" },
    { name: "Client 12", logo: "/clients-cutout/client-12.png" },
    { name: "Client 13", logo: "/clients-cutout/client-13.png" },
    { name: "Client 14", logo: "/clients-cutout/client-14.png" },
    { name: "Client 15", logo: "/clients-cutout/client-15.png" },
    { name: "Client 16", logo: "/clients-cutout/client-16.png" },
    { name: "Client 17", logo: "/clients-cutout/client-17.png" },
    { name: "Client 18", logo: "/clients-cutout/client-18.png" },
    { name: "Client 19", logo: "/clients-cutout/client-19.png" },
    { name: "Client 20", logo: "/clients-cutout/client-20.png" },
    { name: "Client 21", logo: "/clients-cutout/client-21.png" },
    { name: "Client 22", logo: "/clients-cutout/client-22.png" },
    { name: "Client 23", logo: "/clients-cutout/client-23.png" },
    { name: "Client 24", logo: "/clients-cutout/client-24.png" },
  ],
};

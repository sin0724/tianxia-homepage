// ============================================================
// SEO 공통 상수 · 구조화 데이터 빌더
// ============================================================

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tianxia.kr";

/**
 * 홈 URL은 반드시 슬래시를 포함한다.
 * Google이 색인한 정규 URL이 https://tianxia.kr/ 이므로 canonical·sitemap·
 * 구조화 데이터의 표기를 여기에 맞춰 통일한다.
 */
export const HOME_URL = `${BASE_URL}/`;

export interface ServiceSpec {
  name: string;
  description: string;
}

export interface FaqSpec {
  q: string;
  a: string;
}

interface PageSchemaInput {
  /** 선행 슬래시를 포함한 경로. 예: "/taiwan-marketing" */
  path: string;
  /** 페이지 제목 (breadcrumb 마지막 항목으로도 사용) */
  name: string;
  description: string;
  /** 이 페이지가 설명하는 서비스 목록 */
  services?: ServiceSpec[];
  /**
   * 화면에 실제로 보이는 FAQ만 넘긴다.
   * Google은 FAQPage 구조화 데이터에 대해 같은 페이지에 보이는 문답을 요구한다.
   */
  faq?: FaqSpec[];
  /** 상위 페이지가 있으면 breadcrumb에 한 단계 더 넣는다. */
  parent?: { path: string; name: string };
}

/**
 * 하위 페이지용 WebPage + BreadcrumbList + Service 그래프.
 *
 * 루트 레이아웃의 그래프에는 Organization/WebSite만 남겨 두고, 페이지별 WebPage는
 * 각 페이지에서 자신의 URL로 선언한다. (이전에는 레이아웃의 WebPage 노드가 모든
 * 하위 페이지에서 url을 홈으로 선언해, 랜딩 3종이 구조화 데이터상 홈으로 보였다.)
 */
export function buildPageJsonLd({
  path,
  name,
  description,
  services = [],
  faq = [],
  parent,
}: PageSchemaInput) {
  const url = `${BASE_URL}${path}`;

  const crumbs = [
    { "@type": "ListItem", position: 1, name: "홈", item: HOME_URL },
    ...(parent
      ? [
          {
            "@type": "ListItem",
            position: 2,
            name: parent.name,
            item: `${BASE_URL}${parent.path}`,
          },
        ]
      : []),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        primaryImageOfPage: `${BASE_URL}/og-kakao.jpg`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          ...crumbs,
          {
            "@type": "ListItem",
            position: crumbs.length + 1,
            name,
            item: url,
          },
        ],
      },
      ...(faq.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
      ...services.map((service, i) => ({
        "@type": "Service",
        "@id": `${url}#service-${i + 1}`,
        name: service.name,
        description: service.description,
        serviceType: service.name,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: ["KR", "TW"],
        isPartOf: { "@id": `${url}#webpage` },
      })),
    ],
  };
}

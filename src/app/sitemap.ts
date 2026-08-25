import { MetadataRoute } from "next";
import { BASE_URL, HOME_URL } from "@/lib/seo";
import { LANDING_PAGES } from "@/lib/landing-pages";

/**
 * 콘텐츠를 실제로 수정할 때만 갱신한다.
 * 이전에는 new Date()를 써서 크롤할 때마다 "방금 변경됨"으로 보고했는데,
 * 실제 변경이 없으면 Google이 lastmod 신호 자체를 무시하게 된다.
 */
const LAST_MODIFIED = new Date("2026-08-24");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // 색인된 정규 URL이 https://tianxia.kr/ 이므로 슬래시를 포함한다.
      url: HOME_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...LANDING_PAGES.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
  ];
}

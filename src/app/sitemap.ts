import { MetadataRoute } from "next";
import { BASE_URL, HOME_URL } from "@/lib/seo";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { INSIGHTS, latestInsightDate } from "@/lib/insights";

/**
 * 콘텐츠를 실제로 수정할 때만 갱신한다.
 * 이전에는 new Date()를 써서 크롤할 때마다 "방금 변경됨"으로 보고했는데,
 * 실제 변경이 없으면 Google이 lastmod 신호 자체를 무시하게 된다.
 */
const LAST_MODIFIED = new Date("2026-09-26");

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
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(latestInsightDate()),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...INSIGHTS.map((item) => ({
      url: `${BASE_URL}/insights/${item.slug}`,
      lastModified: new Date(item.updatedAt ?? item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

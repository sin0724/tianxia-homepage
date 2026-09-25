import { BASE_URL, HOME_URL } from "@/lib/seo";
import { INSIGHTS } from "@/lib/insights";

/**
 * 네이버 서치어드바이저·구글에 제출하는 RSS.
 * 예전엔 public/rss.xml에 홈 한 건만 있어서 수집할 새 글이 없었다.
 * 이제 인사이트 칼럼 레지스트리에서 생성한다.
 */
export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function rfc822(iso: string) {
  return new Date(`${iso}T09:00:00+09:00`).toUTCString();
}

export function GET() {
  const items = INSIGHTS.map((item) => {
    const url = `${BASE_URL}/insights/${item.slug}`;
    return `    <item>
      <title>${esc(item.title)}</title>
      <link>${url}</link>
      <description>${esc(item.description)}</description>
      <pubDate>${rfc822(item.publishedAt)}</pubDate>
      <guid isPermaLink="true">${url}</guid>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>티엔샤 TIANXIA — 대만 마케팅 인사이트</title>
    <link>${HOME_URL}</link>
    <description>대만 마케팅 전문 에이전시 티엔샤의 대만마케팅 실무 칼럼. 번체 현지화, Dcard, KOC 시딩, LINE, 쇼피까지.</description>
    <language>ko</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

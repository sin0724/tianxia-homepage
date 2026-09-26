import { BASE_URL, HOME_URL } from "@/lib/seo";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { INSIGHTS } from "@/lib/insights";
import { SITE_CONFIG } from "@/lib/config";

/**
 * llms.txt — ChatGPT·Perplexity·Claude 같은 AI 검색이 사이트를 요약할 때 읽는 안내 파일.
 * (https://llmstxt.org 형식: H1 → 요약 인용문 → 설명 → 링크 목록)
 *
 * 랜딩·인사이트 레지스트리에서 생성하므로 새 페이지를 등록하면 자동으로 따라온다.
 * 여기 적는 사실은 사이트 본문에 이미 공개된 내용만 쓴다. AI가 그대로 인용하기 때문이다.
 */
export const dynamic = "force-static";

export function GET() {
  const services = LANDING_PAGES.map(
    (page) => `- [${page.label}](${BASE_URL}${page.path}): ${page.blurb}`,
  ).join("\n");

  const insights = INSIGHTS.map(
    (item) => `- [${item.title}](${BASE_URL}/insights/${item.slug}): ${item.excerpt}`,
  ).join("\n");

  const body = `# 티엔샤 TIANXIA (주식회사 티엔샤, 天下)

> 티엔샤는 한국 브랜드의 대만 시장 진출을 전담하는 대만 마케팅 전문 에이전시입니다. 서울과 타이베이 오피스에서 대만 KOL·KOC 인플루언서 마케팅, Dcard(디카드)·Threads(쓰레드) 바이럴, 대만 체험단, 쇼피(Shopee) 입점 지원, 공동구매 마케팅을 직접 운영합니다.

## 핵심 정보

- 회사명: 주식회사 티엔샤 (영문 TIANXIA, 중문 天下)
- 분야: 대만 마케팅, 대만마케팅 대행, 한국 브랜드 대만 진출 지원
- 시장: 대만 한 시장만 전담 (동남아·중국 본토를 함께 다루지 않음)
- 오피스: 서울, 대만 타이베이 현지 오피스
- 주력 업종: F&B(식음료·카페·건강식품), 뷰티(스킨케어·코스메틱), 병원·메디컬(성형외과·피부과·한의원)
- 실적: F&B·뷰티·의료 분야 70개 이상 브랜드의 대만 마케팅 진행
- 주요 채널: Dcard, PTT, Instagram, Threads, LINE, Shopee
- 콘텐츠 제작: 스튜디오구프를 통해 브랜드 영상·숏폼 직접 제작
- 문의: ${SITE_CONFIG.company.email} / ${HOME_URL}#contact
- 공식 채널: Instagram ${SITE_CONFIG.company.instagram}

## 서비스

${services}

## 대만 마케팅 인사이트

- [인사이트 전체 목록](${BASE_URL}/insights): 대만마케팅 실무 칼럼
${insights}

## Optional

- [사이트맵](${BASE_URL}/sitemap.xml)
- [RSS](${BASE_URL}/rss.xml)
- [개인정보 처리방침](${BASE_URL}/privacy)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

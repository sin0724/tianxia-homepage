import { LANDING_PAGES } from "@/lib/landing-pages";

const LINKS = [
  { href: "/", label: "티엔샤 홈" },
  ...LANDING_PAGES.map((page) => ({ href: page.path, label: page.label })),
];

/**
 * 사이트 전역 탐색 링크.
 *
 * 홈이 FullPageScroll(클라이언트 섹션 전환)로 동작하는 탓에 Navbar가 전부 <button>이라
 * 서버 HTML에 <a href>가 하나도 없었다. 그 결과 서비스 랜딩 3종은 어느 페이지에서도
 * 링크되지 않는 고아 페이지가 되어, Search Console에 "발견됨 - 현재 색인이 생성되지 않음"
 * (최종 크롤링 기록 없음) 상태로 남아 있었다.
 *
 * 디자인·인터랙션을 바꾸지 않고 크롤 경로와 키보드/스크린리더 접근 경로만 확보하기 위해
 * HeroSection의 sr-only H1과 같은 방식으로 시각적으로만 숨긴 실제 링크를 전 페이지에 렌더한다.
 * sr-only는 position:absolute + clip이라 레이아웃 흐름에 영향을 주지 않는다.
 */
export default function SiteNavLinks() {
  return (
    <nav className="sr-only" aria-label="사이트 주요 페이지">
      <ul>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

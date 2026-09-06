import SiteChrome from "@/components/SiteChrome";

/**
 * 공개 사이트 전용 레이아웃.
 *
 * 스크롤 진행바 / 커스텀 커서는 여기서만 붙는다.
 * 관리자(/admin)는 이 그룹 밖이라 아예 렌더되지 않는다.
 *
 * 루트 레이아웃에 두고 usePathname()으로 분기하던 방식은 못 쓴다 —
 * SSR 시점에 경로를 못 받는 경우가 있어 관리자 HTML에도 z-200 오버레이가
 * 그대로 실려 나갔고, 화면이 덮여 클릭이 전부 막혔다.
 * 라우트 그룹은 URL을 바꾸지 않으면서 이 경계를 구조로 보장한다.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteChrome />
      {children}
    </>
  );
}

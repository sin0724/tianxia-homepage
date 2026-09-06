import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

/**
 * 공개 사이트 공통 레이어 — 스크롤 진행바 / 커스텀 커서.
 *
 * app/(site)/layout.tsx 에서만 붙는다. 관리자는 그룹 밖이라 실행되지 않는다.
 * 인트로 로더는 홈에서만 도는 연출이라 여기가 아니라 홈 페이지가 직접 가진다.
 */
export default function SiteChrome() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}

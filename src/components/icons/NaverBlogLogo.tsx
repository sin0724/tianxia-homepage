/**
 * 네이버 블로그 로고 — phosphor에 없어서 직접 그린다.
 * 둥근 사각형 안의 N을 비워(evenodd) currentColor 하나로 칠하므로,
 * phosphor 아이콘처럼 글자색·호버색을 그대로 따른다. (weight는 시그니처 호환용)
 */
export default function NaverBlogLogo({
  size = 24,
  className = "",
}: {
  size?: number;
  weight?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm1 4.5v9h3v-4.6l3.1 4.6H17v-9h-3v4.6L10.9 7.5H8Z"
      />
    </svg>
  );
}

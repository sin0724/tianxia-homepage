/**
 * 버튼 배경이 아래에서 위로 차오르는 호버.
 *
 * 쓰는 법 — 버튼/링크에 `relative overflow-hidden group`을 주고
 * 이 컴포넌트를 첫 자식으로 넣은 뒤, 실제 내용은 `relative z-10`으로 감싼다.
 *
 *   <a className="relative overflow-hidden group ...">
 *     <FillHover className="bg-white" />
 *     <span className="relative z-10">문의하기</span>
 *   </a>
 *
 * transform만 움직이므로 리플로우가 없고, 색만 바뀌던 기존 호버보다
 * 클릭할 것 같은 손맛이 있다.
 */
export default function FillHover({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    />
  );
}

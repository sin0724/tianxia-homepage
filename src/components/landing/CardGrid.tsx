import Link from "next/link";

export interface Card {
  title: string;
  desc: string;
  /** 프로세스 단계 번호처럼 제목 위에 붙는 라벨 */
  eyebrow?: string;
  /** 있으면 카드 전체가 해당 페이지로 가는 링크가 된다 (허브 → 하위 페이지 내부링크) */
  href?: string;
}

/** 테두리 카드 그리드 — 기존 랜딩의 서비스/프로세스 카드와 동일한 스타일. */
export default function CardGrid({
  items,
  columns = 2,
}: {
  items: Card[];
  columns?: 2 | 3;
}) {
  const grid = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={`grid ${grid} gap-6`}>
      {items.map((item) => {
        const inner = (
          <>
            {item.eyebrow && (
              <p className="text-[11px] font-mono text-red-500/70 mb-2">
                {item.eyebrow}
              </p>
            )}
            <h3 className="text-base font-bold text-zinc-50 mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            {item.href && (
              <p className="mt-3 text-xs font-mono text-red-400">자세히 보기 →</p>
            )}
          </>
        );
        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            className="block border border-zinc-800 p-6 hover:border-red-600/60 transition-colors"
          >
            {inner}
          </Link>
        ) : (
          <div key={item.title} className="border border-zinc-800 p-6">
            {inner}
          </div>
        );
      })}
    </div>
  );
}

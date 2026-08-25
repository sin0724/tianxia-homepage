export interface Card {
  title: string;
  desc: string;
  /** 프로세스 단계 번호처럼 제목 위에 붙는 라벨 */
  eyebrow?: string;
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
      {items.map((item) => (
        <div key={item.title} className="border border-zinc-800 p-6">
          {item.eyebrow && (
            <p className="text-[11px] font-mono text-red-500/70 mb-2">
              {item.eyebrow}
            </p>
          )}
          <h3 className="text-base font-bold text-zinc-50 mb-2">{item.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

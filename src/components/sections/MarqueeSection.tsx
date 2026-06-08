const MARQUEE_ITEMS = [
  "대만 마케팅",
  "F&B",
  "뷰티",
  "병원",
  "인플루언서",
  "스튜디오구프",
  "유튜브 제작",
  "KOL 바이럴",
  "Taiwan Marketing",
  "퍼포먼스 마케팅",
  "SNS 콘텐츠",
];

const SEPARATOR = <span className="text-red-600 mx-4 md:mx-6 select-none">台</span>;

export default function MarqueeSection() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="overflow-hidden border-y border-zinc-800 bg-zinc-950 py-5">
      <div className="marquee-track flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-sm md:text-base font-medium text-zinc-400 uppercase tracking-widest"
          >
            {item}
            {SEPARATOR}
          </span>
        ))}
      </div>
    </div>
  );
}

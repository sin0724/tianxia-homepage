/** 랜딩 페이지 공통 섹션 — 기존 랜딩의 구분선 스타일을 그대로 따른다. */
export default function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mt-16 border-t border-zinc-800 pt-12">
      <h2 className="text-2xl font-black mb-2">{title}</h2>
      {lead && (
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-8">
          {lead}
        </p>
      )}
      {children}
    </section>
  );
}

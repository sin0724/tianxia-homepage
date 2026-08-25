export interface FaqItem {
  q: string;
  a: string;
}

/**
 * 눈에 보이는 FAQ.
 *
 * FAQPage 구조화 데이터는 같은 페이지에 실제로 보이는 문답이 있어야 한다는 것이
 * Google의 요구사항이다. 이전에는 루트 레이아웃이 전 페이지에 FAQPage를 내보내면서
 * 정작 화면에는 FAQ가 한 곳도 없었다. 이 컴포넌트를 쓰는 페이지에만 스키마를 붙인다.
 */
export default function FaqSection({
  items,
  title = "자주 묻는 질문",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section className="mt-16 border-t border-zinc-800 pt-12">
      <h2 className="text-2xl font-black mb-8">{title}</h2>
      <dl className="space-y-6">
        {items.map((item) => (
          <div key={item.q} className="border border-zinc-800 p-6">
            <dt className="text-base font-bold text-zinc-50 mb-2">{item.q}</dt>
            <dd className="text-sm text-zinc-500 leading-relaxed">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

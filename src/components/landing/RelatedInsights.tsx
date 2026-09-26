import Link from "next/link";
import { INSIGHTS } from "@/lib/insights";

/**
 * 상업 랜딩 → 정보성 칼럼 연결. 검색으로 칼럼에 들어온 사람과 랜딩에 들어온 사람이
 * 서로의 페이지로 이동할 수 있게 해, 주제 클러스터를 양방향으로 묶는다.
 */
export default function RelatedInsights({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((slug) => INSIGHTS.find((i) => i.slug === slug))
    .filter((i): i is (typeof INSIGHTS)[number] => Boolean(i));
  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-zinc-800 pt-12">
      <h2 className="text-2xl font-black mb-8">관련 인사이트</h2>
      <ul className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/insights/${item.slug}`}
              className="block h-full border border-zinc-800 p-6 hover:border-red-600/60 transition-colors"
            >
              <h3 className="text-base font-bold text-zinc-50 mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

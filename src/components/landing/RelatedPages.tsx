import Link from "next/link";
import { otherLandingPages } from "@/lib/landing-pages";

/**
 * 눈에 보이는 서비스 간 상호 링크.
 *
 * 허브(/taiwan-marketing)와 하위 주제 페이지를 실제 링크로 묶어, 크롤러가 사이트맵
 * 없이도 전체 클러스터를 순회할 수 있게 한다. 앵커 텍스트는 각 페이지의 타겟 키워드다.
 */
export default function RelatedPages({ currentPath }: { currentPath: string }) {
  const pages = otherLandingPages(currentPath);

  return (
    <section className="mt-16 border-t border-zinc-800 pt-12">
      <h2 className="text-2xl font-black mb-8">함께 보면 좋은 서비스</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="block border border-zinc-800 p-6 hover:border-red-600/60 transition-colors"
          >
            <h3 className="text-base font-bold text-zinc-50 mb-2">
              {page.label}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{page.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

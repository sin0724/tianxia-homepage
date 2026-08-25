import Link from "next/link";

/** 랜딩 하단 상담 CTA — 기존 랜딩의 버튼 스타일과 동일. */
export default function ContactCta({
  title,
  desc,
  label = "무료 상담 신청",
}: {
  title: string;
  desc: string;
  label?: string;
}) {
  return (
    <section className="mt-16 border-t border-zinc-800 pt-12">
      <h2 className="text-2xl font-black mb-4">{title}</h2>
      <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
        {desc}
      </p>
      <Link
        href="/#contact"
        className="inline-block px-6 py-3 bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors"
      >
        {label}
      </Link>
    </section>
  );
}

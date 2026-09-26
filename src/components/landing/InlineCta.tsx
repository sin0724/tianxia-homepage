import Link from "next/link";

/** 본문 중간의 가벼운 상담 유도 한 줄. 과도한 반복을 피하려고 페이지당 한 번만 쓴다. */
export default function InlineCta({ text, label }: { text: string; label: string }) {
  return (
    <div className="mt-16 border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <p className="text-sm text-zinc-300 leading-relaxed">{text}</p>
      <Link
        href="/#contact"
        className="shrink-0 inline-block px-5 py-2.5 border border-red-600 text-red-400 text-sm font-bold hover:bg-red-600 hover:text-white transition-colors"
      >
        {label}
      </Link>
    </div>
  );
}

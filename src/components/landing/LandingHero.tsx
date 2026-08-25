import Link from "next/link";

/** 랜딩 상단 블록 — 기존 /taiwan-marketing 히어로와 동일한 구성. */
export default function LandingHero({
  backHref = "/",
  backLabel = "← tianxia.kr",
  eyebrow,
  title,
  titleAccent,
  lead,
  tags = [],
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lead: string;
  tags?: string[];
}) {
  return (
    <>
      <Link
        href={backHref}
        className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-500 hover:text-red-400 transition-colors"
      >
        {backLabel}
      </Link>

      <p className="mt-10 text-red-500/70 text-[11px] font-mono tracking-[0.3em] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="text-red-500">{titleAccent}</span>
          </>
        )}
      </h1>

      <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
        {lead}
      </p>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-3 py-1 border border-zinc-700 text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

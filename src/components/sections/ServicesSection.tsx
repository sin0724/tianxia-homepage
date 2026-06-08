"use client";

import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const GAP = 20; // px — marginRight와 동일하게 유지해야 루프가 맞음

function LogoRow({
  logos,
  speed,
  reverse = false,
}: {
  logos: typeof SITE_CONFIG.clients;
  speed: number;
  reverse?: boolean;
}) {
  // gap 대신 marginRight 사용: 마지막 아이템 뒤에도 동일 간격이 붙어 -50% 루프가 정확해짐
  const track = [...logos, ...logos];

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />

      <div
        className="flex items-center"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
          willChange: "transform",
        }}
      >
        {track.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex-shrink-0 w-44 h-20 bg-white flex items-center justify-center px-5 py-3"
            style={{ marginRight: `${GAP}px` }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={140}
              height={56}
              className="object-contain w-full h-full"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const logos = SITE_CONFIG.clients;

  return (
    <section className="h-[100dvh] bg-zinc-950 flex flex-col px-6 md:px-12 pt-24 pb-10 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full">

        {/* 헤더 */}
        <div className="flex-shrink-0 pb-6">
          <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-3">
            Our Clients
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-zinc-50">
            Brands We&apos;ve{" "}
            <span className="text-red-600">Worked With</span>
          </h2>
        </div>

        <div className="border-t border-zinc-800 flex-shrink-0" />

        {/* 로고 마퀴 — 수직 중앙 */}
        <div className="flex-1 flex flex-col justify-center gap-5 min-h-0">
          <LogoRow logos={logos.slice(0, 8)} speed={35} />
          <LogoRow logos={logos.slice(8, 16)} speed={28} reverse />
          <LogoRow logos={logos.slice(16)} speed={42} />
        </div>

        {/* 하단 카운터 */}
        <div className="flex-shrink-0 border-t border-zinc-800/40 pt-5 flex items-center gap-4">
          <span className="text-2xl md:text-3xl font-black text-zinc-50">70+</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-mono leading-tight">
            Brand<br />Partners
          </span>
          <div className="w-px h-6 bg-zinc-800 mx-1" />
          <p className="text-xs text-zinc-600 max-w-[36ch] leading-relaxed">
            Trusted by leading brands across F&B, Beauty, and Medical industries.
          </p>
        </div>

      </div>
    </section>
  );
}

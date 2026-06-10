"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAnimationFrame, useReducedMotion } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import { useSectionState } from "@/components/SectionContext";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";

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

  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0); // 0~50 (%)
  const velocity = useRef(1); // 속도 배율 — hover 시 0.35로 부드럽게 감속
  const hovered = useRef(false);
  const reduce = useReducedMotion();
  const { isActive } = useSectionState();

  // CSS 키프레임 대신 JS 구동: hover 감속을 점프 없이 처리, 비활성 섹션은 정지
  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el || reduce || !isActive) return;
    const target = hovered.current ? 0.35 : 1;
    velocity.current += (target - velocity.current) * Math.min(1, delta / 250);
    const pctPerMs = 50 / (speed * 1000);
    offset.current = (offset.current + pctPerMs * velocity.current * delta) % 50;
    const x = reverse ? -50 + offset.current : -offset.current;
    el.style.transform = `translateX(${x}%)`;
  });

  return (
    <div
      className="overflow-hidden relative grayscale-[50%] hover:grayscale-0 transition-[filter] duration-500"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />

      <div
        ref={trackRef}
        className="flex items-center"
        style={{ willChange: "transform" }}
      >
        {track.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex-shrink-0 w-28 h-14 md:w-44 md:h-20 bg-white flex items-center justify-center px-3 py-2 md:px-5 md:py-3"
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
    <section className="h-[100dvh] bg-zinc-950 flex flex-col px-6 md:px-12 pt-20 md:pt-24 pb-6 md:pb-10 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full">

        {/* 헤더 */}
        <div className="flex-shrink-0 pb-6">
          <Reveal delay={0} y={12}>
            <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-3">
              Our Clients
            </p>
          </Reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-zinc-50">
            <MaskReveal delay={0.08}>
              Brands We&apos;ve{" "}
              <span className="text-red-600">Worked With</span>
            </MaskReveal>
          </h2>
        </div>

        <LineReveal delay={0.16} className="h-px bg-zinc-800 flex-shrink-0" />

        {/* 로고 마퀴 — 수직 중앙, 그룹 단위 1회 fade */}
        <Reveal delay={0.24} y={20} className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 flex flex-col justify-center gap-3 md:gap-5 min-h-0">
            <LogoRow logos={logos.slice(0, 8)} speed={35} />
            <LogoRow logos={logos.slice(8, 16)} speed={28} reverse />
            <LogoRow logos={logos.slice(16)} speed={42} />
          </div>
        </Reveal>

        {/* 하단 카운터 */}
        <Reveal delay={0.32} y={16} className="flex-shrink-0 border-t border-zinc-800/40 pt-5 flex items-center gap-4">
          <CountUp to={70} suffix="+" className="text-2xl md:text-3xl font-black text-zinc-50" />
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-mono leading-tight">
            Brand<br />Partners
          </span>
          <div className="w-px h-6 bg-zinc-800 mx-1" />
          <p className="text-xs text-zinc-600 max-w-[36ch] leading-relaxed">
            Trusted by leading brands across F&B, Beauty, and Medical industries.
          </p>
        </Reveal>

      </div>
    </section>
  );
}

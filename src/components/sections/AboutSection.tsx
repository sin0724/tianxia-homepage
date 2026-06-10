"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { useSectionState } from "@/components/SectionContext";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";

function VideoCard({
  target,
  index,
}: {
  target: (typeof SITE_CONFIG.aboutTargets)[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isActive } = useSectionState();

  // 활성 섹션에서만 재생 — 숨겨진 프리로드 사본은 버퍼링만
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive]);

  return (
    <div className="relative overflow-hidden bg-zinc-900 flex flex-col group h-full">
      <video
        ref={videoRef}
        src={target.video}
        poster={target.poster}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-[opacity,transform] duration-700 group-hover:opacity-90 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
      <div className="relative z-10 mt-auto p-4 md:p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <p className="text-zinc-500 text-[10px] font-mono tracking-[0.15em] uppercase mb-1 md:mb-2">
          0{index + 1}
        </p>
        <h3 className="text-lg md:text-2xl font-bold text-zinc-50 mb-0.5 md:mb-1 group-hover:text-red-400 transition-colors duration-300">
          {target.industry}
        </h3>
        <p className="text-xs text-zinc-500">{target.desc}</p>
        <div className="h-px w-10 bg-red-500 mt-3 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  };

  const targets = SITE_CONFIG.aboutTargets;

  return (
    <section className="h-[100dvh] bg-zinc-950 flex flex-col px-6 md:px-12 pt-20 md:pt-24 pb-0 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1 min-h-0">

        {/* 헤드라인 */}
        <div className="mb-3 md:mb-4 flex-shrink-0">
          <Reveal delay={0} y={12}>
            <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-3">
              KOL Marketing
            </p>
          </Reveal>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-zinc-50">
            <MaskReveal delay={0.08}>
              Together We <span className="text-red-600">Create Value</span>
            </MaskReveal>
          </h2>
        </div>

        {/* 설명 */}
        <div className="mb-3 md:mb-8 flex-shrink-0">
          <Reveal delay={0.16}>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-[52ch]">
              대만 현지 KOL 네트워크로 브랜드와 소비자를 연결합니다.<br />
              F&B, 뷰티, 병원 브랜드의 대만 KOL 마케팅을 전담합니다.
            </p>
          </Reveal>
        </div>

        {/* 카드 영역 */}
        <LineReveal delay={0.2} className="h-px bg-zinc-800 flex-shrink-0" />
        <div className="flex-1 min-h-0 pt-4 md:pt-5 flex flex-col">

          {/* 모바일: 스와이프 캐러셀 */}
          <Reveal delay={0.24} y={20} className="md:hidden flex-1 min-h-0 flex flex-col">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {targets.map((target, i) => (
                <div key={target.industry} className="snap-start snap-always flex-shrink-0 w-full h-full pr-0">
                  <VideoCard target={target} index={i} />
                </div>
              ))}
            </div>
          </Reveal>

          {/* 모바일: 도트 인디케이터 */}
          <div className="md:hidden flex justify-center gap-2 pt-3 pb-2 flex-shrink-0">
            {targets.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollRef.current?.scrollTo({ left: i * scrollRef.current.clientWidth, behavior: "smooth" });
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 h-[3px] bg-red-500" : "w-[6px] h-[3px] bg-zinc-600"
                }`}
              />
            ))}
          </div>

          {/* 데스크탑: 3열 그리드 */}
          <div className="hidden md:grid md:grid-cols-3 gap-3 flex-1 min-h-0">
            {targets.map((target, i) => (
              <Reveal
                key={target.industry}
                delay={0.24 + i * 0.08}
                y={28}
                className="h-full min-h-0"
              >
                <VideoCard target={target} index={i} />
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

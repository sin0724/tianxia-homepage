"use client";

import { useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";
import { useVideoInView } from "@/components/motion/useVideoInView";

function VideoCard({ target }: { target: (typeof SITE_CONFIG.aboutTargets)[0] }) {
  const { containerRef, videoRef, shouldLoad } = useVideoInView({ amount: 0.3 });

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-zinc-900 flex flex-col group h-full"
    >
      <video
        ref={videoRef}
        src={shouldLoad ? target.video : undefined}
        poster={target.poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-[opacity,transform] duration-700 group-hover:opacity-90 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
      <div className="relative z-10 mt-auto p-4 md:p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1">
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
    <section
      id="about"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-zinc-950 px-6 md:px-12 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto">

        {/* 헤드라인 */}
        <div className="mb-3 md:mb-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-zinc-50">
            <MaskReveal delay={0.08}>
              Together We <span className="text-red-600">Create Value</span>
            </MaskReveal>
          </h2>
        </div>

        {/* 설명 */}
        <div className="mb-3 md:mb-8">
          <Reveal delay={0.16}>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-[52ch]">
              대만 현지 KOL 네트워크로 브랜드와 소비자를 연결합니다.<br />
              F&B, 뷰티, 병원 브랜드의 대만 KOL 마케팅을 전담합니다.
            </p>
          </Reveal>
        </div>

        {/* 카드 영역 */}
        <LineReveal delay={0.2} className="h-px bg-zinc-800" />
        <div className="pt-6 md:pt-8">

          {/* 모바일: 스와이프 캐러셀 */}
          <Reveal delay={0.24} y={20} className="md:hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex h-[70vh] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {targets.map((target) => (
                <div key={target.industry} className="snap-start snap-always flex-shrink-0 w-full h-full">
                  <VideoCard target={target} />
                </div>
              ))}
            </div>
          </Reveal>

          {/* 모바일: 도트 인디케이터 */}
          <div className="md:hidden flex justify-center gap-2 pt-3 pb-2">
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
          <div className="hidden md:grid md:grid-cols-3 gap-3">
            {targets.map((target, i) => (
              <Reveal
                key={target.industry}
                delay={i * 0.08}
                y={28}
                className="aspect-[4/5]"
              >
                <VideoCard target={target} />
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

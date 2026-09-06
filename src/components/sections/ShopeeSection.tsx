"use client";

import { motion, useReducedMotion } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";
import { useVideoInView } from "@/components/motion/useVideoInView";

const STEPS = [
  {
    num: "01",
    title: "쇼피 입점 지원",
    desc: "티엔샤 전용 링크로 등록,\n트래킹 & 다양한 혜택 지원",
  },
  {
    num: "02",
    title: "상품 현지화",
    desc: "번역, 상세페이지,\n키워드 최적화",
  },
  {
    num: "03",
    title: "KOL 섭외·매칭",
    desc: "브랜드 핏 맞는\nKOL 연결",
  },
  {
    num: "04",
    title: "공동구매 판매",
    desc: "릴스·스토리로\n바이럴 판매 전환",
  },
];

export default function ShopeeSection() {
  const reduce = useReducedMotion();
  const { containerRef, videoRef, shouldLoad, isActive } = useVideoInView({
    amount: 0.3,
  });

  return (
    <section
      id="shopee"
      className="scroll-mt-16 md:scroll-mt-[68px] min-h-[100dvh] relative overflow-hidden bg-zinc-950"
    >
      {SITE_CONFIG.shopeeVideo && (
        // Ken Burns: 머무는 동안 아주 느린 줌 인-아웃 반복
        <motion.div
          ref={containerRef}
          className="absolute inset-0"
          animate={!reduce && isActive ? { scale: [1, 1.04] } : { scale: 1 }}
          transition={
            !reduce && isActive
              ? {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 1,
                }
              : { duration: 0.3 }
          }
        >
          <video
            ref={videoRef}
            src={shouldLoad ? SITE_CONFIG.shopeeVideo : undefined}
            poster={SITE_CONFIG.shopeePoster || undefined}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20" />

      <div className="relative z-10 min-h-[100dvh] flex flex-col px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1">

          <div className="flex-1 flex flex-col justify-center py-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-zinc-50">
              <MaskReveal delay={0.08}>쇼피 입점 지원부터</MaskReveal>
              <MaskReveal delay={0.16}>
                <span className="text-red-600">공동구매 마케팅</span>까지
              </MaskReveal>
            </h2>
            <Reveal delay={0.24}>
              <p className="mt-4 text-zinc-400 text-xs md:text-sm leading-relaxed max-w-[44ch]">
                대만 쇼피 진출의 첫 단추부터 KOL 공동구매 바이럴까지,<br className="hidden md:block" />
                티엔샤가 전 과정을 함께합니다.
              </p>
            </Reveal>
          </div>

          <div>
            <LineReveal delay={0.2} className="h-px bg-zinc-700/60 mb-6 md:mb-8" />

            {/* 데스크탑: 4열 */}
            <div className="hidden md:grid grid-cols-4">
              {STEPS.map((step, i) => (
                <Reveal
                  key={step.num}
                  delay={0.28 + i * 0.07}
                  y={20}
                  className={`pr-8 ${i > 0 ? "pl-8 border-l border-zinc-700/40" : ""}`}
                >
                  <p className="text-red-500/70 text-[10px] font-mono tracking-[0.25em] mb-3">{step.num}</p>
                  <h3 className="text-zinc-50 font-bold text-lg mb-2 leading-tight">{step.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed whitespace-pre-line">{step.desc}</p>
                </Reveal>
              ))}
            </div>

            {/* 모바일: 2×2 — 모바일은 그룹 단위 1회 fade로 절제 */}
            <Reveal delay={0.28} y={20} className="md:hidden">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {STEPS.map((step) => (
                  <div key={step.num}>
                    <p className="text-red-500/70 text-[10px] font-mono tracking-[0.25em] mb-2">{step.num}</p>
                    <h3 className="text-zinc-50 font-bold text-sm mb-1.5 leading-tight">{step.title}</h3>
                    <p className="text-zinc-500 text-[11px] leading-relaxed whitespace-pre-line">{step.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

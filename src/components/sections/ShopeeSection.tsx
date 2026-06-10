"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { useSectionState } from "@/components/SectionContext";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";

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
    <section className="h-[100dvh] relative overflow-hidden bg-zinc-950">
      {SITE_CONFIG.shopeeVideo && (
        <video
          ref={videoRef}
          src={SITE_CONFIG.shopeeVideo}
          poster={SITE_CONFIG.shopeePoster || undefined}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20" />

      <div className="relative z-10 h-full flex flex-col px-6 md:px-12 pt-20 md:pt-24 pb-8 md:pb-10">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full">

          <div className="flex-1 flex flex-col justify-center">
            <Reveal delay={0} y={12}>
              <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-3">
                Shopee &amp; Co-Buy
              </p>
            </Reveal>
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

          <div className="flex-shrink-0">
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

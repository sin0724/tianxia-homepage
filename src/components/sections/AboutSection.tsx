"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function VideoCard({
  target,
  index,
}: {
  target: (typeof SITE_CONFIG.aboutTargets)[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: EASE }}
      className="relative overflow-hidden bg-zinc-900 flex flex-col group"
    >
      {/* 영상 */}
      <video
        ref={videoRef}
        src={target.video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
      />

      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />

      {/* 텍스트 */}
      <div className="relative z-10 mt-auto p-5 md:p-6">
        <p className="text-zinc-500 text-[10px] font-mono tracking-[0.15em] uppercase mb-2">
          0{index + 1}
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-zinc-50 mb-1 group-hover:text-red-400 transition-colors duration-300">
          {target.industry}
        </h3>
        <p className="text-xs text-zinc-500">{target.desc}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="h-[100dvh] bg-zinc-950 flex flex-col px-6 md:px-12 pt-24 pb-0 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1 min-h-0">

        {/* 상단: 헤드라인 */}
        <motion.div {...fadeUp(0.05)} className="mb-4 flex-shrink-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-zinc-50 whitespace-nowrap">
            Together We <span className="text-red-600">Create Value</span>
          </h2>
        </motion.div>

        {/* 헤드라인 바로 아래 설명 */}
        <motion.div {...fadeUp(0.12)} className="mb-8 flex-shrink-0">
          <p className="text-zinc-400 text-sm leading-relaxed max-w-[52ch]">
            티엔샤는 대만 현지 네트워크와 한국 마케팅 노하우를 결합해<br />
            F&B, 뷰티, 병원 브랜드를 대만 소비자와 연결합니다.
          </p>
        </motion.div>

        {/* 하단: 타겟 산업 영상 카드 */}
        <div className="border-t border-zinc-800 flex-1 min-h-0 pt-5">
          <div className="grid grid-cols-3 gap-3 h-full">
            {SITE_CONFIG.aboutTargets.map((target, i) => (
              <VideoCard key={target.industry} target={target} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

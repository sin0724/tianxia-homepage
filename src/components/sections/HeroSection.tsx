"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ContactModal } from "@/components/sections/ContactSection";
import { EASE_OUT } from "@/components/motion/Reveal";
import Taipei101Particles from "@/components/hero/Taipei101Particles";

/**
 * 히어로 — Dala 스타일 가이드 적용.
 *
 * 가이드의 시그니처 비주얼(삼각 파티클로 된 '두뇌')을 타이베이 101로 바꿨다.
 * 힉스필드로 만든 101 이미지에서 파티클 좌표를 뽑아 캔버스로 그린다 —
 * 스크롤하면 흩어지고 올리면 다시 모인다 (Taipei101Particles).
 * 101이 화면의 주인공. 슬로건(대만 진출은 티엔샤)과 CTA는 아래 구석에 작게 둔다.
 */

// 타워 주변을 떠다니는 삼각 파티클. 위치·색·속도를 고정값으로 둬서
// SSR/CSR 결과가 같게 한다 (Math.random 금지 → 하이드레이션 불일치 방지).
const PARTICLES = [
  { x: 8, y: 18, s: 10, c: "#8052ff", d: 9 },
  { x: 22, y: 72, s: 8, c: "#ffb829", d: 11 },
  { x: 38, y: 12, s: 7, c: "#15846e", d: 8 },
  { x: 46, y: 88, s: 9, c: "#ff5fc8", d: 12 },
  { x: 58, y: 30, s: 6, c: "#34d6ff", d: 10 },
  { x: 92, y: 22, s: 9, c: "#ffb829", d: 9.5 },
  { x: 96, y: 64, s: 7, c: "#8052ff", d: 12.5 },
  { x: 84, y: 90, s: 8, c: "#15846e", d: 10.5 },
  { x: 4, y: 48, s: 6, c: "#ffffff", d: 13 },
  { x: 30, y: 40, s: 5, c: "#ff5fc8", d: 11.5 },
];

function Triangle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden>
      <path d="M5 1 L9.2 8.5 H0.8 Z" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  // 히어로 CTA는 #contact로 스크롤시키지 않고 문의 폼을 바로 연다 (클릭 1회 절감)
  const [formOpen, setFormOpen] = useState(false);
  const fade = (delay: number) => ({
    // initial은 SSR과 같아야 하므로 reduce에 따라 바꾸지 않는다 (시간만 0으로)
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black"
    >
      {/* 배경 파티클 필드 */}
      <div aria-hidden className="dala-particles absolute inset-0" />
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0.7 }}
            animate={reduce ? undefined : { y: [0, -18, 0], rotate: [0, 40, 0] }}
            transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
          >
            <Triangle size={p.s} color={p.c} />
          </motion.span>
        ))}
      </div>

      {/* 메인: 101 파티클 — 데스크탑은 섹션 전체 높이로 가운데, 모바일은 위쪽 큰 영역 */}
      <motion.div
        className="relative mt-16 h-[64vh] w-full md:absolute md:inset-x-0 md:top-[72px] md:bottom-4 md:mt-0 md:h-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.6, ease: EASE_OUT }}
      >
        <Taipei101Particles />
      </motion.div>

      {/* 슬로건·CTA — 101을 가리지 않게 아래 양쪽 구석에 작게 */}
      <div className="pointer-events-none relative z-10 mx-auto mt-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 pb-10 sm:px-6 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12">
        <div>
          <motion.p
            {...fade(0.15)}
            className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-saffron"
          >
            Taiwan Marketing Agency
          </motion.p>

          <motion.h1
            {...fade(0.25)}
            className="font-normal text-white text-[28px] leading-[1.15] tracking-[-0.03em] break-keep sm:text-[32px] md:text-[36px]"
          >
            대만 진출은 티엔샤
          </motion.h1>

          <motion.p
            {...fade(0.4)}
            className="mt-3 max-w-[36ch] text-[14px] leading-[1.6] font-extralight text-mist md:text-[15px]"
          >
            200개 한국 브랜드의 대만 진출, KOL 섭외부터
            쇼피 판매까지 한 팀이 맡습니다.
          </motion.p>
        </div>

        <motion.div {...fade(0.55)} className="pointer-events-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex h-10 items-center rounded-full bg-iris px-6 text-[13px] font-semibold tracking-[0.02em] text-white transition-colors duration-300 hover:bg-iris-hover active:scale-[0.98]"
          >
            무료 대만 진출 상담 받기
          </button>
          <Link
            href="/#work"
            className="text-[13px] font-semibold uppercase tracking-[0.04em] text-ash transition-colors duration-300 hover:text-white"
          >
            작업물 보기 →
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {formOpen && <ContactModal onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

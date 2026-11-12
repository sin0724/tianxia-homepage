"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/components/motion/Reveal";
import Taipei101Particles from "@/components/hero/Taipei101Particles";

/**
 * 히어로 — Dala 스타일 가이드 적용.
 *
 * 가이드의 시그니처 비주얼(삼각 파티클로 된 '두뇌')을 타이베이 101로 바꿨다.
 * 파티클 좌표는 101 이미지와 구워 둔 뼈대 선에서 뽑아 캔버스로 그린다 —
 * 스크롤하면 흩어지고 올리면 다시 모인다 (Taipei101Particles).
 *
 * 첫 화면에는 101만 둔다. 슬로건·설명·CTA는 빼고 바로 아래 쇼릴로 이어지게 했다.
 * 문의 동선은 상단 네비와 맨 아래 문의 섹션이 맡는다.
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

  return (
    // 높이는 hero-h(100svh). dvh를 쓰면 모바일에서 스크롤로 주소창이 접힐 때마다 높이가
    // 바뀌어, 그때마다 캔버스 크기와 타워 크기가 다시 잡히며 화면이 튄다.
    <section id="home" className="hero-h relative min-h-[560px] overflow-hidden bg-black">
      {/* 화면에는 문구를 두지 않지만 페이지 제목은 있어야 한다 (검색·스크린리더용) */}
      <h1 className="sr-only">대만 마케팅 에이전시 티엔샤 TIANXIA</h1>

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

      {/* 101 파티클 — 네비 아래부터 섹션 바닥까지 꽉 채운다 */}
      <motion.div
        className="absolute inset-x-0 top-16 bottom-5 md:top-[72px] md:bottom-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.6, ease: EASE_OUT }}
      >
        <Taipei101Particles />
      </motion.div>

      {/* 스크롤 안내 — 글자 없이 흐르는 선만. 타워 밑동과 왼쪽 아래 개인정보 설정 버튼을
          피해 오른쪽 아래 구석에 둔다 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-4 sm:right-6 md:bottom-8 md:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 1.2, ease: EASE_OUT }}
      >
        <span className="relative block h-9 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-saffron"
            animate={reduce ? undefined : { y: [-12, 36] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

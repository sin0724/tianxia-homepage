"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * 상단 스크롤 진행바.
 *
 * 스크롤 위치를 그대로 따라가는 지표라 자율적으로 움직이는 모션이 아니다.
 * 그래서 동작 줄이기 환경에서도 숨기지 않는다 — 오히려 페이지 어디쯤인지
 * 알려주는 정보에 가깝다. 다만 스크롤값을 그대로 쓰면 휠 한 칸에 뚝뚝
 * 끊기므로 스프링으로 살짝 눌러준다.
 *
 * Navbar가 z-50이라 그 위(z-60)에 얹고, 포커스·클릭을 절대 가로채지 않도록
 * pointer-events를 끈다.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] bg-red-600 origin-left z-[60] pointer-events-none"
      style={{ scaleX }}
    />
  );
}

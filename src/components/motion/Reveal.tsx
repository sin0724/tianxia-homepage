"use client";

import { motion, useReducedMotion } from "motion/react";
import { useSectionState } from "@/components/SectionContext";

/** 사이트 전체 reveal 표준 ease (expo-out 계열) */
export const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** 섹션 슬라이드(0.85s)가 잦아들 때 안무가 시작되도록 하는 기본 지연 */
const BASE_DELAY = 0.35;

interface RevealProps {
  children: React.ReactNode;
  /** stagger 용 추가 지연 (BASE_DELAY 이후) */
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

/** 페이드-업 reveal. 재방문 섹션에서는 거리·지연을 줄여 가볍게 처리 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { isRevisit } = useSectionState();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: isRevisit ? 12 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isRevisit ? 0.45 : duration,
        delay: BASE_DELAY + (isRevisit ? delay * 0.4 : delay),
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}

/** 마스크 텍스트 reveal — overflow hidden 안에서 줄이 110% 아래에서 올라옴 */
export function MaskReveal({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { isRevisit } = useSectionState();

  if (reduce) {
    return (
      <Reveal delay={delay} className={className}>
        {children}
      </Reveal>
    );
  }

  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: isRevisit ? 0.5 : duration,
          delay: BASE_DELAY + (isRevisit ? delay * 0.4 : delay),
          ease: EASE_OUT,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** 라인 드로잉 — 왼쪽에서 오른쪽으로 scaleX 0→1 */
export function LineReveal({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { isRevisit } = useSectionState();

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
      animate={reduce ? { opacity: 1 } : { scaleX: 1 }}
      transition={{
        duration: isRevisit ? 0.5 : 0.8,
        delay: BASE_DELAY + (isRevisit ? delay * 0.4 : delay),
        ease: EASE_OUT,
      }}
    />
  );
}

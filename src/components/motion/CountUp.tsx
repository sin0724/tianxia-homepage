"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { useSectionState } from "@/components/SectionContext";
import { EASE_OUT } from "@/components/motion/Reveal";

interface CountUpProps {
  to: number;
  suffix?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

/** 섹션 진입 시 0→to 카운트업. 폭은 최종 값 기준으로 예약해 layout shift 방지 */
export default function CountUp({
  to,
  suffix = "",
  delay = 0.6,
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { isActive, isRevisit } = useSectionState();
  const finalText = `${to}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!isActive || reduce) {
      el.textContent = finalText;
      return;
    }
    el.textContent = `0${suffix}`;
    const controls = animate(0, to, {
      duration: isRevisit ? 0.9 : duration,
      delay: isRevisit ? delay * 0.4 : delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isActive, isRevisit, reduce, to, suffix, delay, duration, finalText]);

  return (
    <span
      ref={ref}
      className={`tabular-nums inline-block ${className ?? ""}`}
      style={{ minWidth: `${finalText.length}ch` }}
    >
      {finalText}
    </span>
  );
}

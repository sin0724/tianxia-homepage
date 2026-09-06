"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/components/motion/Reveal";

interface CountUpProps {
  to: number;
  suffix?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

/** 뷰포트 진입 시 0→to 카운트업. 폭은 최종 값 기준으로 예약해 layout shift 방지 */
export default function CountUp({
  to,
  suffix = "",
  delay = 0.6,
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  // 한 번만 센다 — 스크롤로 오르내릴 때마다 다시 도는 건 산만하다
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const finalText = `${to}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView || reduce) {
      el.textContent = finalText;
      return;
    }
    el.textContent = `0${suffix}`;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix, delay, duration, finalText]);

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

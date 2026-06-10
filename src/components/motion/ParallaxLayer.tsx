"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useIsTouchDevice } from "@/components/motion/useIsTouchDevice";

interface ParallaxLayerProps {
  children: React.ReactNode;
  /** 최대 이동 거리(px) — 뷰포트 가장자리에서의 오프셋 */
  strength?: number;
  /** true면 마우스 반대 방향으로 이동 (깊이감) */
  invert?: boolean;
  className?: string;
}

/**
 * 마우스 위치 기반 패럴랙스 레이어 (데스크탑 전용).
 * 활성 시 -inset-4로 살짝 키워 이동 시 가장자리가 드러나지 않게 함.
 */
export default function ParallaxLayer({
  children,
  strength = 10,
  invert = false,
  className,
}: ParallaxLayerProps) {
  const reduce = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const enabled = !reduce && !isTouch;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const dir = invert ? -1 : 1;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 ~ 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx * strength * dir);
      my.set(ny * strength * dir);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      mx.set(0);
      my.set(0);
    };
  }, [enabled, strength, invert, mx, my]);

  return (
    <motion.div
      className={`absolute ${enabled ? "-inset-4" : "inset-0"} ${className ?? ""}`}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorVariant = "default" | "hover" | "play";

function subscribeHoverNone(callback: () => void) {
  const mq = window.matchMedia("(hover: none)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useIsTouchDevice() {
  return useSyncExternalStore(
    subscribeHoverNone,
    () => window.matchMedia("(hover: none)").matches,
    () => true // SSR에서는 터치 기기로 간주해 렌더하지 않음
  );
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const isTouchDevice = useIsTouchDevice();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 링은 스프링으로 살짝 따라오는 lag
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.7 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.7 });

  useEffect(() => {
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    // 인터랙티브 요소 감지 — data-cursor="play"는 PLAY 커서로 변형
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest?.(
        "a, button, [role='button'], [data-cursor]"
      );
      if (!target) {
        setVariant("default");
        return;
      }
      setVariant(target.getAttribute("data-cursor") === "play" ? "play" : "hover");
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isTouchDevice, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* 중심 점 — 마우스를 즉시 따라감 */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-red-500 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible && variant !== "play" ? 1 : 0,
          scale: variant === "hover" ? 0.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 링 — 스프링 lag, hover 시 확장, play 시 채워진 원 + 라벨 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full border border-red-500/60 w-9 h-9"
          animate={{
            scale: variant === "play" ? 2 : variant === "hover" ? 1.5 : 1,
            backgroundColor:
              variant === "play" ? "rgba(220,38,38,0.9)" : "rgba(220,38,38,0)",
            borderColor:
              variant === "play"
                ? "rgba(220,38,38,0)"
                : variant === "hover"
                  ? "rgba(239,68,68,0.9)"
                  : "rgba(239,68,68,0.5)",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="absolute text-[9px] font-bold tracking-[0.2em] text-white select-none"
          animate={{ opacity: variant === "play" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          PLAY
        </motion.span>
      </motion.div>
    </>
  );
}

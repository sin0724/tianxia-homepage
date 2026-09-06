"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsTouchDevice } from "@/components/motion/useIsTouchDevice";

type CursorVariant = "default" | "hover" | "play" | "label";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  // label 변형에서 커서에 띄울 문구. 빠져나갈 때 글자가 사라지며 깜빡이지
  // 않도록, 변형이 풀려도 마지막 값을 그대로 들고 있는다.
  const [label, setLabel] = useState("");
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

    /*
      인터랙티브 요소 감지.
        data-cursor="play"  → 채워진 원 + PLAY
        data-cursor="label" → data-cursor-label 문구를 담은 알약
      그 외 a/button 은 기본 hover 확대.
    */
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest?.(
        "a, button, [role='button'], [data-cursor]"
      );
      if (!target) {
        setVariant("default");
        return;
      }
      const kind = target.getAttribute("data-cursor");
      if (kind === "play") {
        setVariant("play");
      } else if (kind === "label") {
        setLabel(target.getAttribute("data-cursor-label") ?? "");
        setVariant("label");
      } else {
        setVariant("hover");
      }
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
          opacity: isVisible && variant !== "play" && variant !== "label" ? 1 : 0,
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
            opacity: variant === "label" ? 0 : 1,
            scale:
              variant === "play" ? 2 : variant === "hover" ? 1.5 : variant === "label" ? 0.4 : 1,
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

        {/*
          라벨 알약 — 문구 길이에 따라 폭이 늘어나야 해서 고정 원을 쓰지 않는다.
          (@0960kim0960 같은 긴 핸들도 잘리지 않게)
        */}
        <motion.div
          className="absolute flex items-center h-7 px-3.5 rounded-full bg-red-600 whitespace-nowrap"
          animate={{
            opacity: variant === "label" ? 1 : 0,
            scale: variant === "label" ? 1 : 0.7,
          }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <span className="text-[10px] font-bold tracking-[0.12em] text-white select-none">
            {label}
          </span>
        </motion.div>
      </motion.div>
    </>
  );
}

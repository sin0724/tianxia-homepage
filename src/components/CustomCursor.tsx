"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setIsTouchDevice(false);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-red-500 pointer-events-none z-[9999]"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}

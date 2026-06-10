"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SectionProvider } from "@/components/SectionContext";

const SECTION_LABELS = ["메인", "소개", "서비스", "작업물", "문의"];
const COOLDOWN_MS = 900;

interface FullPageScrollProps {
  sections: React.ReactNode[];
}

export default function FullPageScroll({ sections }: FullPageScrollProps) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [isRevisit, setIsRevisit] = useState(false);
  const lastNavigate = useRef(0);
  const visited = useRef<Set<number>>(new Set([0]));
  const reduce = useReducedMotion();
  const total = sections.length;

  const navigate = useCallback(
    (next: number) => {
      const now = Date.now();
      if (now - lastNavigate.current < COOLDOWN_MS) return;
      if (next < 0 || next >= total) return;
      lastNavigate.current = now;
      setDir(next > current ? 1 : -1);
      setIsRevisit(visited.current.has(next));
      visited.current.add(next);
      setCurrent(next);
    },
    [current, total]
  );

  // 마우스 휠
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) navigate(current + 1);
      else if (e.deltaY < -30) navigate(current - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate, current]);

  // 터치 스와이프
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = startY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 60) navigate(current + (delta > 0 ? 1 : -1));
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [navigate, current]);

  // 키보드
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(current + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") navigate(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, current]);

  // 섹션 내 버튼 → 직접 이동 이벤트
  useEffect(() => {
    const onNavigate = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      if (typeof detail?.index === "number") navigate(detail.index);
    };
    document.addEventListener("fp-navigate", onNavigate);
    return () => document.removeEventListener("fp-navigate", onNavigate);
  }, [navigate]);

  // 깊이감 전환: 위로 가는(덮는) 쪽은 100% 이동, 뒤로 빠지는 쪽은 -30%만 후퇴하며 어두워짐
  // "--dim"은 섹션 위 오버레이의 opacity로 연결되는 CSS 변수
  const slideVariants = {
    enter: (d: number) =>
      d > 0
        ? { y: "100%", zIndex: 2, "--dim": 0 }
        : { y: "-30%", zIndex: 1, "--dim": 0.45 },
    center: { y: "0%", "--dim": 0 },
    exit: (d: number) =>
      d > 0
        ? { y: "-30%", zIndex: 1, "--dim": 0.45 }
        : { y: "100%", zIndex: 2, "--dim": 0 },
  };

  const fadeVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* 인접 섹션 프리렌더 — 영상/이미지 미리 로드, 화면에는 안 보임 */}
      {sections.map((section, i) => {
        if (i === current) return null;
        if (Math.abs(i - current) > 1) return null;
        return (
          <div key={`preload-${i}`} className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden>
            <SectionProvider value={{ isActive: false, isRevisit: true }}>
              {section}
            </SectionProvider>
          </div>
        );
      })}

      <AnimatePresence initial={false} custom={dir} mode="sync">
        <motion.div
          key={current}
          custom={dir}
          variants={reduce ? fadeVariants : slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            default: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            },
            zIndex: { duration: 0 },
          }}
          className="absolute inset-0 h-[100dvh] w-full"
        >
          <SectionProvider value={{ isActive: true, isRevisit }}>
            {sections[current]}
          </SectionProvider>
          {/* 후퇴하는 섹션을 어둡게 덮는 오버레이 — --dim 변수로 구동 */}
          <div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: "var(--dim, 0)" }}
            aria-hidden
          />
        </motion.div>
      </AnimatePresence>

      {/* 우측 섹션 네비게이션 도트 */}
      <nav
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
        aria-label="섹션 네비게이션"
      >
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            aria-label={`${SECTION_LABELS[i] ?? i + 1} 섹션으로 이동`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-[5px] h-5 bg-red-500"
                : "w-[5px] h-[5px] bg-zinc-600 hover:bg-zinc-400"
            }`}
          />
        ))}
      </nav>
    </div>
  );
}

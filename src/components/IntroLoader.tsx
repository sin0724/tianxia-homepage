"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/** 최소 노출 시간 — 로딩이 아무리 빨라도 이만큼은 채운다 */
const MIN_MS = 1400;
/** 강제 종료 — 로딩이 느려도 여기서 끊는다 */
const MAX_MS = 3000;

/**
 * 진입 카운터 로더.
 *
 * 값은 실제 로딩과 물려 있다. 히어로 영상의 loadeddata와 window load 중
 * 먼저 오는 쪽을 "준비됨"으로 보고, 그 전까지는 92에서 더 못 올라간다.
 * canplaythrough를 쓰지 않는 이유: 히어로가 수 MB짜리라 3초 안에 뜨는 일이
 * 거의 없어서, 그걸 기준으로 삼으면 결국 매번 최대 시간까지 도는 가짜 로더가 된다.
 *
 * 표시 여부는 <head>의 인라인 스크립트가 첫 페인트 전에 정한다.
 * html[data-intro] 상태는 globals.css가 읽는다:
 *   run  → 로더 보임 + 스크롤 잠김
 *   exit → 로더 보임 + 스크롤 풀림 (와이프가 도는 동안)
 *   skip / done → 로더 없음
 * React가 아니라 CSS가 첫 페인트를 정하므로 깜빡임이 없다.
 */
export default function IntroLoader() {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  // 와이프가 끝나면 DOM에서 아예 뺀다. clip-path로 안 보이게만 두면
  // 화면 전체를 덮은 채 클릭을 계속 가로챈다.
  const [gone, setGone] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "run") return;

    let ready = false;
    const markReady = () => {
      ready = true;
    };

    if (document.readyState === "complete") markReady();
    else window.addEventListener("load", markReady, { once: true });

    const hero = document.querySelector<HTMLVideoElement>("video[data-hero]");
    if (hero) {
      if (hero.readyState >= 2) markReady();
      else hero.addEventListener("loadeddata", markReady, { once: true });
    }

    const start = performance.now();
    let last = start;
    let progress = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const elapsed = now - start;

      // 지수 감쇠 — 초반에 빠르게 붙고 뒤로 갈수록 느려진다(ease-out)
      const ceiling = ready ? 100 : 92;
      const k = ready ? (elapsed >= MIN_MS ? 9 : 3.2) : 1.6;
      progress += (ceiling - progress) * (1 - Math.exp(-k * dt));
      if (elapsed >= MAX_MS) progress = 100;

      setCount(Math.min(100, Math.round(progress)));

      if (progress >= 99.5 && elapsed >= MIN_MS) {
        setCount(100);
        // 100에서 잠깐 멈췄다가 화면을 걷어낸다
        exitTimer = window.setTimeout(() => {
          root.dataset.intro = "exit"; // 스크롤 잠금 해제

          /*
            로더가 스크롤을 잠근 동안 브라우저의 앵커 점프가 버려진다.
            그대로 두면 /#work 같은 링크로 들어와도 최상단에 떨어지므로
            잠금이 풀리는 순간 해시 위치를 다시 맞춘다.
            scroll-margin-top이 적용되도록 scrollIntoView를 쓴다.
          */
          const hash = window.location.hash;
          if (hash.length > 1) {
            try {
              document
                .querySelector(hash)
                ?.scrollIntoView({ behavior: "auto" });
            } catch {
              // 해시가 선택자로 유효하지 않은 경우 — 그냥 최상단에 둔다
            }
          }

          setExiting(true);
        }, 200);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(exitTimer);
      window.removeEventListener("load", markReady);
    };
  }, []);

  if (gone) return null;

  return (
    <motion.div
      id="intro-loader"
      // 본문 위를 덮되 스크린리더에는 잡히지 않게 한다. 안에 포커스 가능한
      // 요소가 없으므로 포커스 트랩도 생기지 않는다.
      aria-hidden
      className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col justify-between px-6 py-6 md:px-10 md:py-10"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: exiting ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (!exiting) return;
        document.documentElement.dataset.intro = "done";
        setGone(true);
      }}
    >
      {/* 슬로건 — 가운데에서 한 번 올라온다 */}
      <div className="flex-1 flex items-center justify-center">
        <span className="block overflow-hidden">
          <motion.span
            className="block text-center font-black leading-[0.95] tracking-tighter text-zinc-50 text-[13vw] md:text-[9vw]"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            PLAY <span className="text-red-600">TAIWAN</span>
          </motion.span>
        </span>
      </div>

      {/* 자릿수가 바뀔 때 흔들리지 않도록 tabular-nums */}
      <div className="flex justify-end">
        <span
          className="font-mono font-black leading-none text-zinc-50 text-[14vw] md:text-[7vw] tracking-tighter"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {count}
        </span>
      </div>
    </motion.div>
  );
}

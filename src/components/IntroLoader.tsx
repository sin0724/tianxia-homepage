"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  HERO_READY,
  INTRO_HANDOFF,
  type IntroHandoffDetail,
} from "@/components/hero/introHandoff";

/** 최소 노출 시간 — 로딩이 아무리 빨라도 이만큼은 채운다 */
const MIN_MS = 1400;
/** 강제 종료 — 로딩이 느려도 여기서 끊는다 */
const MAX_MS = 3000;
/** 숫자는 100에서 멈추지 않고 타이베이 101의 101에서 끝난다 */
const FINAL = 101;
/** 준비 전에는 여기서 기다린다 */
const HOLD_AT = 92;

type Phase = "count" | "handoff" | "wipe";

/**
 * 숫자를 화면 가운데에 그린다. 그린 영역(캔버스 픽셀)을 돌려준다.
 *
 * DOM 글자가 아니라 캔버스에 그리는 이유: 101에 닿는 순간 파티클이 이 캔버스의
 * 픽셀을 그대로 읽어 같은 자리에 선다. 글꼴이 늦게 뜨든 자간이 어떻든,
 * 화면에 보이던 숫자와 파티클 숫자가 어긋날 수 없다.
 */
function drawCount(canvas: HTMLCanvasElement, value: number) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const scale = Math.min(2, window.devicePixelRatio || 1);
  const cw = Math.round(W * scale);
  const ch = Math.round(H * scale);
  if (canvas.width !== cw || canvas.height !== ch) {
    canvas.width = cw;
    canvas.height = ch;
  }
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, W, H);

  // 세로 화면에서는 폭 기준으로 크게, 가로 화면에서는 높이를 넘지 않게
  const px = W < 768 ? W * 0.4 : Math.min(W * 0.26, H * 0.5);
  ctx.font = `400 ${px}px ${getComputedStyle(document.body).fontFamily}`;
  ctx.fillStyle = "#fafafa";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // 자리마다 같은 폭을 줘서 숫자가 바뀌어도 흔들리지 않게 한다
  const zero = ctx.measureText("0");
  const cell = zero.width * 0.92;
  const cap = zero.actualBoundingBoxAscent;
  const text = String(value);
  const baseline = H / 2 + cap / 2;
  const x0 = W / 2 - (cell * (text.length - 1)) / 2;
  for (let i = 0; i < text.length; i++) ctx.fillText(text[i], x0 + i * cell, baseline);

  const pad = px * 0.08;
  const left = x0 - cell / 2 - pad;
  const top = baseline - cap - pad;
  return {
    scale,
    box: {
      x: Math.max(0, Math.floor(left * scale)),
      y: Math.max(0, Math.floor(top * scale)),
      w: Math.min(cw, Math.ceil((cell * text.length + pad * 2) * scale)),
      h: Math.min(ch, Math.ceil((cap + pad * 2) * scale)),
    },
  };
}

/**
 * 진입 카운터 로더.
 *
 * 화면에는 숫자 하나만 있다. 0에서 101까지 오르고, 101에 닿으면 그 숫자의 획이
 * 파티클로 바뀌어 타이베이 101로 조립된다 (조립은 Taipei101Particles가 맡는다).
 * 그래서 로더는 화면을 걷어내지 않고 그 자리에서 사라지기만 한다.
 *
 * 값은 실제 로딩과 물려 있다. 101 파티클이 준비되기 전까지는 92에서 더 못 올라간다.
 * 파티클이 끝내 준비되지 않으면(이미지 실패 등) 예전처럼 화면을 위로 걷어낸다.
 *
 * 표시 여부는 <head>의 인라인 스크립트가 첫 페인트 전에 정한다.
 * html[data-intro] 상태는 globals.css가 읽는다:
 *   run  → 로더 보임 + 스크롤 잠김
 *   exit → 로더 보임 + 스크롤 풀림 (사라지는 동안)
 *   skip / done → 로더 없음
 * React가 아니라 CSS가 첫 페인트를 정하므로 깜빡임이 없다.
 */
export default function IntroLoader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("count");
  // 사라지고 나면 DOM에서 아예 뺀다. 안 보이게만 두면
  // 화면 전체를 덮은 채 클릭을 계속 가로챈다.
  const [gone, setGone] = useState(false);
  const rafRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 숫자 그리기 — 값이 바뀔 때, 글꼴이 뜬 뒤, 창 크기가 바뀔 때
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const redraw = () => drawCount(canvas, count);
    redraw();
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) redraw();
    });
    window.addEventListener("resize", redraw);
    return () => {
      alive = false;
      window.removeEventListener("resize", redraw);
    };
  }, [count]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "run") return;

    let ready = window.__tx101Ready === true;
    const markReady = () => {
      ready = true;
    };
    window.addEventListener(HERO_READY, markReady);

    const start = performance.now();
    let last = start;
    let progress = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      // rAF가 넘겨주는 시각은 프레임 시작 시각이라 start보다 살짝 이를 수 있다
      const elapsed = Math.max(0, now - start);
      const forced = elapsed >= MAX_MS;

      // 지수 감쇠 — 초반에 빠르게 붙고 뒤로 갈수록 느려진다(ease-out)
      const open = ready || forced;
      const ceiling = open ? FINAL : HOLD_AT;
      const k = open ? (elapsed >= MIN_MS ? 9 : 3.2) : 1.6;
      progress += (ceiling - progress) * (1 - Math.exp(-k * dt));
      if (forced) progress = FINAL;

      setCount(Math.min(FINAL, Math.round(progress)));

      if (progress >= FINAL - 0.5 && elapsed >= MIN_MS) {
        setCount(FINAL);
        // 101에서 한 박자 멈췄다가 넘긴다
        exitTimer = window.setTimeout(() => {
          root.dataset.intro = "exit"; // 스크롤 잠금 해제

          /*
            로더가 스크롤을 잠근 동안 브라우저의 앵커 점프가 버려진다.
            그대로 두면 /#work 같은 링크로 들어와도 최상단에 떨어지므로
            잠금이 풀리는 순간 해시 위치를 다시 맞춘다.
            scroll-margin-top이 적용되도록 scrollIntoView를 쓴다.
          */
          const hash = window.location.hash;
          let jumped = false;
          if (hash.length > 1) {
            try {
              const target = document.querySelector(hash);
              target?.scrollIntoView({ behavior: "auto" });
              jumped = !!target && window.scrollY > 0;
            } catch {
              // 해시가 선택자로 유효하지 않은 경우 — 그냥 최상단에 둔다
            }
          }

          // 숫자를 파티클에게 넘긴다. 해시로 다른 섹션에 떨어졌다면 히어로가
          // 화면에 없으므로 넘기지 않고 그냥 걷어낸다.
          let accepted = false;
          const canvas = canvasRef.current;
          const drawn = canvas && !jumped ? drawCount(canvas, FINAL) : null;
          if (canvas && drawn) {
            const detail: IntroHandoffDetail = { canvas, ...drawn, accepted: false };
            window.dispatchEvent(new CustomEvent(INTRO_HANDOFF, { detail }));
            accepted = detail.accepted;
          }
          setPhase(accepted ? "handoff" : "wipe");
        }, 260);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(exitTimer);
      window.removeEventListener(HERO_READY, markReady);
    };
  }, []);

  if (gone) return null;

  return (
    <motion.div
      id="intro-loader"
      // 본문 위를 덮되 스크린리더에는 잡히지 않게 한다. 안에 포커스 가능한
      // 요소가 없으므로 포커스 트랩도 생기지 않는다.
      aria-hidden
      className="fixed inset-0 z-[200] bg-zinc-950"
      initial={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      animate={
        phase === "handoff"
          ? // 같은 자리에 파티클 숫자가 서 있다 → 판만 걷히면 흰 숫자가 색 입은 숫자로 바뀐다
            { opacity: 0 }
          : phase === "wipe"
            ? { clipPath: "inset(0% 0% 100% 0%)" }
            : { opacity: 1 }
      }
      transition={
        phase === "handoff"
          ? { duration: 0.45, ease: "easeOut" }
          : { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
      }
      onAnimationComplete={() => {
        if (phase === "count") return;
        document.documentElement.dataset.intro = "done";
        setGone(true);
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </motion.div>
  );
}

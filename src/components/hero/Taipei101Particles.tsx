"use client";

import { useEffect, useRef } from "react";

/**
 * 타이베이 101 파티클 컨스텔레이션 (Dala 히어로의 '두뇌' 대체).
 *
 * 1) 힉스필드로 만든 101 이미지(src)를 오프스크린 캔버스에 그려 밝은 픽셀만 고른다
 * 2) 골라낸 위치·색으로 속이 빈 작은 삼각형 파티클을 만든다
 * 3) 매 프레임:
 *    - 스크롤을 내릴수록 파티클이 사방으로 흩어지고, 올리면 다시 101로 모인다
 *    - 마우스 근처 파티클은 밀려났다가 스프링으로 돌아온다
 *    - 진입 시 흩어진 상태에서 모여드는 연출
 *
 * 영상이 아니라 실시간 렌더라 스크롤 위치에 정확히 반응하고, 모바일에선 개수를 줄인다.
 */

type Particle = {
  hx: number; // 101 위의 제자리 (0~1, 이미지 좌표)
  hy: number;
  sx: number; // 흩어질 때의 오프셋 (px 배율 기준)
  sy: number;
  x: number; // 현재 위치 (캔버스 px)
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  phase: number;
  color: string;
};

// 시드 고정 난수 — 새로고침해도 같은 배치
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function Taipei101Particles({
  src = "/images/taipei101-hero.png",
  className = "",
}: {
  src?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    const COUNT = isSmall ? 1500 : 3400;

    let particles: Particle[] = [];
    let imgAspect = 2 / 3; // w/h
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let disposed = false;
    // 모이는 연출의 시작 시각. 인트로 로더(data-intro="run")가 덮고 있는 동안은
    // 계속 뒤로 미뤄서, 로더가 걷힌 뒤에 101이 모이는 게 보이게 한다.
    let start = performance.now();
    const mouse = { x: -9999, y: -9999, active: false };

    // ---------- 1) 이미지 샘플링 ----------
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (disposed) return;
      imgAspect = img.naturalWidth / img.naturalHeight;
      const SW = 220;
      const SH = Math.round(SW / imgAspect);
      const off = document.createElement("canvas");
      off.width = SW;
      off.height = SH;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, SW, SH);
      const data = octx.getImageData(0, 0, SW, SH).data;

      const candidates: { x: number; y: number; r: number; g: number; b: number }[] = [];
      for (let y = 0; y < SH; y++) {
        for (let x = 0; x < SW; x++) {
          const i = (y * SW + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          if (Math.max(r, g, b) > 85) candidates.push({ x, y, r, g, b });
        }
      }

      const rand = mulberry32(101);
      // 셔플 후 앞에서 COUNT개
      for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }
      const picked = candidates.slice(0, COUNT);

      particles = picked.map((c) => {
        // 색을 조금 밝게 끌어올려 검정 위에서 선명하게
        const m = Math.max(c.r, c.g, c.b) || 1;
        const k = Math.min(1.6, 235 / m);
        const color = `rgb(${Math.round(c.r * k)},${Math.round(c.g * k)},${Math.round(c.b * k)})`;
        // 흩어지는 방향: 중심에서 바깥으로 + 무작위
        const ang = rand() * Math.PI * 2;
        const dist = 0.35 + rand() * 0.9;
        const hx = (c.x + rand()) / SW;
        const hy = (c.y + rand()) / SH;
        return {
          hx,
          hy,
          sx: (hx - 0.5) * 1.6 + Math.cos(ang) * dist,
          sy: (hy - 0.5) * 0.9 + Math.sin(ang) * dist,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          size: 1.6 + rand() * 3.2,
          rot: rand() * Math.PI * 2,
          spin: (rand() - 0.5) * 0.8,
          phase: rand() * Math.PI * 2,
          color,
        };
      });
      // 첫 위치는 흩어진 상태 → 진입 시 모여든다 (동작 줄이기면 처음부터 제자리)
      layoutInitial();
    };

    // ---------- 2) 크기 ----------
    // 101을 캔버스 안에 contain으로 맞춘 사각형
    const box = { x: 0, y: 0, w: 0, h: 0 };
    function resize() {
      const rect = wrap!.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width;
      H = rect.height;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      const bh = Math.min(H, W / imgAspect);
      const bw = bh * imgAspect;
      box.w = bw;
      box.h = bh;
      box.x = (W - bw) / 2;
      box.y = (H - bh) / 2;
    }

    function layoutInitial() {
      resize();
      const spread = reduce ? 0 : Math.max(W, H);
      for (const p of particles) {
        p.x = box.x + p.hx * box.w + p.sx * spread;
        p.y = box.y + p.hy * box.h + p.sy * spread;
      }
    }

    // ---------- 3) 스크롤 진행도 ----------
    // 히어로 섹션 기준: 맨 위 0 → 화면 한 장 내려가면 1
    function scrollProgress() {
      const section = wrap!.closest("section") ?? wrap!;
      const r = section.getBoundingClientRect();
      return clamp01(-r.top / (r.height * 0.75));
    }

    // ---------- 4) 렌더 루프 ----------
    /*
      동작 줄이기(prefers-reduced-motion) 처리:
      - 스크롤에 따른 흩어짐/모임, 마우스 반발은 사용자의 입력을 그대로 비추는 연출이라
        항상 켠다 (FilmSection의 스크롤 확대와 같은 원칙).
      - 저절로 움직이는 것(진입 시 모여들기, 숨쉬기, 회전)만 끈다.
      이 PC처럼 Windows '애니메이션 효과'가 꺼져 있으면 브라우저가 reduce를 보고하므로,
      예전처럼 reduce에서 루프를 아예 안 돌리면 스크롤해도 101이 전혀 변하지 않았다.
    */
    function draw(now: number) {
      // 아직 레이아웃 전(크기 0)이면 그리지 않는다
      if (W < 2 || H < 2 || particles.length === 0) return;
      if (document.documentElement.dataset.intro === "run") start = now;
      const t = (now - start) / 1000;
      // 진입: 0~2.2초 동안 흩어진 상태(1)에서 모임(0)으로
      const intro = reduce ? 0 : 1 - easeInOut(clamp01((t - 0.2) / 2.2));
      const scroll = easeInOut(scrollProgress());
      const scatter = Math.max(intro, scroll);
      const spread = Math.max(W, H);

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineWidth = 1;
      ctx!.globalAlpha = 1 - scroll * 0.75;

      const R = Math.min(W, H) * 0.14; // 마우스 영향 반경
      for (const p of particles) {
        // 숨 쉬듯 미세하게 떠다님
        const breathe = reduce ? 0 : 1 + scatter * 6;
        const tx =
          box.x + p.hx * box.w + p.sx * spread * scatter + Math.sin(t * 0.8 + p.phase) * breathe;
        const ty =
          box.y + p.hy * box.h + p.sy * spread * scatter + Math.cos(t * 0.7 + p.phase) * breathe;

        {
          // 스프링으로 목표 위치 추적
          p.vx += (tx - p.x) * 0.06;
          p.vy += (ty - p.y) * 0.06;

          // 마우스 반발
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R * R && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / R) * 6;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }

          p.vx *= 0.78;
          p.vy *= 0.78;
          p.x += p.vx;
          p.y += p.vy;
          if (!reduce) p.rot += p.spin * 0.016 * (1 + scatter * 3);
        }

        // 속이 빈 삼각형
        const s = p.size * (1 + scatter * 0.6);
        const c = Math.cos(p.rot);
        const sn = Math.sin(p.rot);
        ctx!.strokeStyle = p.color;
        ctx!.beginPath();
        for (let k = 0; k < 3; k++) {
          const a = (k / 3) * Math.PI * 2 - Math.PI / 2;
          const lx = Math.cos(a) * s;
          const ly = Math.sin(a) * s;
          const px = p.x + lx * c - ly * sn;
          const py = p.y + lx * sn + ly * c;
          if (k === 0) ctx!.moveTo(px, py);
          else ctx!.lineTo(px, py);
        }
        ctx!.closePath();
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    }

    // ---------- 이벤트 ----------
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    // 섹션 전체에서 마우스를 받는다 (텍스트 위에서도 101이 반응)
    const host = wrap.closest("section") ?? wrap;
    host.addEventListener("pointermove", onMove as EventListener);
    host.addEventListener("pointerleave", onLeave);

    resize();
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [src]);

  return (
    // 부모(relative, 높이 있음)를 항상 꽉 채운다. 예전엔 `relative`와 바깥에서 넘긴
    // `absolute inset-0`이 같이 붙었는데 CSS 순서상 relative가 이겨 높이가 0이 됐고,
    // 캔버스가 아예 안 그려졌다.
    <div ref={wrapRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <span className="sr-only">삼각 파티클로 그린 타이베이 101</span>
    </div>
  );
}

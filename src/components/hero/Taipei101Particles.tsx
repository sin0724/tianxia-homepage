"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  T101_CX,
  T101_HALF_WIDTH,
  T101_LINES,
  type SkeletonKind,
} from "./taipei101Skeleton";

/**
 * 타이베이 101 파티클 컨스텔레이션 (Dala 히어로의 '두뇌' 대체).
 *
 * 파티클은 두 겹이다.
 *  - 뼈대: 외곽선·8개 층 처마·중앙 기둥·하단 원형 장식의 선(taipei101Skeleton.ts) 위에
 *          작은 삼각형을 촘촘히 올린다. 타워가 또렷하게 서 보이는 건 이 층 덕분이다.
 *  - 속:   힉스필드로 만든 101 이미지(src)에서 밝은 곳일수록 많이 뽑은 속 빈 삼각형.
 *          색과 질감은 여기서 나온다.
 *
 * 매 프레임:
 *  - 스크롤을 내리면 꼭대기부터 흩어지고, 올리면 아래층부터 다시 쌓인다
 *  - 마우스 근처 파티클은 밀려났다가 스프링으로 돌아오고, 타워가 마우스 쪽으로 살짝 돈다
 *  - 진입 시 흩어진 상태에서 모여들고, 가끔 빛이 아래에서 위로 훑고 지나간다
 *
 * 영상이 아니라 실시간 렌더라 스크롤 위치에 정확히 반응한다. 같은 색끼리 묶어 한 번에
 * 그리기 때문에 파티클 수를 늘려도 그리기 호출은 수십 번이고, 프레임이 떨어지는 기기에서는
 * 속 파티클부터 줄인다.
 */

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

/** 이미지에서 색을 못 얻은 뼈대 점에 쓰는 색 */
const KIND_COLOR: Record<SkeletonKind, [number, number, number]> = {
  outline: [183, 156, 255],
  eave: [255, 226, 166],
  spine: [143, 230, 255],
  ring: [255, 255, 255],
};
/** 선 종류별 밀도 가중치 */
const KIND_DENSITY: Record<SkeletonKind, number> = {
  outline: 1,
  eave: 1.25,
  spine: 0.8,
  ring: 1.5,
};

/** 이미지 폭 중 타워(와 좌우 숨 쉴 여백)가 차지하는 비율 */
const TOWER_SPAN = 0.56;
/** 층별 시차: 클수록 꼭대기와 바닥이 흩어지는 시점이 벌어진다 */
const STAGGER = 0.7;
/** 빛이 훑고 지나가는 주기·소요 시간(초) */
const SWEEP_EVERY = 7;
const SWEEP_TAKES = 1.7;

/** 행(y: 0~1)의 타워 반폭(0~1) */
function halfWidthAt(y: number) {
  const f = clamp01(y) * (T101_HALF_WIDTH.length - 1);
  const i = Math.floor(f);
  const a = T101_HALF_WIDTH[i];
  const b = T101_HALF_WIDTH[Math.min(T101_HALF_WIDTH.length - 1, i + 1)];
  return a + (b - a) * (f - i);
}

type Bucket = { color: string; start: number; end: number; skeleton: boolean };

export default function Taipei101Particles({
  src = "/images/taipei101-hero.png",
  className = "",
}: {
  src?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 캔버스를 못 쓰거나 이미지를 못 읽으면 정적 이미지를 대신 보여 준다
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    const N_SKELETON = isSmall ? 1500 : 2600;
    const N_FILL = isSmall ? 3600 : 6800;

    // 파티클은 구조체 배열 대신 속성별 배열로 둔다 (수천 개를 매 프레임 도는 루프라서)
    let n = 0;
    let hx = new Float32Array(0); // 101 위의 제자리 (0~1, 이미지 좌표)
    let hy = new Float32Array(0);
    let sx = new Float32Array(0); // 흩어질 때의 오프셋 (px 배율 기준)
    let sy = new Float32Array(0);
    let px = new Float32Array(0); // 현재 위치 (캔버스 px)
    let py = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let size = new Float32Array(0);
    let rot = new Float32Array(0);
    let spin = new Float32Array(0);
    let phase = new Float32Array(0);
    let depth = new Float32Array(0); // 앞(+)·뒤(-) 깊이, 타워 반폭 대비
    let buckets: Bucket[] = [];

    let imgAspect = 688 / 1024; // w/h
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let disposed = false;
    // 모이는 연출의 시작 시각. 인트로 로더(data-intro="run")가 덮고 있는 동안은
    // 계속 뒤로 미뤄서, 로더가 걷힌 뒤에 101이 모이는 게 보이게 한다.
    let start = performance.now();
    let last = start;
    let yaw = 0;
    // 프레임이 계속 느리면 속 파티클을 덜어 낸다 (1 = 전부)
    let quality = 1;
    let slowFrames = 0;
    let frameMs = 16.7;
    const mouse = { x: -9999, y: -9999, active: false };

    // ---------- 1) 파티클 만들기 ----------
    const img = new window.Image();
    img.decoding = "async";
    img.onerror = () => {
      if (!disposed) setFailed(true);
    };
    img.onload = () => {
      if (disposed) return;
      imgAspect = img.naturalWidth / img.naturalHeight;
      const SW = Math.min(688, img.naturalWidth);
      const SH = Math.round(SW / imgAspect);
      const off = document.createElement("canvas");
      off.width = SW;
      off.height = SH;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) {
        setFailed(true);
        return;
      }
      octx.drawImage(img, 0, 0, SW, SH);
      const data = octx.getImageData(0, 0, SW, SH).data;
      const rand = mulberry32(101);

      type Seed = { x: number; y: number; r: number; g: number; b: number; skeleton: boolean };
      const seeds: Seed[] = [];

      // --- 속: 밝을수록 많이, 타워 실루엣 안에서만 ---
      // 누적 가중치를 일정 간격으로 끊어 뽑는다(계통 추출). 무작위로 뽑으면 뭉치거나
      // 비는 곳이 생기는데, 이렇게 하면 밝기에 비례하면서도 고르게 퍼진다.
      const MARGIN = 0.012; // 실루엣 바깥으로 살짝 번지는 가루까지는 받아 준다
      const weights = new Float32Array(SW * SH);
      let total = 0;
      for (let y = 0; y < SH; y++) {
        const half = halfWidthAt(y / (SH - 1));
        if (half <= 0) continue;
        const x0 = Math.max(0, Math.floor((T101_CX - half - MARGIN) * SW));
        const x1 = Math.min(SW - 1, Math.ceil((T101_CX + half + MARGIN) * SW));
        for (let x = x0; x <= x1; x++) {
          const i = (y * SW + x) * 4;
          const m = Math.max(data[i], data[i + 1], data[i + 2]);
          if (m <= 70) continue;
          const w = Math.pow((m - 60) / 195, 1.5);
          weights[y * SW + x] = w;
          total += w;
        }
      }
      if (total > 0) {
        const step = total / N_FILL;
        let next = rand() * step;
        let acc = 0;
        for (let p = 0; p < weights.length; p++) {
          const w = weights[p];
          if (w === 0) continue;
          acc += w;
          while (acc >= next) {
            const x = p % SW;
            const y = (p - x) / SW;
            const i = p * 4;
            seeds.push({
              x: (x + rand()) / SW,
              y: (y + rand()) / SH,
              r: data[i],
              g: data[i + 1],
              b: data[i + 2],
              skeleton: false,
            });
            next += step;
          }
        }
      }

      // --- 뼈대: 구워 둔 선 위에 일정 간격으로 ---
      let weighted = 0;
      const lengths = T101_LINES.map((line) => {
        const kind = line[0] as SkeletonKind;
        let len = 0;
        for (let k = 3; k < line.length; k += 2) {
          const dx = ((line[k] as number) - (line[k - 2] as number)) * imgAspect;
          const dy = (line[k + 1] as number) - (line[k - 1] as number);
          len += Math.hypot(dx, dy);
        }
        weighted += len * KIND_DENSITY[kind];
        return len;
      });
      T101_LINES.forEach((line, li) => {
        const kind = line[0] as SkeletonKind;
        const count = Math.max(2, Math.round((N_SKELETON * lengths[li] * KIND_DENSITY[kind]) / weighted));
        const gap = lengths[li] / count;
        let k = 1; // 현재 선분의 시작 좌표 인덱스
        let segStart = 0; // 현재 선분이 시작되는 누적 거리
        for (let c = 0; c < count; c++) {
          const d = (c + 0.5) * gap;
          let segLen = 0;
          for (;;) {
            const dx = ((line[k + 2] as number) - (line[k] as number)) * imgAspect;
            const dy = (line[k + 3] as number) - (line[k + 1] as number);
            segLen = Math.hypot(dx, dy);
            if (d <= segStart + segLen || k + 4 >= line.length) break;
            segStart += segLen;
            k += 2;
          }
          const f = segLen > 0 ? clamp01((d - segStart) / segLen) : 0;
          const x = (line[k] as number) + ((line[k + 2] as number) - (line[k] as number)) * f;
          const y = (line[k + 1] as number) + ((line[k + 3] as number) - (line[k + 1] as number)) * f;

          // 색: 그 자리 주변에서 가장 밝은 픽셀. 어두우면 선 종류별 기본색.
          const cxp = Math.round(x * (SW - 1));
          const cyp = Math.round(y * (SH - 1));
          let best = 0;
          let col = KIND_COLOR[kind];
          for (let oy = -2; oy <= 2; oy++) {
            for (let ox = -2; ox <= 2; ox++) {
              const xx = cxp + ox;
              const yy = cyp + oy;
              if (xx < 0 || yy < 0 || xx >= SW || yy >= SH) continue;
              const i = (yy * SW + xx) * 4;
              const m = Math.max(data[i], data[i + 1], data[i + 2]);
              if (m > best) {
                best = m;
                if (m > 110) col = [data[i], data[i + 1], data[i + 2]];
              }
            }
          }
          seeds.push({ x, y, r: col[0], g: col[1], b: col[2], skeleton: true });
        }
      });

      // --- 색 묶음: 같은 묶음은 한 번에 그린다 ---
      // 속 파티클은 품질을 낮출 때 묶음의 뒤쪽부터 덜어 내므로, 먼저 섞어 둔다.
      for (let i = seeds.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [seeds[i], seeds[j]] = [seeds[j], seeds[i]];
      }
      const groups = new Map<string, { r: number; g: number; b: number; items: Seed[]; skeleton: boolean }>();
      for (const s of seeds) {
        // 검정 위에서 선명하게: 가장 밝은 채널을 끌어올리고, 뼈대는 흰색 쪽으로 더 민다
        const m = Math.max(s.r, s.g, s.b) || 1;
        const k = Math.min(1.7, 235 / m);
        const lift = s.skeleton ? 0.14 : 0;
        const r = Math.min(255, s.r * k) * (1 - lift) + 255 * lift;
        const g = Math.min(255, s.g * k) * (1 - lift) + 255 * lift;
        const b = Math.min(255, s.b * k) * (1 - lift) + 255 * lift;
        const key = `${s.skeleton ? "s" : "f"}${r >> 6}${g >> 6}${b >> 6}`;
        let grp = groups.get(key);
        if (!grp) {
          grp = { r: 0, g: 0, b: 0, items: [], skeleton: s.skeleton };
          groups.set(key, grp);
        }
        grp.r += r;
        grp.g += g;
        grp.b += b;
        grp.items.push(s);
      }

      n = seeds.length;
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      sx = new Float32Array(n);
      sy = new Float32Array(n);
      px = new Float32Array(n);
      py = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      size = new Float32Array(n);
      rot = new Float32Array(n);
      spin = new Float32Array(n);
      phase = new Float32Array(n);
      depth = new Float32Array(n);
      buckets = [];

      // 속을 먼저, 뼈대를 나중에 그려서 윤곽이 위에 얹히게 한다
      const ordered = [...groups.values()].sort((a, b) => Number(a.skeleton) - Number(b.skeleton));
      let i = 0;
      for (const grp of ordered) {
        const c = grp.items.length;
        buckets.push({
          color: `rgb(${Math.round(grp.r / c)},${Math.round(grp.g / c)},${Math.round(grp.b / c)})`,
          start: i,
          end: i + c,
          skeleton: grp.skeleton,
        });
        for (const s of grp.items) {
          hx[i] = s.x;
          hy[i] = s.y;
          // 흩어지는 방향: 중심에서 바깥으로 + 무작위
          const ang = rand() * Math.PI * 2;
          const dist = 0.35 + rand() * 0.9;
          sx[i] = (s.x - 0.5) * 1.6 + Math.cos(ang) * dist;
          sy[i] = (s.y - 0.5) * 0.9 + Math.sin(ang) * dist;
          // 속은 대부분 점에 가까운 작은 삼각형, 가끔 큰 것. 크기가 고르면 겹쳐서 하얗게 뭉친다.
          const u = rand();
          size[i] = s.skeleton
            ? 0.9 + rand() * 0.7
            : u < 0.68
              ? 0.8 + rand() * 0.8
              : u < 0.94
                ? 1.6 + rand() * 1.1
                : 2.7 + rand() * 1.5;
          rot[i] = rand() * Math.PI * 2;
          spin[i] = (rand() - 0.5) * 0.8;
          phase[i] = rand() * Math.PI * 2;
          // 깊이: 타워를 둥근 기둥으로 보고, 가운데일수록 앞으로 나온다.
          // 속 파티클 넷 중 하나는 뒷면에 둬서 돌 때 앞뒤가 엇갈리게 한다.
          const half = halfWidthAt(s.y) || 1;
          const off = clamp01(Math.abs(s.x - T101_CX) / half);
          const front = Math.sqrt(1 - off * off) * half;
          depth[i] = s.skeleton || rand() > 0.25 ? front : -front;
          i++;
        }
      }
      // 첫 위치는 흩어진 상태 → 진입 시 모여든다 (동작 줄이기면 처음부터 제자리)
      layoutInitial();
    };
    img.src = src;

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
      // 이미지는 좌우 여백이 넓다(타워는 가운데 절반쯤). 폭은 타워만 들어오면 되므로
      // 세로로 긴 화면에서는 이미지가 캔버스보다 넓어져도 타워를 높이에 맞춰 키운다.
      const bh = Math.min(H, W / (imgAspect * TOWER_SPAN));
      const bw = bh * imgAspect;
      box.w = bw;
      box.h = bh;
      box.x = (W - bw) / 2;
      box.y = (H - bh) / 2;
    }

    function layoutInitial() {
      resize();
      const spread = reduce ? 0 : Math.max(W, H);
      for (let i = 0; i < n; i++) {
        px[i] = box.x + hx[i] * box.w + sx[i] * spread;
        py[i] = box.y + hy[i] * box.h + sy[i] * spread;
      }
    }

    // ---------- 3) 스크롤 진행도 ----------
    // 히어로 섹션 기준: 맨 위 0 → 화면 3/4만큼 내려가면 1
    function scrollProgress() {
      const section = wrap!.closest("section") ?? wrap!;
      const r = section.getBoundingClientRect();
      return clamp01(-r.top / (r.height * 0.75));
    }

    // ---------- 4) 렌더 루프 ----------
    /*
      동작 줄이기(prefers-reduced-motion) 처리:
      - 스크롤에 따른 흩어짐/모임, 마우스 반발·회전은 사용자의 입력을 그대로 비추는 연출이라
        항상 켠다 (FilmSection의 스크롤 연출과 같은 원칙).
      - 저절로 움직이는 것(진입 시 모여들기, 숨쉬기, 회전, 좌우 흔들림, 빛 훑기)만 끈다.
      Windows '애니메이션 효과'가 꺼져 있으면 브라우저가 reduce를 보고하므로,
      reduce에서 루프를 아예 안 돌리면 스크롤해도 101이 전혀 변하지 않는다.
    */
    function draw(now: number) {
      // 아직 레이아웃 전(크기 0)이면 그리지 않는다
      if (W < 2 || H < 2 || n === 0) return;
      if (document.documentElement.dataset.intro === "run") start = now;
      const t = (now - start) / 1000;
      // 프레임 간격을 60fps 기준 배수로. 고주사율 모니터에서 움직임이 빨라지지 않게 한다.
      const elapsed = Math.min(100, now - last);
      last = now;
      const k = Math.min(2.5, Math.max(0.25, elapsed / 16.667));
      const damp = Math.pow(0.78, k);

      // 느린 기기: 한동안 계속 22ms를 넘기면 속 파티클을 15%씩 덜어 낸다
      frameMs += (elapsed - frameMs) * 0.1;
      if (t > 3 && frameMs > 22) {
        if (++slowFrames > 45 && quality > 0.4) {
          quality = Math.max(0.4, quality - 0.15);
          slowFrames = 0;
        }
      } else {
        slowFrames = 0;
      }

      // 진입: 0~2.4초 동안 흩어진 상태(1)에서 모임(0)으로
      const intro = reduce ? 0 : 1 - easeInOut(clamp01((t - 0.2) / 2.4));
      const scroll = easeInOut(scrollProgress());
      const scatter = Math.max(intro, scroll);
      const spread = Math.max(W, H);

      // 타워 회전: 마우스 쪽으로 최대 약 10도, 가만히 있을 땐 아주 느리게 좌우로
      const sway = reduce ? 0 : Math.sin(t * 0.35) * 0.05;
      const aim = mouse.active ? (mouse.x / W - 0.5) * 0.36 : sway;
      yaw += (aim - yaw) * (1 - Math.pow(0.94, k));
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cxPx = box.x + T101_CX * box.w;

      // 빛 훑기: 다 모여 있을 때만, 바닥(1)에서 꼭대기(0)로
      let sweepY = -1;
      if (!reduce && scatter < 0.05 && t > 4) {
        const st = (t - 4) % SWEEP_EVERY;
        if (st < SWEEP_TAKES) sweepY = 1.06 - (st / SWEEP_TAKES) * 1.12;
      }
      const sweepCore = sweepY >= -0.1 ? new Path2D() : null;
      const sweepHalo = sweepCore ? new Path2D() : null;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      ctx!.lineWidth = 0.9;
      const fade = 1 - scroll * 0.75;

      const R = Math.min(W, H) * 0.14; // 마우스 영향 반경
      const R2 = R * R;
      const tx8 = t * 0.8;
      const ty7 = t * 0.7;

      for (const bucket of buckets) {
        const skeleton = bucket.skeleton;
        const end = skeleton
          ? bucket.end
          : bucket.start + Math.ceil((bucket.end - bucket.start) * quality);
        ctx!.beginPath();
        for (let i = bucket.start; i < end; i++) {
          // 층별 시차: 위(hy 작음)일수록 먼저 흩어지고 나중에 모인다
          const s = clamp01(scatter * (1 + STAGGER) - hy[i] * STAGGER);
          // 숨 쉬듯 미세하게 떠다님 — 뼈대는 거의 고정해서 윤곽이 흔들리지 않게
          const breathe = reduce ? 0 : (skeleton ? 0.3 : 1) + s * 6;
          const tx =
            cxPx +
            ((hx[i] - T101_CX) * cosY + depth[i] * sinY) * box.w +
            sx[i] * spread * s +
            Math.sin(tx8 + phase[i]) * breathe;
          const ty = box.y + hy[i] * box.h + sy[i] * spread * s + Math.cos(ty7 + phase[i]) * breathe;

          // 스프링으로 목표 위치 추적
          let ax = (tx - px[i]) * 0.06;
          let ay = (ty - py[i]) * 0.06;
          // 마우스 반발
          if (mouse.active) {
            const dx = px[i] - mouse.x;
            const dy = py[i] - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / R) * 6;
              ax += (dx / d) * f;
              ay += (dy / d) * f;
            }
          }
          vx[i] = (vx[i] + ax * k) * damp;
          vy[i] = (vy[i] + ay * k) * damp;
          px[i] += vx[i] * k;
          py[i] += vy[i] * k;
          // 뼈대는 모여 있는 동안 돌지 않는다 (작은 삼각형이 돌면 윤곽이 지글거린다)
          if (!reduce) rot[i] += spin[i] * 0.016 * k * ((skeleton ? 0 : 1) + s * 3);

          const r = size[i] * (1 + s * (skeleton ? 1.5 : 0.6));
          const c = Math.cos(rot[i]) * r;
          const sn = Math.sin(rot[i]) * r;
          // 꼭짓점 3개: -90°, 30°, 150°
          const x0 = px[i] + sn;
          const y0 = py[i] - c;
          const x1 = px[i] + 0.866 * c - 0.5 * sn;
          const y1 = py[i] + 0.866 * sn + 0.5 * c;
          const x2 = px[i] - 0.866 * c - 0.5 * sn;
          const y2 = py[i] - 0.866 * sn + 0.5 * c;
          ctx!.moveTo(x0, y0);
          ctx!.lineTo(x1, y1);
          ctx!.lineTo(x2, y2);
          ctx!.closePath();

          if (sweepCore) {
            const d = Math.abs(hy[i] - sweepY);
            if (d < 0.05) {
              const path = d < 0.018 ? sweepCore : sweepHalo!;
              path.moveTo(x0, y0);
              path.lineTo(x1, y1);
              path.lineTo(x2, y2);
              path.closePath();
            }
          }
        }
        if (skeleton) {
          // 뼈대는 속을 채운 작은 삼각형 — 선이 또렷하게 이어진다.
          // 속처럼 빛을 더하면(lighter) 겹친 곳이 하얗게 날아가므로 그대로 덮어 그린다.
          ctx!.globalCompositeOperation = "source-over";
          ctx!.globalAlpha = fade;
          ctx!.fillStyle = bucket.color;
          ctx!.fill();
        } else {
          ctx!.globalCompositeOperation = "lighter";
          ctx!.globalAlpha = fade * 0.85;
          ctx!.strokeStyle = bucket.color;
          ctx!.stroke();
        }
      }

      if (sweepCore && sweepHalo) {
        ctx!.globalCompositeOperation = "lighter";
        ctx!.strokeStyle = "#ffffff";
        ctx!.globalAlpha = 0.3;
        ctx!.stroke(sweepHalo);
        ctx!.globalAlpha = 0.85;
        ctx!.stroke(sweepCore);
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      if (visible) draw(now);
      else last = now;
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
    // 섹션 전체에서 마우스를 받는다 (타워 바깥에서도 101이 반응)
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
      {failed && (
        <Image src={src} alt="" fill sizes="100vw" className="object-contain" aria-hidden />
      )}
      {/* 스크립트가 꺼진 환경에서는 히어로가 빈 화면이 되지 않게 원본 이미지를 보여 준다 */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-contain" />
      </noscript>
      <span className="sr-only">삼각 파티클로 그린 타이베이 101</span>
    </div>
  );
}

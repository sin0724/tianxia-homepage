"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAnimationFrame, useInView } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import CountUp from "@/components/motion/CountUp";

/**
 * 로고 한 벌(23개)이 완전히 지나가는 데 걸리는 시간(초).
 * 낮출수록 빨라진다 — 속도를 바꾸려면 이 값만 만지면 된다.
 */
const SWEEP_SECONDS = 16;
/** 로고 사이 간격(px) — marginRight와 같아야 -50% 루프가 정확히 맞물린다 */
const GAP = 64;

/**
 * 히어로 바로 아래 협업 브랜드 로고 띠.
 *
 * 로고는 높이만 고정하고 폭은 비율대로 흐르게 둔다. 같은 크기 박스에
 * 밀어 넣으면 좁은 로고는 여백만 커지고 넓은 로고는 찌그러진다.
 *
 * 흰 판때기를 깔지 않고 배경을 제거한 PNG를 그대로 쓴다.
 * 기본은 brightness(0) invert(1)로 흰 실루엣이 되고, 호버하면 필터가 풀리며
 * 원래 색이 올라온다. 파일은 하나만 두고 상태는 CSS가 만든다.
 */
export default function BrandStripSection() {
  const logos = SITE_CONFIG.clients;
  // marquee가 -50%까지 이동하므로 트랙은 정확히 2벌이어야 이음매가 없다
  const track = [...logos, ...logos];

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0); // 0~50 (%)
  const velocity = useRef(1); // hover 시 0으로 감속
  const hovered = useRef(false);
  const inView = useInView(sectionRef, { amount: 0.1 });

  // CSS 키프레임 대신 rAF로 굴린다: hover 정지를 점프 없이 처리하고
  // 화면 밖에서는 아예 갱신하지 않는다.
  //
  // 동작 줄이기 환경에서도 멈추지 않는다. 배경처럼 일정하게 흐르는 띠라
  // 크리에이터 마퀴(.marquee-keep-motion)와 같은 판단을 따른다.
  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el || !inView) return;
    const target = hovered.current ? 0 : 1;
    velocity.current += (target - velocity.current) * Math.min(1, delta / 200);
    const pctPerMs = 50 / (SWEEP_SECONDS * 1000);
    offset.current = (offset.current + pctPerMs * velocity.current * delta) % 50;
    el.style.transform = `translateX(${-offset.current}%)`;
  });

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-zinc-950 border-y border-zinc-900 py-10 md:py-14 overflow-hidden"
    >
      <div
        className="relative"
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
      >
        {/* 양 끝이 배경으로 녹아들도록 */}
        <div className="absolute left-0 inset-y-0 w-16 md:w-32 z-10 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 md:w-32 z-10 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />

        <div
          ref={trackRef}
          className="flex items-center w-max"
          style={{ willChange: "transform" }}
        >
          {track.map((client, i) => (
            // 기본은 흰 실루엣, 올린 로고만 색이 돌아오며 떠오른다
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 flex items-center hover:-translate-y-1 transition-transform duration-300 ease-out"
              style={{ marginRight: `${GAP}px` }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={64}
                // 높이만 고정, 폭은 비율대로.
                //
                // brightness-0 + invert = 알파를 살린 흰 실루엣, 호버에서 원래 색으로.
                // arbitrary 값([filter:...])으로 쓰면 Tailwind가 brightness(1)을
                // brightness()로 뱉어 규칙이 통째로 무효가 되므로 기본 유틸리티를 쓴다.
                className="h-6 md:h-8 w-auto object-contain brightness-0 invert hover:brightness-100 hover:invert-0 transition-[filter] duration-300 ease-out"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* 띠만 두면 맥락이 사라져서, 한 줄로만 붙인다 */}
      <p className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8 md:mt-10 text-xs md:text-sm text-zinc-500">
        F&amp;B·뷰티·의료 분야{" "}
        <CountUp to={70} suffix="+" className="text-zinc-300 font-semibold" />{" "}
        브랜드와 대만 시장에서 함께 일했습니다.
      </p>
    </section>
  );
}

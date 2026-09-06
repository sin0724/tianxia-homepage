"use client";

import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";

/**
 * 한 세트가 화면 폭을 확실히 넘도록 보장하는 최소 카드 수.
 * 카드 폭은 행 높이의 3/4이라 세로가 짧은 창일수록 좁아지는데,
 * 그 최악의 경우에도 울트라와이드에서 빈 구간이 안 생기는 값이다.
 * 인원이 이보다 적으면 배열을 그만큼 반복해서 채운다.
 */
const MIN_CARDS_PER_SET = 7;

/** 카드 한 장이 화면을 가로지르는 데 걸리는 시간(초). 인원이 늘어도 체감 속도가 같도록 총 시간을 여기에 비례시킨다. */
const SECONDS_PER_CARD = 9;

function CreatorCard({ creator }: { creator: (typeof SITE_CONFIG.creators)[number] }) {
  return (
    <a
      href={`https://instagram.com/${creator.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${creator.handle} 인스타그램`}
      data-cursor="label"
      data-cursor-label={`@${creator.handle}`}
      className="group relative block h-full w-auto aspect-[3/4] flex-shrink-0 mr-3 md:mr-4 overflow-hidden bg-zinc-900"
    >
      <Image
        src={creator.photo}
        alt=""
        fill
        sizes="(max-width: 768px) 62vw, 19vw"
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* hover 시에만 깔리는 하단 그라데이션 — 핸들 가독성 확보용 */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5 translate-y-2 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-xs md:text-sm font-mono text-zinc-50 truncate">
          @{creator.handle}
        </p>
        <div className="h-px w-10 bg-red-500 mt-2 origin-left scale-x-0 transition-transform duration-500 delay-100 ease-out group-hover:scale-x-100" />
      </div>
    </a>
  );
}

export default function CreatorsSection() {
  const creators = SITE_CONFIG.creators;
  const { title, desc } = SITE_CONFIG.creatorsHeadline;

  // marquee 키프레임이 -50%까지 이동하므로 트랙은 정확히 2벌이어야 이음매가 없다.
  // 카드 간격은 flex gap 대신 카드의 mr로 주는데, gap을 쓰면 2벌의 마지막
  // 간격이 빠져 한 바퀴마다 gap 절반만큼 튄다.
  const reps = Math.max(1, Math.ceil(MIN_CARDS_PER_SET / creators.length));
  const set = Array.from({ length: reps }, () => creators).flat();
  const items = [...set, ...set];
  const duration = set.length * SECONDS_PER_CARD;

  return (
    <section
      id="creators"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-zinc-950 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-zinc-50 mb-3 md:mb-4">
          <MaskReveal delay={0.08}>{title}</MaskReveal>
        </h2>
        <div className="mb-3 md:mb-8">
          <Reveal delay={0.16}>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-[52ch] whitespace-pre-line">
              {desc}
            </p>
          </Reveal>
        </div>
        <LineReveal delay={0.2} className="h-px bg-zinc-800" />
      </div>

      {/* 마퀴는 좌우 패딩 밖으로 흘러나가야 하므로 max-w 컨테이너 바깥에 둔다 */}
      <Reveal delay={0.24} y={20} className="pt-6 md:pt-8 overflow-hidden">
        {/* 카드는 높이에서 폭이 결정되므로(3:4), 행 높이를 고정하면 폭도 고정된다.
            25vw → 카드 폭 약 18.75vw → 창 크기와 무관하게 항상 5명 안팎이 보인다. */}
        <div className="w-full h-[83vw] md:h-[25vw] overflow-hidden">
          <div
            className="marquee-track marquee-keep-motion flex h-full w-max"
            style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
          >
            {items.map((creator, i) => (
              <CreatorCard key={`${creator.handle}-${i}`} creator={creator} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

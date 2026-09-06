"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import { ArrowLeft, ArrowRight, Play, X } from "@phosphor-icons/react";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const DESKTOP_PAGE_SIZE = 6;

type Work = (typeof SITE_CONFIG.works)[0];

function extractVideoId(url: string): string {
  if (!url) return "";
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return short[1];
  const watch = url.match(/[?&]v=([^?&]+)/);
  if (watch) return watch[1];
  return "";
}

function toEmbedUrl(url: string): string {
  const id = extractVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";
}

/**
 * 유튜브는 영상마다 스토리보드 프레임 1~3번을 따로 제공한다.
 * 대표 썸네일 + 이 3장을 호버 중에 돌리면 새 에셋 없이 "움직이는 포트폴리오"가 된다.
 * (영상을 실제로 재생하지 않으므로 동시 재생 1개 제약과도 부딪히지 않는다)
 */
function toFrameUrls(url: string): string[] {
  const id = extractVideoId(url);
  if (!id) return [];
  return [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/1.jpg`,
    `https://img.youtube.com/vi/${id}/2.jpg`,
    `https://img.youtube.com/vi/${id}/3.jpg`,
  ];
}

/** 호버 중 프레임이 넘어가는 간격(ms) */
const FRAME_MS = 420;

/**
 * 호버하면 스토리보드가 넘어가는 썸네일.
 * maxresdefault가 없는 영상은 이미지가 깨지므로 hqdefault로 물러난다.
 */
function WorkThumb({
  work,
  className,
  sizes,
}: {
  work: Work;
  className: string;
  sizes: string;
}) {
  const frames = toFrameUrls(work.youtubeUrl);
  const [frame, setFrame] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  const start = () => {
    if (frames.length < 2) return;
    window.clearInterval(timer.current);
    timer.current = window.setInterval(
      () => setFrame((f) => (f + 1) % frames.length),
      FRAME_MS
    );
  };

  const stop = () => {
    window.clearInterval(timer.current);
    setFrame(0);
  };

  // 카드가 사라질 때 타이머가 남지 않도록
  useEffect(() => () => window.clearInterval(timer.current), []);

  const src =
    frames[frame] ?? `https://picsum.photos/seed/${work.placeholderSeed}/1280/720`;

  return (
    <span onMouseEnter={start} onMouseLeave={stop} className="contents">
      <Image
        key={src}
        src={src}
        alt={work.title}
        fill
        sizes={sizes}
        className={className}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (img.src.includes("maxresdefault")) {
            img.src = img.src.replace("maxresdefault", "hqdefault");
          }
        }}
      />
    </span>
  );
}

function VideoModal({ work, onClose }: { work: Work; onClose: () => void }) {
  // 모달 뒤 페이지가 같이 스크롤되지 않도록 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-black/92 flex flex-col"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-end px-6 md:px-10 h-14 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-50 transition-colors">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-6" onClick={(e) => e.stopPropagation()}>
        <div className="w-full max-w-5xl aspect-video">
          <iframe
            src={toEmbedUrl(work.youtubeUrl)}
            title={work.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  // 모바일: 1개씩
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  // 데스크탑: 3개씩 페이지
  const [dPage, setDPage] = useState(0);
  const [dDir, setDDir] = useState(1);

  const [playing, setPlaying] = useState<Work | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const reduce = useReducedMotion();
  // 동작 줄이기: 값·구조는 그대로 두고 이동만 즉시 끝낸다 (SSR 마크업 동일 유지)
  const slideTransition = reduce
    ? { duration: 0.3, x: { duration: 0 } }
    : { duration: 0.4, ease: EASE };

  const works = SITE_CONFIG.works;
  const total = works.length;
  const totalDPages = Math.ceil(total / DESKTOP_PAGE_SIZE);

  const canPrev = current > 0;
  const canNext = current < total - 1;
  const canDPrev = dPage > 0;
  const canDNext = dPage < totalDPages - 1;

  const navigate = (next: number) => {
    if (next < 0 || next >= total) return;
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  };

  const navigateD = (next: number) => {
    if (next < 0 || next >= totalDPages) return;
    setDDir(next > dPage ? 1 : -1);
    setDPage(next);
  };

  const work = works[current];
  const pageWorks = works.slice(dPage * DESKTOP_PAGE_SIZE, (dPage + 1) * DESKTOP_PAGE_SIZE);

  return (
    <>
      <section
        id="work"
        className="scroll-mt-16 md:scroll-mt-[68px] bg-zinc-950 px-6 md:px-12 py-24 md:py-32 overflow-hidden"
      >
        <div className="max-w-[1400px] w-full mx-auto">

          {/* 헤더 */}
          <div className="flex items-end justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-50">
                <MaskReveal delay={0.08}>Our Work</MaskReveal>
              </h2>
            </div>

            {/* 모바일 nav */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => navigate(current - 1)}
                disabled={!canPrev}
                className="w-10 h-10 border border-zinc-700 hover:border-zinc-400 disabled:opacity-25 disabled:cursor-default flex items-center justify-center text-zinc-400 hover:text-zinc-50 transition-all duration-200"
              >
                <ArrowLeft size={15} />
              </button>
              <span className="text-xs font-mono text-zinc-500 w-12 text-center">
                {current + 1}&nbsp;/&nbsp;{total}
              </span>
              <button
                onClick={() => navigate(current + 1)}
                disabled={!canNext}
                className="w-10 h-10 border border-zinc-700 hover:border-zinc-400 disabled:opacity-25 disabled:cursor-default flex items-center justify-center text-zinc-400 hover:text-zinc-50 transition-all duration-200"
              >
                <ArrowRight size={15} />
              </button>
            </div>

            {/* 데스크탑 nav */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigateD(dPage - 1)}
                disabled={!canDPrev}
                className="w-10 h-10 border border-zinc-700 hover:border-zinc-400 disabled:opacity-25 disabled:cursor-default flex items-center justify-center text-zinc-400 hover:text-zinc-50 transition-all duration-200"
              >
                <ArrowLeft size={15} />
              </button>
              <span className="text-xs font-mono text-zinc-500 w-12 text-center">
                {dPage + 1}&nbsp;/&nbsp;{totalDPages}
              </span>
              <button
                onClick={() => navigateD(dPage + 1)}
                disabled={!canDNext}
                className="w-10 h-10 border border-zinc-700 hover:border-zinc-400 disabled:opacity-25 disabled:cursor-default flex items-center justify-center text-zinc-400 hover:text-zinc-50 transition-all duration-200"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <LineReveal delay={0.14} className="h-px bg-zinc-800 mb-6 md:mb-8" />

          {/* 모바일: 단일 카드 슬라이더 */}
          <Reveal delay={0.2} y={20} className="md:hidden">
          <div
            className="relative w-full aspect-video overflow-hidden"
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const delta = touchStart - e.changedTouches[0].clientX;
              if (delta > 50) navigate(current + 1);
              else if (delta < -50) navigate(current - 1);
            }}
          >
            <AnimatePresence custom={dir} mode="wait" initial={false}>
              <motion.div
                key={current}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? "3%" : "-3%", opacity: 0 }),
                  center: { x: "0%", opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? "-3%" : "3%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="absolute inset-0 cursor-pointer group"
                data-cursor="play"
                onClick={() => work.youtubeUrl && setPlaying(work)}
              >
                <WorkThumb
                  work={work}
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <Play size={24} weight="fill" className="text-white ml-1" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          </Reveal>

          {/* 데스크탑: 3열 그리드 — aspect-video 유지, 세로 중앙 정렬 */}
          <Reveal delay={0.2} y={24} className="hidden md:block">
            <AnimatePresence custom={dDir} mode="wait" initial={false}>
              <motion.div
                key={dPage}
                custom={dDir}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? "2%" : "-2%", opacity: 0 }),
                  center: { x: "0%", opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? "-2%" : "2%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="grid grid-cols-3 gap-3"
              >
                {pageWorks.map((w, idx) => {
                  return (
                    <motion.div
                      key={w.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduce
                          ? { duration: 0.3, y: { duration: 0 } }
                          : { duration: 0.45, ease: EASE, delay: idx * 0.05 }
                      }
                      className="aspect-video relative overflow-hidden cursor-pointer group bg-zinc-900"
                      data-cursor="play"
                      onClick={() => w.youtubeUrl && setPlaying(w)}
                    >
                      <WorkThumb
                        work={w}
                        sizes="(max-width: 1400px) 33vw, 460px"
                        className="object-cover grayscale-[30%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                          <Play size={20} weight="fill" className="text-white ml-1" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {Array.from({ length: DESKTOP_PAGE_SIZE - pageWorks.length }).map((_, i) => (
                  <div key={`ghost-${i}`} className="aspect-video bg-zinc-900/20" />
                ))}
              </motion.div>
            </AnimatePresence>
          </Reveal>

          {/* 하단 도트 + CTA */}
          <Reveal delay={0.3} y={12} className="mt-6 flex items-center justify-between">
            {/* 모바일 도트 */}
            <div className="flex md:hidden items-center gap-1.5">
              {works.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-red-500" : "w-3 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
            {/* 데스크탑 도트 */}
            <div className="hidden md:flex items-center gap-1.5">
              {Array.from({ length: totalDPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigateD(i)}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === dPage ? "w-8 bg-red-500" : "w-3 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
            <a
              href="#contact"
              className="text-xs text-zinc-500 hover:text-red-500 transition-colors duration-200 font-medium underline-offset-4 hover:underline"
            >
              더 많은 작업물이 궁금하다면 문의해 주세요
            </a>
          </Reveal>

        </div>
      </section>

      <AnimatePresence>
        {playing && <VideoModal work={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </>
  );
}

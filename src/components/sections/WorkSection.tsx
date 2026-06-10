"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "@phosphor-icons/react";
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

function toThumbnailUrl(url: string): string {
  const id = extractVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
}

function VideoModal({ work, onClose }: { work: Work; onClose: () => void }) {
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
  const thumbnail = toThumbnailUrl(work.youtubeUrl);
  const pageWorks = works.slice(dPage * DESKTOP_PAGE_SIZE, (dPage + 1) * DESKTOP_PAGE_SIZE);

  return (
    <>
      <section className="h-[100dvh] bg-zinc-950 flex flex-col px-6 md:px-12 pt-20 md:pt-24 pb-3 md:pb-6 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1 min-h-0">

          {/* 헤더 */}
          <div className="flex items-end justify-between mb-2 md:mb-4 flex-shrink-0">
            <div>
              <Reveal delay={0} y={12}>
                <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-2">Portfolio</p>
              </Reveal>
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

          <LineReveal delay={0.14} className="h-px bg-zinc-800 mb-2 md:mb-4 flex-shrink-0" />

          {/* 모바일: 단일 카드 슬라이더 */}
          <Reveal delay={0.2} y={20} className="md:hidden flex-1 min-h-0 max-h-[48vh]">
          <div
            className="relative w-full h-full overflow-hidden"
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
                variants={reduce ? undefined : {
                  enter: (d: number) => ({ x: d > 0 ? "3%" : "-3%", opacity: 0 }),
                  center: { x: "0%", opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? "-3%" : "3%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0 cursor-pointer group"
                onClick={() => work.youtubeUrl && setPlaying(work)}
              >
                <Image
                  src={thumbnail || `https://picsum.photos/seed/${work.placeholderSeed}/1280/720`}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
                    <Play size={24} weight="fill" className="text-white ml-1" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          </Reveal>

          {/* 데스크탑: 3열 그리드 — aspect-video 유지, 세로 중앙 정렬 */}
          <Reveal delay={0.2} y={24} className="hidden md:flex flex-col justify-center flex-1 min-h-0">
            <AnimatePresence custom={dDir} mode="wait" initial={false}>
              <motion.div
                key={dPage}
                custom={dDir}
                variants={reduce ? undefined : {
                  enter: (d: number) => ({ x: d > 0 ? "2%" : "-2%", opacity: 0 }),
                  center: { x: "0%", opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? "-2%" : "2%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: EASE }}
                className="grid grid-cols-3 gap-3"
              >
                {pageWorks.map((w) => {
                  const thumb = toThumbnailUrl(w.youtubeUrl);
                  return (
                    <div
                      key={w.id}
                      className="aspect-video relative overflow-hidden cursor-pointer group bg-zinc-900"
                      onClick={() => w.youtubeUrl && setPlaying(w)}
                    >
                      <Image
                        src={thumb || `https://picsum.photos/seed/${w.placeholderSeed}/1280/720`}
                        alt={w.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
                          <Play size={20} weight="fill" className="text-white ml-1" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {Array.from({ length: DESKTOP_PAGE_SIZE - pageWorks.length }).map((_, i) => (
                  <div key={`ghost-${i}`} className="aspect-video bg-zinc-900/20" />
                ))}
              </motion.div>
            </AnimatePresence>
          </Reveal>

          {/* 하단 도트 + CTA */}
          <Reveal delay={0.3} y={12} className="mt-3 flex items-center justify-between flex-shrink-0">
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
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("fp-navigate", { detail: { index: 6 } }))}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-500 transition-colors duration-200 font-medium"
            >
              More work available — get in touch
              <ArrowUpRight size={13} weight="bold" />
            </button>
          </Reveal>

        </div>
      </section>

      <AnimatePresence>
        {playing && <VideoModal work={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </>
  );
}

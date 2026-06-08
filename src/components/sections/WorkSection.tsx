"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState<Work | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const reduce = useReducedMotion();

  const works = SITE_CONFIG.works;
  const total = works.length;
  const canPrev = current > 0;
  const canNext = current < total - 1;

  const navigate = (next: number) => {
    if (next < 0 || next >= total) return;
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  };

  const work = works[current];
  const thumbnail = toThumbnailUrl(work.youtubeUrl);

  return (
    <>
      <section className="h-[100dvh] bg-zinc-950 flex flex-col px-6 md:px-12 pt-20 md:pt-24 pb-6 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1 min-h-0">

          {/* 헤더 */}
          <div className="flex items-end justify-between mb-4 flex-shrink-0">
            <div>
              <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-2">Portfolio</p>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-50">Our Work</h2>
            </div>
            <div className="flex items-center gap-3">
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
          </div>

          <div className="border-t border-zinc-800 mb-4 flex-shrink-0" />

          {/* 카드 1장 — 전체 영역 채우기 */}
          <div
            className="flex-1 min-h-0 relative overflow-hidden"
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

                {/* 플레이 오버레이 */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
                    <Play size={24} weight="fill" className="text-white ml-1" />
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* 하단 도트 + CTA */}
          <div className="mt-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-1.5">
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
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("fp-navigate", { detail: { index: 5 } }))}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-500 transition-colors duration-200 font-medium"
            >
              More work available — get in touch
              <ArrowUpRight size={13} weight="bold" />
            </button>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {playing && <VideoModal work={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </>
  );
}

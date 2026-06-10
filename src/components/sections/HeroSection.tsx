"use client";

import { useEffect, useRef, useState } from "react";
import { SpeakerSimpleX, SpeakerSimpleHigh } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/lib/config";
import { useSectionState } from "@/components/SectionContext";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const { isActive } = useSectionState();

  // 활성 섹션에서만 재생 — 숨겨진 프리로드 사본은 버퍼링만 하고 디코딩하지 않음
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-zinc-950">
      <video
        ref={videoRef}
        src={SITE_CONFIG.heroVideo}
        poster={SITE_CONFIG.heroPoster}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-contain md:object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      {/* 음소거 토글 버튼 */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 w-10 h-10 flex items-center justify-center border border-white/30 bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/60 transition-all duration-200"
        aria-label={muted ? "소리 켜기" : "소리 끄기"}
      >
        {muted
          ? <SpeakerSimpleX size={18} weight="bold" />
          : <SpeakerSimpleHigh size={18} weight="bold" />
        }
      </button>
    </section>
  );
}

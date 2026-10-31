"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SpeakerSimpleX, SpeakerSimpleHigh } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/lib/config";
import { useVideoInView } from "@/components/motion/useVideoInView";

/**
 * 쇼릴 — 예전 히어로 영상.
 *
 * 히어로를 101 파티클로 바꾸면서 영상은 바로 아래로 옮겼다. 101이 스크롤에
 * 흩어지며 사라지는 자리에서 영상 프레임이 커지며 이어받는다.
 * Dala 가이드대로 24px 라운드 프레임, 그림자·테두리 없음.
 */
export default function ShowreelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);
  const { containerRef, videoRef, shouldLoad } = useVideoInView({ amount: 0.35 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scale = useTransform(eased, [0, 1], [0.88, 1]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-black px-4 sm:px-6 md:px-10 pb-[60px] md:pb-[120px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="dala-label text-saffron mb-6">Showreel</p>

        <motion.div
          ref={containerRef}
          style={{ scale }}
          className="relative aspect-video max-h-[85dvh] w-full overflow-hidden rounded-[16px] sm:rounded-[24px] bg-zinc-900"
        >
          <video
            ref={videoRef}
            src={shouldLoad ? SITE_CONFIG.heroVideo : undefined}
            poster={SITE_CONFIG.heroPoster}
            muted
            loop
            playsInline
            preload="none"
            aria-label="대만 마케팅 에이전시 티엔샤 브랜드 소개 영상"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <button
            onClick={toggleMute}
            className="dala-label absolute bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-10 inline-flex h-9 w-9 justify-center sm:h-10 sm:w-auto items-center gap-2 rounded-full bg-black/50 sm:px-4 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/70"
            aria-label={muted ? "소리 켜기" : "소리 끄기"}
          >
            {muted ? (
              <SpeakerSimpleX size={16} weight="bold" />
            ) : (
              <SpeakerSimpleHigh size={16} weight="bold" />
            )}
            {/* 모바일은 프레임이 작아 아이콘만 (자막을 가리지 않게) */}
            <span className="hidden sm:inline">{muted ? "Sound on" : "Sound off"}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

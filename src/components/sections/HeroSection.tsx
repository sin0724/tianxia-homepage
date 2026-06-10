"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SpeakerSimpleX, SpeakerSimpleHigh } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/lib/config";
import { useSectionState } from "@/components/SectionContext";
import { EASE_OUT } from "@/components/motion/Reveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const { isActive, isRevisit } = useSectionState();
  const reduce = useReducedMotion();

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
      {/* 진입 연출: 영상 1.06→1 줌아웃 (재방문·reduced-motion은 생략) */}
      <motion.div
        className="absolute inset-0"
        initial={reduce || isRevisit ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        {/* Ken Burns: 머무는 동안 아주 느린 줌 인-아웃 반복 */}
        <motion.div
          className="absolute inset-0"
          animate={!reduce && isActive ? { scale: [1, 1.045] } : { scale: 1 }}
          transition={
            !reduce && isActive
              ? {
                  duration: 22,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 1.5,
                }
              : { duration: 0.3 }
          }
        >
          {/* 마우스 패럴랙스: 커서 반대 방향으로 미세하게 미끄러짐 */}
          <ParallaxLayer strength={14} invert>
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
          </ParallaxLayer>
        </motion.div>
      </motion.div>

      {/* 오버레이: 진하게 시작해 옅어지며 영상이 드러남 */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={reduce || isRevisit ? { opacity: 0.2 } : { opacity: 0.6 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      />

      {/* 음소거 토글 버튼 */}
      <motion.button
        onClick={toggleMute}
        initial={isRevisit ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 w-10 h-10 flex items-center justify-center border border-white/30 bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/60 transition-all duration-200"
        aria-label={muted ? "소리 켜기" : "소리 끄기"}
      >
        {muted
          ? <SpeakerSimpleX size={18} weight="bold" />
          : <SpeakerSimpleHigh size={18} weight="bold" />
        }
      </motion.button>
    </section>
  );
}

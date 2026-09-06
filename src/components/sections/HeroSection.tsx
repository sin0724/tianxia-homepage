"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SpeakerSimpleX, SpeakerSimpleHigh } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/lib/config";
import { EASE_OUT } from "@/components/motion/Reveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import { useVideoInView } from "@/components/motion/useVideoInView";

export default function HeroSection() {
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();
  // 히어로는 첫 화면이라 지연 로드 대상이 아니다 (eager)
  const { containerRef, videoRef, isActive } = useVideoInView({
    amount: 0.25,
    eager: true,
  });

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section
      id="home"
      className="relative h-[100dvh] overflow-hidden bg-zinc-950"
    >
      {/*
        접근성·SEO: 영상만으로 구성된 히어로의 텍스트 대체.
        sr-only(clip 방식)로 시각적으로는 숨기되 스크린리더·검색엔진에는
        노출 — 화면이 전달하는 내용과 동일한 자연스러운 문장으로만 작성.
      */}
      <h1 className="sr-only">
        대만 마케팅 전문 에이전시 (주)티엔샤 TIANXIA
      </h1>
      <p className="sr-only">
        한국 브랜드의 대만 시장 진출 파트너. 대만 KOL·KOC 마케팅, 쇼피 입점
        지원, 공동구매 마케팅으로 F&amp;B·뷰티·병원 브랜드의 대만 진출을 돕습니다.
      </p>

      {/* 진입 연출: 영상 1.06→1 줌아웃 (동작 줄이기면 시간만 0으로) */}
      <motion.div
        ref={containerRef}
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.4, ease: EASE_OUT }}
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
              // 인트로 로더가 진행률 기준으로 삼는 표식
              data-hero
              src={SITE_CONFIG.heroVideo}
              poster={SITE_CONFIG.heroPoster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="대만 마케팅 에이전시 티엔샤 브랜드 소개 영상"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </ParallaxLayer>
        </motion.div>
      </motion.div>

      {/* 오버레이: 진하게 시작해 옅어지며 영상이 드러남 */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0.2 }}
        transition={reduce ? { duration: 0.3 } : { duration: 1.2, ease: EASE_OUT }}
      />

      {/* 음소거 토글 버튼 */}
      <motion.button
        onClick={toggleMute}
        initial={{ opacity: 0 }}
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

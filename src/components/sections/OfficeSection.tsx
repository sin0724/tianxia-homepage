"use client";

import Image from "next/image";
import { Reveal, MaskReveal, LineReveal, ClipReveal } from "@/components/motion/Reveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

export default function OfficeSection() {

  return (
    <section
      id="office"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-zinc-950 px-6 md:px-12 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto">

        {/* 헤더 */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-50">
              <MaskReveal delay={0.08}>타이베이 현지 오피스</MaskReveal>
            </h2>
          </div>
          <Reveal delay={0.16} className="hidden md:block">
            <p className="text-xs text-zinc-500 text-right leading-[1.9]">
              대만 현지에서 직접 운영하는 공간.<br />
              빠른 실행과 깊은 현지 이해가<br />
              가능한 이유입니다.
            </p>
          </Reveal>
        </div>

        <LineReveal delay={0.16} className="h-px bg-zinc-800 mb-6 md:mb-8" />

        {/* 이미지 그리드
            왼쪽(3/5): 가로 이미지 2장 — 피처드(_03) + 회의실(_00)
            오른쪽(2/5): 세로 이미지 2장 — 미팅라운지(_02) + 인테리어(_01)
        */}
        <div
          className="h-[80vh] max-h-[760px] grid grid-cols-5 gap-3"
          data-cursor="label"
          data-cursor-label="TAIPEI"
        >
          {/* 왼쪽: 가로 이미지 2장 (위 65% / 아래 35%) */}
          <div className="col-span-3 flex flex-col gap-3">
            {/* 피처드 */}
            <ClipReveal delay={0.2} className="flex-[13] relative overflow-hidden bg-zinc-900 group">
              <ParallaxLayer strength={11} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154_03.jpg"
                  alt="타이베이 오피스 공용 공간"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 60vw, 45vw"
                />
              </ParallaxLayer>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-xs text-zinc-200/80">타이베이, 대만</span>
              </div>
            </ClipReveal>
            {/* 회의실 (가로 이미지) */}
            <ClipReveal delay={0.32} className="flex-[7] relative overflow-hidden bg-zinc-900 group">
              <ParallaxLayer strength={6} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154.jpg"
                  alt="타이베이 오피스 회의실"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </ParallaxLayer>
            </ClipReveal>
          </div>

          {/* 오른쪽: 세로 이미지 2장 (50% / 50%) */}
          <div className="col-span-2 flex flex-col gap-3">
            <ClipReveal delay={0.26} className="flex-1 relative overflow-hidden bg-zinc-900 group">
              <ParallaxLayer strength={8} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154_02.jpg"
                  alt="타이베이 오피스 미팅 라운지"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </ParallaxLayer>
            </ClipReveal>
            <ClipReveal delay={0.38} className="flex-1 relative overflow-hidden bg-zinc-900 group">
              <ParallaxLayer strength={13} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154_01.jpg"
                  alt="타이베이 오피스 인테리어"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </ParallaxLayer>
            </ClipReveal>
          </div>
        </div>

      </div>
    </section>
  );
}

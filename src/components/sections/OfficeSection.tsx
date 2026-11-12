"use client";

import Image from "next/image";
import { Reveal, MaskReveal, LineReveal, ClipReveal } from "@/components/motion/Reveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

export default function OfficeSection() {

  return (
    <section
      id="office"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-zinc-950 px-4 sm:px-6 md:px-10 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1280px] w-full mx-auto">

        {/* 헤더 */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-zinc-50">
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
            데스크탑: 5열 모자이크
              왼쪽(3/5): 가로 이미지 2장 — 피처드(_03) + 회의실(_00)
              오른쪽(2/5): 세로 이미지 2장 — 미팅라운지(_02) + 인테리어(_01)
            모바일: 5열을 그대로 쓰면 사진이 세로로 길쭉한 띠가 된다.
              가로 사진은 한 줄씩, 세로 사진 두 장은 나란히 쌓는다.
        */}
        <div
          className="flex flex-col gap-3 md:grid md:h-[80vh] md:max-h-[760px] md:grid-cols-5"
          data-cursor="label"
          data-cursor-label="TAIPEI"
        >
          {/* 왼쪽: 가로 이미지 2장 (위 65% / 아래 35%) */}
          <div className="flex flex-col gap-3 md:col-span-3">
            {/* 피처드 */}
            <ClipReveal delay={0.2} className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-zinc-900 group sm:rounded-[24px] md:aspect-auto md:flex-[13]">
              <ParallaxLayer strength={11} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154_03.jpg"
                  alt="타이베이 오피스 공용 공간"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </ParallaxLayer>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-xs text-zinc-200/80">타이베이, 대만</span>
              </div>
            </ClipReveal>
            {/* 회의실 (가로 이미지) */}
            <ClipReveal delay={0.32} className="relative aspect-[16/9] overflow-hidden rounded-[16px] bg-zinc-900 group sm:rounded-[24px] md:aspect-auto md:flex-[7]">
              <ParallaxLayer strength={6} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154.jpg"
                  alt="타이베이 오피스 회의실"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </ParallaxLayer>
            </ClipReveal>
          </div>

          {/* 오른쪽: 세로 이미지 2장 (50% / 50%) */}
          <div className="grid grid-cols-2 gap-3 md:col-span-2 md:flex md:flex-col">
            <ClipReveal delay={0.26} className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-zinc-900 group sm:rounded-[24px] md:aspect-auto md:flex-1">
              <ParallaxLayer strength={8} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154_02.jpg"
                  alt="타이베이 오피스 미팅 라운지"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </ParallaxLayer>
            </ClipReveal>
            <ClipReveal delay={0.38} className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-zinc-900 group sm:rounded-[24px] md:aspect-auto md:flex-1">
              <ParallaxLayer strength={13} invert>
                <Image
                  src="/company/KakaoTalk_20250207_144234154_01.jpg"
                  alt="타이베이 오피스 인테리어"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </ParallaxLayer>
            </ClipReveal>
          </div>
        </div>

      </div>
    </section>
  );
}

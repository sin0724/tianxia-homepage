"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import { useVideoInView } from "@/components/motion/useVideoInView";

/**
 * 브랜드 필름 — 영상 하나로만 서는 섹션.
 *
 * 위에 카피나 라벨을 얹지 않는다. 영상 자체가 콘텐츠고, 글자를 겹치면
 * 타이포가 두 번 나오는 꼴이 된다.
 *
 * 스크롤에 맞춰 작은 액자에서 풀블리드로 펼쳐진다. 프레임을 스크롤에 묶는
 * 스크러빙이 아니라 scale·radius만 움직이므로 레이아웃이 흔들리지 않고
 * 모바일에서도 싸다. 진행바와 마찬가지로 스크롤 입력을 그대로 비추는
 * 연출이라 동작 줄이기 환경에서도 끄지 않는다.
 */
export default function FilmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { containerRef, videoRef, shouldLoad } = useVideoInView({ amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // 섹션이 아래에서 올라오기 시작할 때 0, 화면 한가운데 왔을 때 1
    offset: ["start end", "center center"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const scale = useTransform(eased, [0, 1], [0.82, 1]);
  const radius = useTransform(eased, [0, 1], [28, 0]);

  return (
    <section
      ref={sectionRef}
      id="film"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-black overflow-hidden"
    >
      {/* 초광폭 화면에서 16:9를 그대로 쓰면 한 화면을 넘어가므로 높이를 한 화면으로 묶고
          넘치는 만큼은 crop 한다 */}
      <div ref={containerRef} className="relative w-full aspect-video max-h-[100dvh]">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ scale, borderRadius: radius }}
        >
          <video
            ref={videoRef}
            src={shouldLoad ? SITE_CONFIG.filmVideo : undefined}
            poster={SITE_CONFIG.filmPoster}
            muted
            loop
            playsInline
            preload="none"
            aria-label="티엔샤 브랜드 필름"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

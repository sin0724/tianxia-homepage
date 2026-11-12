"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import { useVideoInView } from "@/components/motion/useVideoInView";

/**
 * 브랜드 필름 — 영상 하나로만 서는 섹션.
 *
 * 위에 카피를 얹지 않는다. 영상 자체가 타이포 필름이라, 글자를 겹치면
 * 타이포가 두 번 나오는 꼴이 된다. 작은 라벨만 카드 상태일 때 잠깐 보인다.
 *
 * 연출: 둥근 카드로 들어와 화면에 붙고(sticky), 스크롤하는 동안 풀블리드로 열린다.
 * 위쪽 쇼릴은 프레임이 커지기만 하므로, 같은 연출이 두 번 나오지 않게 여기는
 * "붙어서 열리는" 방식으로 구분했다. 프레임을 스크롤에 묶는 스크러빙이 아니라
 * clip-path·scale만 움직이므로 레이아웃이 흔들리지 않는다. 스크롤 입력을 그대로
 * 비추는 연출이라 동작 줄이기 환경에서도 끄지 않는다.
 *
 * 모바일은 붙이지 않는다. 세로 화면을 16:9 영상으로 꽉 채우면 타이포가 잘리기 때문에,
 * 가로 띠 그대로 지나가면서 열리기만 한다.
 */

/** 카드 상태(--p: 1)에서 풀블리드(--p: 0)로. 여백 크기는 화면 폭별로 클래스가 정한다. */
const CLIP =
  "inset(calc(var(--p) * var(--iy)) calc(var(--p) * var(--ix)) round calc(var(--p) * 24px))";

export default function FilmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { containerRef, videoRef, shouldLoad } = useVideoInView({ amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // 섹션 머리가 화면 아래에 닿을 때 0, 섹션 끝이 화면 아래에 닿을 때 1.
    // 데스크탑은 섹션이 190vh라 0.53 지점부터 화면에 붙어 있다.
    offset: ["start end", "end end"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // 카드가 절반쯤 올라왔을 때 열리기 시작해, 붙어 있는 구간 중간에 다 열린다
  const closed = useTransform(eased, [0.28, 0.82], [1, 0], { clamp: true });
  const scale = useTransform(eased, [0.28, 0.82], [1.12, 1], { clamp: true });
  const labelOpacity = useTransform(eased, [0.3, 0.5], [1, 0], { clamp: true });

  return (
    <section
      ref={sectionRef}
      id="film"
      className="relative scroll-mt-16 md:scroll-mt-[68px] bg-black md:h-[190vh]"
    >
      <div className="md:sticky md:top-0 md:flex md:h-[100dvh] md:items-center">
        {/* 초광폭 화면에서 16:9를 그대로 쓰면 한 화면을 넘어가므로 높이를 한 화면으로 묶고
            넘치는 만큼은 crop 한다. 재생 감지는 클립되지 않는 이 박스가 맡는다
            (클립된 요소를 직접 관찰하면 가시 면적이 줄어 판정이 어긋난다). */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video max-h-[100dvh] [--ix:5%] [--iy:6%] md:[--ix:21%] md:[--iy:15%]"
        >
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ "--p": closed, clipPath: CLIP } as unknown as CSSProperties}
          >
            <motion.div className="absolute inset-0" style={{ scale }}>
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
          </motion.div>

          <motion.p
            aria-hidden
            style={{ opacity: labelOpacity }}
            className="dala-label text-saffron pointer-events-none absolute left-[21%] top-[15%] hidden -translate-y-[calc(100%+14px)] md:block"
          >
            Brand Film
          </motion.p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** 재생으로 판정할 가시 비율 */
  amount?: number;
  /** 화면 밖 어느 거리부터 미리 로드할지 */
  loadMargin?: string;
  /** 히어로처럼 처음부터 로드해야 하는 영상 */
  eager?: boolean;
}

/**
 * 영상 지연 로드 + 뷰포트 연동 재생.
 *
 * 풀페이지 스크롤을 걷어내면서 8개 섹션이 한 번에 마운트되기 때문에,
 * 예전처럼 모든 <video>에 src와 preload="auto"를 걸면 첫 로드에 수십 MB가
 * 동시에 흐른다. shouldLoad가 true가 된 뒤에야 src를 붙이는 식으로 막는다.
 *
 * - shouldLoad: 화면에 가까워지면 true. 한 번 켜지면 유지(다시 내리면 재버퍼링)
 * - isActive:   실제로 화면에 충분히 들어온 상태. 재생/정지 판단에 쓴다
 */
export function useVideoInView({
  amount = 0.35,
  loadMargin = "200% 0px",
  eager = false,
}: Options = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // 서버·클라이언트 초기값이 같아야 하므로 eager 여부만 반영한다
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observers: IntersectionObserver[] = [];

    if (!eager) {
      const loadObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            loadObserver.disconnect();
          }
        },
        { rootMargin: loadMargin }
      );
      loadObserver.observe(el);
      observers.push(loadObserver);
    }

    const playObserver = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: amount }
    );
    playObserver.observe(el);
    observers.push(playObserver);

    return () => observers.forEach((o) => o.disconnect());
  }, [amount, loadMargin, eager]);

  // 화면 밖 영상은 디코딩까지 멈춘다
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive, shouldLoad]);

  return { containerRef, videoRef, shouldLoad, isActive };
}

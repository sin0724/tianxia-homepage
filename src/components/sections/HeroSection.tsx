"use client";

import { SITE_CONFIG } from "@/lib/config";

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh] overflow-hidden bg-zinc-950">
      {/* 배경 영상 */}
      <video
        src={SITE_CONFIG.heroVideo}
        poster={SITE_CONFIG.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 미세 어둠 오버레이 */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
}

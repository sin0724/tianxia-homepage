"use client";

import Image from "next/image";

export default function OfficeSection() {

  return (
    <section className="h-[100dvh] bg-zinc-950 flex flex-col px-6 md:px-12 pt-20 pb-8 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1 min-h-0">

        {/* 헤더 */}
        <div className="flex items-end justify-between mb-4 flex-shrink-0">
          <div>
            <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-2">
              Our Space
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-50">
              타이베이 현지 오피스
            </h2>
          </div>
          <p className="text-xs text-zinc-500 text-right leading-[1.9] hidden md:block">
            대만 현지에서 직접 운영하는 공간.<br />
            빠른 실행과 깊은 현지 이해가<br />
            가능한 이유입니다.
          </p>
        </div>

        <div className="border-t border-zinc-800 mb-5 flex-shrink-0" />

        {/* 이미지 그리드
            왼쪽(3/5): 가로 이미지 2장 — 피처드(_03) + 회의실(_00)
            오른쪽(2/5): 세로 이미지 2장 — 미팅라운지(_02) + 인테리어(_01)
        */}
        <div className="flex-1 min-h-0 grid grid-cols-5 gap-3">
          {/* 왼쪽: 가로 이미지 2장 (위 65% / 아래 35%) */}
          <div className="col-span-3 flex flex-col gap-3">
            {/* 피처드 */}
            <div className="flex-[13] relative overflow-hidden bg-zinc-900 group">
              <Image
                src="/company/KakaoTalk_20250207_144234154_03.jpg"
                alt="타이베이 오피스 공용 공간"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-[10px] font-mono text-zinc-300/70 uppercase tracking-[0.25em]">
                  Taipei, Taiwan
                </span>
              </div>
            </div>
            {/* 회의실 (가로 이미지) */}
            <div className="flex-[7] relative overflow-hidden bg-zinc-900 group">
              <Image
                src="/company/KakaoTalk_20250207_144234154.jpg"
                alt="타이베이 오피스 회의실"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 오른쪽: 세로 이미지 2장 (50% / 50%) */}
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex-1 relative overflow-hidden bg-zinc-900 group">
              <Image
                src="/company/KakaoTalk_20250207_144234154_02.jpg"
                alt="타이베이 오피스 미팅 라운지"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 relative overflow-hidden bg-zinc-900 group">
              <Image
                src="/company/KakaoTalk_20250207_144234154_01.jpg"
                alt="타이베이 오피스 인테리어"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

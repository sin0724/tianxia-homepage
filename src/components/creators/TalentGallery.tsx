"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import type { TalentImage } from "@/lib/talents";

/** 프로필 상세의 갤러리 — 썸네일 그리드 + 클릭하면 좌우로 넘길 수 있는 전체 화면 보기 */
export default function TalentGallery({ images, name }: { images: TalentImage[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, move]);

  // 터치에서 좌우 스와이프로 넘기기
  const [touchX, setTouchX] = useState<number | null>(null);

  const current = open === null ? null : images[open];

  return (
    <>
      {/* 원본 비율이 제각각이라 masonry로 두면 열 높이가 들쭉날쭉해 빈 곳이 생긴다.
          칸을 3:4로 통일해 왼쪽부터 규칙적으로 채우고, 원본은 크게 보기에서 보여 준다. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`${name} 사진 ${i + 1} 크게 보기`}
            className="group relative block aspect-[3/4] overflow-hidden bg-zinc-900"
          >
            <Image
              src={img.src}
              alt={`${name} 사진 ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} 사진`}
          className="fixed inset-0 z-[300] bg-zinc-950/95 flex items-center justify-center"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={`${name} 사진 ${open! + 1}`}
            width={current.w}
            height={current.h}
            sizes="100vw"
            className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-400">
            {open! + 1} / {images.length}
          </p>
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-zinc-200 hover:text-saffron"
          >
            <X size={26} />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="이전 사진"
                onClick={(e) => {
                  e.stopPropagation();
                  move(-1);
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-zinc-200 hover:text-saffron"
              >
                <CaretLeft size={30} />
              </button>
              <button
                type="button"
                aria-label="다음 사진"
                onClick={(e) => {
                  e.stopPropagation();
                  move(1);
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-zinc-200 hover:text-saffron"
              >
                <CaretRight size={30} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

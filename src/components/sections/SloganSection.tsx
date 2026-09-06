/**
 * 대형 슬로건 마퀴.
 *
 * PLAY TAIWAN은 인트로 로더에서 한 번 나오고 사라졌다. 이미지가 몰린
 * 오피스와 작업물 사이에 글자만 있는 구간을 끼워 리듬을 끊고, 페이지
 * 후반에서 브랜드를 한 번 더 각인시킨다.
 *
 * 채운 글자와 외곽선 글자를 번갈아 두어 띠 자체가 무늬가 되게 했다.
 * 구분자 台는 예전 텍스트 마퀴에서 쓰던 표식을 이어받은 것.
 */

/** 마퀴 한 바퀴(=한 벌이 완전히 지나가는) 시간. 낮출수록 빠르다. */
const SWEEP_SECONDS = 22;

/** -50% 키프레임과 맞물리려면 트랙은 정확히 2벌이어야 한다 */
const SET = ["fill", "line", "fill", "line"] as const;

function Slogan({ variant }: { variant: (typeof SET)[number] }) {
  return (
    <span className="inline-flex items-center flex-shrink-0">
      <span
        className={
          variant === "fill"
            ? "text-zinc-50"
            : // 속을 비우고 외곽선만 — 채운 글자와 번갈아 나오며 무늬를 만든다
              "text-transparent [-webkit-text-stroke:1.5px_rgb(113_113_122)]"
        }
      >
        PLAY TAIWAN
      </span>
      <span className="text-red-600 mx-8 md:mx-12" aria-hidden>
        台
      </span>
    </span>
  );
}

export default function SloganSection() {
  return (
    <section
      aria-label="PLAY TAIWAN"
      className="bg-zinc-950 border-y border-zinc-900 py-14 md:py-20 overflow-hidden"
    >
      <div
        className="marquee-track marquee-keep-motion flex w-max whitespace-nowrap font-black tracking-tighter leading-none text-[13vw] md:text-[8vw]"
        style={{ "--marquee-duration": `${SWEEP_SECONDS}s` } as React.CSSProperties}
      >
        {[...SET, ...SET].map((variant, i) => (
          <Slogan key={i} variant={variant} />
        ))}
      </div>
    </section>
  );
}

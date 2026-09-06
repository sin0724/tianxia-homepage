"use client";

import React from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";

/** 사이트 전체 reveal 표준 ease (expo-out 계열) */
export const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * 뷰포트 진입 판정 기준.
 * 예전에는 풀페이지 섹션 전환(0.85s)이 끝나기를 기다리는 BASE_DELAY가 있었지만,
 * 일반 스크롤에서는 스크롤 자체가 타이밍을 만들기 때문에 지연 없이 즉시 시작한다.
 */
const VIEWPORT = { once: true, amount: 0.25 } as const;

/**
 * 동작 줄이기 대응은 "무엇을 그리는가"가 아니라 "얼마나 걸리는가"로만 한다.
 *
 * useReducedMotion()은 서버에서 false, 클라이언트에서 true라서 이 값으로 마크업이나
 * initial 값을 갈아끼우면 hydration mismatch가 난다(실제로 났었다). transition은
 * SSR 결과물에 남지 않으므로, 값과 구조는 그대로 두고 이동·변형만 즉시 끝낸다.
 */
function useRevealTransition(duration: number, delay: number): Transition {
  const reduce = useReducedMotion();

  if (!reduce) return { duration, delay, ease: EASE_OUT };

  return {
    duration: 0.3,
    delay: 0,
    ease: "linear",
    // 불투명도만 남기고 이동·변형 계열은 0초로
    y: { duration: 0 },
    x: { duration: 0 },
    scale: { duration: 0 },
    scaleX: { duration: 0 },
    clipPath: { duration: 0 },
  };
}

interface RevealProps {
  children: React.ReactNode;
  /** stagger 용 지연 */
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

/** 페이드-업 reveal */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
}: RevealProps) {
  const transition = useRevealTransition(duration, delay);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/** 글자 하나가 앞 글자보다 늦게 올라오는 간격(초) */
const CHAR_STEP = 0.028;

const CHAR_VARIANTS = {
  hidden: { y: "110%" },
  visible: { y: "0%" },
};

/**
 * children을 글자 단위 motion.span으로 쪼갠다.
 *
 * - 문자열만 쪼개고 엘리먼트는 껍데기를 유지한 채 재귀한다.
 *   (`Together We <span className="text-red-600">Create Value</span>` 처럼
 *   색이 섞인 헤드라인에서 색을 잃지 않으려면 이래야 한다)
 * - 단어를 통째로 inline-block으로 감싸고 그 안에서 글자를 쪼갠다.
 *   글자마다 줄바꿈이 일어나 영어 단어가 중간에서 끊기는 걸 막는다.
 * - 마스크(overflow-hidden)도 단어 단위로 건다. 블록 전체에 걸면
 *   두 줄짜리 헤드라인에서 윗줄 글자가 아랫줄 영역으로 삐져나온다.
 */
function splitChars(
  node: React.ReactNode,
  counter: { i: number },
  transition: Transition,
  delay: number,
  step: number
): React.ReactNode {
  if (typeof node === "string") {
    // 공백은 그대로 두고 단어만 감싼다 (split 결과에 구분자를 남기려고 캡처 그룹 사용)
    return node.split(/(\s+)/).map((token, ti) => {
      if (token === "") return null;
      if (/^\s+$/.test(token)) return <span key={`s${ti}`}> </span>;
      return (
        <span
          key={`w${ti}`}
          // pb/-mb는 y·g 같은 디센더가 마스크에 잘리지 않게 숨통을 틔우는 용도
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          {[...token].map((ch, ci) => {
            const idx = counter.i++;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                variants={CHAR_VARIANTS}
                transition={{ ...transition, delay: delay + idx * step }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      );
    });
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>
        {splitChars(child, counter, transition, delay, step)}
      </React.Fragment>
    ));
  }

  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return React.cloneElement(el, {
      children: splitChars(el.props.children, counter, transition, delay, step),
    });
  }

  return node;
}

/** 마스크 텍스트 reveal — 글자가 하나씩 시차를 두고 아래에서 올라옴 */
export function MaskReveal({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  // 글자 단위 지연은 동작 줄이기에서 의미가 없다 — 한 번에 세운다
  const transition = useRevealTransition(duration, 0);

  /*
    진입 감지는 반드시 바깥 span이 해야 한다.
    글자 span들은 시작 상태가 y:110%라 자기 마스크 밖으로 밀려나 있고,
    IntersectionObserver는 조상의 클립 영역까지 반영하므로 안쪽을 관찰하면
    "안 보이니 애니메이션 안 함 → 안 보임"으로 영원히 갇힌다.
    바깥에서 감지하고 variant를 자식들에게 전파한다.
  */
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {splitChars(
        children,
        { i: 0 },
        transition,
        reduce ? 0 : delay,
        reduce ? 0 : CHAR_STEP
      )}
    </motion.span>
  );
}

/** 커튼 reveal — clip-path가 아래에서 위로 열리며 내부는 1.08→1로 줌아웃 */
export function ClipReveal({
  children,
  delay = 0,
  duration = 1,
  className,
}: RevealProps) {
  const transition = useRevealTransition(duration, delay);

  /*
    MaskReveal과 같은 이유로 감지는 클립되지 않은 바깥 박스가 한다.
    clip-path: inset(100%)는 요소의 가시 면적을 0으로 만들고
    IntersectionObserver는 그 면적을 기준으로 판정하므로,
    클립된 요소를 직접 관찰하면 영원히 열리지 않는다.
  */
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={transition}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.08 }, visible: { scale: 1 } }}
          transition={transition}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** 라인 드로잉 — 왼쪽에서 오른쪽으로 scaleX 0→1 */
export function LineReveal({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  const transition = useRevealTransition(0.8, delay);

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      // scaleX(0)이라 가시 면적이 0이다. amount를 조금이라도 주면
      // "면적이 없어서 안 보임 → 안 그림"으로 갇히므로 반드시 0이어야 한다.
      viewport={{ once: true, amount: 0 }}
      transition={transition}
    />
  );
}

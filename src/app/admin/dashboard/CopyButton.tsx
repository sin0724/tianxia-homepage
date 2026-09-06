"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 값 옆에 붙는 복사 버튼.
 *
 * navigator.clipboard는 보안 컨텍스트(https/localhost)에서만 동작한다.
 * 관리자 화면을 http로 열어보는 경우가 있어 임시 textarea + execCommand
 * 폴백을 둔다 — 이게 없으면 조용히 아무 일도 안 일어난다.
 */
export default function CopyButton({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (next: "done" | "fail") => {
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1400);
  };

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      flash("done");
    } catch {
      flash("fail");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label} 복사`}
      className={`px-2 py-1 rounded-md border text-[11px] font-medium transition-colors ${
        state === "done"
          ? "border-emerald-700 bg-emerald-900/40 text-emerald-300"
          : state === "fail"
            ? "border-red-800 bg-red-900/40 text-red-300"
            : "border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500"
      }`}
    >
      {state === "done" ? "복사됨" : state === "fail" ? "실패" : "복사"}
    </button>
  );
}

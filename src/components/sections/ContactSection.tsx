"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import { SOCIALS } from "@/components/socials";
import { X } from "@phosphor-icons/react";
import { Reveal, MaskReveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import FillHover from "@/components/motion/FillHover";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// 브라우저 픽셀과 서버 CAPI가 같은 이벤트임을 알리는 중복 제거 키
const newEventId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function ContactModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("선택된 파일 없음");
  const fileRef = useRef<HTMLInputElement>(null);

  // 모달이 떠 있는 동안 뒤 페이지가 같이 스크롤되지 않도록 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const eventId = newEventId();
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      inquiry: (form.elements.namedItem("inquiry") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      // 허니팟 — 사람은 비워두고 봇만 채움
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      eventId,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "전송 실패");
      window.fbq?.("track", "Lead", {}, { eventID: eventId });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col overflow-y-auto overscroll-contain"
    >
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-6 md:px-16 h-16 border-b border-zinc-800/60 flex-shrink-0 sticky top-0 bg-zinc-950 z-10">
        <span className="text-sm font-medium text-zinc-400">문의하기</span>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-50 transition-colors duration-200"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* 폼 본문 */}
      <div className="flex-1 px-6 md:px-16 py-12 md:py-16 max-w-[1100px] mx-auto w-full">
        {submitted ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <p className="text-4xl font-black text-zinc-50 mb-3">감사합니다!</p>
            <p className="text-zinc-400 text-sm mb-10">빠른 시일 내에 연락드리겠습니다.</p>
            <button
              onClick={onClose}
              className="text-xs text-zinc-500 hover:text-zinc-200 underline underline-offset-4 transition-colors"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              className="text-4xl md:text-6xl font-black text-zinc-50 mb-12 md:mb-16 text-center tracking-tight"
            >
              Solution Info
            </motion.h2>

            <form onSubmit={handleSubmit}>
              {/* 허니팟: 시각적으로 숨김 — 봇 스팸 차단용 */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
                defaultValue=""
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">

                {/* 왼쪽 열 */}
                <div className="space-y-7">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-100 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="이름을 입력하세요."
                      className="w-full h-13 bg-zinc-900 rounded-xl px-4 py-3 text-zinc-50 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-100 mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="연락처를 입력하세요."
                      className="w-full h-13 bg-zinc-900 rounded-xl px-4 py-3 text-zinc-50 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-100 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="이메일을 입력하세요."
                      className="w-full h-13 bg-zinc-900 rounded-xl px-4 py-3 text-zinc-50 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-100 mb-2">
                      첨부파일
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 h-13 bg-zinc-900 rounded-xl px-4 flex items-center text-sm text-zinc-600 truncate">
                        {fileName}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="h-13 px-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition-colors duration-200 whitespace-nowrap"
                      >
                        파일선택
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setFileName(e.target.files?.[0]?.name ?? "선택된 파일 없음")
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* 오른쪽 열 */}
                <div className="flex flex-col space-y-7">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-zinc-100">문의분야</label>
                      <span className="text-[10px] text-red-500">
                        * 표시는 필수 입력 항목입니다.
                      </span>
                    </div>
                    <input
                      type="text"
                      name="inquiry"
                      placeholder="ex) 견적문의, 영업문의"
                      className="w-full h-13 bg-zinc-900 rounded-xl px-4 py-3 text-zinc-50 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <label className="block text-sm font-semibold text-zinc-100 mb-2">
                      내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      placeholder="내용을 입력하세요."
                      className="flex-1 min-h-[220px] bg-zinc-900 rounded-xl px-4 py-3 text-zinc-50 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 하단 동의 + 제출 */}
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-zinc-800/60 pt-7">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2.5 text-xs text-zinc-500 cursor-pointer select-none">
                    <input type="checkbox" required className="accent-red-600 w-3.5 h-3.5" />
                    개인정보 처리방침에 동의합니다.
                    <button
                      type="button"
                      className="ml-1 border border-zinc-700 hover:border-zinc-500 px-2.5 py-1 text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors rounded"
                    >
                      전문보기
                    </button>
                  </label>
                  {error && (
                    <p className="text-xs text-red-400">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-12 bg-zinc-800 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-50 font-semibold text-sm tracking-wide transition-colors duration-300 rounded-xl active:scale-[0.98]"
                >
                  {loading ? "전송 중..." : "문의하기"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function ContactSection() {
  const [formOpen, setFormOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contact"
        className="scroll-mt-16 md:scroll-mt-[68px] min-h-[100dvh] bg-zinc-950 flex flex-col overflow-hidden"
      >

        {/* 메인: 타이포 + CTA */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-24 text-center">
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.92] text-zinc-50 mb-8">
              <MaskReveal delay={0.08} duration={0.9}>Next Move</MaskReveal>
            </h2>
            <Reveal delay={0.2}>
              <p className="text-zinc-500 text-sm md:text-base max-w-[36ch] mx-auto mb-10 leading-relaxed">
                대만 시장 진출의 첫 걸음.<br />
                지금 바로 티엔샤와 함께 시작하세요.
              </p>
            </Reveal>
            <Reveal delay={0.3} y={16}>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => setFormOpen(true)}
                  className="group relative overflow-hidden inline-flex items-center h-14 px-10 bg-red-600 text-white hover:text-red-600 font-semibold text-sm tracking-wide transition-colors duration-300 active:scale-[0.98]"
                >
                  <FillHover className="bg-white" />
                  <span className="relative z-10">문의하기</span>
                </button>
              </Magnetic>
            </Reveal>
          </div>
        </div>

        {/* 하단 푸터 */}
        <footer className="mt-auto border-t border-zinc-800/60">
          <Reveal delay={0.4} y={16} className="px-6 md:px-12 py-10 md:py-14">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

              {/* 이메일 — 푸터에서 가장 크게 */}
              <div>
                <p className="text-xs text-zinc-500 mb-3">이메일로 문의</p>
                <a
                  href={`mailto:${SITE_CONFIG.company.email}`}
                  className="group inline-block text-2xl md:text-4xl font-black tracking-tight text-zinc-50 hover:text-red-500 transition-colors duration-200 break-all"
                >
                  {SITE_CONFIG.company.email}
                  <span className="block h-px bg-red-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </a>
              </div>

              {/* 공식 채널 */}
              <div>
                <p className="text-xs text-zinc-500 mb-3">공식 채널</p>
                <div className="flex flex-wrap items-center gap-3">
                  {SOCIALS.map(({ label, href, Icon, fill, hoverBorder }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative overflow-hidden inline-flex items-center gap-2.5 h-12 px-5 border border-zinc-700 text-zinc-200 font-medium text-sm hover:text-white hover:border-transparent transition-colors duration-300 ${hoverBorder}`}
                    >
                      <FillHover className={fill} />
                      <Icon size={20} weight="fill" className="relative z-10" />
                      <span className="relative z-10">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="border-t border-zinc-900 px-6 md:px-12 py-5">
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs text-zinc-500">
                {SITE_CONFIG.company.name} {SITE_CONFIG.company.nameEn}
              </p>
              <p className="text-xs text-zinc-600">
                &copy; {year} {SITE_CONFIG.company.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </section>

      <AnimatePresence>
        {formOpen && <ContactModal onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

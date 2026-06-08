"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";

const NAV_ITEMS = [
  { label: "소개", index: 1 },
  { label: "브랜드", index: 2 },
  { label: "작업물", index: 4 },
];

function fpNavigate(index: number) {
  document.dispatchEvent(
    new CustomEvent("fp-navigate", { detail: { index } })
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* 로고 */}
          <button
            onClick={() => fpNavigate(0)}
            className="relative flex items-center"
            aria-label="홈으로"
          >
            <Image
              src={SITE_CONFIG.logo.src}
              alt={SITE_CONFIG.logo.alt}
              width={SITE_CONFIG.logo.width}
              height={SITE_CONFIG.logo.height}
              className="h-8 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <span
              className="text-xl font-bold tracking-tight text-zinc-50"
              style={{ display: "none" }}
            >
              티엔샤
            </span>
          </button>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.index}
                onClick={() => fpNavigate(item.index)}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + 햄버거 */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => fpNavigate(5)}
              className="hidden md:inline-flex items-center h-9 px-5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors duration-200 active:scale-[0.98]"
            >
              문의하기
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="메뉴 열기"
              className="md:hidden flex flex-col gap-1.5 w-6"
            >
              <span
                className={`block h-px bg-zinc-50 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-px bg-zinc-50 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-zinc-50 transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 모바일 메뉴 */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.25 }}
        className={`fixed inset-0 z-40 bg-zinc-950 flex flex-col justify-center px-8 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.index}
              onClick={() => {
                setMenuOpen(false);
                fpNavigate(item.index);
              }}
              className="text-left text-4xl font-bold text-zinc-50"
              initial={{ opacity: 0, x: -24 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            onClick={() => {
              setMenuOpen(false);
              fpNavigate(5);
            }}
            className="text-left text-4xl font-bold text-red-600"
            initial={{ opacity: 0, x: -24 }}
            animate={
              menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
            }
            transition={{ delay: NAV_ITEMS.length * 0.07, duration: 0.35 }}
          >
            문의하기
          </motion.button>
        </nav>
      </motion.div>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";
import { SOCIALS } from "@/components/socials";
import Magnetic from "@/components/motion/Magnetic";
import FillHover from "@/components/motion/FillHover";

/** hover 시 글자가 위로 밀려나가고 같은 글자가 아래서 올라오는 롤링 텍스트 */
function RollingText({ label }: { label: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {label}
      </span>
      <span
        className="absolute left-0 top-full block w-full text-zinc-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        aria-hidden
      >
        {label}
      </span>
    </span>
  );
}

// 화면에 나오는 순서와 같게 유지한다
const NAV_ITEMS = [
  { label: "브랜드", href: "#brands" },
  { label: "크리에이터", href: "#creators" },
  { label: "소개", href: "#about" },
  { label: "작업물", href: "#work" },
];

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
          <a href="#home" className="relative flex items-center" aria-label="홈으로">
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
          </a>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Magnetic key={item.href} strength={0.35}>
                <a
                  href={item.href}
                  className="group block text-sm font-medium text-zinc-400 py-1"
                >
                  <RollingText label={item.label} />
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* 소셜 + CTA + 햄버거 */}
          <div className="flex items-center gap-2 md:gap-3">
            {SOCIALS.map(({ label, href, Icon, hoverText }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`티엔샤 ${label}`}
                className={`w-9 h-9 flex items-center justify-center text-zinc-300 transition-colors duration-200 ${hoverText}`}
              >
                <Icon size={22} weight="fill" />
              </a>
            ))}
            <Magnetic strength={0.25} className="hidden md:inline-block md:ml-1">
              <a
                href="#contact"
                className="group relative overflow-hidden inline-flex items-center h-9 px-5 bg-red-600 text-white hover:text-red-600 text-sm font-medium transition-colors duration-300 active:scale-[0.98]"
              >
                <FillHover className="bg-white" />
                <span className="relative z-10">문의하기</span>
              </a>
            </Magnetic>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col gap-1.5 w-6 relative z-50"
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
        // 닫혀 있을 때 링크가 키보드 탭 순서에 남지 않도록 (React 19 boolean inert)
        inert={!menuOpen}
      >
        <nav className="flex flex-col gap-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-left text-4xl font-bold text-zinc-50"
              initial={{ opacity: 0, x: -24 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-left text-4xl font-bold text-red-600"
            initial={{ opacity: 0, x: -24 }}
            animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ delay: NAV_ITEMS.length * 0.07, duration: 0.35 }}
          >
            문의하기
          </motion.a>
        </nav>
      </motion.div>
    </>
  );
}

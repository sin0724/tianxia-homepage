"use client";

import { SITE_CONFIG } from "@/lib/config";
import { SOCIALS } from "@/components/socials";
import FillHover from "@/components/motion/FillHover";

/**
 * 홈 외 공개 페이지의 하단 푸터 — 홈 푸터(ContactSection)의 공식 채널 버튼과 같은 모양.
 * 홈은 ContactSection이 자기 푸터를 가지므로 여기를 쓰지 않는다.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60">
      <div className="px-6 md:px-12 py-10">
        <div className="max-w-[1400px] mx-auto">
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

      <div className="border-t border-zinc-900 px-6 md:px-12 py-5">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs text-zinc-500">
            {SITE_CONFIG.company.name} {SITE_CONFIG.company.nameEn}
          </p>
          <a href="/privacy" className="text-xs font-semibold text-zinc-300 underline underline-offset-4 hover:text-zinc-50">개인정보 처리방침</a>
          <p className="text-xs text-zinc-600">
            &copy; {year} {SITE_CONFIG.company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

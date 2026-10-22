"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/lib/config";
import InquiryButton from "@/components/creators/InquiryButton";
import { HOME_CREATORS, type CreatorCardItem } from "@/lib/talents";
import { Reveal, MaskReveal, LineReveal } from "@/components/motion/Reveal";

/**
 * 홈 크리에이터 섹션 — 미리보기 6명 + 전체 보기 유도.
 *
 * 예전에는 전원을 무한 캐러셀로 흘렸는데, 로스터가 160명 넘게 늘면서
 * 이미지가 무거워지고 한 명 한 명이 눈에 들어오지 않았다.
 * 홈에서는 SITE_CONFIG.featuredCreators로 고른 6명만 보여 주고 나머지는 /creators로 보낸다.
 */

/** 분류 바로가기. /creators가 ?tab= 값을 읽어 해당 탭을 연다. */
const CATEGORY_LINKS = [
  { label: "치어리더", href: "/creators?tab=cheerleader" },
  { label: "아티스트", href: "/creators?tab=artist" },
  { label: "모델", href: "/creators?tab=model" },
];

function CreatorCard({ creator }: { creator: CreatorCardItem }) {
  const body = (
    <>
      <span className="relative block aspect-[3/4] overflow-hidden bg-zinc-900">
        <Image
          src={creator.photo}
          alt={creator.label}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="block pt-3">
        <span className="block text-sm font-bold text-zinc-50 truncate group-hover:text-red-400 transition-colors">
          {creator.label}
        </span>
        {creator.sub && (
          <span className="block mt-1 text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
            {creator.sub}
          </span>
        )}
      </span>
    </>
  );

  return creator.external ? (
    <a
      href={creator.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${creator.label} 인스타그램`}
      className="group block"
    >
      {body}
    </a>
  ) : (
    <Link href={creator.href} className="group block">
      {body}
    </Link>
  );
}

export default function CreatorsSection() {
  const { title, desc } = SITE_CONFIG.creatorsHeadline;

  return (
    <section
      id="creators"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-zinc-950 px-6 md:px-12 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-zinc-50 mb-3 md:mb-4">
          <MaskReveal delay={0.08}>{title}</MaskReveal>
        </h2>
        <div className="mb-3 md:mb-8">
          <Reveal delay={0.16}>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-[52ch] whitespace-pre-line">
              {desc}
            </p>
          </Reveal>
        </div>
        <LineReveal delay={0.2} className="h-px bg-zinc-800" />

        <div className="pt-6 md:pt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-6 md:gap-x-4">
          {HOME_CREATORS.map((creator, i) => (
            <Reveal key={creator.key} delay={0.24 + i * 0.05} y={20}>
              <CreatorCard creator={creator} />
            </Reveal>
          ))}
        </div>

        {/* 분류 바로가기 + 전체 보기 */}
        <Reveal delay={0.3} y={16}>
          <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-t border-zinc-800 pt-6 md:pt-8">
            <ul className="flex flex-wrap gap-2">
              {CATEGORY_LINKS.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="inline-flex items-center h-9 px-4 border border-zinc-700 text-xs md:text-sm text-zinc-300 hover:border-red-500 hover:text-red-400 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                {/* KOL은 공개 로스터가 없어 문의 폼(Solution Info)을 바로 연다 */}
                <InquiryButton
                  label="KOL 별도 문의"
                  inquiry="KOL 섭외"
                  className="inline-flex items-center h-9 px-4 border border-dashed border-zinc-700 text-xs md:text-sm text-zinc-300 hover:border-red-500 hover:text-red-400 transition-colors"
                >
                  KOL
                  <span className="ml-2 text-[11px] text-red-400/80">
                    별도 문의
                  </span>
                </InquiryButton>
              </li>
            </ul>
            <Link
              href="/creators"
              className="group inline-flex items-center justify-center gap-2 h-12 px-7 bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors"
            >
              전체 크리에이터 보기
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

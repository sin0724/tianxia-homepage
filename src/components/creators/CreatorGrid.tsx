"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import InquiryButton from "@/components/creators/InquiryButton";
import {
  CATEGORY_TABS,
  type CategoryTabKey,
  type CreatorCardItem,
} from "@/lib/talents";

/** '전체' 목록 끝에 붙는 KOL 안내 카드 — 다른 카드와 같은 크기로 그리드에 섞인다 */
function KolTile() {
  return (
    <InquiryButton
      label="KOL 별도 문의"
      inquiry="KOL 섭외"
      className="group block w-full text-left"
    >
      <span className="relative aspect-[3/4] flex flex-col justify-between border border-dashed border-zinc-700 bg-zinc-900/40 p-5 transition-colors group-hover:border-iris">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-saffron/80">
          KOL
        </span>
        <span className="block">
          <span className="block text-2xl md:text-3xl font-normal tracking-tight text-zinc-50">
            대만 KOL
          </span>
          <span className="block mt-2 text-xs md:text-sm text-zinc-400 leading-relaxed">
            캠페인 조건에 맞춰 별도로 매칭합니다.
          </span>
        </span>
        <ArrowUpRight
          size={22}
          className="absolute top-5 right-5 text-zinc-500 group-hover:text-saffron transition-colors"
        />
      </span>
      <span className="block pt-3 pb-1">
        <span className="block text-sm md:text-[15px] font-bold text-zinc-50 group-hover:text-saffron transition-colors">
          KOL 섭외
        </span>
        <span className="block mt-1 text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
          별도 문의
        </span>
      </span>
    </InquiryButton>
  );
}

function Card({
  item,
  priority,
}: {
  item: CreatorCardItem;
  priority: boolean;
}) {
  const inner = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <Image
          src={item.photo}
          alt={item.label}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="pt-3 pb-1">
        <p className="text-sm md:text-[15px] font-bold text-zinc-50 truncate group-hover:text-saffron transition-colors">
          {item.label}
        </p>
        {item.sub && (
          <p className="mt-1 text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-500">
            {item.sub}
          </p>
        )}
      </div>
    </>
  );

  return item.external ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.label} 인스타그램`}
      className="group block"
    >
      {inner}
    </a>
  ) : (
    <Link href={item.href} className="group block">
      {inner}
    </Link>
  );
}

function isTabKey(v: string | null): v is CategoryTabKey {
  return CATEGORY_TABS.some((t) => t.key === v);
}

/** 탭 + 카드 그리드. 어떤 탭을 보여 줄지는 바깥(주소의 ?tab=)이 정한다. */
function CreatorGridView({
  items,
  tab,
  onTab,
}: {
  items: CreatorCardItem[];
  tab: CategoryTabKey;
  onTab?: (key: CategoryTabKey) => void;
}) {
  const setTab = (key: CategoryTabKey) => onTab?.(key);
  const visible = tab === "all" ? items : items.filter((i) => i.tab === tab);

  return (
    <>
      <div
        role="tablist"
        aria-label="크리에이터 분류"
        className="no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 flex gap-2 overflow-x-auto"
      >
        {CATEGORY_TABS.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={`shrink-0 h-10 px-4 text-sm font-medium border transition-colors ${
                active
                  ? "bg-iris border-iris text-white"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
              }`}
            >
              {t.label}
            </button>
          );
        })}
        {/* KOL은 공개 로스터가 없어 탭 대신 문의 폼을 바로 연다 */}
        <InquiryButton
          label="KOL 별도 문의"
          inquiry="KOL 섭외"
          className="shrink-0 h-10 px-4 text-sm font-medium border border-dashed border-zinc-700 text-zinc-300 hover:border-white/30 hover:text-white transition-colors rounded-full"
        >
          KOL<span className="ml-2 text-[11px] text-saffron/80">별도 문의</span>
        </InquiryButton>
      </div>

      <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-10">
        {visible.map((item, i) => (
          <Card key={item.key} item={item} priority={i < 5} />
        ))}
        {tab === "all" && <KolTile />}
      </div>
    </>
  );
}

/**
 * 현재 탭은 주소의 ?tab= 값이다 (홈의 분류 바로가기가 /creators?tab=model 로 보낸다).
 * 예전에는 #model 해시를 마운트 때 한 번만 읽어서, 클라이언트 이동 타이밍에 따라 탭이 안 바뀌었다.
 * useSearchParams는 이동할 때마다 갱신되고, 탭을 누를 때 쓰는 history.replaceState도
 * Next가 받아서 같은 값으로 동기화한다.
 */
function CreatorGridWithParams({ items }: { items: CreatorCardItem[] }) {
  const params = useSearchParams();
  const raw = params.get("tab");
  const tab: CategoryTabKey = isTabKey(raw) ? raw : "all";

  const onTab = (key: CategoryTabKey) => {
    // 뒤로 가기·공유 시에도 같은 탭이 열리도록 주소만 바꾼다 (스크롤 이동 없음)
    history.replaceState(
      null,
      "",
      key === "all" ? location.pathname : `?tab=${key}`,
    );
  };

  return <CreatorGridView items={items} tab={tab} onTab={onTab} />;
}

export default function CreatorGrid({ items }: { items: CreatorCardItem[] }) {
  // 정적 HTML에는 "전체" 목록을 그대로 실어 두고, 브라우저에서 주소의 탭을 반영한다
  return (
    <Suspense fallback={<CreatorGridView items={items} tab="all" />}>
      <CreatorGridWithParams items={items} />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import type { Contact } from "@prisma/client";
import { useRouter } from "next/navigation";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(d));
}

export default function ContactList({ contacts }: { contacts: Contact[] }) {
  const [items, setItems] = useState(contacts);
  const [expanded, setExpanded] = useState<number | null>(null);
  const router = useRouter();

  const markRead = (id: number) => {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, isRead: true } : c)));
    fetch(`/api/admin/contacts/${id}`, { method: "PATCH" });
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const unreadCount = items.filter((c) => !c.isRead).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* 헤더 */}
      <div className="border-b border-zinc-800 px-6 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-zinc-50">TIANXIA 관리자</span>
          {unreadCount > 0 && (
            <span className="text-[10px] font-mono bg-red-600 text-white px-2 py-0.5 rounded-full">
              미확인 {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          로그아웃
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "전체 문의", value: items.length },
            { label: "미확인", value: unreadCount },
            { label: "확인 완료", value: items.length - unreadCount },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <p className="text-xs text-zinc-500 mb-1">{s.label}</p>
              <p className="text-2xl font-black text-zinc-50">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 문의 목록 */}
        {items.length === 0 ? (
          <div className="text-center py-24 text-zinc-600 text-sm">아직 문의가 없습니다.</div>
        ) : (
          <div className="space-y-2">
            {items.map((c) => (
              <div
                key={c.id}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  c.isRead ? "border-zinc-800 bg-zinc-900/40" : "border-zinc-700 bg-zinc-900"
                }`}
              >
                {/* 요약 행 */}
                <button
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left"
                >
                  {!c.isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0 grid grid-cols-4 gap-3 items-center">
                    <span className={`text-sm font-semibold truncate ${c.isRead ? "text-zinc-500" : "text-zinc-100"}`}>
                      {c.name}
                    </span>
                    <span className="text-xs text-zinc-500 truncate">{c.email}</span>
                    <span className="text-xs text-zinc-600 truncate">{c.inquiry || "—"}</span>
                    <span className="text-xs text-zinc-600 text-right">{formatDate(c.createdAt)}</span>
                  </div>
                </button>

                {/* 펼쳐진 상세 */}
                {expanded === c.id && (
                  <div className="px-5 pb-5 border-t border-zinc-800">
                    <div className="pt-4 grid grid-cols-2 gap-3 text-xs mb-4">
                      <div>
                        <span className="text-zinc-600">연락처</span>
                        <p className="text-zinc-300 mt-0.5">{c.phone}</p>
                      </div>
                      <div>
                        <span className="text-zinc-600">이메일</span>
                        <p className="text-zinc-300 mt-0.5">
                          <a href={`mailto:${c.email}`} className="hover:text-red-400 transition-colors">
                            {c.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-600 mb-1">문의 내용</div>
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-950 rounded-lg p-3">
                      {c.message}
                    </p>
                    {!c.isRead && (
                      <button
                        onClick={() => markRead(c.id)}
                        className="mt-4 text-xs px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                      >
                        확인 완료로 표시
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

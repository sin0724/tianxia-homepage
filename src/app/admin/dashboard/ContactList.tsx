"use client";

import { useState } from "react";
import type { Contact } from "@prisma/client";
import { useRouter } from "next/navigation";
import CopyButton from "./CopyButton";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(d));
}

/** 라벨 + 값 + 복사 버튼 한 줄 */
function Field({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="min-w-0">
      <span className="text-zinc-600">{label}</span>
      <div className="mt-1 flex items-center gap-2 min-w-0">
        {href ? (
          <a
            href={href}
            className="text-zinc-200 truncate hover:text-red-400 transition-colors"
          >
            {value}
          </a>
        ) : (
          <span className="text-zinc-200 truncate">{value}</span>
        )}
        <CopyButton value={value} label={label} />
      </div>
    </div>
  );
}

export default function ContactList({ contacts }: { contacts: Contact[] }) {
  const [items, setItems] = useState(contacts);
  const [expanded, setExpanded] = useState<number | null>(null);
  const router = useRouter();

  /*
    읽음 상태는 이제 버튼으로만 바뀐다.
    예전에는 펼치기만 해도 읽음 처리돼서, 내용을 확인하려고 열었을 뿐인데
    미확인 표시가 사라져 무엇을 아직 처리 안 했는지 알 수 없었다.
  */
  const setRead = async (id: number, isRead: boolean) => {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, isRead } : c)));
    const res = await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead }),
    });
    if (!res.ok) {
      // 서버가 거부하면 화면만 바뀐 상태로 두지 않는다
      setItems((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isRead: !isRead } : c))
      );
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 문의를 삭제할까요? 되돌릴 수 없습니다.")) return;
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((c) => c.id !== id));
      setExpanded(null);
    } else {
      alert("삭제에 실패했습니다.");
    }
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            새로고침
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            로그아웃
          </button>
        </div>
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
                  aria-expanded={expanded === c.id}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      c.isRead ? "bg-transparent" : "bg-red-500"
                    }`}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
                    <span className={`text-sm font-semibold truncate ${c.isRead ? "text-zinc-500" : "text-zinc-100"}`}>
                      {c.brand || "—"}
                    </span>
                    <span className={`text-xs truncate ${c.isRead ? "text-zinc-600" : "text-zinc-400"}`}>
                      {c.name}
                    </span>
                    <span className="hidden md:block text-xs text-zinc-600 truncate">
                      {c.inquiry || "—"}
                    </span>
                    <span className="text-xs text-zinc-600 text-right">{formatDate(c.createdAt)}</span>
                  </div>
                </button>

                {/* 펼쳐진 상세 */}
                {expanded === c.id && (
                  <div className="px-5 pb-5 border-t border-zinc-800">
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                      <Field label="브랜드명" value={c.brand || "—"} />
                      <Field label="담당자" value={c.name} />
                      <Field label="연락처" value={c.phone} href={`tel:${c.phone}`} />
                      <Field label="이메일" value={c.email} href={`mailto:${c.email}`} />
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-zinc-600">문의 내용</span>
                      <CopyButton value={c.message} label="문의 내용" />
                    </div>
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-950 rounded-lg p-3">
                      {c.message}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                      <button
                        onClick={() => setRead(c.id, !c.isRead)}
                        className={`text-xs px-4 py-2 rounded-lg transition-colors ${
                          c.isRead
                            ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200"
                            : "bg-emerald-900/50 hover:bg-emerald-900 text-emerald-300"
                        }`}
                      >
                        {c.isRead ? "미확인으로 되돌리기" : "확인 완료로 표시"}
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-xs px-4 py-2 bg-zinc-800 hover:bg-red-900/60 text-zinc-400 hover:text-red-300 rounded-lg transition-colors"
                      >
                        삭제
                      </button>
                    </div>
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const { error } = await res.json();
      setError(error ?? "로그인 실패");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-red-500/70 text-[10px] font-mono tracking-[0.3em] uppercase mb-3 text-center">
          TIANXIA
        </p>
        <h1 className="text-2xl font-black text-zinc-50 text-center mb-8 tracking-tight">
          관리자 로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            autoFocus
            className="w-full h-12 bg-zinc-900 border border-zinc-800 focus:border-zinc-600 px-4 text-zinc-50 text-sm placeholder:text-zinc-600 outline-none transition-colors rounded-lg"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors rounded-lg"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

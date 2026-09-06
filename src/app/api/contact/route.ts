import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { sendLeadEvent } from "@/lib/metaCapi";

// 입력 길이 상한 — DB·메일 폭주 방지
const MAX = { brand: 150, name: 100, phone: 50, email: 200, inquiry: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 알림 메일 HTML 주입 방지
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: NextRequest) {
  // 스팸 방지: IP당 10분에 5회
  if (!rateLimit(`contact:${clientIp(req.headers)}`, 5, 600_000)) {
    return NextResponse.json(
      { error: "요청이 너무 잦습니다. 잠시 후 다시 시도해주세요." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });

  const { brand, name, phone, email, inquiry, message, company } = body as Record<string, string>;

  // 허니팟: 숨겨진 필드가 채워져 있으면 봇 — 조용히 성공 응답만 반환
  if (company) return NextResponse.json({ ok: true });

  if (!brand?.trim() || !name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
  }

  if (
    brand.length > MAX.brand ||
    name.length > MAX.name ||
    phone.length > MAX.phone ||
    email.length > MAX.email ||
    (inquiry?.length ?? 0) > MAX.inquiry ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "입력 길이가 제한을 초과했습니다." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "올바른 이메일 형식이 아닙니다." }, { status: 400 });
  }

  // DB 저장 (필수)
  try {
    await db.contact.create({
      data: {
        brand: brand.trim(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        inquiry: inquiry?.trim() ?? "",
        message: message.trim(),
      },
    });
  } catch (err) {
    console.error("[contact] db error:", err);
    return NextResponse.json({ error: "저장에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }

  // Meta 전환 API — 브라우저 픽셀의 Lead와 같은 eventId로 전송해 중복 제거
  const rawEventId = (body as Record<string, unknown>).eventId;
  const eventId =
    typeof rawEventId === "string" && rawEventId.length > 0 && rawEventId.length <= 64
      ? rawEventId
      : randomUUID();
  sendLeadEvent({
    email: email.trim(),
    phone: phone.trim(),
    eventId,
    sourceUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tianxia.kr",
    ip: clientIp(req.headers),
    userAgent: req.headers.get("user-agent") ?? undefined,
    fbp: req.cookies.get("_fbp")?.value,
    fbc: req.cookies.get("_fbc")?.value,
  });

  // 이메일 알림 (선택 — RESEND_API_KEY 없으면 스킵)
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const adminEmail = process.env.CONTACT_RECEIVER_EMAIL ?? "hyuun0724@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
    const subject = `[티엔샤 문의] ${brand} · ${name} — ${inquiry?.trim() || "일반 문의"}`;
    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="margin:0 0 24px;font-size:20px;border-bottom:2px solid #dc2626;padding-bottom:12px">새 문의가 접수되었습니다</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px 0;color:#666;width:100px">브랜드명</td><td style="padding:10px 0;font-weight:600">${esc(brand)}</td></tr>
          <tr><td style="padding:10px 0;color:#666">담당자</td><td style="padding:10px 0;font-weight:600">${esc(name)}</td></tr>
          <tr><td style="padding:10px 0;color:#666">연락처</td><td style="padding:10px 0">${esc(phone)}</td></tr>
          <tr><td style="padding:10px 0;color:#666">이메일</td><td style="padding:10px 0"><a href="mailto:${esc(email)}" style="color:#dc2626">${esc(email)}</a></td></tr>
          <tr><td style="padding:10px 0;color:#666">문의 분야</td><td style="padding:10px 0">${esc(inquiry?.trim() || "—")}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap">${esc(message)}</div>
        <p style="margin-top:24px;font-size:12px;color:#999">이 메일은 티엔샤 홈페이지 문의 폼에서 자동으로 발송되었습니다.</p>
      </div>
    `;
    resend.emails.send({ from: fromEmail, to: adminEmail, subject, html, replyTo: email })
      .catch((err: unknown) => console.error("[contact] resend error:", err));
  }

  return NextResponse.json({ ok: true });
}

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });

  const { name, phone, email, inquiry, message } = body as Record<string, string>;

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set");
    return NextResponse.json({ error: "메일 서비스가 설정되지 않았습니다." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const adminEmail = process.env.CONTACT_RECEIVER_EMAIL ?? "hyuun0724@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const subject = `[티엔샤 문의] ${name} — ${inquiry?.trim() || "일반 문의"}`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 24px;font-size:20px;border-bottom:2px solid #dc2626;padding-bottom:12px">
        새 문의가 접수되었습니다
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:10px 0;color:#666;width:100px">이름</td><td style="padding:10px 0;font-weight:600">${name}</td></tr>
        <tr><td style="padding:10px 0;color:#666">연락처</td><td style="padding:10px 0">${phone}</td></tr>
        <tr><td style="padding:10px 0;color:#666">이메일</td><td style="padding:10px 0"><a href="mailto:${email}" style="color:#dc2626">${email}</a></td></tr>
        <tr><td style="padding:10px 0;color:#666">문의 분야</td><td style="padding:10px 0">${inquiry?.trim() || "—"}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
      <p style="margin-top:24px;font-size:12px;color:#999">이 메일은 티엔샤 홈페이지 문의 폼에서 자동으로 발송되었습니다.</p>
    </div>
  `;

  try {
    await resend.emails.send({ from: fromEmail, to: adminEmail, subject, html, replyTo: email });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] resend error:", err);
    return NextResponse.json({ error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}

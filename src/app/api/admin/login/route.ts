import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, ADMIN_COOKIE } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // 무차별 대입 방지: IP당 1분에 5회
  if (!rateLimit(`login:${clientIp(req.headers)}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요." },
      { status: 429 }
    );
  }

  const { password } = await req.json().catch(() => ({}));
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "관리자 비밀번호가 설정되지 않았습니다." }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  let token: string;
  try {
    token = await signAdminToken();
  } catch {
    return NextResponse.json(
      { error: "서버 설정 오류: ADMIN_JWT_SECRET이 설정되지 않았습니다." },
      { status: 500 }
    );
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return res;
}

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "admin_token";
// 환경변수 미설정 시 안전하게 실패 — 공개 소스의 기본값으로 서명하지 않음
const getSecret = () => {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET 환경변수가 설정되지 않았습니다.");
  return new TextEncoder().encode(secret);
};

export async function signAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export { COOKIE as ADMIN_COOKIE };

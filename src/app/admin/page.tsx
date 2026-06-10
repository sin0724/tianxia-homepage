import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  // 이미 로그인된 세션이면 대시보드로 바로 이동
  const authed = await getAdminSession().catch(() => false);
  if (authed) redirect("/admin/dashboard");

  return <LoginForm />;
}

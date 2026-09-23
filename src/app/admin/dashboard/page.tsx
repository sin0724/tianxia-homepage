import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import ContactList from "./ContactList";

export default async function DashboardPage() {
  const authed = await getAdminSession();
  if (!authed) redirect("/admin");

  // 스팸 의심 건은 목록 맨 아래로. 숨길지 말지는 클라이언트가 정한다.
  const contacts = await db.contact.findMany({
    orderBy: [{ isSpam: "asc" }, { isRead: "asc" }, { createdAt: "desc" }],
  });

  return <ContactList contacts={contacts} />;
}

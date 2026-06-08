import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import ContactList from "./ContactList";

export default async function DashboardPage() {
  const authed = await getAdminSession();
  if (!authed) redirect("/admin");

  const contacts = await db.contact.findMany({
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
  });

  return <ContactList contacts={contacts} />;
}

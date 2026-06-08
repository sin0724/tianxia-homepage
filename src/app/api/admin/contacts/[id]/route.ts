import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const contactId = parseInt(id);
  if (isNaN(contactId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await db.contact.update({ where: { id: contactId }, data: { isRead: true } });
  return NextResponse.json({ ok: true });
}

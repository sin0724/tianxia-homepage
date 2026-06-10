import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { db } from "@/lib/db";

async function authorize(req: NextRequest): Promise<number | NextResponse> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return 0;
}

function parseId(id: string): number | null {
  const n = parseInt(id);
  return isNaN(n) ? null : n;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await authorize(req);
  if (unauthorized instanceof NextResponse) return unauthorized;

  const { id } = await params;
  const contactId = parseId(id);
  if (contactId === null) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await db.contact.update({ where: { id: contactId }, data: { isRead: true } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await authorize(req);
  if (unauthorized instanceof NextResponse) return unauthorized;

  const { id } = await params;
  const contactId = parseId(id);
  if (contactId === null) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await db.contact.delete({ where: { id: contactId } });
  return NextResponse.json({ ok: true });
}

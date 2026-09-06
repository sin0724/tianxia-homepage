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

  // 본문에 isRead가 오면 그 값으로, 없으면 읽음 처리 (기존 호출 호환)
  const body = await req.json().catch(() => null);
  const isRead =
    body && typeof (body as { isRead?: unknown }).isRead === "boolean"
      ? (body as { isRead: boolean }).isRead
      : true;

  await db.contact.update({ where: { id: contactId }, data: { isRead } });
  return NextResponse.json({ ok: true, isRead });
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

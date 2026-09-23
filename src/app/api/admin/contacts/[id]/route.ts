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

  const body = (await req.json().catch(() => null)) as
    | { isRead?: unknown; isSpam?: unknown }
    | null;

  const data: { isRead?: boolean; isSpam?: boolean } = {};
  if (typeof body?.isSpam === "boolean") data.isSpam = body.isSpam;

  // isRead가 오면 그 값으로. isSpam만 바꾸는 호출이면 읽음 상태는 건드리지 않는다.
  // 둘 다 없으면 읽음 처리 — isRead만 보내던 예전 호출과의 호환.
  if (typeof body?.isRead === "boolean") data.isRead = body.isRead;
  else if (data.isSpam === undefined) data.isRead = true;

  const updated = await db.contact.update({ where: { id: contactId }, data });
  return NextResponse.json({ ok: true, isRead: updated.isRead, isSpam: updated.isSpam });
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

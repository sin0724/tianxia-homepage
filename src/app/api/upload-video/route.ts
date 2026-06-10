import { NextRequest, NextResponse } from "next/server";
import { createWriteStream, mkdirSync } from "fs";
import { join } from "path";
import { Readable } from "stream";

const ALLOWED = new Set([
  "hero.mp4",
  "about-fb.mp4",
  "about-beauty.mp4",
  "about-hospital.mp4",
  "shopee.mp4",
]);

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  if (req.headers.get("x-upload-secret") !== process.env.UPLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filename = req.headers.get("x-filename") ?? "";
  if (!ALLOWED.has(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const dir = join(process.cwd(), "public", "videos");
  mkdirSync(dir, { recursive: true });

  await new Promise<void>((resolve, reject) => {
    const readable = Readable.fromWeb(
      req.body as Parameters<typeof Readable.fromWeb>[0]
    );
    const ws = createWriteStream(join(dir, filename));
    readable.pipe(ws);
    ws.on("finish", resolve);
    ws.on("error", reject);
    readable.on("error", reject);
  });

  return NextResponse.json({ ok: true, filename });
}

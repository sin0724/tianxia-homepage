import { NextResponse } from "next/server";
import { readdirSync, existsSync, statSync } from "fs";
import { join } from "path";

export async function GET() {
  const dir = join(process.cwd(), "public", "videos");
  const files = existsSync(dir)
    ? readdirSync(dir).map((f) => ({
        name: f,
        size: statSync(join(dir, f)).size,
      }))
    : [];
  return NextResponse.json({ cwd: process.cwd(), videosPath: dir, files });
}

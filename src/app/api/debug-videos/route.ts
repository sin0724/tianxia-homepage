import { NextResponse } from "next/server";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

export async function GET() {
  const dir = join(process.cwd(), "public", "videos");
  return NextResponse.json({
    cwd: process.cwd(),
    videosPath: dir,
    exists: existsSync(dir),
    files: existsSync(dir) ? readdirSync(dir) : [],
  });
}

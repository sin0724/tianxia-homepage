import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// Turbopack이 워크스페이스 루트를 상위(C:\Users\ADMIN)의 떠도는 lockfile 기준으로
// 잡으면, 모듈 ID에 프로젝트 경로가 통째로 들어간다. 경로에 한글이 있으면
// Turbopack이 그 ID를 바이트 단위로 자르다 패닉하며 빌드/dev가 전부 500이 된다.
// 루트를 이 폴더로 고정하면 ID가 프로젝트 상대경로가 되어 한글이 섞이지 않는다.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;

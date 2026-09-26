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
  // 도메인 통합 — 브랜드 검색 신호를 tianxia.kr 하나로 모은다.
  // "티엔샤 대만 마케팅" 검색에서 예전 사이트 tianxia.co.kr이 tianxia.kr보다 먼저 잡히고 있었다.
  // 주의: 이 규칙은 해당 도메인의 DNS가 이 Railway 서비스를 가리킬 때만 동작한다.
  // (Railway 서비스 → Settings → Networking에 tianxia.co.kr, www.tianxia.co.kr, www.tianxia.kr 추가)
  async redirects() {
    return [
      {
        // 옛 사이트의 경로 구조는 이 사이트와 달라 경로를 살리면 404가 난다. 전부 홈으로 보낸다.
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?tianxia\\.co\\.kr" }],
        destination: "https://tianxia.kr/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.tianxia\\.kr" }],
        destination: "https://tianxia.kr/:path*",
        permanent: true,
      },
    ];
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

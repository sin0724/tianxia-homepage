import { InstagramLogo, YoutubeLogo } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/lib/config";

/**
 * 공식 채널 — 상단 네비와 푸터가 같은 목록을 쓴다.
 *
 * 호버 색은 쓰임새에 따라 둘로 나눈다.
 *   hoverText            — 테두리 없이 아이콘만 놓는 자리(네비). 아이콘 자체가 물든다
 *   fill + hoverBorder   — 라벨이 붙은 버튼(푸터). 브랜드 색이 아래에서 차오른다
 */
export const SOCIALS = [
  {
    label: "인스타그램",
    href: SITE_CONFIG.company.instagram,
    Icon: InstagramLogo,
    hoverText: "hover:text-[#E1306C]",
    fill: "bg-[#E1306C]",
    hoverBorder: "hover:border-[#E1306C]",
  },
  {
    label: "유튜브",
    href: SITE_CONFIG.company.youtube,
    Icon: YoutubeLogo,
    hoverText: "hover:text-[#FF0000]",
    fill: "bg-[#FF0000]",
    hoverBorder: "hover:border-[#FF0000]",
  },
];

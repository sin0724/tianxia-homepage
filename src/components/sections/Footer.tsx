import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 px-6 md:px-12 py-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* 회사명 */}
          <div>
            <p className="text-sm font-bold text-zinc-50 mb-1">
              {SITE_CONFIG.company.name}
            </p>
            <p className="text-xs text-zinc-600">
              {SITE_CONFIG.company.address}
            </p>
          </div>

          {/* 링크 */}
          <div className="flex items-center gap-6">
            <a
              href={SITE_CONFIG.company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200 uppercase tracking-wider"
            >
              Instagram
            </a>
            <a
              href={SITE_CONFIG.company.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200 uppercase tracking-wider"
            >
              YouTube
            </a>
            <a
              href={`mailto:${SITE_CONFIG.company.email}`}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200 uppercase tracking-wider"
            >
              Email
            </a>
          </div>

          {/* 저작권 */}
          <p className="text-xs text-zinc-700">
            &copy; {year} {SITE_CONFIG.company.name}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

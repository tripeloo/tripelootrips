"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { SITE_PHONE_TEL } from "@/lib/site-contact";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const shell = isHome
    ? "rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/15 ring-1 ring-white/10"
    : "rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-card ring-1 ring-slate-900/5";

  const link = isHome
    ? "text-white/90 hover:text-white"
    : "text-slate-600 hover:text-brand-600";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw]">
      {isHome && (
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-[7.25rem] sm:h-[7.75rem] bg-gradient-to-b from-slate-950/65 via-slate-950/25 to-transparent"
          aria-hidden
        />
      )}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4 w-full min-w-0 box-border">
        <div className={`flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 w-full min-w-0 ${shell}`}>
          <BrandLogo
            variant="header"
            priority
            className={isHome ? "[&_img]:drop-shadow-md" : ""}
          />
          <nav className="flex items-center gap-1.5 sm:gap-4 text-sm shrink-0">
            <Link href="/destinations" className={`${link} hidden sm:inline`}>
              Destinations
            </Link>
            <Link href="/packages" className={`${link} hidden sm:inline`}>
              Packages
            </Link>
            <Link href="/#best-destination-1" className={`${link} hidden md:inline text-xs opacity-95`}>
              Featured
            </Link>
            <a
              href={SITE_PHONE_TEL}
              aria-label="Call us"
              className="rounded-full bg-brand-500 text-white px-3 py-2 sm:px-4 font-semibold text-xs sm:text-sm hover:bg-brand-400 whitespace-nowrap shadow-md shadow-brand-900/15"
            >
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">Call us</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

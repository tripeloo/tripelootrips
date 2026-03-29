"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { TourPackageDoc } from "@/types/models";
import { PackageCard } from "@/components/PackageCard";

const AUTO_SLIDE_MS = 5500;
const PAUSE_AFTER_SCROLL_MS = 12000;

type Props = {
  title: string;
  subtitle?: string;
  destinationSlug: string;
  destinationName: string;
  packages: TourPackageDoc[];
  edgeVariant?: "sand" | "mist" | "stone" | "white";
};

export function InfinitePackageRail({
  title,
  subtitle,
  destinationSlug,
  destinationName,
  packages,
  edgeVariant = "sand",
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fades: Record<NonNullable<Props["edgeVariant"]>, { left: string; right: string }> = {
    sand: {
      left: "pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-landing-sand to-transparent z-10",
      right:
        "pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-landing-sand to-transparent z-10",
    },
    mist: {
      left: "pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-landing-mist to-transparent z-10",
      right:
        "pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-landing-mist to-transparent z-10",
    },
    stone: {
      left: "pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-stone-50 to-transparent z-10",
      right:
        "pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-stone-50 to-transparent z-10",
    },
    white: {
      left: "pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10",
      right:
        "pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10",
    },
  };
  const { left: leftFade, right: rightFade } = fades[edgeVariant ?? "sand"];

  const syncIndexFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-carousel-item]");
    if (!items.length) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    items.forEach((node, i) => {
      const mid = node.offsetLeft + node.offsetWidth / 2;
      const d = Math.abs(center - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    indexRef.current = best;
  }, []);

  const onScrollerScroll = useCallback(() => {
    pauseUntilRef.current = Date.now() + PAUSE_AFTER_SCROLL_MS;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      syncIndexFromScroll();
    }, 100);
  }, [syncIndexFromScroll]);

  /** Symmetric gutters so snap-center can align the first/last card to the middle of the rail. */
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const cardOuterWidth = () => {
      const wide = typeof window !== "undefined" && window.matchMedia("(min-width:640px)").matches;
      if (wide) return 300;
      return Math.min(280, (typeof window !== "undefined" ? window.innerWidth : 360) - 2.5 * 16);
    };

    let recenterFirst = true;
    const applyGutters = () => {
      const cw = el.clientWidth;
      const card = cardOuterWidth();
      const gutter = Math.max(16, (cw - card) / 2);
      el.style.paddingLeft = `${gutter}px`;
      el.style.paddingRight = `${gutter}px`;
      el.style.scrollPaddingLeft = `${gutter}px`;
      el.style.scrollPaddingRight = `${gutter}px`;
      if (recenterFirst) {
        recenterFirst = false;
        const target = el.querySelector<HTMLElement>('[data-carousel-item="0"]');
        target?.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" });
      }
      syncIndexFromScroll();
    };

    applyGutters();
    const ro = new ResizeObserver(applyGutters);
    ro.observe(el);
    return () => ro.disconnect();
  }, [packages.length, destinationSlug, syncIndexFromScroll]);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (packages.length <= 1) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const n = packages.length;
      const next = (indexRef.current + 1) % n;
      const target = el.querySelector(`[data-carousel-item="${next}"]`);
      target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      indexRef.current = next;
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [packages.length]);

  if (!packages.length) return null;

  return (
    <section className="py-10 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <p className="mt-2 text-slate-600 max-w-xl text-sm sm:text-base">
              {subtitle}{" "}
              <span className="text-brand-700 font-semibold">{destinationName}</span>
            </p>
          )}
        </div>
        <Link
          href={`/destinations/${destinationSlug}`}
          className="text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-full shadow-sm inline-flex items-center gap-1 shrink-0 transition-colors"
        >
          View all in {destinationName}
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="relative">
        <div className={leftFade} />
        <div className={rightFade} />

        <div
          ref={scrollerRef}
          onScroll={onScrollerScroll}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
        >
          {packages.map((pkg, i) => (
            <div
              key={`${String(pkg._id ?? "x")}-${i}`}
              data-carousel-item={i}
              className="snap-center shrink-0 w-[min(280px,calc(100vw-2.5rem))] sm:w-[300px] flex flex-col"
            >
              <PackageCard
                pkg={pkg}
                destinationSlug={destinationSlug}
                destinationName={destinationName}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

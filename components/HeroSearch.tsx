"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export type SearchDestination = {
  slug: string;
  name: string;
  coverImage: string;
  location: string;
};

type Props = {
  destinations: SearchDestination[];
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80";

export function HeroSearch({ destinations }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.slug.includes(s) ||
        d.location.toLowerCase().includes(s)
    );
  }, [destinations, q]);

  const showSuggestions = focused && q.trim().length > 0 && filtered.length > 0;
  const showNoMatches =
    focused && q.trim().length > 0 && filtered.length === 0 && destinations.length > 0;

  function go(slug: string) {
    router.push(`/destinations/${slug}`);
    setFocused(false);
    setQ("");
  }

  return (
    <section className="relative min-h-[90vh] flex items-end sm:items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Scenic travel destination"
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/75 to-brand-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_80%_20%,rgba(237,43,87,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-landing-night via-slate-950/40 to-transparent" />
      </div>

      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand-400/25 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/3 h-64 w-64 rounded-full bg-brand-300/25 blur-[90px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 pt-28 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-brand-200 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
            Tripeloo Trips
            <span className="h-1 w-1 rounded-full bg-brand-300" aria-hidden />
            South India &amp; beyond
          </p>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white text-balance leading-[1.08] drop-shadow-sm">
            Curated tour packages &amp; vacations — domestic and international
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-slate-200/95 max-w-xl leading-relaxed">
            Transparent pricing, warm support, and hand-picked stays — from Kerala backwaters to
            Europe skylines.
          </p>

          <div className="mt-10 relative max-w-xl" ref={wrapRef}>
            <label htmlFor="dest-search" className="sr-only">
              Search destination
            </label>
            <input
              id="dest-search"
              type="search"
              autoComplete="off"
              placeholder="Search a destination (e.g. Sri Lanka, Dubai)…"
              className="w-full rounded-2xl border border-white/50 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-500 shadow-lg shadow-black/15 outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow caret-brand-600"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                window.setTimeout(() => setFocused(false), 160);
              }}
            />
            {(showSuggestions || showNoMatches) && (
              <motion.ul
                role="listbox"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 mt-2 rounded-2xl bg-white shadow-soft border border-slate-200/80 max-h-72 overflow-auto z-20"
              >
                {showNoMatches ? (
                  <li className="px-4 py-4 text-sm text-slate-600">No matching destinations.</li>
                ) : (
                  filtered.map((d) => (
                    <li key={d.slug}>
                      <button
                        type="button"
                        role="option"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => go(d.slug)}
                        className="w-full text-left px-4 py-3 hover:bg-brand-50 flex gap-3 items-center border-b border-slate-100 last:border-0 transition-colors"
                      >
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 ring-1 ring-slate-200/80">
                          <Image
                            src={d.coverImage || HERO_IMG}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{d.name}</p>
                          <p className="text-xs text-slate-500">{d.location}</p>
                        </div>
                      </button>
                    </li>
                  ))
                )}
              </motion.ul>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

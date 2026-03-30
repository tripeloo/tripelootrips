"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const HERO_CAPTION = "Curated packages — domestic & international";

function useTypewriter(
  text: string,
  { msPerChar = 32, startDelay = 480 }: { msPerChar?: number; startDelay?: number } = {}
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let i = 0;
    let intervalId: number | null = null;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          if (intervalId) window.clearInterval(intervalId);
          intervalId = null;
        }
      }, msPerChar);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, msPerChar, startDelay]);

  return { displayed, done };
}

const HERO_FOOTER_LINES = [
  "Transparent pricing · warm support",
  "Hand-picked stays from enquiry to return",
];

function HeroFooterTaglineLine({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) {
  const { displayed, done } = useTypewriter(text, { msPerChar: 26, startDelay: 120 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (!done) return;
    const t = window.setTimeout(onComplete, 2800);
    return () => window.clearTimeout(t);
  }, [done, onComplete]);

  return (
    <p className="mx-auto flex min-h-[2.75rem] max-w-xl items-center justify-center px-3 text-center text-sm font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-base">
      <span>{displayed}</span>
      <span
        className={`ml-0.5 inline-block h-[0.9em] w-0.5 rounded-sm bg-white ${done ? "opacity-0" : "animate-pulse"}`}
        aria-hidden
      />
    </p>
  );
}

function HeroFooterTagline() {
  const [index, setIndex] = useState(0);
  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % HERO_FOOTER_LINES.length);
  }, []);

  return (
    <div className="flex min-h-[3rem] w-full justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <HeroFooterTaglineLine text={HERO_FOOTER_LINES[index]} onComplete={advance} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function HeroSearch({ destinations }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { displayed: captionShown, done: captionDone } = useTypewriter(HERO_CAPTION, {
    msPerChar: 30,
    startDelay: 520,
  });
  const [caretVisible, setCaretVisible] = useState(true);

  useEffect(() => {
    if (!captionDone) {
      setCaretVisible(true);
      return;
    }
    const t = window.setTimeout(() => setCaretVisible(false), 900);
    return () => clearTimeout(t);
  }, [captionDone]);

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
    <section className="relative flex min-h-[90vh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Scenic travel destination"
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(15,23,42,0.55)_28%,rgba(15,23,42,0.22)_45%,rgba(15,23,42,0.06)_55%,transparent_66%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(237,43,87,0.22)_0%,rgba(237,43,87,0.06)_18%,transparent_30%)]"
        />
      </div>

      <div className="relative z-10 flex min-h-[90vh] w-full max-w-7xl flex-1 flex-col mx-auto px-4 sm:px-6 pt-[calc(6.75rem+env(safe-area-inset-top))] sm:pt-[7.25rem] lg:pt-[8rem]">
        <div className="flex flex-1 flex-col justify-center lg:justify-start lg:max-w-4xl lg:mx-auto w-full items-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center text-center w-full shrink-0"
          >
            <span className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-brand-700 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] shadow-md shadow-black/10 backdrop-blur-md lg:px-8 lg:py-2.5 lg:text-[0.95rem] lg:tracking-[0.22em]">
              Tripeloo Trips
              <span className="h-1 w-1 shrink-0 rounded-full bg-brand-500 lg:h-1.5 lg:w-1.5" aria-hidden />
              South India &amp; beyond
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 sm:mt-8 lg:mt-10 w-full flex flex-col items-center"
          >
            <div className="w-full flex justify-center overflow-x-auto lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <h1 className="inline-flex items-baseline font-display font-bold text-white leading-none whitespace-nowrap tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.35)] text-[clamp(0.62rem,3.1vw+0.2rem,3.35rem)] lg:text-[clamp(1.35rem,2.75vw+0.35rem,3.35rem)] min-h-[1.2em]">
                <span>{captionShown}</span>
                {(!captionDone || caretVisible) && (
                  <span
                    className={`inline-block w-[2px] lg:w-[3px] h-[0.82em] mb-0.5 ml-1.5 lg:ml-2 rounded-sm bg-white/95 shadow-[0_0_8px_rgba(237,43,87,0.9)] ${
                      captionDone ? "opacity-80" : "animate-pulse"
                    }`}
                    aria-hidden
                  />
                )}
              </h1>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-11 w-full max-w-xl lg:max-w-lg relative text-left" ref={wrapRef}>
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

        <div className="mt-auto flex w-full flex-col items-center border-t border-white/15 bg-gradient-to-t from-black/30 to-transparent px-2 pb-8 pt-8 sm:pb-10 sm:pt-10">
          <div className="flex w-full max-w-xl flex-col items-center gap-6 sm:max-w-2xl">
            <HeroFooterTagline />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/destinations"
                prefetch={true}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/35 ring-1 ring-white/20 transition-colors hover:bg-brand-500 hover:ring-white/30"
              >
                All destinations
                <span aria-hidden className="text-white/90">
                  →
                </span>
              </Link>
              <Link
                href="/packages"
                prefetch={true}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/35 ring-1 ring-white/20 transition-colors hover:bg-brand-500 hover:ring-white/30"
              >
                All tour packages
                <span aria-hidden className="text-white/90">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

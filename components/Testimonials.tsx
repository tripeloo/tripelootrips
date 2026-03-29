"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ITEMS = [
  {
    quote:
      "Transparent pricing and quick callbacks — our Vietnam trip was smoother than we expected.",
    name: "Priya & Rahul",
    place: "Chennai",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "Loved the curated stays in Munnar. Felt like talking to friends who actually travel.",
    name: "Ananya K.",
    place: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "Europe itinerary was tight but relaxed — great balance for our parents and kids.",
    name: "Imran S.",
    place: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 bg-landing-night text-slate-300 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(237,43,87,0.14),transparent_55%)]" />
      <div className="absolute inset-0 landing-grain opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Travellers say
        </h2>
        <p className="mt-3 text-slate-400 max-w-xl">
          Sample stories — swap with real reviews anytime.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 shadow-lg hover:border-brand-400/30 transition-colors"
            >
              <div
                className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-brand-400 to-brand-700 opacity-90"
                aria-hidden
              />
              <div className="pl-4 flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-700 ring-2 ring-white/10">
                  <Image src={t.image} alt="" fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <figcaption className="font-semibold text-white">{t.name}</figcaption>
                  <p className="text-xs text-brand-200/90">{t.place}</p>
                </div>
              </div>
              <blockquote className="mt-5 pl-4 text-slate-300 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

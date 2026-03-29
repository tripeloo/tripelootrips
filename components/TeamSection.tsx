"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Founder",
    role: "Founder",
    bio: "Built Tripeloo to make premium travel planning simple for families across South India.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Co-founder",
    role: "Co-founder",
    bio: "Leads partnerships with hotels & DMCs so every itinerary stays seamless on the ground.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marketing head",
    role: "Marketing Head",
    bio: "Tells stories of places we love — from misty hills to city breaks — with clarity and care.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
];

const card = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export function TeamSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden border-t border-brand-200/30 bg-gradient-to-b from-white via-landing-mist/40 to-landing-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_100%,rgba(237,43,87,0.06),transparent)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          {...card}
          className="text-brand-700 font-semibold text-xs uppercase tracking-[0.22em]"
        >
          Our team
        </motion.p>
        <motion.h2
          {...card}
          transition={{ ...card.transition, delay: 0.04 }}
          className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-3 tracking-tight"
        >
          People behind Tripeloo
        </motion.h2>
        <p className="mt-4 text-slate-600 max-w-2xl text-base sm:text-lg leading-relaxed">
          A small team obsessed with clear pricing, honest recommendations, and support before you fly.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.role}
              {...card}
              transition={{ ...card.transition, delay: 0.08 + i * 0.08 }}
              className="group flex flex-col sm:block rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/60 p-6 sm:p-8 shadow-card hover:shadow-soft hover:border-brand-200/60 transition-all duration-300"
            >
              <div className="relative mx-auto sm:mx-0 w-36 h-36 sm:w-full sm:aspect-square max-w-sm rounded-2xl overflow-hidden bg-slate-100 ring-2 ring-slate-100 group-hover:ring-brand-200/80 transition-[box-shadow]">
                <Image src={m.image} alt={m.name} fill className="object-cover" sizes="320px" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 text-center sm:text-left">
                {m.name}
              </h3>
              <p className="text-brand-700 text-sm font-semibold text-center sm:text-left">{m.role}</p>
              <p className="mt-3 text-slate-600 text-sm text-center sm:text-left leading-relaxed">
                {m.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

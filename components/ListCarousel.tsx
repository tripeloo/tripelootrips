"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CarouselImage = { url: string; title?: string };

type Props = {
  carouselImages: CarouselImage[];
  coverImage: string;
};

const FALLBACK =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";

export function ListCarousel({ carouselImages, coverImage }: Props) {
  const slides =
    carouselImages?.length > 0
      ? carouselImages
      : coverImage
        ? [{ url: coverImage }]
        : [{ url: FALLBACK }];
  const [idx, setIdx] = useState(0);
  const current = slides[idx] ?? slides[0];

  return (
    <div className="w-full max-w-full">
      <div className="relative aspect-[4/3] min-h-[220px] sm:aspect-video sm:min-h-[280px] md:aspect-[21/9] md:min-h-[300px] lg:min-h-[320px] rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.url + idx}
            initial={{ opacity: 0.2, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <Image
              src={current.url}
              alt={current.title || "Package"}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.url + i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

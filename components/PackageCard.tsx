"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isWithinCallWindowIST } from "@/lib/ist";
import { SITE_PHONE_TEL } from "@/lib/site-contact";
import type { TourPackageDoc } from "@/types/models";
import { CallbackLeadSheet } from "@/components/CallbackLeadSheet";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

function pkgId(p: TourPackageDoc): string {
  const id = p._id;
  if (id && typeof id === "object" && "toString" in id) return String(id);
  return String(id ?? "");
}

type Props = {
  pkg: TourPackageDoc;
  destinationSlug: string;
  destinationName: string;
};

export function PackageCard({ pkg, destinationSlug, destinationName }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [callOk, setCallOk] = useState(false);

  useEffect(() => {
    setCallOk(isWithinCallWindowIST());
    const t = setInterval(() => setCallOk(isWithinCallWindowIST()), 60_000);
    return () => clearInterval(t);
  }, []);

  const tel = process.env.NEXT_PUBLIC_CALLBACK_PHONE_TEL ?? SITE_PHONE_TEL;

  return (
    <>
      <article className="group relative h-full w-full rounded-2xl bg-white border border-slate-200/70 shadow-card hover:shadow-soft hover:border-brand-300/50 transition-all duration-300 overflow-hidden ring-1 ring-slate-900/[0.03]">
        <Link href={`/packages/${pkgId(pkg)}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <Image
              src={pkg.coverImage || FALLBACK_IMG}
              alt={pkg.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width:640px) 85vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-60" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
              <span className="text-white text-sm font-semibold drop-shadow line-clamp-2">
                {pkg.name}
              </span>
            </div>
          </div>
        </Link>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg font-bold text-slate-900">
              {pkg.currency}{" "}
              {pkg.packagePrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
            <span className="text-xs text-slate-500">
              {pkg.numberOfDays}D / {pkg.numberOfNights}N
            </span>
          </div>
          {pkg.summary && (
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">{pkg.summary}</p>
          )}
          <div className="mt-4 flex items-center gap-2">
            {callOk && (
              <a
                href={tel}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 border border-brand-100 hover:bg-brand-100"
                aria-label="Call us"
              >
                <PhoneIcon />
              </a>
            )}
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex-1 rounded-xl bg-slate-900 text-white text-sm font-semibold py-2.5 hover:bg-slate-800 transition-colors"
            >
              Get a callback
            </button>
          </div>
        </div>
      </article>
      <CallbackLeadSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        packageId={pkgId(pkg)}
        packageName={pkg.name}
        destinationSlug={destinationSlug}
        destinationName={destinationName}
      />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

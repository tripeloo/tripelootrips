"use client";

import { useState } from "react";
import { CallbackLeadSheet } from "@/components/CallbackLeadSheet";

type Props = {
  packageId: string;
  packageName: string;
  destinationSlug: string;
  destinationName: string;
  priceLabel: string;
};

export function MobilePackageBar({
  packageId,
  packageName,
  destinationSlug,
  destinationName,
  priceLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 flex items-center gap-3"
        style={{ paddingTop: "0.75rem", paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 truncate">{packageName}</p>
          <p className="text-sm font-bold text-slate-900">{priceLabel}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-brand-600 text-white text-sm font-semibold px-5 py-3 shadow-lg shadow-brand-600/20"
        >
          Get a callback
        </button>
      </div>
      <CallbackLeadSheet
        open={open}
        onClose={() => setOpen(false)}
        packageId={packageId}
        packageName={packageName}
        destinationSlug={destinationSlug}
        destinationName={destinationName}
      />
    </>
  );
}

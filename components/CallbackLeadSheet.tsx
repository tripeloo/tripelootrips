"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  packageId?: string;
  packageName?: string;
  destinationSlug?: string;
  destinationName?: string;
};

export function CallbackLeadSheet({
  open,
  onClose,
  packageId,
  packageName,
  destinationSlug,
  destinationName,
}: Props) {
  const uid = useId();
  const nameId = `${uid}-name`;
  const phoneId = `${uid}-phone`;
  const budgetId = `${uid}-budget`;
  const infoId = `${uid}-info`;

  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setName("");
      setPhone("");
      setMoreInfo("");
      setBudget("");
    }
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          moreInfo: moreInfo.trim() || undefined,
          budget: budget.trim() || undefined,
          packageId,
          packageName,
          destinationSlug,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("done");
      setTimeout(onClose, 1600);
    } catch {
      setStatus("error");
    }
  }

  const tree = (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed z-[70] left-4 right-4 top-[max(5rem,12vh)] sm:left-1/2 sm:right-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md max-h-[min(85vh,calc(100vh-6rem))] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Request a callback</h2>
              <p className="mt-1 text-sm text-slate-600">
                Share your details and our travel desk will reach out shortly.
              </p>
              {(packageName || destinationName || destinationSlug) && (
                <p className="mt-2 text-sm text-slate-700">
                  {packageName && (
                    <span className="font-semibold text-brand-700">{packageName}</span>
                  )}
                  {packageName && (destinationName || destinationSlug) && (
                    <span className="text-slate-400 font-normal"> · </span>
                  )}
                  {(destinationName || destinationSlug) && (
                    <span className="font-medium text-slate-800">
                      {destinationName ?? destinationSlug}
                    </span>
                  )}
                </p>
              )}
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600" htmlFor={nameId}>
                    Name
                  </label>
                  <input
                    id={nameId}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" htmlFor={phoneId}>
                    Phone
                  </label>
                  <input
                    id={phoneId}
                    required
                    type="tel"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" htmlFor={budgetId}>
                    Budget (optional)
                  </label>
                  <input
                    id={budgetId}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 1.5L for two"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600" htmlFor={infoId}>
                    More info (optional)
                  </label>
                  <textarea
                    id={infoId}
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
                    value={moreInfo}
                    onChange={(e) => setMoreInfo(e.target.value)}
                    placeholder="Dates, travellers, preferences…"
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
                )}
                {status === "done" && (
                  <p className="text-sm text-brand-700 font-medium">Thank you — we&apos;ll call you soon.</p>
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "done"}
                    className="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(tree, document.body);
}

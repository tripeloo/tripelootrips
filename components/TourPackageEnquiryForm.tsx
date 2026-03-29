"use client";

import { useState } from "react";

type Props = {
  packageName: string;
  packagePrice: number;
  currency: string;
  destinationLabel: string;
  destinationSlug: string;
  packageId: string;
};

export function TourPackageEnquiryForm({
  packageName,
  packagePrice,
  currency,
  destinationLabel,
  destinationSlug,
  packageId,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

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
          moreInfo: message.trim() || undefined,
          budget: `${currency} ${packagePrice}`,
          packageId,
          packageName,
          destinationSlug,
          destinationName: destinationLabel,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Enquire about this trip</h3>
      <p className="text-sm text-slate-600 mt-1">
        From {currency} {packagePrice.toLocaleString("en-IN")} · {destinationLabel}
      </p>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <input
          required
          placeholder="Your name"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="tel"
          placeholder="Phone / WhatsApp"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          rows={3}
          placeholder="Dates, travellers, questions…"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {status === "error" && <p className="text-sm text-red-600">Could not send. Try again.</p>}
        {status === "done" && (
          <p className="text-sm text-brand-700 font-medium">Thanks — we&apos;ll be in touch.</p>
        )}
        <button
          type="submit"
          disabled={status === "sending" || status === "done"}
          className="w-full rounded-xl bg-brand-600 text-white font-semibold py-3 hover:bg-brand-700 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </form>
    </div>
  );
}

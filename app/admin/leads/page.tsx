"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

type Lead = {
  id: string;
  name: string;
  phone: string;
  moreInfo?: string;
  budget?: string;
  packageId?: string;
  packageName?: string;
  destinationSlug?: string;
  destinationName?: string;
  source: string;
  createdAt: string;
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/leads", { credentials: "include" });
        if (!res.ok) throw new Error("auth");
        const data = await res.json();
        if (!cancelled) setLeads(data);
      } catch {
        if (!cancelled) window.location.href = "/admin/login";
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <p className="text-slate-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin" className="text-sm text-brand-400 hover:text-brand-300">
          ← Admin home
        </Link>
        <AdminLogoutButton />
      </div>
      <h1 className="text-2xl font-bold mt-6">Callback leads</h1>
      <p className="text-slate-400 text-sm mt-2">Collection: tripelootrips_leads</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="p-3 font-medium">When</th>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Package</th>
              <th className="p-3 font-medium">Budget</th>
              <th className="p-3 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-slate-500">
                  No leads yet.
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-slate-800">
                <td className="p-3 text-slate-400 whitespace-nowrap">
                  {new Date(l.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </td>
                <td className="p-3">{l.name}</td>
                <td className="p-3 whitespace-nowrap">{l.phone}</td>
                <td className="p-3 max-w-[180px] truncate" title={l.packageName}>
                  {l.packageName || "—"}
                </td>
                <td
                  className="p-3 max-w-[160px] truncate"
                  title={[l.destinationName, l.destinationSlug].filter(Boolean).join(" · ") || undefined}
                >
                  {l.destinationName || l.destinationSlug || "—"}
                </td>
                <td className="p-3 max-w-[120px] truncate">{l.budget || "—"}</td>
                <td className="p-3 max-w-[220px] truncate" title={l.moreInfo}>
                  {l.moreInfo || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

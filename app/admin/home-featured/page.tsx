"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

type Opt = { slug: string; name: string; isHidden: boolean };

export default function AdminHomeFeaturedPage() {
  const [opts, setOpts] = useState<Opt[]>([]);
  const [section1Title, setSection1Title] = useState("");
  const [section2Title, setSection2Title] = useState("");
  const [section1Slugs, setSection1Slugs] = useState<string[]>([]);
  const [section2Slugs, setSection2Slugs] = useState<string[]>([]);
  const [slugPick, setSlugPick] = useState("");
  const [slugPick2, setSlugPick2] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [cfgRes, optRes] = await Promise.all([
          fetch("/api/admin/home-featured", { credentials: "include" }),
          fetch("/api/admin/destination-options", { credentials: "include" }),
        ]);
        if (!cfgRes.ok || !optRes.ok) throw new Error("auth");
        const cfg = await cfgRes.json();
        const o = await optRes.json();
        if (cancelled) return;
        setSection1Title(cfg.section1Title ?? "");
        setSection2Title(cfg.section2Title ?? "");
        setSection1Slugs(cfg.section1Slugs ?? []);
        setSection2Slugs(cfg.section2Slugs ?? []);
        setOpts(o);
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

  async function save() {
    setMsg("");
    const res = await fetch("/api/admin/home-featured", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section1Title,
        section2Title,
        section1Slugs,
        section2Slugs,
      }),
    });
    if (!res.ok) setMsg("Save failed");
    else setMsg("Saved");
  }

  function addSlug1() {
    const s = slugPick.trim().toLowerCase();
    if (!s || section1Slugs.includes(s)) return;
    setSection1Slugs([...section1Slugs, s]);
    setSlugPick("");
  }

  function addSlug2() {
    const s = slugPick2.trim().toLowerCase();
    if (!s || section2Slugs.includes(s)) return;
    setSection2Slugs([...section2Slugs, s]);
    setSlugPick2("");
  }

  function remove1(i: number) {
    setSection1Slugs(section1Slugs.filter((_, j) => j !== i));
  }

  function remove2(i: number) {
    setSection2Slugs(section2Slugs.filter((_, j) => j !== i));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <p className="text-slate-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin" className="text-sm text-brand-400 hover:text-brand-300">
          ← Admin home
        </Link>
        <AdminLogoutButton />
      </div>
      <h1 className="text-2xl font-bold mt-6">Home featured destinations</h1>
      <p className="text-slate-400 text-sm mt-2">
        Order matters: first slug appears first on the homepage. Only destinations with visible tour
        packages will show content. Hidden destinations in DB are marked below.
      </p>

      <label className="block mt-8 text-sm font-medium text-slate-300">
        Section 1 group title (above destination rails)
      </label>
      <input
        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
        value={section1Title}
        onChange={(e) => setSection1Title(e.target.value)}
        placeholder="Popular getaways (section label)"
      />

      <label className="block mt-6 text-sm font-medium text-slate-300">Section 1 slugs (order)</label>
      <div className="mt-2 flex gap-2 flex-wrap">
        <select
          className="flex-1 min-w-[200px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          value={slugPick}
          onChange={(e) => setSlugPick(e.target.value)}
        >
          <option value="">Pick destination…</option>
          {opts.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.name} ({o.slug}){o.isHidden ? " — hidden" : ""}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addSlug1}
          className="rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white"
        >
          Add
        </button>
      </div>
      <ol className="mt-3 space-y-2 list-decimal list-inside text-sm text-slate-300">
        {section1Slugs.map((s, i) => (
          <li key={s}>
            <span className="mr-2">{s}</span>
            <button type="button" className="text-red-400 underline text-xs" onClick={() => remove1(i)}>
              remove
            </button>
          </li>
        ))}
      </ol>

      <label className="block mt-8 text-sm font-medium text-slate-300">
        Section 2 group title (above destination rails)
      </label>
      <input
        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
        value={section2Title}
        onChange={(e) => setSection2Title(e.target.value)}
        placeholder="More destinations (section label)"
      />

      <label className="block mt-6 text-sm font-medium text-slate-300">Section 2 slugs (order)</label>
      <div className="mt-2 flex gap-2 flex-wrap">
        <select
          className="flex-1 min-w-[200px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          value={slugPick2}
          onChange={(e) => setSlugPick2(e.target.value)}
        >
          <option value="">Pick destination…</option>
          {opts.map((o) => (
            <option key={`2-${o.slug}`} value={o.slug}>
              {o.name} ({o.slug}){o.isHidden ? " — hidden" : ""}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addSlug2}
          className="rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white"
        >
          Add
        </button>
      </div>
      <ol className="mt-3 space-y-2 list-decimal list-inside text-sm text-slate-300">
        {section2Slugs.map((s, i) => (
          <li key={s}>
            <span className="mr-2">{s}</span>
            <button type="button" className="text-red-400 underline text-xs" onClick={() => remove2(i)}>
              remove
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => void save()}
          className="rounded-xl bg-white text-slate-900 font-semibold px-6 py-3"
        >
          Save
        </button>
        {msg && <span className="text-sm text-brand-400">{msg}</span>}
      </div>
    </div>
  );
}

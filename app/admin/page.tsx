import Link from "next/link";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="text-slate-400 mt-2 text-sm">Manage homepage sections and leads.</p>
      <ul className="mt-8 space-y-3">
        <li>
          <Link
            href="/admin/home-featured"
            className="block rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 hover:border-brand-600/50"
          >
            <span className="font-semibold text-white">Home featured destinations</span>
            <p className="text-sm text-slate-400 mt-1">
              Section 1 &amp; 2 order, titles, which slugs appear on the homepage.
            </p>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/leads"
            className="block rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 hover:border-brand-600/50"
          >
            <span className="font-semibold text-white">Callback leads</span>
            <p className="text-sm text-slate-400 mt-1">tripelootrips_leads collection</p>
          </Link>
        </li>
      </ul>
      <div className="mt-10">
        <AdminLogoutButton />
      </div>
    </div>
  );
}

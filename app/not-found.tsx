import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-28">
        <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600 text-center max-w-md">
          The page you are looking for does not exist or was removed.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-xl bg-brand-600 text-white font-semibold px-6 py-3 hover:bg-brand-700"
        >
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}

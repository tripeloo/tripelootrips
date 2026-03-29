import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { tourPackageId } from "@/lib/package-id";
import { listDestinationsVisible } from "@/lib/repositories/destinationsRepository";
import { listTourPackagesVisible } from "@/lib/repositories/tourPackagesRepository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tour packages",
  description:
    "All curated tour packages from Tripeloo Trips — compare trips, prices, and durations in one place.",
  openGraph: {
    title: "Tour packages | Tripeloo Trips",
    description: "Browse every published tour package.",
  },
};

export default async function PackagesIndexPage() {
  let packages: Awaited<ReturnType<typeof listTourPackagesVisible>> = [];
  let destNames = new Map<string, string>();
  try {
    const [pkgs, dests] = await Promise.all([
      listTourPackagesVisible(),
      listDestinationsVisible(),
    ]);
    packages = pkgs;
    destNames = new Map(dests.map((d) => [d.slug, d.name]));
  } catch (e) {
    console.error("Packages index:", e);
  }

  return (
    <>
      <SiteHeader />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Tour packages
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Every published package across our destinations — open a card for the full itinerary and
            enquiry form.
          </p>
          <p className="mt-4 text-sm font-medium">
            <Link href="/destinations" className="text-brand-700 hover:text-brand-800">
              Browse by destination →
            </Link>
          </p>

          {packages.length === 0 ? (
            <p className="mt-12 text-slate-500">
              No packages published yet. Try{" "}
              <Link href="/destinations" className="text-brand-700 font-medium underline">
                destinations
              </Link>{" "}
              or the home search once trips are live.
            </p>
          ) : (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => {
                const id = tourPackageId(p);
                const destLabel =
                  destNames.get(p.destinationSlug) || p.destinationSlug.replace(/-/g, " ");
                return (
                  <li key={id}>
                    <Link
                      href={`/packages/${id}`}
                      className="group block rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-lg hover:border-brand-200/60 transition-all"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100">
                        <Image
                          src={
                            p.coverImage ||
                            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
                          }
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width:1024px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-medium text-brand-700 uppercase tracking-wide">
                          {destLabel}
                        </p>
                        <p className="mt-1 font-semibold text-slate-900 line-clamp-2">{p.name}</p>
                        <p className="mt-2 text-sm text-slate-600">
                          {p.numberOfDays}D / {p.numberOfNights}N · {p.currency}{" "}
                          {p.packagePrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { listDestinationsWithPackageSlugs } from "@/lib/repositories/destinationsRepository";
import { distinctDestinationSlugsWithPackages } from "@/lib/repositories/tourPackagesRepository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Browse Tripeloo Trips destinations with live tour packages — domestic and international getaways.",
  openGraph: {
    title: "Destinations | Tripeloo Trips",
    description: "Explore destinations and curated tour packages.",
  },
};

export default async function DestinationsIndexPage() {
  let destinations: Awaited<ReturnType<typeof listDestinationsWithPackageSlugs>> = [];
  try {
    const slugs = await distinctDestinationSlugsWithPackages();
    destinations = await listDestinationsWithPackageSlugs(slugs);
  } catch (e) {
    console.error("Destinations index:", e);
  }

  return (
    <>
      <SiteHeader />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Destinations
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Every place listed here has at least one published tour package. Open a destination to
            see every trip we offer there.
          </p>

          {destinations.length === 0 ? (
            <p className="mt-12 text-slate-500">
              No destinations with packages yet. Check back soon or{" "}
              <Link href="/packages" className="text-brand-700 font-medium underline">
                view all packages
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-lg hover:border-brand-200/60 transition-all"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100">
                      <Image
                        src={d.coverImage}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width:1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs font-medium text-brand-200">{d.location}</p>
                        <p className="text-lg font-bold leading-tight">{d.name}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      {d.summary && (
                        <p className="text-sm text-slate-600 line-clamp-2">{d.summary}</p>
                      )}
                      <p className="mt-3 text-sm font-semibold text-brand-700">
                        From {d.currency}{" "}
                        {d.startingPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

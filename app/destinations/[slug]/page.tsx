import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCard } from "@/components/PackageCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDestinationBySlug } from "@/lib/repositories/destinationsRepository";
import { listByDestinationSlug } from "@/lib/repositories/tourPackagesRepository";
import { toPlain } from "@/lib/serialize";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let title = "Destination";
  let description = "Tour packages on Tripeloo Trips.";
  try {
    const d = await getDestinationBySlug(slug);
    if (d) {
      title = `${d.name} tour packages`;
      description = d.summary || `Explore curated tour packages in ${d.name} with Tripeloo Trips.`;
    }
  } catch {
    /* ignore */
  }
  return {
    title,
    description,
    openGraph: { title: `${title} | Tripeloo Trips`, description },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  let destination = null;
  let packages: Awaited<ReturnType<typeof listByDestinationSlug>> = [];
  try {
    destination = await getDestinationBySlug(slug);
    packages = await listByDestinationSlug(slug);
  } catch (e) {
    console.error(e);
  }

  if (!destination) notFound();
  if (!packages.length) {
    return (
      <>
        <SiteHeader />
        <main className="pt-28 max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-slate-900">{destination.name}</h1>
          <p className="mt-4 text-slate-600">
            No visible tour packages for this destination yet.{" "}
            <Link href="/" className="text-brand-700 font-medium">
              Back home
            </Link>
          </p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const plainPkgs = toPlain(packages);

  return (
    <>
      <SiteHeader />
      <main className="pt-24 sm:pt-28">
        <div className="relative h-[38vh] min-h-[220px] w-full overflow-hidden">
          <Image
            src={destination.coverImage}
            alt={destination.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-8">
            <p className="text-brand-200 text-sm font-medium">{destination.location}</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
              {destination.name}
            </h1>
            {destination.summary && (
              <p className="mt-3 text-slate-200 max-w-2xl text-sm sm:text-base">
                {destination.summary}
              </p>
            )}
            <p className="mt-4 text-white font-semibold">
              From {destination.currency}{" "}
              {destination.startingPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}{" "}
              onwards
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-semibold text-slate-900">All packages in {destination.name}</h2>
          <p className="text-slate-600 text-sm mt-1">
            {plainPkgs.length} curated {plainPkgs.length === 1 ? "trip" : "trips"} — tap a card for
            details or request a callback.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {plainPkgs.map((p) => (
              <PackageCard
                key={String(p._id)}
                pkg={p}
                destinationSlug={slug}
                destinationName={destination.name}
              />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

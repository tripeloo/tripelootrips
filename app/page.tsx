import Link from "next/link";
import { HeroSearch, type SearchDestination } from "@/components/HeroSearch";
import { InfinitePackageRail } from "@/components/InfinitePackageRail";
import {
  PickPlannedDestinationSection,
  type PickDestinationItem,
} from "@/components/PickPlannedDestinationSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";
import { Testimonials } from "@/components/Testimonials";
import { loadHomePageRails } from "@/lib/home-data";
import { listDestinationsWithPackageSlugs } from "@/lib/repositories/destinationsRepository";
import { distinctDestinationSlugsWithPackages } from "@/lib/repositories/tourPackagesRepository";
import { toPlain } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let searchDestinations: SearchDestination[] = [];
  let pickDestinations: PickDestinationItem[] = [];
  let homeRails: Awaited<ReturnType<typeof loadHomePageRails>> = [];

  try {
    const slugs = await distinctDestinationSlugsWithPackages();
    const dests = await listDestinationsWithPackageSlugs(slugs);
    pickDestinations = toPlain(dests);
    searchDestinations = dests.map((d) => ({
      slug: d.slug,
      name: d.name,
      coverImage: d.coverImage,
      location: d.location,
    }));
    homeRails = await loadHomePageRails();
  } catch (e) {
    console.error("Home data load:", e);
  }

  const plainRails = toPlain(homeRails);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Tripeloo Trips",
    description:
      "Tour packages and vacations for travellers from South India — domestic and international.",
    areaServed: { "@type": "Place", name: "South India" },
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tripelootrips.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="relative">
        <HeroSearch destinations={searchDestinations} />

        <section
          id="best-destination-1"
          className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-landing-sandDeep via-landing-sand to-landing-canvas landing-grain"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
            <div className="rail-feature-blob rail-feature-blob--a" />
            <div className="rail-feature-blob rail-feature-blob--b" />
            <div className="rail-feature-blob rail-feature-blob--c" />
            <div className="rail-feature-shimmer" />
          </div>
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_55%_at_50%_-8%,rgba(237,43,87,0.12),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 rail-feature-vignette" />
          <div className="relative z-[1] pt-6 sm:pt-10">
            {plainRails.length === 0 && (
              <p className="px-4 sm:px-6 max-w-7xl mx-auto py-10 text-slate-600">
                No destinations with tour packages yet. Add packages in MongoDB, then check{" "}
                <Link href="/destinations" className="text-brand-700 font-semibold underline">
                  destinations
                </Link>{" "}
                and{" "}
                <Link href="/api/health" className="text-brand-700 font-semibold underline">
                  /api/health
                </Link>
                .
              </p>
            )}
            {plainRails.map((d) => (
              <InfinitePackageRail
                key={d.slug}
                title={`Best for ${d.name}`}
                subtitle="Hand-picked packages"
                destinationSlug={d.slug}
                destinationName={d.name}
                packages={d.packages}
                edgeVariant="sand"
              />
            ))}
          </div>
        </section>

        <PickPlannedDestinationSection destinations={pickDestinations} />

        <TeamSection />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  );
}

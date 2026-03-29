import Link from "next/link";
import { HeroSearch, type SearchDestination } from "@/components/HeroSearch";
import { InfinitePackageRail } from "@/components/InfinitePackageRail";
import { LandingSectionIntro } from "@/components/LandingSectionIntro";
import { LandingWave } from "@/components/LandingWave";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";
import { Testimonials } from "@/components/Testimonials";
import { loadHomeSections } from "@/lib/home-data";
import { listDestinationsWithPackageSlugs } from "@/lib/repositories/destinationsRepository";
import { distinctDestinationSlugsWithPackages } from "@/lib/repositories/tourPackagesRepository";
import { toPlain } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let searchDestinations: SearchDestination[] = [];
  let section1Title = "Popular getaways";
  let section2Title = "More destinations";
  let section1: Awaited<ReturnType<typeof loadHomeSections>>["section1"] = [];
  let section2: Awaited<ReturnType<typeof loadHomeSections>>["section2"] = [];

  try {
    const slugs = await distinctDestinationSlugsWithPackages();
    const dests = await listDestinationsWithPackageSlugs(slugs);
    searchDestinations = dests.map((d) => ({
      slug: d.slug,
      name: d.name,
      coverImage: d.coverImage,
      location: d.location,
    }));
    const data = await loadHomeSections();
    section1Title = data.section1Title;
    section2Title = data.section2Title;
    section1 = data.section1;
    section2 = data.section2;
  } catch (e) {
    console.error("Home data load:", e);
  }

  const plain1 = toPlain(section1);
  const plain2 = toPlain(section2);

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
        <LandingWave variant="sand" />

        <section
          id="best-destination-1"
          className="relative scroll-mt-24 bg-gradient-to-b from-landing-sandDeep via-landing-sand to-landing-canvas landing-grain"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(237,43,87,0.08),transparent_55%)] pointer-events-none" />
          <div className="relative">
            <LandingSectionIntro title={section1Title} eyebrow="Discover" />
            {plain1.length === 0 && (
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
            {plain1.map((d) => (
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

        <div className="h-px bg-gradient-to-r from-transparent via-brand-200/40 to-transparent" />

        <section
          id="best-destination-2"
          className="relative scroll-mt-24 bg-gradient-to-b from-landing-canvas via-landing-mist to-white landing-grain"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_20%,rgba(237,43,87,0.07),transparent_50%)] pointer-events-none" />
          <div className="relative">
            <LandingSectionIntro title={section2Title} eyebrow="Go further" />
            {plain2.length === 0 && plain1.length > 0 && (
              <p className="px-4 sm:px-6 max-w-7xl mx-auto py-6 text-slate-600 text-sm">
                More destinations will appear here when you have enough listings for a second row, or
                add slugs in admin.
              </p>
            )}
            {plain2.map((d) => (
              <InfinitePackageRail
                key={`s2-${d.slug}`}
                title={`Best for ${d.name}`}
                subtitle="Hand-picked packages"
                destinationSlug={d.slug}
                destinationName={d.name}
                packages={d.packages}
                edgeVariant="mist"
              />
            ))}
          </div>
        </section>

        <TeamSection />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  );
}

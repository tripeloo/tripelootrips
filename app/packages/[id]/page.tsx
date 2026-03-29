import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListCarousel } from "@/components/ListCarousel";
import { MobilePackageBar } from "@/components/MobilePackageBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TourPackageEnquiryForm } from "@/components/TourPackageEnquiryForm";
import { getDestinationBySlug } from "@/lib/repositories/destinationsRepository";
import { getTourPackageById } from "@/lib/repositories/tourPackagesRepository";
import { toPlain } from "@/lib/serialize";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let title = "Tour package";
  let description = "Trip details on Tripeloo Trips.";
  try {
    const p = await getTourPackageById(id);
    if (p) {
      title = p.name;
      description = p.summary || `${p.name} — ${p.numberOfDays} days tour package.`;
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

export default async function PackageDetailPage({ params }: Props) {
  const { id } = await params;
  let detail = null;
  try {
    detail = await getTourPackageById(id);
  } catch (e) {
    console.error(e);
  }
  if (!detail) notFound();

  const dest = await getDestinationBySlug(detail.destinationSlug);
  const destinationLabel = dest?.name ?? detail.destinationSlug;
  const plain = toPlain(detail);
  const pkgId = String(plain._id ?? id);
  const priceLabel = `${plain.currency} ${plain.packagePrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <>
      <SiteHeader />
      <div className="relative mx-0 px-4 pt-20 sm:pt-24 sm:px-6 sm:mx-[5%] lg:mx-[10%] lg:px-8 pb-24 lg:pb-10">
        <ListCarousel
          carouselImages={plain.carouselImages || []}
          coverImage={plain.coverImage}
        />
        <div className="max-w-7xl mx-auto py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{plain.name}</h1>
              <p className="mt-2 text-brand-700 font-semibold">
                {priceLabel}{" "}
                <span className="text-slate-500 font-normal text-sm">
                  · {plain.numberOfDays}D / {plain.numberOfNights}N
                </span>
              </p>
              {plain.summary && (
                <p className="mt-4 text-slate-600 leading-relaxed">{plain.summary}</p>
              )}

              {Array.isArray(plain.tripHighlights) && plain.tripHighlights.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-slate-900">Highlights</h2>
                  <ul className="mt-3 list-disc list-inside text-slate-600 space-y-1">
                    {(plain.tripHighlights as string[]).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(plain.durationOptions) && plain.durationOptions.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-slate-900">Duration options</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(plain.durationOptions as string[]).map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-brand-50 text-brand-800 text-xs font-medium px-3 py-1 border border-brand-100"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {plain.detailedItinerary && (
                <div className="mt-8 prose prose-slate max-w-none">
                  <h2 className="text-lg font-semibold text-slate-900">Itinerary</h2>
                  <div className="mt-2 whitespace-pre-wrap text-slate-600 text-sm leading-relaxed">
                    {plain.detailedItinerary}
                  </div>
                </div>
              )}
            </div>
            <aside className="lg:w-[380px] flex-shrink-0 hidden lg:block">
              <TourPackageEnquiryForm
                packageName={plain.name}
                packagePrice={plain.packagePrice}
                currency={plain.currency}
                destinationLabel={destinationLabel}
                destinationSlug={plain.destinationSlug}
                packageId={pkgId}
              />
            </aside>
          </div>
        </div>
        <MobilePackageBar
          packageId={pkgId}
          packageName={plain.name}
          destinationSlug={plain.destinationSlug}
          destinationName={destinationLabel}
          priceLabel={priceLabel}
        />
      </div>
      <SiteFooter />
    </>
  );
}

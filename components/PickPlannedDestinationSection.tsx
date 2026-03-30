import Image from "next/image";
import Link from "next/link";
import type { DestinationDoc } from "@/types/models";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

export type PickDestinationItem = Pick<
  DestinationDoc,
  "slug" | "name" | "location" | "coverImage" | "startingPrice" | "currency" | "summary"
>;

type Props = {
  destinations: PickDestinationItem[];
};

export function PickPlannedDestinationSection({ destinations }: Props) {
  if (destinations.length === 0) return null;

  return (
    <section
      id="pick-planned-destination"
      className="relative scroll-mt-24 border-t border-slate-200/70 bg-gradient-to-b from-white via-landing-mist/35 to-landing-canvas py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_0%,rgba(237,43,87,0.06),transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-brand-700 font-semibold text-xs uppercase tracking-[0.22em]">
          Explore more
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
          Pick your planned destination
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl text-base sm:text-lg leading-relaxed">
          Every destination below includes published tour packages—tap through to compare trips and
          prices.
        </p>

        <ul className="mt-10 flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/destinations/${d.slug}`}
                className="group block rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-card hover:shadow-soft hover:border-brand-200/50 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image
                    src={d.coverImage || FALLBACK_IMG}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    {d.location ? (
                      <p className="text-xs font-medium text-brand-200">{d.location}</p>
                    ) : null}
                    <p className="text-lg font-bold leading-tight mt-0.5">{d.name}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  {d.summary ? (
                    <p className="text-sm text-slate-600 line-clamp-2">{d.summary}</p>
                  ) : (
                    <p className="text-sm text-slate-500">View packages and highlights →</p>
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

        <p className="mt-10 text-center sm:text-left">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-600"
          >
            All destinations
            <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

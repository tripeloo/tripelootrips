import Link from "next/link";

type Props = {
  title: string;
  eyebrow?: string;
};

export function LandingSectionIntro({ title, eyebrow = "Explore" }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-2">
      {eyebrow && (
        <p className="text-brand-700 font-semibold text-xs uppercase tracking-[0.22em]">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-3 text-balance">
        {title}
      </h2>
      <p className="mt-4 text-slate-600 max-w-2xl text-base sm:text-lg leading-relaxed">
        Hand-picked tour packages from destinations you care about — swipe through ideas, then dive
        into full itineraries.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-card border border-brand-200/50 hover:bg-brand-50/90 hover:border-brand-300 transition-colors"
        >
          All destinations
          <span aria-hidden className="text-brand-600">
            →
          </span>
        </Link>
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-slate-800 transition-colors"
        >
          All tour packages
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

type Props = {
  title: string;
  eyebrow?: string;
};

export function LandingSectionIntro({ title, eyebrow = "Explore" }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-2">
      {eyebrow && (
        <p className="text-brand-700 font-semibold text-xs uppercase tracking-[0.22em]">{eyebrow}</p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2 sm:mt-3 text-balance">
        {title}
      </h2>
    </div>
  );
}

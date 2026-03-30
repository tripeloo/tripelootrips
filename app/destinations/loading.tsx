export default function DestinationsLoading() {
  return (
    <div className="min-h-[50vh] bg-landing-canvas animate-pulse px-4 pt-28 pb-16">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="h-8 w-48 rounded-lg bg-slate-200/80" />
        <div className="h-4 w-full max-w-xl rounded bg-slate-200/60" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-200/50" />
          ))}
        </div>
      </div>
    </div>
  );
}

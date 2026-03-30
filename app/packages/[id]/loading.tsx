export default function PackageDetailLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse px-4 pt-24 sm:pt-28 sm:px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="aspect-[16/10] max-h-[420px] w-full rounded-2xl bg-slate-200/80" />
        <div className="mt-10 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-9 w-3/4 max-w-md rounded-lg bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200/70" />
            <div className="h-4 w-5/6 rounded bg-slate-200/60" />
          </div>
          <div className="hidden lg:block w-[380px] h-64 rounded-2xl bg-slate-200/50 shrink-0" />
        </div>
      </div>
    </div>
  );
}

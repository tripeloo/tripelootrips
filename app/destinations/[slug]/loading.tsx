export default function DestinationDetailLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-[38vh] min-h-[220px] bg-slate-300/80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-4">
        <div className="h-7 w-64 rounded-lg bg-slate-200" />
        <div className="h-4 w-full max-w-md rounded bg-slate-200/80" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-slate-200/60" />
          ))}
        </div>
      </div>
    </div>
  );
}

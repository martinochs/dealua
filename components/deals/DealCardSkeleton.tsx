export function DealCardSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-xl border border-border/60 bg-card shadow-md animate-pulse">
      <div className="w-14 shrink-0 border-r bg-muted sm:w-16" />
      <div className="h-28 w-28 shrink-0 bg-muted sm:h-32 sm:w-32" />
      <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-4">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-5 w-4/5 rounded bg-muted" />
        <div className="h-7 w-1/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}

export function DealCardSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_4px_20px_rgba(15,23,42,0.08)] animate-pulse">
      <div className="w-[4.25rem] shrink-0 border-r bg-muted sm:w-[4.75rem]" />
      <div className="m-4 h-36 w-36 shrink-0 rounded-xl bg-muted sm:m-5 sm:h-40 sm:w-40" />
      <div className="flex flex-1 flex-col justify-center gap-3 py-5 pr-5">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-6 w-4/5 rounded bg-muted" />
        <div className="h-8 w-1/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}

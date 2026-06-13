export function DealCardSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-md border bg-card animate-pulse">
      <div className="w-11 shrink-0 border-r bg-muted sm:w-12" />
      <div className="h-20 w-20 shrink-0 bg-muted sm:h-[5.5rem] sm:w-[7rem]" />
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2">
        <div className="h-3 w-4/5 rounded bg-muted" />
        <div className="h-3.5 w-3/5 rounded bg-muted" />
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-2.5 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}

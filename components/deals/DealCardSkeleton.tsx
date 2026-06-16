export function DealCardSkeleton() {
  return (
    <>
      <div className="deal-card animate-pulse overflow-hidden rounded-2xl sm:hidden">
        <div className="flex flex-col gap-3 p-3">
          <div className="aspect-[16/10] w-full rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-6 w-1/3 rounded bg-muted" />
          </div>
          <div className="h-11 rounded-xl bg-muted" />
        </div>
      </div>
      <div className="deal-card hidden animate-pulse overflow-hidden rounded-2xl sm:flex">
        <div className="p-3 pr-0">
          <div className="h-[7.5rem] w-[7.5rem] rounded-xl bg-muted" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 p-3">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-6 w-1/3 rounded bg-muted" />
        </div>
        <div className="w-[8.5rem] border-l border-border/40 p-3">
          <div className="h-20 rounded-xl bg-muted" />
        </div>
      </div>
    </>
  );
}

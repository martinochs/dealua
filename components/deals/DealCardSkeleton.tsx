export function DealCardSkeleton() {
  return (
    <div className="deal-card animate-pulse overflow-hidden rounded-xl sm:rounded-2xl">
      <div className="flex gap-2 p-2.5 sm:gap-3 sm:p-3">
        <div className="h-[5rem] w-[5rem] shrink-0 rounded-lg bg-muted sm:h-[6.5rem] sm:w-[6.5rem]" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-2.5 w-20 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="h-5 w-2/5 rounded bg-muted" />
          <div className="h-3 w-3/5 rounded bg-muted" />
        </div>
        <div className="hidden w-20 flex-col gap-2 sm:flex">
          <div className="h-20 rounded-xl bg-muted" />
          <div className="h-9 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}

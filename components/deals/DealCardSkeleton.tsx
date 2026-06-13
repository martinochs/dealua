export function DealCardSkeleton() {
  return (
    <div className="deal-card flex overflow-hidden rounded-2xl animate-pulse">
      <div className="w-[4.5rem] shrink-0 bg-muted sm:w-20" />
      <div className="flex flex-1 gap-4 p-5 sm:gap-6 sm:p-6">
        <div className="h-40 w-40 shrink-0 rounded-2xl bg-muted sm:h-44 sm:w-44" />
        <div className="flex flex-1 flex-col justify-center gap-3">
          <div className="h-4 w-28 rounded-lg bg-muted" />
          <div className="h-6 w-4/5 rounded-lg bg-muted" />
          <div className="h-8 w-1/3 rounded-lg bg-muted" />
          <div className="h-4 w-1/2 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}

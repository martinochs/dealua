export function DealCardSkeleton() {
  return (
    <div className="deal-card flex overflow-hidden rounded-xl animate-pulse sm:rounded-2xl">
      <div className="w-[3.25rem] shrink-0 bg-muted sm:w-20" />
      <div className="flex flex-1 gap-2.5 p-3 sm:gap-6 sm:p-6">
        <div className="h-[6.5rem] w-[6.5rem] shrink-0 rounded-xl bg-muted sm:h-44 sm:w-44 sm:rounded-2xl" />
        <div className="flex flex-1 flex-col justify-center gap-2 sm:gap-3">
          <div className="h-4 w-28 rounded-lg bg-muted" />
          <div className="h-5 w-4/5 rounded-lg bg-muted sm:h-6" />
          <div className="h-7 w-1/3 rounded-lg bg-muted sm:h-8" />
          <div className="h-3 w-1/2 rounded bg-muted sm:h-4" />
        </div>
      </div>
    </div>
  );
}

export function DealCardSkeleton() {
  return (
    <div className="deal-card flex overflow-hidden rounded-xl animate-pulse">
      <div className="w-[3.25rem] shrink-0 bg-muted sm:w-[4rem]" />
      <div className="flex flex-1 gap-3 p-3 sm:gap-4 sm:p-3.5">
        <div className="h-[7.25rem] w-[7.25rem] shrink-0 rounded-lg bg-muted sm:h-36 sm:w-36" />
        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className="h-3 w-16 rounded-full bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="h-7 w-1/3 rounded bg-muted" />
          <div className="h-3 w-1/2 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

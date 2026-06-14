export function DealCardSkeleton() {
  return (
    <div className="deal-card flex overflow-hidden rounded-xl animate-pulse">
      <div className="w-[3rem] shrink-0 bg-muted sm:w-[4rem]" />
      <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
        <div className="flex gap-2 sm:gap-4">
          <div className="h-[5.75rem] w-[5.75rem] shrink-0 rounded-lg bg-muted sm:h-32 sm:w-32" />
          <div className="flex flex-1 flex-col justify-center gap-1.5">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="h-4 w-4/5 rounded bg-muted" />
            <div className="h-5 w-1/3 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
        <div className="mt-2 h-9 w-full rounded-md bg-muted" />
      </div>
    </div>
  );
}

export function DealCardSkeleton() {
  return (
    <div className="deal-card flex animate-pulse flex-col overflow-hidden rounded-lg sm:rounded-xl">
      <div className="flex flex-col p-2 sm:p-2.5">
        <div className="flex gap-2 sm:gap-2.5">
          <div className="h-[5rem] w-[5rem] shrink-0 rounded-md bg-muted sm:h-[6.25rem] sm:w-[6.25rem]" />
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex justify-between">
              <div className="h-2.5 w-16 rounded bg-muted" />
              <div className="h-5 w-12 rounded-md bg-muted" />
            </div>
            <div className="h-3.5 w-full rounded bg-muted" />
            <div className="h-3.5 w-4/5 rounded bg-muted" />
            <div className="h-5 w-2/5 rounded bg-muted" />
            <div className="h-2.5 w-3/5 rounded bg-muted" />
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <div className="h-8 w-28 rounded-md bg-muted sm:h-9" />
        </div>
      </div>
    </div>
  );
}

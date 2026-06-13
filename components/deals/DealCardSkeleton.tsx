export function DealCardSkeleton() {
  return (
    <div className="deal-card flex overflow-hidden rounded-2xl animate-pulse">
      <div className="w-[6rem] shrink-0 bg-muted sm:w-[7.5rem]" />
      <div className="flex flex-1 gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="h-40 w-40 shrink-0 rounded-xl bg-muted sm:h-44 sm:w-44" />
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="h-5 w-24 rounded-full bg-muted" />
          <div className="h-6 w-4/5 rounded-lg bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-8 w-1/3 rounded-lg bg-muted" />
          <div className="h-3 w-1/2 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

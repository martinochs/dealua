import { Skeleton } from "@/components/ui/skeleton";

export default function DealLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Skeleton className="aspect-[16/10] rounded-lg sm:aspect-[4/3]" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

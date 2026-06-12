import Link from "next/link";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

interface LoadMoreProps {
  hasMore: boolean;
  nextPage: number;
  basePath: string;
  params: { sort?: string; q?: string };
}

export function LoadMore({ hasMore, nextPage, basePath, params }: LoadMoreProps) {
  if (!hasMore) return null;

  const sp = new URLSearchParams();
  if (params.sort) sp.set("sort", params.sort);
  if (params.q) sp.set("q", params.q);
  sp.set("page", String(nextPage));

  return (
    <div className="flex justify-center pt-4">
      <Button asChild variant="outline" size="lg" className="min-w-[200px]">
        <Link href={`${basePath}?${sp.toString()}`}>{t("feed.loadMore")}</Link>
      </Button>
    </div>
  );
}

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";
import type { SortMode } from "@/types/database";

interface FeedToolbarProps {
  total: number;
  sort: SortMode;
  categoryName?: string;
}

const sortLabels: Record<SortMode, string> = {
  hot: t("feed.hot"),
  new: t("feed.new"),
  top: t("feed.trending"),
  commented: t("feed.commented"),
};

export function FeedToolbar({ total, sort, categoryName }: FeedToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <p className="min-w-0 truncate text-xs text-muted-foreground sm:text-sm">
        <span className="font-semibold text-foreground">
          {categoryName ? categoryName : t("feed.allDeals")}
        </span>
        {" · "}
        {total} {t("feed.dealsCount")} · {sortLabels[sort]}
      </p>
      <Button asChild size="sm" className="hidden h-7 shrink-0 px-2 text-xs sm:inline-flex">
        <Link href="/submit">
          <Plus className="h-4 w-4" />
          {t("nav.submit")}
        </Link>
      </Button>
    </div>
  );
}

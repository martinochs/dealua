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
    <div className="py-2">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {categoryName ? categoryName : t("feed.allDeals")}
        </span>
        {" · "}
        {total} {t("feed.dealsCount")} · {sortLabels[sort]}
      </p>
    </div>
  );
}

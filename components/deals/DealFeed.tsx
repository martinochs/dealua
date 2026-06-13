import { DealCard } from "./DealCard";
import { t } from "@/lib/i18n/uk";
import type { DealWithRelations } from "@/types/database";

interface DealFeedProps {
  deals: DealWithRelations[];
  layout?: "grid" | "feed";
  commentCounts?: Record<string, number>;
}

export function DealFeed({ deals, layout = "grid", commentCounts = {} }: DealFeedProps) {
  if (deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg">{t("feed.empty")}</p>
      </div>
    );
  }

  if (layout === "feed") {
    return (
      <div className="space-y-2 sm:space-y-2.5">
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            layout="feed"
            commentCount={commentCounts[deal.id] ?? 0}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}

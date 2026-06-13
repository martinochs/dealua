import { DealFeedCard } from "./DealFeedCard";
import { t } from "@/lib/i18n/uk";
import type { DealWithRelations } from "@/types/database";

interface DealFeedProps {
  deals: DealWithRelations[];
  commentCounts?: Record<string, number>;
  userVotes?: Record<string, "hot" | "cold" | null>;
  isLoggedIn?: boolean;
}

export function DealFeed({
  deals,
  commentCounts = {},
  userVotes = {},
  isLoggedIn = false,
}: DealFeedProps) {
  if (deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p className="text-sm">{t("feed.empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {deals.map((deal, index) => (
        <DealFeedCard
          key={deal.id}
          deal={deal}
          commentCount={commentCounts[deal.id] ?? 0}
          userVote={userVotes[deal.id] ?? null}
          isLoggedIn={isLoggedIn}
          rank={index}
        />
      ))}
    </div>
  );
}

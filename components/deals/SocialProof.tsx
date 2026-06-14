import { getDealViewCount } from "@/lib/deal-feed";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

interface SocialProofProps {
  deal: DealWithRelations;
  score: number;
  featured?: boolean;
  className?: string;
}

export function SocialProof({ deal, score, featured = false, className }: SocialProofProps) {
  const views = getDealViewCount(deal);

  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 font-semibold text-orange-700/90",
        featured ? "text-sm" : "text-[11px] sm:text-xs",
        className
      )}
    >
      {score > 0 && (
        <span>
          🔥 {score} {t("deals.usersLiked")}
        </span>
      )}
      <span>
        👀 +{views} {t("deals.usersViewed")}
      </span>
    </div>
  );
}

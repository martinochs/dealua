import { getDealViewCount } from "@/lib/deal-feed";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

interface SocialProofProps {
  deal: DealWithRelations;
  score: number;
  className?: string;
}

export function SocialProof({ deal, score, className }: SocialProofProps) {
  const views = getDealViewCount(deal);

  if (score <= 0 && views <= 0) return null;

  return (
    <p
      className={cn(
        "line-clamp-2 text-[10px] font-medium leading-snug text-primary/70 sm:line-clamp-1 sm:text-[11px]",
        className
      )}
    >
      {score > 0 && (
        <>
          <span>
            {score} {t("deals.usersRecommend")}
          </span>
          <span className="mx-1 text-muted-foreground/30">·</span>
        </>
      )}
      <span>
        +{views} {t("deals.usersViewed")}
      </span>
    </p>
  );
}

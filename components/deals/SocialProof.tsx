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

  return (
    <p
      className={cn(
        "line-clamp-2 text-[10px] font-medium leading-snug text-orange-700/80 sm:line-clamp-1 sm:text-[11px]",
        className
      )}
    >
      {score > 0 && (
        <>
          <span>🔥 {score} {t("deals.usersLiked")}</span>
          <span className="mx-1.5 text-muted-foreground/40">·</span>
        </>
      )}
      <span>👀 +{views} {t("deals.usersViewed")}</span>
    </p>
  );
}

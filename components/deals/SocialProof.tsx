import { getDealViewCount } from "@/lib/deal-feed";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

interface SocialProofProps {
  deal: DealWithRelations;
  className?: string;
}

export function SocialProof({ deal, className }: SocialProofProps) {
  const views = getDealViewCount(deal);

  return (
    <p
      className={cn(
        "text-[10px] leading-snug text-muted-foreground/55 sm:text-[11px]",
        className
      )}
    >
      +{views} {t("deals.usersViewed")}
    </p>
  );
}

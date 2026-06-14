import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface PopularityIndicatorProps {
  score: number;
  className?: string;
}

export function PopularityIndicator({ score, className }: PopularityIndicatorProps) {
  if (score <= 0) return null;

  return (
    <p
      className={cn(
        "text-[10px] font-medium leading-snug text-orange-700/85 sm:text-[11px]",
        className
      )}
    >
      <span aria-hidden>🔥</span>{" "}
      <span>
        {score} {t("deals.usersRecommendDeal")}
      </span>
    </p>
  );
}

import { formatUAH } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface SavingsBadgeProps {
  amount: number;
  featured?: boolean;
  className?: string;
}

export function SavingsBadge({ amount, featured = false, className }: SavingsBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded bg-emerald-50 font-semibold text-emerald-700 ring-1 ring-emerald-200/70",
        featured ? "px-1.5 py-px text-[10px] sm:text-[11px]" : "px-1 py-px text-[9px] sm:text-[10px]",
        className
      )}
    >
      {t("deals.save")} {formatUAH(amount)}
    </span>
  );
}

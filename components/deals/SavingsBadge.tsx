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
        "inline-flex shrink-0 items-center rounded-md bg-emerald-600 font-bold text-white",
        featured ? "px-2 py-0.5 text-[10px] sm:text-[11px]" : "px-1.5 py-0.5 text-[9px] sm:text-[10px]",
        className
      )}
    >
      {t("deals.save")} {formatUAH(amount)}
    </span>
  );
}

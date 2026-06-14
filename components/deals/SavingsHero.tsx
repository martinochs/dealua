import { formatUAH } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface SavingsHeroProps {
  amount: number;
  featured?: boolean;
  className?: string;
}

export function SavingsHero({ amount, featured = false, className }: SavingsHeroProps) {
  return (
    <div
      className={cn(
        "savings-hero rounded-lg bg-emerald-600 text-center font-black uppercase tracking-wide text-white shadow-md",
        featured ? "px-4 py-2.5 text-sm sm:py-3 sm:text-base" : "px-3 py-2 text-xs sm:text-sm",
        className
      )}
    >
      💰 {t("deals.youSave")} {formatUAH(amount)}!
    </div>
  );
}

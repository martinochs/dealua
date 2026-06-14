import { formatUAH, getSavingsPercent } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { SavingsHero } from "./SavingsHero";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  originalPrice?: number | null;
  size?: "sm" | "lg";
  showSavingsHero?: boolean;
}

export function PriceTag({ price, originalPrice, size = "sm", showSavingsHero = true }: PriceTagProps) {
  const savings = getSavingsPercent(price, originalPrice ?? null);
  const savingsAmount =
    originalPrice && originalPrice > price ? originalPrice - price : null;

  return (
    <div className="flex flex-col gap-3">
      {showSavingsHero && savingsAmount !== null && (
        <SavingsHero amount={savingsAmount} featured />
      )}

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t("deals.priceLabel")}
        </span>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className={cn(
              "font-black text-price leading-none",
              size === "lg" ? "text-3xl sm:text-4xl" : "text-lg"
            )}
          >
            {formatUAH(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-muted-foreground line-through text-base sm:text-lg">
              {formatUAH(originalPrice)}
            </span>
          )}
          {savings !== null && savings > 0 && (
            <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-sm font-extrabold text-white">
              −{savings}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

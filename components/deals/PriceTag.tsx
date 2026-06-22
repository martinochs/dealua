import { formatUAH } from "@/lib/utils";
import { SavingsBadge } from "./SavingsBadge";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  originalPrice?: number | null;
  size?: "sm" | "lg";
}

export function PriceTag({ price, originalPrice, size = "sm" }: PriceTagProps) {
  const savingsAmount =
    originalPrice && originalPrice > price ? originalPrice - price : null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className={cn(
            "font-black leading-none text-price",
            size === "lg" ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          {formatUAH(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-sm text-muted-foreground/60 line-through sm:text-base">
            {formatUAH(originalPrice)}
          </span>
        )}
        {savingsAmount !== null && <SavingsBadge amount={savingsAmount} featured={size === "lg"} />}
      </div>
    </div>
  );
}

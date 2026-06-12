import { formatUAH, getSavingsPercent } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { Badge } from "@/components/ui/badge";

interface PriceTagProps {
  price: number;
  originalPrice?: number | null;
  size?: "sm" | "lg";
}

export function PriceTag({ price, originalPrice, size = "sm" }: PriceTagProps) {
  const savings = getSavingsPercent(price, originalPrice ?? null);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={size === "lg" ? "text-3xl font-bold text-primary" : "text-lg font-bold text-primary"}>
          {formatUAH(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-muted-foreground line-through text-sm">
            {formatUAH(originalPrice)}
          </span>
        )}
        {savings && <Badge variant="hot">-{savings}% {t("deals.savings")}</Badge>}
      </div>
    </div>
  );
}

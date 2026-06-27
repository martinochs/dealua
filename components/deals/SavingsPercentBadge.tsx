import { cn } from "@/lib/utils";
import { getSavingsPercentBadgeClass } from "@/lib/savings-percent-tier";

interface SavingsPercentBadgeProps {
  percent: number | null;
  featured?: boolean;
  variant?: "inline" | "overlay";
  size?: "sm" | "md" | "lg";
  className?: string;
  minPercent?: number;
}

export function SavingsPercentBadge({
  percent,
  featured = false,
  variant = "inline",
  size,
  className,
  minPercent = 5,
}: SavingsPercentBadgeProps) {
  if (percent === null || percent < minPercent) return null;

  const resolvedSize = size ?? (featured ? "lg" : "md");
  const colorClass = getSavingsPercentBadgeClass(percent);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center font-black",
        colorClass,
        variant === "overlay"
          ? "absolute left-0 top-0 z-10 rounded-br-xl shadow-sm"
          : "rounded-lg",
        resolvedSize === "sm" && "rounded px-1.5 py-0 text-xs",
        resolvedSize === "md" &&
          (variant === "overlay"
            ? "px-3 py-1.5 text-sm sm:text-base"
            : "px-2.5 py-1 text-xl sm:text-2xl"),
        resolvedSize === "lg" &&
          (variant === "overlay"
            ? "px-3.5 py-2 text-base sm:text-lg"
            : "px-3 py-1.5 text-2xl sm:text-[1.75rem]"),
        className
      )}
    >
      −{percent}%
    </span>
  );
}

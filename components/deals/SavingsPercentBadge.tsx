import { cn } from "@/lib/utils";

interface SavingsPercentBadgeProps {
  percent: number | null;
  featured?: boolean;
  variant?: "inline" | "overlay";
  className?: string;
  minPercent?: number;
}

export function SavingsPercentBadge({
  percent,
  featured = false,
  variant = "inline",
  className,
  minPercent = 5,
}: SavingsPercentBadgeProps) {
  if (percent === null || percent < minPercent) return null;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center font-black text-white",
        variant === "overlay"
          ? "absolute left-0 top-0 z-10 rounded-br-xl bg-emerald-600 shadow-sm"
          : "rounded-lg bg-emerald-600",
        featured
          ? variant === "overlay"
            ? "px-3.5 py-2 text-base sm:text-lg"
            : "px-3 py-1.5 text-2xl sm:text-[1.75rem]"
          : variant === "overlay"
            ? "px-3 py-1.5 text-sm sm:text-base"
            : "px-2.5 py-1 text-xl sm:text-2xl",
        className
      )}
    >
      −{percent}%
    </span>
  );
}

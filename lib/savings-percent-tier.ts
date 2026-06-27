/**
 * Savings % badge color tiers (highest matching threshold wins).
 * - Green  0–14%  → normal
 * - Yellow 15–39% → guter Deal
 * - Red    40%+   → starker Deal
 */
export const SAVINGS_PERCENT_COLOR_TIERS = [
  { minPercent: 40, className: "bg-red-600 text-white" },
  { minPercent: 15, className: "bg-uk-yellow text-uk-yellow-foreground" },
  { minPercent: 0, className: "bg-emerald-600 text-white" },
] as const;

export function getSavingsPercentBadgeClass(percent: number): string {
  const tier = SAVINGS_PERCENT_COLOR_TIERS.find((entry) => percent >= entry.minPercent);
  return tier?.className ?? "bg-emerald-600 text-white";
}

/**
 * Savings % badge color tiers (highest matching threshold wins).
 * - Green  0–14%  → normal
 * - Yellow 15–39% → guter Deal
 * - Red    40%+   → starker Deal
 *
 * Uses globals.css classes so colors are never stripped by Tailwind purge.
 */
export const SAVINGS_PERCENT_COLOR_TIERS = [
  { minPercent: 40, className: "savings-badge-strong" },
  { minPercent: 15, className: "savings-badge-good" },
  { minPercent: 0, className: "savings-badge-normal" },
] as const;

export function getSavingsPercentBadgeClass(percent: number): string {
  const tier = SAVINGS_PERCENT_COLOR_TIERS.find((entry) => percent >= entry.minPercent);
  return tier?.className ?? "savings-badge-normal";
}

import { getSavingsPercent, getVoteScore } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

export type DealFeedBadge = "new" | "hot" | "mega";

export type ScoreHeat = "red" | "orange" | "amber" | "green";

export function getDealFeedBadges(deal: DealWithRelations): DealFeedBadge[] {
  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const savings = getSavingsPercent(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  const ageMs = Date.now() - new Date(deal.created_at).getTime();
  const badges: DealFeedBadge[] = [];

  if (ageMs < 2 * 60 * 60 * 1000) badges.push("new");
  if (score >= 30) badges.push("hot");
  if (savings !== null && savings >= 30) badges.push("mega");

  return badges;
}

export function getSavingsAmount(
  price: number,
  original: number | null | undefined
): number | null {
  if (!original || original <= price) return null;
  return original - price;
}

/** Score heat: red (cold) → orange → amber → green (hot) */
export function getTemperatureLevel(score: number): ScoreHeat {
  if (score < 0) return "red";
  if (score < 15) return "orange";
  if (score < 35) return "amber";
  return "green";
}

export function getScoreHeatStyles(heat: ScoreHeat) {
  return {
    red: {
      box: "bg-red-50 border-red-200",
      score: "text-red-600",
      icon: "text-red-500",
    },
    orange: {
      box: "bg-orange-50 border-orange-200",
      score: "text-orange-600",
      icon: "text-orange-500",
    },
    amber: {
      box: "bg-amber-50 border-amber-200",
      score: "text-amber-700",
      icon: "text-amber-600",
    },
    green: {
      box: "bg-emerald-50 border-emerald-200",
      score: "text-emerald-700",
      icon: "text-emerald-600",
    },
  }[heat];
}

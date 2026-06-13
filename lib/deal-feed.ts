import { getSavingsPercent, getVoteScore } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

export type DealFeedBadge = "new" | "hot" | "mega";

export type ScoreHeat = "cold" | "low" | "medium" | "high";

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

/** low = grey/red, medium = orange, high = strong orange/red */
export function getTemperatureLevel(score: number): ScoreHeat {
  if (score < 0) return "cold";
  if (score < 15) return "low";
  if (score < 35) return "medium";
  return "high";
}

export function getScoreHeatStyles(heat: ScoreHeat) {
  return {
    cold: {
      box: "bg-red-50 border-red-200",
      score: "text-red-700",
      icon: "text-red-500",
    },
    low: {
      box: "bg-slate-100 border-slate-200",
      score: "text-slate-600",
      icon: "text-slate-500",
    },
    medium: {
      box: "bg-orange-100 border-orange-300",
      score: "text-orange-700",
      icon: "text-orange-600",
    },
    high: {
      box: "bg-gradient-to-b from-orange-200 to-red-100 border-orange-400",
      score: "text-red-700",
      icon: "text-orange-600",
    },
  }[heat];
}

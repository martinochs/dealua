import { getSavingsPercent, getVoteScore } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

export type DealFeedBadge = "new" | "hot" | "mega";

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

export function getTemperatureLevel(score: number): "fire" | "warm" | "neutral" | "cold" {
  if (score >= 40) return "fire";
  if (score >= 15) return "warm";
  if (score >= 0) return "neutral";
  return "cold";
}

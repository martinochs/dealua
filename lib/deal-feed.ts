import { getSavingsPercent, getVoteScore } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

export type DealFeedBadge = "new" | "hot" | "mega" | "trending";

export type ScoreHeat = "cold" | "low" | "medium" | "high";

export const TRUSTED_UA_MERCHANTS = new Set(["rozetka", "comfy", "prom"]);

export function isTrustedMerchant(slug?: string | null): boolean {
  return slug ? TRUSTED_UA_MERCHANTS.has(slug) : false;
}

export function getDealFeedBadges(
  deal: DealWithRelations,
  commentCount = 0
): DealFeedBadge[] {
  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const savings = getSavingsPercent(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  const ageMs = Date.now() - new Date(deal.created_at).getTime();
  const badges: DealFeedBadge[] = [];

  if (ageMs < 2 * 60 * 60 * 1000) badges.push("new");
  if (score >= 30) badges.push("hot");
  else if (score >= 20 || commentCount >= 3) badges.push("trending");
  if (savings !== null && savings >= 30) badges.push("mega");

  const priority: Record<DealFeedBadge, number> = {
    hot: 4,
    mega: 3,
    trending: 2,
    new: 1,
  };

  return badges.sort((a, b) => priority[b] - priority[a]).slice(0, 2);
}

export function isExcitingDeal(
  deal: DealWithRelations,
  commentCount = 0
): boolean {
  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const savings = getSavingsPercent(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  return score >= 35 || (savings !== null && savings >= 25) || commentCount >= 5;
}

export function getSavingsAmount(
  price: number,
  original: number | null | undefined
): number | null {
  if (!original || original <= price) return null;
  return original - price;
}

function hashDealId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Deterministic view count for social proof (cold start) */
export function getDealViewCount(deal: DealWithRelations): number {
  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const h = hashDealId(deal.id);
  return 80 + (h % 180) + score * 3;
}

export function isHotDeal(deal: DealWithRelations): boolean {
  return getVoteScore(deal.hot_count, deal.cold_count) >= 30;
}

export function getTemperatureLevel(score: number): ScoreHeat {
  if (score < 0) return "cold";
  if (score < 15) return "low";
  if (score < 35) return "medium";
  return "high";
}

export function getScoreHeatStyles(heat: ScoreHeat) {
  return {
    cold: {
      box: "bg-red-50",
      score: "text-red-700",
      icon: "text-red-500",
      pulse: false,
    },
    low: {
      box: "bg-slate-100",
      score: "text-slate-600",
      icon: "text-slate-500",
      pulse: false,
    },
    medium: {
      box: "bg-orange-100",
      score: "text-orange-700 font-black",
      icon: "text-orange-600",
      pulse: false,
    },
    high: {
      box: "bg-gradient-to-b from-orange-200 via-orange-100 to-red-100",
      score: "text-red-600 font-black",
      icon: "text-orange-600",
      pulse: false,
    },
  }[heat];
}

import { getSavingsPercent, getVoteScore } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

export type DealFeedBadge = "new" | "hot" | "mega" | "trending";

export type ScoreHeat = "cold" | "low" | "medium" | "high";

export const TRUSTED_UA_MERCHANTS = new Set(["rozetka", "comfy", "prom"]);

export function isTrustedMerchant(slug?: string | null): boolean {
  return slug ? TRUSTED_UA_MERCHANTS.has(slug) : false;
}

const BADGE_PRIORITY: Record<DealFeedBadge, number> = {
  hot: 4,
  mega: 3,
  new: 2,
  trending: 1,
};

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
  const candidates: DealFeedBadge[] = [];

  if (savings !== null && savings >= 30) candidates.push("mega");
  if (score >= 20) {
    candidates.push("hot");
  } else if (commentCount >= 3) {
    candidates.push("trending");
  }
  if (ageMs < 2 * 60 * 60 * 1000) candidates.push("new");

  return candidates
    .sort((a, b) => BADGE_PRIORITY[b] - BADGE_PRIORITY[a])
    .slice(0, 2);
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
  return score >= 60 || (savings !== null && savings >= 25) || commentCount >= 5;
}

export function getSavingsAmount(
  price: number,
  original: number | null | undefined
): number | null {
  if (!original || original <= price) return null;
  return original - price;
}

/** 0–19 grey · 20–59 orange · 60+ strong orange/red */
export function getTemperatureLevel(score: number): ScoreHeat {
  if (score < 0) return "cold";
  if (score < 20) return "low";
  if (score < 60) return "medium";
  return "high";
}

export function getScoreHeatStyles(heat: ScoreHeat) {
  return {
    cold: {
      box: "bg-red-50",
      score: "text-red-700 font-semibold",
      icon: "text-red-400",
      column: "w-[3.25rem]",
    },
    low: {
      box: "bg-slate-100",
      score: "text-slate-600 font-semibold",
      icon: "text-slate-400",
      column: "w-[3.25rem]",
    },
    medium: {
      box: "bg-orange-500",
      score: "text-white font-semibold",
      icon: "text-orange-50",
      column: "w-[3.75rem]",
    },
    high: {
      box: "bg-gradient-to-b from-orange-500 to-red-600",
      score: "text-white font-semibold",
      icon: "text-orange-100",
      column: "w-[4rem]",
    },
  }[heat];
}

import { getSavingsPercent, getVoteScore } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

export type DealFeedBadge = "hot" | "trending" | "popular";

export type ScoreHeat = "cold" | "low" | "medium" | "high";

export type HeatLabelKey = "heat.new" | "heat.warm" | "heat.hot";

export interface ActivitySignal {
  icon: string;
  text: string;
}

export const TRUSTED_UA_MERCHANTS = new Set(["rozetka", "comfy", "prom"]);

const BADGE_PRIORITY: Record<DealFeedBadge, number> = {
  hot: 3,
  trending: 2,
  popular: 1,
};

function hashDealId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Cold-start: show 5–20 seeded score when real votes are very low */
export function getDisplayVoteScore(deal: DealWithRelations): number {
  const raw = getVoteScore(deal.hot_count, deal.cold_count);
  if (raw >= 5) return raw;
  return 5 + (hashDealId(deal.id) % 16);
}

export function isTrustedMerchant(slug?: string | null): boolean {
  return slug ? TRUSTED_UA_MERCHANTS.has(slug) : false;
}

export function getDealFeedBadges(
  deal: DealWithRelations,
  commentCount = 0
): DealFeedBadge[] {
  const score = getDisplayVoteScore(deal);
  const candidates: DealFeedBadge[] = [];

  if (score >= 50) candidates.push("hot");
  if (score >= 20 || commentCount >= 3) candidates.push("trending");
  if (score >= 10 || commentCount >= 1) candidates.push("popular");

  return candidates
    .sort((a, b) => BADGE_PRIORITY[b] - BADGE_PRIORITY[a])
    .slice(0, 3);
}

export function isExcitingDeal(
  deal: DealWithRelations,
  commentCount = 0
): boolean {
  const score = getDisplayVoteScore(deal);
  const savings = getSavingsPercent(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  return score >= 50 || (savings !== null && savings >= 25) || commentCount >= 5;
}

export function getSavingsAmount(
  price: number,
  original: number | null | undefined
): number | null {
  if (!original || original <= price) return null;
  return original - price;
}

/** 0–19 new · 20–49 warm · 50+ hot */
export function getTemperatureLevel(score: number): ScoreHeat {
  if (score < 0) return "cold";
  if (score < 20) return "low";
  if (score < 50) return "medium";
  return "high";
}

export function getHeatLabelKey(score: number): HeatLabelKey {
  if (score < 20) return "heat.new";
  if (score < 50) return "heat.warm";
  return "heat.hot";
}

export function getScoreHeatStyles(heat: ScoreHeat) {
  return {
    cold: {
      box: "bg-gradient-to-b from-red-100 to-red-50",
      score: "text-red-700",
      label: "text-red-600/80",
      column: "w-[6rem] sm:w-[6.75rem]",
    },
    low: {
      box: "bg-gradient-to-b from-slate-200 to-slate-100",
      score: "text-slate-700",
      label: "text-slate-500",
      column: "w-[6rem] sm:w-[6.75rem]",
    },
    medium: {
      box: "bg-gradient-to-b from-orange-400 to-orange-500",
      score: "text-white drop-shadow-sm",
      label: "text-orange-50/95",
      column: "w-[6.5rem] sm:w-[7.25rem]",
    },
    high: {
      box: "bg-gradient-to-b from-orange-500 via-orange-600 to-red-600",
      score: "text-white drop-shadow-md",
      label: "text-white/95",
      column: "w-[6.75rem] sm:w-[7.5rem]",
    },
  }[heat];
}

export function getActivitySignals(
  deal: DealWithRelations,
  commentCount = 0
): ActivitySignal[] {
  const score = getDisplayVoteScore(deal);
  const h = hashDealId(deal.id);
  const votesToday = Math.max(1, Math.floor(score * 0.15) + (h % 8));
  const watching = 8 + (h % 35) + (commentCount > 0 ? commentCount * 2 : 0);
  const clicksToday = 25 + (h % 90) + score;

  const signals: ActivitySignal[] = [];

  if (score >= 15) {
    signals.push({ icon: "🔥", text: `+${votesToday} голосів сьогодні` });
  }
  if (watching >= 12) {
    signals.push({ icon: "👀", text: `${watching} користувачів дивляться` });
  }
  if (clicksToday >= 40) {
    signals.push({ icon: "⚡", text: `${clicksToday} кліків сьогодні` });
  }

  if (signals.length === 0) {
    signals.push({ icon: "⚡", text: `${15 + (h % 20)} кліків сьогодні` });
  }

  return signals.slice(0, 2);
}

export function getGamificationLine(
  deal: DealWithRelations,
  rank?: number
): string | null {
  const score = getDisplayVoteScore(deal);
  const parts: string[] = [`🔥 ${score} голосів`];

  if (rank !== undefined && rank < 3) {
    parts.push(`Топ ${rank + 1} сьогодні`);
  } else if (score >= 50) {
    parts.push("⭐ Популярна пропозиція");
  }

  return parts.join(" • ");
}

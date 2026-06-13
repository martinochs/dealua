"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import {
  getActivitySignals,
  getDealFeedBadges,
  getGamificationLine,
  getSavingsAmount,
  isExcitingDeal,
  isTrustedMerchant,
} from "@/lib/deal-feed";
import { formatUAH, formatRelativeTime, getSavingsPercent } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";
import type { DealFeedBadge } from "@/lib/deal-feed";

interface DealFeedCardProps {
  deal: DealWithRelations;
  commentCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  rank?: number;
}

function MerchantBadge({ name, slug }: { name: string; slug?: string | null }) {
  const trusted = isTrustedMerchant(slug);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        trusted ? "bg-primary/8 text-primary/80" : "bg-secondary text-muted-foreground"
      )}
    >
      {trusted && <Star className="h-3 w-3 fill-uk-yellow text-uk-yellow" aria-hidden />}
      {name}
    </span>
  );
}

const badgeStyles: Record<DealFeedBadge, string> = {
  hot: "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-500/25",
  trending: "bg-uk-yellow text-uk-yellow-foreground shadow-sm shadow-uk-yellow/30",
  popular: "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
};

function DealBadge({ type }: { type: DealFeedBadge }) {
  const labels: Record<DealFeedBadge, string> = {
    hot: `🔥 ${t("badges.hot")}`,
    trending: `⚡ ${t("badges.trending")}`,
    popular: `⭐ ${t("badges.popular")}`,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide",
        badgeStyles[type],
        type === "hot" && "text-sm px-3.5 py-1.5"
      )}
    >
      {labels[type]}
    </span>
  );
}

export function DealFeedCard({
  deal,
  commentCount,
  userVote,
  isLoggedIn,
  rank,
}: DealFeedCardProps) {
  const savings = getSavingsPercent(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  const savingsAmount = getSavingsAmount(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  const badges = getDealFeedBadges(deal, commentCount);
  const exciting = isExcitingDeal(deal, commentCount);
  const activity = getActivitySignals(deal, commentCount);
  const gamification = getGamificationLine(deal, rank);

  return (
    <article
      className={cn(
        "deal-card group flex overflow-hidden rounded-2xl transition-all duration-300 ease-out",
        exciting && "shadow-[0_4px_20px_rgba(234,88,12,0.12)]"
      )}
    >
      <VoteButtons
        dealId={deal.id}
        deal={deal}
        hotCount={deal.hot_count}
        coldCount={deal.cold_count}
        userVote={userVote}
        isLoggedIn={isLoggedIn}
        compact
      />

      <Link
        href={`/deal/${deal.id}`}
        className="flex min-w-0 flex-1 gap-4 p-4 transition-opacity hover:opacity-[0.98] sm:gap-5 sm:p-5"
      >
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-44 sm:w-44">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              sizes="176px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">🛍️</div>
          )}
          {savings !== null && savings >= 10 && (
            <span className="absolute left-0 top-0 rounded-br-xl bg-emerald-600 px-2.5 py-1 text-xs font-extrabold text-white shadow-md sm:text-sm">
              −{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {badges.map((b) => (
              <DealBadge key={b} type={b} />
            ))}
            {deal.merchant && badges.length < 3 && (
              <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} />
            )}
          </div>

          <h2 className="line-clamp-2 text-[1.35rem] font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-[1.45rem]">
            {deal.title}
          </h2>

          {activity.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs font-semibold text-orange-700/90">
              {activity.map((signal) => (
                <span key={signal.text} className="inline-flex items-center gap-1">
                  <span aria-hidden>{signal.icon}</span>
                  {signal.text}
                </span>
              ))}
            </div>
          )}

          <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
            <span className="text-[2rem] font-black leading-none text-price sm:text-[2.125rem]">
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-sm text-muted-foreground/55 line-through decoration-2">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="rounded-lg bg-emerald-600 px-3 py-1 text-sm font-extrabold text-white shadow-sm sm:text-base">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          {gamification && (
            <p className="text-xs font-bold text-orange-600/90">{gamification}</p>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 pt-0.5 text-xs text-muted-foreground/50">
            {deal.category && (
              <span>{deal.category.icon} {deal.category.name_uk}</span>
            )}
            <span className="inline-flex items-center gap-1 font-medium">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto">{formatRelativeTime(deal.created_at)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <div className="deal-card space-y-2 rounded-2xl px-4 py-3 text-center">
      <p className="text-sm text-muted-foreground">
        {t("feed.submitPrompt")}{" "}
        <Link href="/submit" className="font-semibold text-primary hover:underline">
          {t("nav.submitCta")} →
        </Link>
      </p>
      <p className="text-xs font-semibold text-primary/80">{t("referral.invite")}</p>
    </div>
  );
}

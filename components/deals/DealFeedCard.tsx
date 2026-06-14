"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { Badge } from "@/components/ui/badge";
import {
  getDealFeedBadges,
  getSavingsAmount,
  isExcitingDeal,
  isTrustedMerchant,
} from "@/lib/deal-feed";
import { formatUAH, formatRelativeTime, getSavingsPercent, getVoteScore } from "@/lib/utils";
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
        "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:rounded-lg sm:px-3 sm:py-1 sm:text-xs",
        trusted ? "bg-primary/10 text-primary" : "bg-secondary text-foreground/75"
      )}
    >
      {trusted && <Star className="h-3 w-3 fill-uk-yellow text-uk-yellow" aria-hidden />}
      {name}
    </span>
  );
}

const badgeLabels: Record<DealFeedBadge, "badges.hot" | "badges.new" | "badges.mega" | "badges.trending"> = {
  new: "badges.new",
  hot: "badges.hot",
  mega: "badges.mega",
  trending: "badges.trending",
};

function DealBadge({ type }: { type: DealFeedBadge }) {
  if (type === "hot") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-gradient-to-r from-orange-600 to-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow-sm sm:gap-1.5 sm:rounded-lg sm:px-3 sm:py-1 sm:text-xs">
        🔥 {t(badgeLabels.hot)}
      </span>
    );
  }

  if (type === "trending") {
    return (
      <Badge variant="accent" className="shrink-0 border-0 px-2 py-0.5 text-[10px] font-bold uppercase sm:px-3 sm:py-1 sm:text-xs">
        📈 {t(badgeLabels.trending)}
      </Badge>
    );
  }

  return (
    <Badge
      variant={type === "mega" ? "green" : "accent"}
      className={cn(
        "shrink-0 border-0 px-2 py-0.5 text-[10px] font-bold uppercase sm:px-3 sm:py-1 sm:text-xs",
        type === "mega" && "sm:text-sm"
      )}
    >
      {type === "mega" ? `💛 ${t(badgeLabels.mega)}` : t(badgeLabels.new)}
    </Badge>
  );
}

export function DealFeedCard({
  deal,
  commentCount,
  userVote,
  isLoggedIn,
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
  const score = getVoteScore(deal.hot_count, deal.cold_count);

  return (
    <article
      className={cn(
        "deal-card group flex overflow-hidden rounded-xl transition-all duration-300 ease-out sm:rounded-2xl",
        exciting && "hover:shadow-[0_20px_48px_rgba(249,115,22,0.1)]"
      )}
    >
      <VoteButtons
        dealId={deal.id}
        hotCount={deal.hot_count}
        coldCount={deal.cold_count}
        userVote={userVote}
        isLoggedIn={isLoggedIn}
        compact
      />

      <Link
        href={`/deal/${deal.id}`}
        className="flex min-w-0 flex-1 gap-2.5 p-3 transition-opacity active:opacity-90 sm:gap-6 sm:p-6"
      >
        <div className="relative h-[6.5rem] w-[6.5rem] shrink-0 overflow-hidden rounded-xl bg-muted sm:h-44 sm:w-44 sm:rounded-2xl">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 104px, 176px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl sm:text-4xl">🛍️</div>
          )}
          {savings !== null && savings >= 10 && (
            <span className="absolute left-0 top-0 rounded-br-lg bg-emerald-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white shadow-md sm:rounded-br-xl sm:px-3 sm:py-1 sm:text-sm">
              −{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 sm:gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none sm:flex-wrap sm:gap-2 sm:overflow-visible">
            {deal.merchant && <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} />}
            {badges.map((b) => (
              <DealBadge key={b} type={b} />
            ))}
          </div>

          <h2 className="line-clamp-2 text-[15px] font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {deal.title}
          </h2>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:mt-2 sm:gap-x-3 sm:gap-y-2">
            <span
              className={cn(
                "font-black leading-none text-price",
                exciting ? "text-2xl sm:text-[2.125rem]" : "text-xl sm:text-[1.875rem]"
              )}
            >
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-xs text-muted-foreground/60 line-through decoration-2 sm:text-lg">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-extrabold text-white shadow-sm sm:rounded-lg sm:px-3.5 sm:py-1.5 sm:text-base">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 pt-0.5 text-[11px] text-muted-foreground/55 sm:gap-x-4 sm:pt-2 sm:text-sm sm:text-foreground/65">
            {deal.category && (
              <span className="truncate">
                {deal.category.icon} {deal.category.name_uk}
              </span>
            )}
            {score >= 20 && (
              <span className="hidden font-bold text-orange-600 sm:inline">
                🔥 {score} {t("deals.votes")}
              </span>
            )}
            <span className="inline-flex items-center gap-1 font-medium sm:gap-2 sm:text-base sm:font-bold sm:text-foreground">
              <MessageCircle className="h-3.5 w-3.5 text-primary sm:h-5 sm:w-5" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto shrink-0">{formatRelativeTime(deal.created_at)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <p className="deal-card rounded-xl px-4 py-3 text-center text-sm text-muted-foreground sm:rounded-2xl sm:px-5 sm:py-4">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

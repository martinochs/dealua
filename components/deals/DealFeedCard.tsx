"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { Badge } from "@/components/ui/badge";
import {
  getDealFeedBadges,
  getSavingsAmount,
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

function HotDealBanner() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 px-4 py-2 sm:py-2.5">
      <span className="animate-hot-pulse inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white sm:text-base">
        🔥 {t("badges.hotDeal")}
      </span>
    </div>
  );
}

function MerchantBadge({ name, slug, muted }: { name: string; slug?: string | null; muted?: boolean }) {
  const trusted = isTrustedMerchant(slug);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:rounded-lg sm:px-3 sm:py-1 sm:text-xs",
        muted
          ? "bg-secondary text-muted-foreground"
          : trusted
            ? "bg-primary/10 text-primary"
            : "bg-secondary text-foreground/75"
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

function DealBadge({ type, subdued }: { type: DealFeedBadge; subdued?: boolean }) {
  if (subdued) {
    return (
      <span className="inline-flex shrink-0 items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground sm:px-3 sm:py-1 sm:text-xs">
        {type === "hot" && "🔥 "}
        {type === "trending" && "📈 "}
        {type === "mega" && "💛 "}
        {t(badgeLabels[type])}
      </span>
    );
  }

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
  rank = 999,
}: DealFeedCardProps) {
  const featured = rank === 0;
  const savings = getSavingsPercent(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  const savingsAmount = getSavingsAmount(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  const badges = getDealFeedBadges(deal, commentCount);
  const score = getVoteScore(deal.hot_count, deal.cold_count);

  return (
    <article
      className={cn(
        "deal-card group flex flex-col overflow-hidden transition-all duration-300 ease-out",
        featured
          ? "deal-card-featured rounded-2xl sm:rounded-3xl"
          : "deal-card-standard rounded-xl sm:rounded-2xl"
      )}
    >
      {featured && <HotDealBanner />}

      <div className="flex min-h-0 flex-1">
        <VoteButtons
          dealId={deal.id}
          hotCount={deal.hot_count}
          coldCount={deal.cold_count}
          userVote={userVote}
          isLoggedIn={isLoggedIn}
          compact
          featured={featured}
        />

        <Link
          href={`/deal/${deal.id}`}
          className={cn(
            "flex min-w-0 flex-1 transition-opacity active:opacity-90",
            featured ? "gap-3 p-3.5 sm:gap-7 sm:p-7" : "gap-2.5 p-3 sm:gap-6 sm:p-6"
          )}
        >
          <div
            className={cn(
              "relative shrink-0 overflow-hidden rounded-xl bg-muted sm:rounded-2xl",
              featured
                ? "h-[7.5rem] w-[7.5rem] sm:h-52 sm:w-52"
                : "h-[6.5rem] w-[6.5rem] sm:h-44 sm:w-44"
            )}
          >
            {deal.image_url ? (
              <Image
                src={deal.image_url}
                alt={deal.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                sizes={featured ? "(max-width: 640px) 120px, 208px" : "(max-width: 640px) 104px, 176px"}
                priority={featured}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-2xl sm:text-4xl">🛍️</div>
            )}
            {savings !== null && savings >= 10 && (
              <span
                className={cn(
                  "absolute left-0 top-0 rounded-br-lg bg-emerald-600 font-extrabold text-white shadow-md sm:rounded-br-xl",
                  featured ? "px-2.5 py-1 text-xs sm:px-3.5 sm:py-1.5 sm:text-base" : "px-1.5 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-sm"
                )}
              >
                −{savings}%
              </span>
            )}
          </div>

          <div className={cn("flex min-w-0 flex-1 flex-col justify-center", featured ? "gap-2 sm:gap-3" : "gap-1 sm:gap-2.5")}>
            {!featured && (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none sm:flex-wrap sm:gap-2 sm:overflow-visible">
                {deal.merchant && <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} muted />}
                {badges.map((b) => (
                  <DealBadge key={b} type={b} subdued />
                ))}
              </div>
            )}

            {featured && deal.merchant && (
              <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} />
            )}

            <h2
              className={cn(
                "line-clamp-2 font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary",
                featured ? "text-lg sm:text-2xl" : "text-[15px] sm:text-xl"
              )}
            >
              {deal.title}
            </h2>

            <div
              className={cn(
                "flex flex-wrap items-baseline gap-x-2 gap-y-1",
                featured ? "mt-1 sm:mt-2 sm:gap-x-4" : "sm:mt-2 sm:gap-x-3 sm:gap-y-2"
              )}
            >
              <span
                className={cn(
                  "font-black leading-none",
                  featured
                    ? "featured-price text-[1.875rem] sm:text-[2.875rem]"
                    : "text-price text-xl sm:text-[1.875rem]"
                )}
              >
                {formatUAH(Number(deal.price_uah))}
              </span>
              {deal.original_price_uah && (
                <span
                  className={cn(
                    "text-muted-foreground/55 line-through decoration-2",
                    featured ? "text-sm sm:text-xl" : "text-xs sm:text-lg"
                  )}
                >
                  {formatUAH(Number(deal.original_price_uah))}
                </span>
              )}
              {savingsAmount !== null && (
                <span
                  className={cn(
                    "rounded-md bg-emerald-600 font-extrabold text-white shadow-sm sm:rounded-lg",
                    featured ? "px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-lg" : "px-2 py-0.5 text-xs sm:px-3.5 sm:py-1.5 sm:text-base"
                  )}
                >
                  −{formatUAH(savingsAmount)}
                </span>
              )}
            </div>

            <div
              className={cn(
                "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-muted-foreground/55",
                featured ? "pt-1 text-xs sm:gap-x-4 sm:text-sm" : "pt-0.5 text-[11px] sm:pt-2 sm:text-sm sm:text-foreground/65"
              )}
            >
              {deal.category && (
                <span className="truncate">
                  {deal.category.icon} {deal.category.name_uk}
                </span>
              )}
              {score >= 20 && (
                <span className={cn("font-bold text-orange-600", !featured && "hidden sm:inline")}>
                  🔥 {score} {t("deals.votes")}
                </span>
              )}
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-medium",
                  featured ? "sm:font-bold sm:text-foreground" : "sm:gap-2 sm:text-base sm:font-bold sm:text-foreground"
                )}
              >
                <MessageCircle className={cn("text-primary", featured ? "h-4 w-4 sm:h-5 sm:w-5" : "h-3.5 w-3.5 sm:h-5 sm:w-5")} aria-hidden />
                {commentCount}
              </span>
              <span className="ml-auto shrink-0">{formatRelativeTime(deal.created_at)}</span>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <p className="deal-card deal-card-standard rounded-xl px-4 py-3 text-center text-sm text-muted-foreground sm:rounded-2xl sm:px-5 sm:py-4">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

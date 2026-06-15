"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { DealCardCta } from "./DealCardCta";
import { DealVotePanel } from "./DealVotePanel";
import { SavingsBadge } from "./SavingsBadge";
import { PopularityIndicator } from "./PopularityIndicator";
import { SocialProof } from "./SocialProof";
import {
  getDealFeedBadges,
  getSavingsAmount,
  isHotDeal,
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

function FeaturedBanner() {
  return (
    <div className="flex items-center justify-center gap-1.5 bg-uk-yellow px-3 py-1.5">
      <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden />
      <span className="text-[10px] font-bold uppercase tracking-wide text-primary sm:text-[11px]">
        {t("badges.hotDeal")}
      </span>
    </div>
  );
}

function StoreLabel({ name, slug }: { name: string; slug?: string | null }) {
  const trusted = isTrustedMerchant(slug);

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:text-[11px]">
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
  const isHot = type === "hot";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
        isHot ? "bg-orange-100 text-orange-700" : "bg-secondary text-muted-foreground"
      )}
    >
      {isHot && "🔥 "}
      {type === "trending" && "📈 "}
      {type === "mega" && "💛 "}
      {t(badgeLabels[type])}
    </span>
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
  const hot = !featured && isHotDeal(deal);
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

  const cardClass = featured
    ? "deal-card-featured"
    : hot
      ? "deal-card-hot"
      : "deal-card-standard";

  return (
    <article
      className={cn(
        "deal-card group overflow-hidden rounded-xl transition-all duration-200 ease-out sm:rounded-2xl",
        cardClass
      )}
    >
      {featured && <FeaturedBanner />}

      <div className={cn("flex gap-2 p-2.5 sm:gap-3 sm:p-3", featured && "sm:p-3.5")}>
        {/* Image */}
        <Link
          href={`/deal/${deal.id}`}
          className={cn(
            "relative shrink-0 overflow-hidden rounded-lg bg-muted transition-opacity active:opacity-90",
            featured ? "h-[5.5rem] w-[5.5rem] sm:h-[7.5rem] sm:w-[7.5rem]" : "h-[5rem] w-[5rem] sm:h-[6.5rem] sm:w-[6.5rem]"
          )}
        >
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              sizes={featured ? "(max-width: 640px) 88px, 120px" : "(max-width: 640px) 80px, 104px"}
              priority={featured}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xl">🛍️</div>
          )}
          {savings !== null && savings >= 5 && (
            <span className="absolute left-0 top-0 rounded-br-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold text-white sm:text-[10px]">
              −{savings}%
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:gap-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
              {deal.merchant && <StoreLabel name={deal.merchant.name} slug={deal.merchant.slug} />}
              {badges.slice(0, featured ? 2 : 1).map((b) => (
                <DealBadge key={b} type={b} />
              ))}
            </div>
            <span className="shrink-0 text-[10px] text-muted-foreground/55 sm:hidden">
              {formatRelativeTime(deal.created_at)}
            </span>
          </div>

          <Link href={`/deal/${deal.id}`} className="min-w-0 transition-opacity active:opacity-90">
            <h2
              className={cn(
                "line-clamp-2 font-bold leading-snug text-foreground transition-colors group-hover:text-primary",
                featured ? "text-[15px] sm:text-base" : "text-[13px] sm:text-[15px]"
              )}
            >
              {deal.title}
            </h2>
          </Link>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-0.5">
            <span
              className={cn(
                "font-black leading-none text-price",
                featured ? "featured-price text-xl sm:text-2xl" : "text-lg sm:text-xl"
              )}
            >
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-[11px] text-muted-foreground/50 line-through sm:text-xs">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && <SavingsBadge amount={savingsAmount} featured={featured} />}
          </div>

          <PopularityIndicator score={score} />

          <div className="hidden flex-wrap items-center gap-x-2 text-[10px] text-muted-foreground/50 sm:flex sm:text-[11px]">
            {deal.category && (
              <span className="truncate">
                {deal.category.icon} {deal.category.name_uk}
              </span>
            )}
            <span className="inline-flex items-center gap-0.5">
              <MessageCircle className="h-3 w-3 opacity-60" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto shrink-0">{formatRelativeTime(deal.created_at)}</span>
          </div>

          <SocialProof deal={deal} />

          <div className="mt-2 flex flex-col gap-2 sm:hidden">
            <DealVotePanel
              dealId={deal.id}
              hotCount={deal.hot_count}
              coldCount={deal.cold_count}
              userVote={userVote}
              isLoggedIn={isLoggedIn}
              featured={featured}
              variant="compact"
            />
            <DealCardCta dealId={deal.id} featured={featured} className="w-full" />
          </div>
        </div>

        {/* Desktop: vote panel + CTA */}
        <div className="hidden shrink-0 flex-col items-stretch justify-between gap-2 sm:flex">
          <DealVotePanel
            dealId={deal.id}
            hotCount={deal.hot_count}
            coldCount={deal.cold_count}
            userVote={userVote}
            isLoggedIn={isLoggedIn}
            featured={featured}
          />
          <DealCardCta dealId={deal.id} featured={featured} className="w-full" />
        </div>
      </div>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <p className="deal-card deal-card-standard rounded-xl px-3 py-2.5 text-center text-sm text-muted-foreground">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

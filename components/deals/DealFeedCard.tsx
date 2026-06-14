"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { DealCardCta } from "./DealCardCta";
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
  rank?: number;
}

function FeaturedBanner() {
  return (
    <div className="flex items-center justify-center bg-primary px-3 py-1">
      <span className="text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
        ⭐ {t("badges.hotDeal")}
      </span>
    </div>
  );
}

function StoreLabel({ name, slug }: { name: string; slug?: string | null }) {
  const trusted = isTrustedMerchant(slug);

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 sm:text-[11px]">
      {trusted && <Star className="h-2.5 w-2.5 fill-uk-yellow text-uk-yellow" aria-hidden />}
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
  return (
    <span className="inline-flex shrink-0 items-center rounded bg-secondary/80 px-1 py-px text-[9px] font-semibold uppercase text-muted-foreground/90">
      {type === "hot" && "🔥 "}
      {type === "trending" && "📈 "}
      {type === "mega" && "💛 "}
      {t(badgeLabels[type])}
    </span>
  );
}

export function DealFeedCard({ deal, commentCount, rank = 999 }: DealFeedCardProps) {
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
        "deal-card group overflow-hidden rounded-lg transition-all duration-200 ease-out sm:rounded-xl",
        cardClass
      )}
    >
      {featured && <FeaturedBanner />}

      <div className={cn("flex flex-col", featured ? "p-2.5 sm:p-3" : "p-2 sm:p-2.5")}>
        <div className="flex min-w-0 gap-2 sm:gap-2.5">
          <Link
            href={`/deal/${deal.id}`}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-md bg-muted transition-opacity active:opacity-90",
              featured ? "h-[5.5rem] w-[5.5rem] sm:h-[7rem] sm:w-[7rem]" : "h-[5rem] w-[5rem] sm:h-[6.25rem] sm:w-[6.25rem]"
            )}
          >
            {deal.image_url ? (
              <Image
                src={deal.image_url}
                alt={deal.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                sizes={featured ? "(max-width: 640px) 88px, 112px" : "(max-width: 640px) 80px, 100px"}
                priority={featured}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-lg sm:text-xl">🛍️</div>
            )}
            {savings !== null && savings >= 5 && (
              <span className="absolute left-0 top-0 rounded-br bg-emerald-700/90 px-1 py-px text-[9px] font-bold text-white sm:text-[10px]">
                −{savings}%
              </span>
            )}
          </Link>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:gap-1">
            <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
              {deal.merchant && <StoreLabel name={deal.merchant.name} slug={deal.merchant.slug} />}
              {badges.slice(0, featured ? 2 : 1).map((b) => (
                <DealBadge key={b} type={b} />
              ))}
            </div>

            <Link href={`/deal/${deal.id}`} className="min-w-0 transition-opacity active:opacity-90">
              <h2
                className={cn(
                  "line-clamp-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-primary",
                  featured ? "text-[15px] sm:text-base" : "text-[13px] sm:text-[14px]"
                )}
              >
                {deal.title}
              </h2>
            </Link>

            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 pt-0.5">
              <span
                className={cn(
                  "font-black leading-none text-price",
                  featured ? "featured-price text-xl sm:text-2xl" : "text-lg sm:text-xl"
                )}
              >
                {formatUAH(Number(deal.price_uah))}
              </span>
              {deal.original_price_uah && (
                <span className="text-[10px] text-muted-foreground/45 line-through sm:text-[11px]">
                  {formatUAH(Number(deal.original_price_uah))}
                </span>
              )}
              {savingsAmount !== null && <SavingsBadge amount={savingsAmount} featured={featured} />}
            </div>

            <PopularityIndicator score={score} />

            <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-[10px] text-muted-foreground/45">
              {deal.category && (
                <span className="truncate">
                  {deal.category.icon} {deal.category.name_uk}
                </span>
              )}
              <span className="inline-flex items-center gap-0.5">
                <MessageCircle className="h-2.5 w-2.5 opacity-60" aria-hidden />
                {commentCount}
              </span>
              <span className="ml-auto shrink-0">{formatRelativeTime(deal.created_at)}</span>
            </div>

            <SocialProof deal={deal} />
          </div>
        </div>

        <div className={cn("mt-1.5 flex justify-end sm:mt-2", featured && "sm:mt-2.5")}>
          <DealCardCta dealId={deal.id} featured={featured} />
        </div>
      </div>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <p className="deal-card deal-card-standard rounded-lg px-3 py-2 text-center text-sm text-muted-foreground sm:rounded-xl">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

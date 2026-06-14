"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { DealCardCta } from "./DealCardCta";
import { SavingsBadge } from "./SavingsBadge";
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

function HotDealBanner({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 px-3 py-1">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs",
          pulse && "animate-hot-pulse"
        )}
      >
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
        "inline-flex shrink-0 items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
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

function DealBadge({ type }: { type: DealFeedBadge }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
      {type === "hot" && "🔥 "}
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
  const hot = isHotDeal(deal);
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
        "deal-card group flex flex-col overflow-hidden transition-all duration-200 ease-out",
        featured
          ? "deal-card-featured rounded-xl sm:rounded-2xl"
          : hot
            ? "deal-card-hot rounded-xl"
            : "deal-card-standard rounded-xl"
      )}
    >
      {featured && <HotDealBanner pulse />}

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

        <div className={cn("flex min-w-0 flex-1 flex-col", featured ? "p-2.5 sm:p-4" : "p-2.5 sm:p-3.5")}>
          <Link
            href={`/deal/${deal.id}`}
            className={cn("flex min-w-0 transition-opacity active:opacity-90", featured ? "gap-2.5 sm:gap-4" : "gap-2 sm:gap-4")}
          >
            <div
              className={cn(
                "relative shrink-0 overflow-hidden rounded-lg bg-muted",
                featured ? "h-24 w-24 sm:h-36 sm:w-36" : "h-[5.75rem] w-[5.75rem] sm:h-32 sm:w-32"
              )}
            >
              {deal.image_url ? (
                <Image
                  src={deal.image_url}
                  alt={deal.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  sizes={featured ? "(max-width: 640px) 96px, 144px" : "(max-width: 640px) 92px, 128px"}
                  priority={featured}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xl sm:text-2xl">🛍️</div>
              )}
              {savings !== null && savings >= 10 && (
                <span className="absolute left-0 top-0 rounded-br-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white sm:text-xs">
                  −{savings}%
                </span>
              )}
            </div>

            <div className={cn("flex min-w-0 flex-1 flex-col justify-center gap-0.5 sm:gap-1")}>
              {!featured && (deal.merchant || badges.length > 0) && (
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                  {deal.merchant && <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} muted />}
                  {badges.map((b) => (
                    <DealBadge key={b} type={b} />
                  ))}
                </div>
              )}

              {featured && deal.merchant && (
                <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} />
              )}

              <h2
                className={cn(
                  "line-clamp-2 font-bold leading-snug text-foreground transition-colors group-hover:text-primary",
                  featured ? "text-base sm:text-lg" : "text-[14px] sm:text-base"
                )}
              >
                {deal.title}
              </h2>

              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-0.5">
                <span
                  className={cn(
                    "font-black leading-none text-price",
                    featured ? "featured-price text-xl sm:text-[1.75rem]" : "text-lg sm:text-xl"
                  )}
                >
                  {formatUAH(Number(deal.price_uah))}
                </span>
                {deal.original_price_uah && (
                  <span className="text-[11px] text-muted-foreground/50 line-through sm:text-xs">
                    {formatUAH(Number(deal.original_price_uah))}
                  </span>
                )}
                {savingsAmount !== null && (
                  <SavingsBadge amount={savingsAmount} featured={featured} />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0 text-[10px] text-muted-foreground/50 sm:text-[11px]">
                {deal.category && (
                  <span className="truncate">
                    {deal.category.icon} {deal.category.name_uk}
                  </span>
                )}
                <span className="inline-flex items-center gap-0.5">
                  <MessageCircle className="h-3 w-3 text-primary/70" aria-hidden />
                  {commentCount}
                </span>
                <span className="ml-auto shrink-0">{formatRelativeTime(deal.created_at)}</span>
              </div>
            </div>
          </Link>

          <div className={cn("mt-1.5 flex flex-col gap-1.5 sm:mt-2 sm:gap-2", featured && "sm:mt-2.5")}>
            <SocialProof deal={deal} score={score} />
            <DealCardCta dealId={deal.id} featured={featured} />
          </div>
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

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
        "inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide",
        trusted ? "bg-primary/10 text-primary" : "bg-secondary text-foreground/75"
      )}
    >
      {trusted && <Star className="h-3.5 w-3.5 fill-uk-yellow text-uk-yellow" aria-hidden />}
      {name}
      {trusted && (
        <span className="hidden text-[10px] font-semibold normal-case opacity-80 sm:inline">
          · {t("badges.trustedStore")}
        </span>
      )}
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
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-4 py-1.5 text-sm font-black uppercase tracking-wide text-white shadow-md">
        🔥 {t(badgeLabels.hot)}
      </span>
    );
  }

  if (type === "trending") {
    return (
      <Badge variant="accent" className="border-0 px-3 py-1 text-xs font-bold uppercase">
        📈 {t(badgeLabels.trending)}
      </Badge>
    );
  }

  return (
    <Badge
      variant={type === "mega" ? "green" : "accent"}
      className={cn("border-0 px-3 py-1 text-xs font-bold uppercase", type === "mega" && "text-sm")}
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
        "deal-card group flex overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-0.5",
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
        className="flex min-w-0 flex-1 gap-4 p-5 transition-opacity hover:opacity-[0.98] sm:gap-6 sm:p-6"
      >
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-44 sm:w-44">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="176px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">🛍️</div>
          )}
          {savings !== null && savings >= 10 && (
            <span className="absolute left-0 top-0 rounded-br-xl bg-emerald-600 px-3 py-1 text-sm font-extrabold text-white shadow-md">
              −{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {deal.merchant && (
              <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} />
            )}
            {badges.map((b) => (
              <DealBadge key={b} type={b} />
            ))}
          </div>

          <h2 className="line-clamp-2 text-xl font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
            {deal.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span
              className={cn(
                "font-black text-price",
                exciting ? "text-[2rem] leading-none sm:text-[2.125rem]" : "text-[1.75rem] leading-none sm:text-[1.875rem]"
              )}
            >
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-base text-muted-foreground/60 line-through decoration-2 sm:text-lg">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-base font-extrabold text-white shadow-sm">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2">
            {deal.category && (
              <span className="text-sm text-foreground/65">{deal.category.icon} {deal.category.name_uk}</span>
            )}
            {score >= 20 && (
              <span className="hidden text-xs font-bold text-orange-600 sm:inline">
                🔥 {score} {t("deals.votes")}
              </span>
            )}
            <span className="inline-flex items-center gap-2 text-base font-bold text-foreground">
              <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto text-xs text-muted-foreground/50">
              {formatRelativeTime(deal.created_at)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <p className="deal-card rounded-2xl px-5 py-4 text-center text-sm text-muted-foreground">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

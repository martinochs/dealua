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
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
        trusted
          ? "border border-primary/25 bg-primary/5 text-primary ring-1 ring-primary/10"
          : "bg-muted text-foreground/80 ring-1 ring-border"
      )}
    >
      {trusted && <Star className="h-3 w-3 fill-uk-yellow text-uk-yellow" aria-hidden />}
      {name}
      {trusted && (
        <span className="hidden text-[10px] font-semibold normal-case text-primary/70 sm:inline">
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
      <span className="inline-flex animate-pulse items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-600 via-red-600 to-red-700 px-3.5 py-1.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-500/30">
        🔥 {t(badgeLabels.hot)}
      </span>
    );
  }

  if (type === "trending") {
    return (
      <Badge variant="accent" className="px-2.5 py-1 text-xs font-bold uppercase">
        📈 {t(badgeLabels.trending)}
      </Badge>
    );
  }

  return (
    <Badge
      variant={type === "mega" ? "green" : "accent"}
      className={cn("px-2.5 py-1 text-xs font-bold uppercase", type === "mega" && "text-sm")}
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
        "group flex overflow-hidden rounded-2xl border bg-card shadow-[0_4px_20px_rgba(0,87,183,0.07)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,87,183,0.14)]",
        exciting
          ? "border-uk-yellow/40 ring-2 ring-uk-yellow/25 hover:border-primary/30"
          : "border-border/50 hover:border-primary/25"
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
        className="flex min-w-0 flex-1 transition-opacity hover:opacity-[0.98]"
      >
        <div className="relative m-4 h-36 w-36 shrink-0 overflow-hidden rounded-xl bg-muted sm:m-5 sm:h-40 sm:w-40">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              sizes="160px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">🛍️</div>
          )}
          {savings !== null && savings >= 10 && (
            <span className="absolute left-0 top-0 rounded-br-lg bg-emerald-600 px-2.5 py-1 text-sm font-extrabold text-white shadow-md transition-transform group-hover:scale-105">
              −{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-4 pr-4 sm:gap-2.5 sm:py-5 sm:pr-5">
          <div className="flex flex-wrap items-center gap-2">
            {deal.merchant && (
              <MerchantBadge name={deal.merchant.name} slug={deal.merchant.slug} />
            )}
            {badges.map((b) => (
              <DealBadge key={b} type={b} />
            ))}
          </div>

          <h2 className="line-clamp-2 text-lg font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {deal.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span
              className={cn(
                "font-black text-price transition-transform group-hover:scale-[1.02]",
                exciting ? "text-3xl sm:text-[2rem]" : "text-2xl sm:text-[1.75rem]"
              )}
            >
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-base font-medium text-muted-foreground/75 line-through decoration-2 sm:text-lg">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-extrabold text-white shadow-md transition-transform group-hover:scale-105 sm:text-base">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
            {deal.category && (
              <span className="text-sm text-foreground/70">{deal.category.icon} {deal.category.name_uk}</span>
            )}
            {score >= 20 && (
              <span className="hidden text-xs font-semibold text-orange-600 sm:inline">
                🔥 {score} {t("deals.votes")}
              </span>
            )}
            <span className="inline-flex items-center gap-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
              <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto text-xs font-normal text-muted-foreground/55">
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
    <p className="rounded-2xl border border-dashed border-primary/20 bg-card px-5 py-4 text-center text-sm text-muted-foreground shadow-sm">
      {t("feed.submitPrompt")}{" "}
      <Link
        href="/submit"
        className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
      >
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

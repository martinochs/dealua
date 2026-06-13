"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { Badge } from "@/components/ui/badge";
import {
  getDealFeedBadges,
  getSavingsAmount,
  getTemperatureLevel,
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

const badgeLabels: Record<DealFeedBadge, "badges.hot" | "badges.new" | "badges.mega" | "badges.trending"> = {
  new: "badges.new",
  hot: "badges.hot",
  mega: "badges.mega",
  trending: "badges.trending",
};

function DealBadge({ type }: { type: DealFeedBadge }) {
  if (type === "hot") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-600 to-red-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
        🔥 {t(badgeLabels.hot)}
      </span>
    );
  }

  if (type === "trending") {
    return (
      <Badge variant="accent" className="rounded-full border-0 px-2.5 py-0.5 text-[11px] font-bold uppercase">
        📈 {t(badgeLabels.trending)}
      </Badge>
    );
  }

  return (
    <Badge
      variant={type === "mega" ? "green" : "accent"}
      className="rounded-full border-0 px-2.5 py-0.5 text-[11px] font-bold uppercase"
    >
      {type === "mega" ? t(badgeLabels.mega) : t(badgeLabels.new)}
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
  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const heat = getTemperatureLevel(score);

  return (
    <article
      className={cn(
        "deal-card group flex overflow-hidden rounded-xl transition-all duration-200 ease-out",
        heat === "high" && "shadow-[0_2px_12px_rgba(234,88,12,0.1),0_8px_24px_rgba(15,23,42,0.06)]"
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
        className="flex min-w-0 flex-1 gap-3 p-3 transition-opacity active:opacity-90 sm:gap-4 sm:p-3.5"
      >
        <div className="relative h-[7.25rem] w-[7.25rem] shrink-0 overflow-hidden rounded-lg bg-muted sm:h-36 sm:w-36">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 116px, 144px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl">🛍️</div>
          )}
          {savings !== null && savings >= 10 && (
            <span className="absolute left-0 top-0 rounded-br-lg bg-emerald-600 px-2 py-1 text-xs font-extrabold text-white">
              −{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          {badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {badges.map((b) => (
                <DealBadge key={b} type={b} />
              ))}
            </div>
          )}

          <h2 className="line-clamp-2 text-[15px] font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base">
            {deal.title}
          </h2>

          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[1.625rem] font-black leading-none text-price sm:text-[1.75rem]">
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-xs text-muted-foreground/50 line-through decoration-1">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-sm font-extrabold text-white">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 pt-0.5 text-xs text-muted-foreground/55">
            {deal.merchant && (
              <span
                className={cn(
                  "font-medium uppercase tracking-wide",
                  isTrustedMerchant(deal.merchant.slug) ? "text-primary/70" : "text-muted-foreground/60"
                )}
              >
                {deal.merchant.name}
              </span>
            )}
            {deal.category && (
              <span>
                {deal.category.icon} {deal.category.name_uk}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
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
    <p className="deal-card rounded-xl px-4 py-3 text-center text-sm text-muted-foreground">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

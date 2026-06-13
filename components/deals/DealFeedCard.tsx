"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Plus } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDealFeedBadges, getSavingsAmount } from "@/lib/deal-feed";
import { formatUAH, formatRelativeTime, getSavingsPercent } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";
import type { DealWithRelations } from "@/types/database";

interface DealFeedCardProps {
  deal: DealWithRelations;
  commentCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  rank?: number;
}

const badgeLabels: Record<string, string> = {
  new: "НОВА",
  hot: "🔥 HOT",
  mega: "MEGA",
};

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
  const badges = getDealFeedBadges(deal);

  return (
    <article
      className={cn(
        "group flex overflow-hidden rounded-md border bg-card transition-colors hover:border-primary/35 hover:bg-accent/20",
        rank !== undefined && rank % 2 === 1 && "bg-muted/15"
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

      <Link href={`/deal/${deal.id}`} className="flex min-w-0 flex-1">
        <div className="relative h-20 w-20 shrink-0 bg-muted sm:h-[5.5rem] sm:w-[7rem]">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80px, 112px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl">🛍️</div>
          )}
          {savings !== null && savings >= 20 && (
            <span className="absolute left-0 top-0 rounded-br bg-hot px-1.5 py-px text-[10px] font-bold leading-tight text-white">
              -{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-2 py-1.5 sm:px-2.5 sm:py-2">
          <div className="flex flex-wrap items-center gap-1">
            {badges.map((b) => (
              <Badge
                key={b}
                variant={b === "mega" || b === "hot" ? "hot" : "secondary"}
                className="px-1 py-0 text-[9px] font-bold uppercase leading-tight"
              >
                {badgeLabels[b]}
              </Badge>
            ))}
            {deal.merchant && (
              <span className="rounded border bg-background px-1 py-px text-[10px] font-semibold uppercase leading-tight text-muted-foreground">
                {deal.merchant.name}
              </span>
            )}
          </div>

          <h2 className="line-clamp-2 text-sm font-bold leading-tight tracking-tight group-hover:text-primary sm:text-[15px]">
            {deal.title}
          </h2>

          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
            <span className="text-base font-extrabold text-primary sm:text-lg">
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-xs text-muted-foreground line-through">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="text-[10px] font-semibold text-emerald-600 sm:text-xs">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground sm:text-xs">
            {deal.category && (
              <span className="truncate">
                {deal.category.icon} {deal.category.name_uk}
              </span>
            )}
            <span className="inline-flex shrink-0 items-center gap-0.5 font-medium">
              <MessageCircle className="h-3 w-3" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto shrink-0 whitespace-nowrap">{formatRelativeTime(deal.created_at)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-dashed bg-muted/25 px-2.5 py-2">
      <p className="text-xs text-muted-foreground">{t("feed.submitPrompt")}</p>
      <Button asChild size="sm" className="h-7 shrink-0 px-2 text-xs">
        <Link href="/submit">
          <Plus className="h-3.5 w-3.5" />
          {t("nav.submit")}
        </Link>
      </Button>
    </div>
  );
}

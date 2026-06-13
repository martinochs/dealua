"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { Badge } from "@/components/ui/badge";
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
  const badges = getDealFeedBadges(deal);

  return (
    <article className="group flex overflow-hidden rounded-xl border border-border/60 bg-card shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
      <VoteButtons
        dealId={deal.id}
        hotCount={deal.hot_count}
        coldCount={deal.cold_count}
        userVote={userVote}
        isLoggedIn={isLoggedIn}
        compact
      />

      <Link href={`/deal/${deal.id}`} className="flex min-w-0 flex-1">
        <div className="relative h-28 w-28 shrink-0 bg-muted sm:h-32 sm:w-32">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 112px, 128px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-3xl">🛍️</div>
          )}
          {savings !== null && savings >= 10 && (
            <span className="absolute left-0 top-0 rounded-br-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
              −{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-3 py-3 sm:gap-2 sm:px-4 sm:py-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {deal.merchant && (
              <span className="rounded-md border-2 border-primary/25 bg-primary/5 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-primary">
                {deal.merchant.name}
              </span>
            )}
            {badges.map((b) =>
              b === "hot" ? (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm"
                >
                  🔥 HOT
                </span>
              ) : (
                <Badge
                  key={b}
                  variant={b === "mega" ? "green" : "yellow"}
                  className={cn(
                    "px-2 py-0.5 text-[11px] font-bold uppercase",
                    b === "mega" && "text-sm"
                  )}
                >
                  {b === "new" ? "НОВА" : "MEGA"}
                </Badge>
              )
            )}
          </div>

          <h2 className="line-clamp-2 text-base font-bold leading-snug tracking-tight group-hover:text-primary sm:text-lg">
            {deal.title}
          </h2>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-xl font-extrabold text-primary sm:text-2xl">
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-sm font-medium text-muted-foreground line-through decoration-2 sm:text-base">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
            {deal.category && (
              <span className="text-xs text-muted-foreground sm:text-sm">
                {deal.category.icon} {deal.category.name_uk}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <MessageCircle className="h-4 w-4 text-primary" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto text-xs font-medium text-foreground/75 sm:text-sm">
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
    <p className="rounded-xl border border-dashed border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground shadow-sm">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submit")} →
      </Link>
    </p>
  );
}

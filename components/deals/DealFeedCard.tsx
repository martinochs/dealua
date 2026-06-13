"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { Badge } from "@/components/ui/badge";
import { getDealFeedBadges, getSavingsAmount } from "@/lib/deal-feed";
import { formatUAH, formatRelativeTime, getSavingsPercent } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { DealWithRelations } from "@/types/database";

interface DealFeedCardProps {
  deal: DealWithRelations;
  commentCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  rank?: number;
}

function MerchantBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-slate-700 ring-1 ring-slate-200">
      {name}
    </span>
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
  const badges = getDealFeedBadges(deal);

  return (
    <article className="group flex overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_12px_32px_rgba(15,23,42,0.14)]">
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
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="160px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">🛍️</div>
          )}
          {savings !== null && savings >= 10 && (
            <span className="absolute left-0 top-0 rounded-br-lg bg-emerald-600 px-2.5 py-1 text-sm font-extrabold text-white shadow-md">
              −{savings}%
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-4 pr-4 sm:gap-2.5 sm:py-5 sm:pr-5">
          <div className="flex flex-wrap items-center gap-2">
            {deal.merchant && <MerchantBadge name={deal.merchant.name} />}
            {badges.map((b) =>
              b === "hot" ? (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-3 py-1 text-sm font-black uppercase tracking-wide text-white shadow-md"
                >
                  🔥 HOT
                </span>
              ) : (
                <Badge
                  key={b}
                  variant={b === "mega" ? "green" : "yellow"}
                  className="px-2.5 py-1 text-xs font-bold uppercase"
                >
                  {b === "new" ? "НОВА" : "MEGA"}
                </Badge>
              )
            )}
          </div>

          <h2 className="line-clamp-2 text-lg font-extrabold leading-snug tracking-tight text-foreground group-hover:text-primary sm:text-xl">
            {deal.title}
          </h2>

          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="text-2xl font-black text-price sm:text-[1.75rem]">
              {formatUAH(Number(deal.price_uah))}
            </span>
            {deal.original_price_uah && (
              <span className="text-base font-medium text-muted-foreground/80 line-through decoration-2 sm:text-lg">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savingsAmount !== null && (
              <span className="rounded-lg bg-emerald-600 px-3 py-1 text-sm font-extrabold text-white shadow-sm sm:text-base">
                −{formatUAH(savingsAmount)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
            {deal.category && (
              <span className="text-sm text-foreground/70">
                {deal.category.icon} {deal.category.name_uk}
              </span>
            )}
            <span className="inline-flex items-center gap-2 text-base font-bold text-foreground">
              <MessageCircle className="h-5 w-5 fill-primary/10 text-primary" aria-hidden />
              {commentCount}
            </span>
            <span className="ml-auto text-xs font-normal text-muted-foreground/60">
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
    <p className="rounded-2xl border border-dashed border-border/60 bg-card px-5 py-4 text-center text-sm text-muted-foreground shadow-sm">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary transition-colors hover:underline">
        {t("nav.submit")} →
      </Link>
    </p>
  );
}

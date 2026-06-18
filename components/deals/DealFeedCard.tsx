"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { DealCardCta } from "./DealCardCta";
import { DealVoteInline } from "./DealVoteInline";
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
    <div className="flex items-center justify-center gap-1.5 bg-uk-yellow px-3 py-2">
      <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
      <span className="text-[11px] font-bold uppercase tracking-wide text-primary sm:text-xs">
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

function DealCardImage({
  deal,
  featured,
  savings,
  className,
}: {
  deal: DealWithRelations;
  featured: boolean;
  savings: number | null;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-xl bg-muted", className)}>
      <Link href={`/deal/${deal.id}`} className="relative block h-full w-full transition-opacity active:opacity-90">
        {deal.image_url ? (
          <Image
            src={deal.image_url}
            alt={deal.title}
            fill
            className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 128px"
            priority={featured}
          />
        ) : (
          <div className="flex h-full min-h-[5rem] w-full items-center justify-center text-3xl">🛍️</div>
        )}
      </Link>
      {savings !== null && savings >= 5 && (
        <span className="absolute left-0 top-0 z-10 rounded-br-lg bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
          −{savings}%
        </span>
      )}
      <button
        type="button"
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSaved((v) => !v);
        }}
        aria-label={saved ? "Прибрати з обраного" : "Додати в обране"}
      >
        <Heart
          className={cn("h-4 w-4", saved ? "fill-red-500 text-red-500" : "text-muted-foreground")}
          aria-hidden
        />
      </button>
    </div>
  );
}

function DealCardBody({
  deal,
  commentCount,
  userVote,
  isLoggedIn,
  featured,
  badges,
  savingsAmount,
  score,
}: {
  deal: DealWithRelations;
  commentCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  featured: boolean;
  badges: DealFeedBadge[];
  savingsAmount: number | null;
  score: number;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
          {deal.merchant && <StoreLabel name={deal.merchant.name} slug={deal.merchant.slug} />}
          {badges.slice(0, featured ? 2 : 1).map((b) => (
            <DealBadge key={b} type={b} />
          ))}
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground/55">{formatRelativeTime(deal.created_at)}</span>
      </div>

      <Link href={`/deal/${deal.id}`} className="min-w-0 transition-opacity active:opacity-90">
        <h2
          className={cn(
            "line-clamp-2 font-bold leading-snug text-foreground transition-colors group-hover:text-primary",
            featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
          )}
        >
          {deal.title}
        </h2>
      </Link>

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={cn(
            "font-black leading-none text-price",
            featured ? "featured-price text-2xl sm:text-[1.75rem]" : "text-xl sm:text-2xl"
          )}
        >
          {formatUAH(Number(deal.price_uah))}
        </span>
        {deal.original_price_uah && (
          <span className="text-xs text-muted-foreground/50 line-through">
            {formatUAH(Number(deal.original_price_uah))}
          </span>
        )}
        {savingsAmount !== null && <SavingsBadge amount={savingsAmount} featured={featured} />}
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <PopularityIndicator score={score} />
        <DealVoteInline
          dealId={deal.id}
          hotCount={deal.hot_count}
          coldCount={deal.cold_count}
          userVote={userVote}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-2.5 text-[10px] text-muted-foreground/50 sm:text-[11px]">
        {deal.category && (
          <span className="truncate">
            {deal.category.icon} {deal.category.name_uk}
          </span>
        )}
        <span className="inline-flex items-center gap-0.5">
          <MessageCircle className="h-3 w-3 opacity-60" aria-hidden />
          {commentCount}
        </span>
      </div>

      <SocialProof deal={deal} />
    </div>
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

  const bodyProps = {
    deal,
    commentCount,
    userVote,
    isLoggedIn,
    featured,
    badges,
    savingsAmount,
    score,
  };

  return (
    <article
      className={cn(
        "deal-card group overflow-hidden rounded-2xl transition-all duration-200 ease-out",
        cardClass
      )}
    >
      {featured && <FeaturedBanner />}

      {/* Mobile: stacked vertical card */}
      <div className="flex flex-col gap-3 p-3 sm:hidden">
        <DealCardImage
          deal={deal}
          featured={featured}
          savings={savings}
          className="aspect-[16/10] w-full"
        />
        <DealCardBody {...bodyProps} />
        <DealCardCta dealId={deal.id} featured={featured} className="w-full" />
      </div>

      {/* Desktop: image | content | CTA column */}
      <div className="hidden gap-0 sm:flex sm:items-stretch">
        <div className="p-3 pr-0">
          <DealCardImage
            deal={deal}
            featured={featured}
            savings={savings}
            className="h-[7.5rem] w-[7.5rem] lg:h-[8rem] lg:w-[8rem]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center p-3">
          <DealCardBody {...bodyProps} />
        </div>
        <div className="flex w-[8.5rem] shrink-0 flex-col justify-center border-l border-border/40 p-3 lg:w-[9rem]">
          <DealCardCta dealId={deal.id} featured={featured} layout="side" />
        </div>
      </div>
    </article>
  );
}

export function FeedSubmitPrompt() {
  return (
    <p className="deal-card deal-card-standard rounded-2xl px-4 py-3 text-center text-sm text-muted-foreground">
      {t("feed.submitPrompt")}{" "}
      <Link href="/submit" className="font-semibold text-primary hover:underline">
        {t("nav.submitCta")} →
      </Link>
    </p>
  );
}

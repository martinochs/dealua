import { formatUAH, formatRelativeTime, getSavingsPercent, getVoteScore } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Flame, MessageCircle, Snowflake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { DealWithRelations } from "@/types/database";

interface DealCardProps {
  deal: DealWithRelations;
  layout?: "grid" | "feed";
  commentCount?: number;
}

export function DealCard({ deal, layout = "grid", commentCount = 0 }: DealCardProps) {
  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const savings = getSavingsPercent(
    Number(deal.price_uah),
    deal.original_price_uah ? Number(deal.original_price_uah) : null
  );
  const isHot = score >= 0;

  if (layout === "feed") {
    return (
      <Link href={`/deal/${deal.id}`} className="group block">
        <article className="flex overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary/40 hover:bg-accent/30">
          <div
            className={`flex w-14 shrink-0 flex-col items-center justify-center gap-0.5 border-r py-3 sm:w-[4.25rem] ${
              isHot ? "bg-hot/10" : "bg-cold/10"
            }`}
          >
            {isHot ? (
              <Flame className="h-4 w-4 text-hot sm:h-5 sm:w-5" />
            ) : (
              <Snowflake className="h-4 w-4 text-cold sm:h-5 sm:w-5" />
            )}
            <span
              className={`text-xl font-extrabold tabular-nums leading-none sm:text-2xl ${
                isHot ? "text-hot" : "text-cold"
              }`}
            >
              {score}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              °
            </span>
          </div>

          <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 bg-muted sm:h-28 sm:w-28">
            {deal.image_url ? (
              <Image
                src={deal.image_url}
                alt={deal.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 88px, 112px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-3xl">🛍️</div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:gap-1.5 sm:px-4 sm:py-3">
            <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight group-hover:text-primary sm:text-base">
              {deal.title}
            </h2>

            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-lg font-bold text-primary sm:text-xl">
                {formatUAH(Number(deal.price_uah))}
              </span>
              {deal.original_price_uah && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatUAH(Number(deal.original_price_uah))}
                </span>
              )}
              {savings && (
                <Badge variant="hot" className="px-1.5 py-0 text-xs font-bold">
                  -{savings}%
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
              {deal.merchant && <span className="font-medium">{deal.merchant.name}</span>}
              {deal.category && (
                <span className="truncate">
                  {deal.category.icon} {deal.category.name_uk}
                </span>
              )}
              <span className="ml-auto flex items-center gap-3 whitespace-nowrap">
                {commentCount > 0 && (
                  <span className="inline-flex items-center gap-0.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {commentCount}
                  </span>
                )}
                <span>{formatRelativeTime(deal.created_at)}</span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/deal/${deal.id}`} className="group block">
      <article className="flex h-full gap-3 rounded-lg border bg-card p-3 transition-shadow hover:shadow-md">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted sm:h-24 sm:w-24">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl">🛍️</div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h2 className="line-clamp-2 text-sm font-semibold group-hover:text-primary sm:text-base">
              {deal.title}
            </h2>
            <div
              className={`flex flex-shrink-0 items-center gap-0.5 text-sm font-bold ${
                isHot ? "text-hot" : "text-cold"
              }`}
            >
              {score >= 10 && <span className="text-xs">🔥</span>}
              {isHot ? <Flame className="h-4 w-4" /> : <Snowflake className="h-4 w-4" />}
              {score}
            </div>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="font-bold text-primary">{formatUAH(Number(deal.price_uah))}</span>
            {deal.original_price_uah && (
              <span className="text-sm text-muted-foreground line-through">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savings && <Badge variant="hot">-{savings}%</Badge>}
          </div>

          <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
            {deal.merchant && <span>{deal.merchant.name}</span>}
            {deal.category && (
              <Badge variant="secondary" className="text-xs">
                {deal.category.icon} {deal.category.name_uk}
              </Badge>
            )}
            <span className="ml-auto">{formatRelativeTime(deal.created_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

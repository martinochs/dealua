import { formatUAH, formatRelativeTime, getSavingsPercent, getVoteScore } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Flame, Snowflake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { DealWithRelations } from "@/types/database";

interface DealCardProps {
  deal: DealWithRelations;
}

export function DealCard({ deal }: DealCardProps) {
  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const savings = getSavingsPercent(Number(deal.price_uah), deal.original_price_uah ? Number(deal.original_price_uah) : null);

  return (
    <Link href={`/deal/${deal.id}`} className="group block">
      <article className="flex gap-3 rounded-lg border bg-card p-3 hover:shadow-md transition-shadow h-full">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
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

        <div className="flex flex-1 flex-col min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
              {deal.title}
            </h2>
            <div className={`flex items-center gap-0.5 text-sm font-bold flex-shrink-0 ${score >= 0 ? "text-hot" : "text-cold"}`}>
              {score >= 10 && <span className="text-xs">🔥</span>}
              {score >= 0 ? <Flame className="h-4 w-4" /> : <Snowflake className="h-4 w-4" />}
              {score}
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <span className="font-bold text-primary">{formatUAH(Number(deal.price_uah))}</span>
            {deal.original_price_uah && (
              <span className="text-sm text-muted-foreground line-through">
                {formatUAH(Number(deal.original_price_uah))}
              </span>
            )}
            {savings && <Badge variant="hot">-{savings}%</Badge>}
          </div>

          <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-muted-foreground">
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

import Link from "next/link";
import Image from "next/image";
import { getVoteScore, formatUAH } from "@/lib/utils";
import { Flame } from "lucide-react";
import type { DealWithRelations } from "@/types/database";

interface HotDealsStripProps {
  deals: DealWithRelations[];
}

export function HotDealsStrip({ deals }: HotDealsStripProps) {
  const hot = [...deals]
    .sort((a, b) => getVoteScore(b.hot_count, b.cold_count) - getVoteScore(a.hot_count, a.cold_count))
    .slice(0, 4);

  if (hot.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Flame className="h-5 w-5 text-hot" />
        Топ пропозиції
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {hot.map((deal) => (
          <Link
            key={deal.id}
            href={`/deal/${deal.id}`}
            className="snap-start shrink-0 w-[260px] rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-32 bg-muted">
              {deal.image_url ? (
                <Image src={deal.image_url} alt={deal.title} fill className="object-cover" sizes="260px" />
              ) : (
                <div className="flex h-full items-center justify-center text-3xl">🛍️</div>
              )}
            </div>
            <div className="p-3 space-y-1">
              <p className="font-medium text-sm line-clamp-2">{deal.title}</p>
              <p className="text-primary font-bold">{formatUAH(Number(deal.price_uah))}</p>
              <p className="text-xs text-hot font-medium">
                +{getVoteScore(deal.hot_count, deal.cold_count)} голосів
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

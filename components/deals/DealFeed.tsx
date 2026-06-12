import { DealCard } from "./DealCard";
import { t } from "@/lib/i18n/uk";
import type { DealWithRelations } from "@/types/database";

interface DealFeedProps {
  deals: DealWithRelations[];
}

export function DealFeed({ deals }: DealFeedProps) {
  if (deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg">{t("feed.empty")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}

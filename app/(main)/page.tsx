import Link from "next/link";
import { DealFeed } from "@/components/deals/DealFeed";
import { FeedTabs } from "@/components/deals/FeedTabs";
import { LoadMore } from "@/components/deals/LoadMore";
import { HotDealsStrip } from "@/components/deals/HotDealsStrip";
import { CategoryGrid } from "@/components/deals/CategoryGrid";
import { HeroSection } from "@/components/layout/HeroSection";
import { getCategories, getDeals, countDeals, getStats } from "@/lib/queries/deals";
import { DEALS_PAGE_SIZE } from "@/lib/constants";
import { t } from "@/lib/i18n/uk";
import type { SortMode } from "@/types/database";

interface HomePageProps {
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const sort = (["hot", "new", "top"].includes(params.sort ?? "") ? params.sort : "hot") as SortMode;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const stats = await getStats();

  const [deals, categories, total, allForStrip] = await Promise.all([
    getDeals(sort, undefined, page * DEALS_PAGE_SIZE, 0),
    getCategories(),
    countDeals(sort),
    getDeals("hot", undefined, 20),
  ]);

  const hasMore = deals.length < total;

  return (
    <div className="space-y-8">
      <HeroSection dealCount={stats.approvedDeals} categoryCount={stats.categories} />

      <HotDealsStrip deals={allForStrip} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("nav.categories")}</h2>
          <Link href="/categories" className="text-sm text-primary hover:underline">
            Усі категорії →
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Пропозиції</h2>
        <FeedTabs currentSort={sort} />
        <DealFeed deals={deals} />
        <LoadMore hasMore={hasMore} nextPage={page + 1} basePath="/" params={{ sort }} />
      </section>
    </div>
  );
}

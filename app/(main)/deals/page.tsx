import { DealFeed } from "@/components/deals/DealFeed";
import { FeedTabs } from "@/components/deals/FeedTabs";
import { LoadMore } from "@/components/deals/LoadMore";
import { SearchBarWrapper } from "@/components/layout/SearchBarWrapper";
import { getDeals, countDeals } from "@/lib/queries/deals";
import { DEALS_PAGE_SIZE } from "@/lib/constants";
import { t } from "@/lib/i18n/uk";
import { parseSortMode } from "@/lib/constants";

interface DealsPageProps {
  searchParams: Promise<{ sort?: string; q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: DealsPageProps) {
  const params = await searchParams;
  if (params.q) {
    return { title: `${t("feed.searchResults")}: ${params.q}` };
  }
  return { title: "Усі пропозиції" };
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  const params = await searchParams;
  const sort = parseSortMode(params.sort);
  const query = params.q?.trim();
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const [deals, total] = await Promise.all([
    getDeals(sort, undefined, page * DEALS_PAGE_SIZE, 0, query),
    countDeals(sort, undefined, query),
  ]);

  const feedBase = "/deals";
  const hasMore = deals.length < total;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {query ? t("feed.searchResults") : "Усі пропозиції"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {query
            ? `"${query}" — ${total} ${total === 1 ? "результат" : "результатів"}`
            : `${total} активних пропозицій`}
        </p>
      </div>

      <SearchBarWrapper defaultQuery={query} />

      <FeedTabs
        currentSort={sort}
        basePath={query ? `/deals?q=${encodeURIComponent(query)}` : "/deals"}
      />

      {deals.length === 0 && query ? (
        <p className="text-center text-muted-foreground py-12">{t("feed.noSearchResults")}</p>
      ) : (
        <>
          <DealFeed deals={deals} />
          <LoadMore
            hasMore={hasMore}
            nextPage={page + 1}
            basePath={feedBase}
            params={{ sort, q: query }}
          />
        </>
      )}
    </div>
  );
}

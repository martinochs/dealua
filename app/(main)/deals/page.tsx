import { DealFeed } from "@/components/deals/DealFeed";
import { FeedTabs } from "@/components/deals/FeedTabs";
import { LoadMore } from "@/components/deals/LoadMore";
import { getProfile } from "@/lib/auth/session";
import { getDeals, countDeals, getCommentCounts, getUserVotes } from "@/lib/queries/deals";
import { DEALS_PAGE_SIZE, parseSortMode } from "@/lib/constants";
import { t } from "@/lib/i18n/uk";

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

  const [deals, total, commentCounts, profile] = await Promise.all([
    getDeals(sort, undefined, page * DEALS_PAGE_SIZE, 0, query),
    countDeals(sort, undefined, query),
    getCommentCounts(),
    getProfile(),
  ]);

  const userVotes = profile
    ? await getUserVotes(
        deals.map((d) => d.id),
        profile.id
      )
    : {};

  const feedBase = "/deals";
  const hasMore = deals.length < total;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-1">
      <div className="py-1">
        <p className="text-xs text-muted-foreground sm:text-sm">
          <span className="font-semibold text-foreground">
            {query ? t("feed.searchResults") : "Усі пропозиції"}
          </span>
          {" · "}
          {query
            ? `"${query}" — ${total} ${total === 1 ? "результат" : "результатів"}`
            : `${total} активних пропозицій`}
        </p>
      </div>

      <FeedTabs
        currentSort={sort}
        basePath={query ? `/deals?q=${encodeURIComponent(query)}` : "/deals"}
        showAllTab={false}
        variant="underline"
      />

      {deals.length === 0 && query ? (
        <p className="py-8 text-center text-sm text-muted-foreground">{t("feed.noSearchResults")}</p>
      ) : (
        <>
          <DealFeed
            deals={deals}
            commentCounts={commentCounts}
            userVotes={userVotes}
            isLoggedIn={!!profile}
          />
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

import { InfiniteDealFeed } from "@/components/deals/InfiniteDealFeed";
import { FeedToolbar } from "@/components/home/FeedToolbar";
import { StickyFeedNav } from "@/components/home/StickyFeedNav";
import { HOME_PAGE_SIZE, parseSortMode } from "@/lib/constants";
import { getProfile } from "@/lib/auth/session";
import {
  countDeals,
  getCategories,
  getCommentCounts,
  getDeals,
  getUserVotes,
} from "@/lib/queries/deals";

interface HomePageProps {
  searchParams: Promise<{ sort?: string; cat?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const sort = parseSortMode(params.sort);
  const categorySlug = params.cat?.trim() || undefined;

  const [deals, total, commentCounts, categories, profile] = await Promise.all([
    getDeals(sort, categorySlug, HOME_PAGE_SIZE, 0),
    countDeals(sort, categorySlug),
    getCommentCounts(),
    getCategories(),
    getProfile(),
  ]);

  const userVotes = profile
    ? await getUserVotes(
        deals.map((d) => d.id),
        profile.id
      )
    : {};

  const activeCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : undefined;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <FeedToolbar
        total={total}
        sort={sort}
        categoryName={activeCategory?.name_uk}
      />
      <StickyFeedNav
        categories={categories}
        activeCategory={categorySlug}
        sort={sort}
      />
      <div className="pt-4">
        <InfiniteDealFeed
          initialDeals={deals}
          initialCommentCounts={commentCounts}
          initialUserVotes={userVotes}
          sort={sort}
          category={categorySlug}
          initialPage={1}
          hasMore={deals.length < total}
          pageSize={HOME_PAGE_SIZE}
          isLoggedIn={!!profile}
        />
      </div>
    </div>
  );
}

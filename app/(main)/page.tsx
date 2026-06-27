import { InfiniteDealFeed } from "@/components/deals/InfiniteDealFeed";
import { CommunityTipsBar } from "@/components/home/CommunityTipsBar";
import { HOME_PAGE_SIZE, parseSortMode } from "@/lib/constants";
import { getProfile } from "@/lib/auth/session";
import {
  countDeals,
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

  const [deals, total, commentCounts, profile] = await Promise.all([
    getDeals(sort, categorySlug, HOME_PAGE_SIZE, 0),
    countDeals(sort, categorySlug),
    getCommentCounts(),
    getProfile(),
  ]);

  const userVotes = profile
    ? await getUserVotes(
        deals.map((d) => d.id),
        profile.id
      )
    : {};

  return (
    <div className="mx-auto w-full max-w-6xl">
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
      <CommunityTipsBar />
    </div>
  );
}

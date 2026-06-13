import { notFound } from "next/navigation";
import { DealFeed } from "@/components/deals/DealFeed";
import { FeedTabs } from "@/components/deals/FeedTabs";
import { LoadMore } from "@/components/deals/LoadMore";
import { getProfile } from "@/lib/auth/session";
import { getCategories, getDeals, countDeals, getCommentCounts, getUserVotes } from "@/lib/queries/deals";
import { DEALS_PAGE_SIZE, parseSortMode } from "@/lib/constants";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Категорія" };
  return { title: category.name_uk };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const queryParams = await searchParams;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const sort = parseSortMode(queryParams.sort);
  const page = Math.max(1, parseInt(queryParams.page ?? "1", 10) || 1);
  const basePath = `/category/${slug}`;

  const [deals, total, commentCounts, profile] = await Promise.all([
    getDeals(sort, slug, page * DEALS_PAGE_SIZE, 0),
    countDeals(sort, slug),
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
    <div className="mx-auto w-full max-w-6xl space-y-1">
      <p className="py-1 text-xs text-muted-foreground sm:text-sm">
        <span className="font-semibold text-foreground">
          {category.icon} {category.name_uk}
        </span>
        {" · "}
        {total} пропозицій
      </p>
      <FeedTabs currentSort={sort} basePath={basePath} category={slug} />
      <DealFeed
        deals={deals}
        commentCounts={commentCounts}
        userVotes={userVotes}
        isLoggedIn={!!profile}
      />
      <LoadMore hasMore={deals.length < total} nextPage={page + 1} basePath={basePath} params={{ sort }} />
    </div>
  );
}

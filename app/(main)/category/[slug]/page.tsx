import { notFound } from "next/navigation";
import { DealFeed } from "@/components/deals/DealFeed";
import { FeedTabs } from "@/components/deals/FeedTabs";
import { LoadMore } from "@/components/deals/LoadMore";
import { getCategories, getDeals, countDeals } from "@/lib/queries/deals";
import { DEALS_PAGE_SIZE } from "@/lib/constants";
import type { SortMode } from "@/types/database";

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

  const sort = (["hot", "new", "top"].includes(queryParams.sort ?? "") ? queryParams.sort : "hot") as SortMode;
  const page = Math.max(1, parseInt(queryParams.page ?? "1", 10) || 1);
  const basePath = `/category/${slug}`;

  const [deals, total] = await Promise.all([
    getDeals(sort, slug, page * DEALS_PAGE_SIZE, 0),
    countDeals(sort, slug),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {category.icon} {category.name_uk}
      </h1>
      <p className="text-muted-foreground">{total} пропозицій</p>
      <FeedTabs currentSort={sort} basePath={basePath} />
      <DealFeed deals={deals} />
      <LoadMore hasMore={deals.length < total} nextPage={page + 1} basePath={basePath} params={{ sort }} />
    </div>
  );
}

import Link from "next/link";
import { getCategories, getDeals } from "@/lib/queries/deals";
import { CategoryGrid } from "@/components/deals/CategoryGrid";
import { t } from "@/lib/i18n/uk";

export const metadata = {
  title: "Категорії",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => ({
      ...cat,
      dealCount: (await getDeals("hot", cat.slug, 100)).length,
    }))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{t("nav.categories")}</h1>
        <p className="text-muted-foreground mt-1">Оберіть категорію для перегляду пропозицій</p>
      </div>

      <CategoryGrid categories={categories} />

      <div className="space-y-4">
        {categoriesWithCounts.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent transition-colors min-h-[56px]"
          >
            <span className="font-medium">
              {cat.icon} {cat.name_uk}
            </span>
            <span className="text-sm text-muted-foreground">{cat.dealCount} пропозицій</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

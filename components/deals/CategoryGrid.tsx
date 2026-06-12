import Link from "next/link";
import type { Category } from "@/types/database";
import { getMockDeals } from "@/lib/mock/store";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {categories.map((cat) => {
        const count = getMockDeals("hot", cat.slug, 100).length;
        return (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 hover:shadow-md hover:border-primary/30 transition-all text-center min-h-[88px] justify-center"
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-sm font-medium leading-tight">{cat.name_uk}</span>
            <span className="text-xs text-muted-foreground">{count} пропоз.</span>
          </Link>
        );
      })}
    </div>
  );
}

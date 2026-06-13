"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { Category } from "@/types/database";
import type { SortMode } from "@/types/database";

interface HomeCategoryBarProps {
  categories: Category[];
  activeCategory?: string;
  sort: SortMode;
}

export function HomeCategoryBar({ categories, activeCategory, sort }: HomeCategoryBarProps) {
  function href(slug?: string) {
    const params = new URLSearchParams();
    params.set("sort", sort);
    if (slug) params.set("cat", slug);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  }

  return (
    <div
      className="flex gap-2.5 overflow-x-auto py-3 scrollbar-none"
      aria-label={t("nav.categories")}
    >
      <Link
        href={href()}
        aria-current={!activeCategory ? "page" : undefined}
        className={cn(
          "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all",
          !activeCategory
            ? "bg-primary text-primary-foreground shadow-md"
            : "border bg-card text-foreground shadow-sm hover:border-primary/30 hover:shadow"
        )}
      >
        {t("feed.allDeals")}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={href(cat.slug)}
          aria-current={activeCategory === cat.slug ? "page" : undefined}
          className={cn(
            "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all",
            activeCategory === cat.slug
              ? "bg-primary text-primary-foreground shadow-md"
              : "border bg-card text-foreground shadow-sm hover:border-primary/30 hover:shadow"
          )}
        >
          <span className="text-lg leading-none" aria-hidden>
            {cat.icon}
          </span>
          {cat.name_uk}
        </Link>
      ))}
    </div>
  );
}

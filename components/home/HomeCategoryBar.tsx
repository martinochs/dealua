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
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none" aria-label={t("nav.categories")}>
      <Link
        href={href()}
        aria-current={!activeCategory ? "page" : undefined}
        className={cn(
          "shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
          !activeCategory
            ? "bg-primary text-primary-foreground"
            : "border hover:bg-uk-yellow/25 hover:text-uk-yellow-foreground"
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
            "shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
            activeCategory === cat.slug
              ? "bg-primary text-primary-foreground"
              : "border hover:bg-uk-yellow/25 hover:text-uk-yellow-foreground"
          )}
        >
          {cat.icon} {cat.name_uk}
        </Link>
      ))}
    </div>
  );
}

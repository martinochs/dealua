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

  const pillBase =
    "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition-all duration-200";

  return (
    <div className="flex gap-3 overflow-x-auto py-4 scrollbar-none" aria-label={t("nav.categories")}>
      <Link
        href={href()}
        aria-current={!activeCategory ? "page" : undefined}
        className={cn(
          pillBase,
          !activeCategory
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-card text-foreground shadow-sm hover:-translate-y-px hover:shadow-md"
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
            pillBase,
            activeCategory === cat.slug
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card text-foreground shadow-sm hover:-translate-y-px hover:shadow-md"
          )}
        >
          <span className="text-2xl leading-none" aria-hidden>
            {cat.icon}
          </span>
          {cat.name_uk}
        </Link>
      ))}
    </div>
  );
}

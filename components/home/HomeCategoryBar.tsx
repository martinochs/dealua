"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-200 sm:px-4 sm:py-2.5";

  const items = categories.map((c) => ({ slug: c.slug, icon: c.icon, label: c.name_uk }));

  return (
    <div
      className="relative flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none sm:py-3"
      aria-label={t("nav.categories")}
    >
      {items.map((item) => {
        const active = activeCategory === item.slug;
        return (
          <Link
            key={item.slug}
            href={href(item.slug)}
            aria-current={active ? "page" : undefined}
            scroll={false}
            className={cn(
              pillBase,
              active
                ? "border-primary/30 bg-primary text-primary-foreground shadow-sm"
                : "border-border/60 bg-card text-foreground shadow-sm hover:border-border hover:shadow-md"
            )}
          >
            <span className="text-base leading-none" aria-hidden>
              {item.icon}
            </span>
            <span className="max-w-[8rem] truncate sm:max-w-none">{item.label}</span>
          </Link>
        );
      })}
      <Link
        href="/categories"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary sm:h-10 sm:w-10"
        aria-label={t("nav.categories")}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

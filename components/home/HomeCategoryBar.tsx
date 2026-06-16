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
    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-200";

  const mobileItems = [
    { slug: undefined, icon: "📦", label: t("feed.allDeals") },
    ...categories.slice(0, 5).map((c) => ({ slug: c.slug, icon: c.icon, label: c.name_uk })),
  ];

  return (
    <>
      {/* Mobile: circular icon categories */}
      <div
        className="flex gap-4 overflow-x-auto py-3 scrollbar-none sm:hidden"
        aria-label={t("nav.categories")}
      >
        {mobileItems.map((item) => {
          const active = item.slug ? activeCategory === item.slug : !activeCategory;
          return (
            <Link
              key={item.slug ?? "all"}
              href={href(item.slug)}
              aria-current={active ? "page" : undefined}
              className="flex w-[4.25rem] shrink-0 flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-sm transition-all",
                  active ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                )}
              >
                {item.icon}
              </span>
              <span
                className={cn(
                  "line-clamp-2 text-center text-[10px] font-semibold leading-tight",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        {categories.length > 5 && (
          <Link href="/categories" className="flex w-[4.25rem] shrink-0 flex-col items-center gap-1.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-lg shadow-sm">
              ···
            </span>
            <span className="text-center text-[10px] font-semibold text-muted-foreground">{t("feed.more")}</span>
          </Link>
        )}
      </div>

      {/* Desktop: pill categories */}
      <div
        className="hidden gap-2 overflow-x-auto py-3 scrollbar-none sm:flex"
        aria-label={t("nav.categories")}
      >
        <Link
          href={href()}
          aria-current={!activeCategory ? "page" : undefined}
          className={cn(
            pillBase,
            !activeCategory
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card text-foreground shadow-sm hover:shadow-md"
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
                : "bg-card text-foreground shadow-sm hover:shadow-md"
            )}
          >
            <span className="text-lg leading-none" aria-hidden>
              {cat.icon}
            </span>
            {cat.name_uk}
          </Link>
        ))}
      </div>
    </>
  );
}

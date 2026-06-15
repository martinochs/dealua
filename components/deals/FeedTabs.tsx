"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { SortMode } from "@/types/database";

interface FeedTabsProps {
  currentSort: SortMode;
  basePath?: string;
  category?: string;
  embedded?: boolean;
}

export function FeedTabs({ currentSort, basePath = "/", category, embedded = false }: FeedTabsProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (embedded) return;

    function syncStickyTop() {
      const chrome = document.getElementById("site-chrome");
      const nav = navRef.current;
      if (chrome && nav) {
        nav.style.top = `${chrome.offsetHeight}px`;
      }
    }
    syncStickyTop();
    window.addEventListener("resize", syncStickyTop);
    return () => window.removeEventListener("resize", syncStickyTop);
  }, [embedded]);

  const sorts: { value: SortMode; label: string }[] = [
    { value: "hot", label: t("feed.hot") },
    { value: "new", label: t("feed.new") },
    { value: "top", label: t("feed.trending") },
    { value: "commented", label: t("feed.commented") },
  ];

  function sortHref(sort: SortMode) {
    const [path, existingQuery] = basePath.split("?");
    const params = new URLSearchParams(existingQuery ?? "");
    params.set("sort", sort);
    params.delete("page");
    if (category) params.set("cat", category);
    else params.delete("cat");
    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
  }

  return (
    <nav
      ref={navRef}
      className={cn(
        "feed-sort-nav",
        !embedded &&
          "sticky z-30 -mx-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/90"
      )}
      aria-label="Сортування пропозицій"
    >
      <div className="flex gap-1.5 overflow-x-auto py-2 scrollbar-none">
        {sorts.map((sort) => (
          <Link
            key={sort.value}
            href={sortHref(sort.value)}
            aria-current={currentSort === sort.value ? "page" : undefined}
            scroll={false}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
              currentSort === sort.value
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-sm"
            )}
          >
            {sort.value === "hot" && <Flame className="h-3.5 w-3.5" aria-hidden />}
            {sort.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

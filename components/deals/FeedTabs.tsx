"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Flame, MessageCircle, TrendingUp, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { SortMode } from "@/types/database";

interface FeedTabsProps {
  currentSort: SortMode;
  basePath?: string;
  category?: string;
  embedded?: boolean;
  variant?: "pill" | "underline";
  showAllTab?: boolean;
}

type TabKey = "all" | SortMode;

const TAB_ICONS: Record<TabKey, typeof Flame> = {
  all: Flame,
  hot: Zap,
  new: Sparkles,
  top: TrendingUp,
  commented: MessageCircle,
};

export function FeedTabs({
  currentSort,
  basePath = "/",
  category,
  embedded = false,
  variant = "underline",
  showAllTab = true,
}: FeedTabsProps) {
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

  const tabs: { key: TabKey; label: string }[] = [
    ...(showAllTab ? [{ key: "all" as const, label: t("feed.allDeals") }] : []),
    { key: "hot", label: t("feed.hot") },
    { key: "new", label: t("feed.new") },
    { key: "top", label: t("feed.trending") },
    { key: "commented", label: t("feed.commented") },
  ];

  function sortHref(sort: TabKey) {
    const [path, existingQuery] = basePath.split("?");
    const params = new URLSearchParams(existingQuery ?? "");
    if (sort === "all") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    params.delete("page");
    if (category) params.set("cat", category);
    else params.delete("cat");
    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
  }

  function isActive(tab: TabKey) {
    if (tab === "all") {
      return !category && currentSort === "hot" && basePath === "/";
    }
    if (tab === "hot") {
      return currentSort === "hot" && (!!category || basePath !== "/" || !showAllTab);
    }
    return currentSort === tab;
  }

  const isUnderline = variant === "underline";

  return (
    <nav
      ref={navRef}
      className={cn(
        "feed-sort-nav",
        !embedded &&
          !isUnderline &&
          "sticky z-30 -mx-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/90",
        !embedded &&
          isUnderline &&
          "sticky z-30 -mx-4 border-b border-border/40 bg-background/98 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/95"
      )}
      aria-label="Сортування пропозицій"
    >
      <div
        className={cn(
          "flex gap-0 overflow-x-auto scrollbar-none",
          isUnderline ? "py-0" : "gap-1.5 py-2"
        )}
      >
        {tabs.map((tab) => {
          const Icon = TAB_ICONS[tab.key];
          const active = isActive(tab.key);
          return (
            <Link
              key={tab.key}
              href={sortHref(tab.key)}
              aria-current={active ? "page" : undefined}
              scroll={false}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold transition-colors duration-200",
                isUnderline
                  ? cn(
                      "border-b-2 px-3 py-3 sm:px-4",
                      active
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    )
                  : cn(
                      "rounded-full px-4 py-2",
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-sm"
                    )
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

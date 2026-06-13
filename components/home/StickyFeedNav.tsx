"use client";

import { useEffect, useRef } from "react";
import { HomeCategoryBar } from "./HomeCategoryBar";
import { FeedTabs } from "@/components/deals/FeedTabs";
import type { Category, SortMode } from "@/types/database";

interface StickyFeedNavProps {
  categories: Category[];
  activeCategory?: string;
  sort: SortMode;
}

export function StickyFeedNav({ categories, activeCategory, sort }: StickyFeedNavProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function syncStickyTop() {
      const chrome = document.getElementById("site-chrome");
      const wrapper = wrapperRef.current;
      if (chrome && wrapper) {
        wrapper.style.top = `${chrome.offsetHeight}px`;
      }
    }
    syncStickyTop();
    window.addEventListener("resize", syncStickyTop);
    return () => window.removeEventListener("resize", syncStickyTop);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="sticky z-30 -mx-4 border-b border-border/40 bg-background/98 px-4 pb-2 backdrop-blur-md supports-[backdrop-filter]:bg-background/95"
    >
      <HomeCategoryBar categories={categories} activeCategory={activeCategory} sort={sort} />
      <FeedTabs currentSort={sort} category={activeCategory} embedded />
    </div>
  );
}

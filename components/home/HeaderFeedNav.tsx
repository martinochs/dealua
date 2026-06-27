"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { HomeCategoryBar } from "@/components/home/HomeCategoryBar";
import { FeedTabs } from "@/components/deals/FeedTabs";
import { parseSortMode } from "@/lib/constants";
import type { Category } from "@/types/database";

interface HeaderFeedNavProps {
  categories: Category[];
}

function HeaderFeedNavInner({ categories }: HeaderFeedNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname !== "/") return null;

  const sort = parseSortMode(searchParams.get("sort") ?? undefined);
  const activeCategory = searchParams.get("cat")?.trim() || undefined;

  return (
    <div className="border-t border-border/40 bg-background/98">
      <div className="container mx-auto px-4">
        <FeedTabs
          currentSort={sort}
          category={activeCategory}
          embedded
          variant="underline"
        />
        <HomeCategoryBar categories={categories} activeCategory={activeCategory} sort={sort} />
      </div>
    </div>
  );
}

export function HeaderFeedNav({ categories }: HeaderFeedNavProps) {
  return (
    <Suspense fallback={null}>
      <HeaderFeedNavInner categories={categories} />
    </Suspense>
  );
}

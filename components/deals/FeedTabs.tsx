"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/lib/i18n/uk";
import type { SortMode } from "@/types/database";

interface FeedTabsProps {
  currentSort: SortMode;
  basePath?: string;
}

export function FeedTabs({ currentSort, basePath = "/" }: FeedTabsProps) {
  const sorts: { value: SortMode; label: string }[] = [
    { value: "hot", label: t("feed.hot") },
    { value: "new", label: t("feed.new") },
    { value: "top", label: t("feed.top") },
  ];

  function sortHref(sort: SortMode) {
    const [path, existingQuery] = basePath.split("?");
    const params = new URLSearchParams(existingQuery ?? "");
    params.set("sort", sort);
    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
  }

  return (
    <Tabs value={currentSort}>
      <TabsList>
        {sorts.map((sort) => (
          <TabsTrigger key={sort.value} value={sort.value} asChild>
            <Link href={sortHref(sort.value)}>{sort.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

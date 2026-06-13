"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DealFeedCard, FeedSubmitPrompt } from "./DealFeedCard";
import { DealCardSkeleton } from "./DealCardSkeleton";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";
import type { DealWithRelations, SortMode } from "@/types/database";

interface InfiniteDealFeedProps {
  initialDeals: DealWithRelations[];
  initialCommentCounts: Record<string, number>;
  initialUserVotes: Record<string, "hot" | "cold" | null>;
  sort: SortMode;
  category?: string;
  initialPage: number;
  hasMore: boolean;
  pageSize: number;
  isLoggedIn: boolean;
}

export function InfiniteDealFeed({
  initialDeals,
  initialCommentCounts,
  initialUserVotes,
  sort,
  category,
  initialPage,
  hasMore: initialHasMore,
  pageSize,
  isLoggedIn,
}: InfiniteDealFeedProps) {
  const [deals, setDeals] = useState(initialDeals);
  const [commentCounts, setCommentCounts] = useState(initialCommentCounts);
  const [userVotes, setUserVotes] = useState(initialUserVotes);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDeals(initialDeals);
    setCommentCounts(initialCommentCounts);
    setUserVotes(initialUserVotes);
    setPage(initialPage);
    setHasMore(initialHasMore);
    setError(false);
  }, [
    initialDeals,
    initialCommentCounts,
    initialUserVotes,
    initialPage,
    initialHasMore,
    sort,
    category,
  ]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || error) return;
    setLoading(true);
    setError(false);
    try {
      const nextPage = page + 1;
      const params = new URLSearchParams({
        sort,
        page: String(nextPage),
        limit: String(pageSize),
      });
      if (category) params.set("cat", category);

      const res = await fetch(`/api/deals?${params.toString()}`);
      if (!res.ok) {
        setError(true);
        return;
      }
      const data = await res.json();
      setDeals((prev) => {
        const ids = new Set(prev.map((d) => d.id));
        const fresh = (data.deals as DealWithRelations[]).filter((d) => !ids.has(d.id));
        return [...prev, ...fresh];
      });
      setCommentCounts((prev) => ({ ...prev, ...data.commentCounts }));
      setUserVotes((prev) => ({ ...prev, ...(data.userVotes ?? {}) }));
      setPage(nextPage);
      setHasMore(data.hasMore);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, error, page, sort, category, pageSize]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "600px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  if (deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-muted-foreground">
        <p className="text-lg">{t("feed.empty")}</p>
        <FeedSubmitPrompt />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {deals.map((deal, index) => (
        <DealFeedCard
          key={deal.id}
          deal={deal}
          commentCount={commentCounts[deal.id] ?? 0}
          userVote={userVotes[deal.id] ?? null}
          isLoggedIn={isLoggedIn}
          rank={index}
        />
      ))}

      {deals.length >= 5 && deals.length < 12 && <FeedSubmitPrompt />}

      <div ref={sentinelRef} className="h-1" aria-hidden />

      {loading && (
        <div className="space-y-5 pt-1">
          <DealCardSkeleton />
          <DealCardSkeleton />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center gap-2 py-4">
          <p className="text-sm text-muted-foreground">{t("feed.loadError")}</p>
          <Button variant="outline" size="sm" onClick={() => void loadMore()}>
            {t("feed.retry")}
          </Button>
        </div>
      )}

      {!hasMore && !loading && deals.length > 0 && (
        <p className="py-3 text-center text-xs text-muted-foreground">{t("feed.end")}</p>
      )}
    </div>
  );
}

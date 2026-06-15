"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { voteAction } from "@/lib/actions/vote";
import { getRecommendPercent } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface DealVotePanelProps {
  dealId: string;
  hotCount: number;
  coldCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  featured?: boolean;
  variant?: "panel" | "compact";
  className?: string;
}

export function DealVotePanel({
  dealId,
  hotCount: initialHot,
  coldCount: initialCold,
  userVote: initialVote,
  isLoggedIn,
  featured = false,
  variant = "panel",
  className,
}: DealVotePanelProps) {
  const router = useRouter();
  const [hotCount, setHotCount] = useState(initialHot);
  const [coldCount, setColdCount] = useState(initialCold);
  const [userVote, setUserVote] = useState(initialVote);
  const [isPending, startTransition] = useTransition();

  const percent = getRecommendPercent(hotCount, coldCount);

  function handleVote(type: "hot" | "cold", e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    startTransition(() => {
      void voteAction(dealId, type).then((result) => {
        if (result.error) return;
        if (result.hot_count !== undefined) setHotCount(result.hot_count);
        if (result.cold_count !== undefined) setColdCount(result.cold_count);
        if (result.user_vote !== undefined) setUserVote(result.user_vote);
        router.refresh();
      });
    });
  }

  const compact = variant === "compact";

  return (
    <div
      className={cn(
        compact
          ? "flex flex-1 items-center justify-between gap-2 rounded-xl border border-border/60 bg-secondary/30 px-2.5 py-2"
          : "flex shrink-0 flex-col items-center rounded-xl border border-border/60 bg-secondary/30 px-2.5 py-2.5 sm:min-w-[5.75rem]",
        featured && "border-primary/15 bg-primary/[0.04]",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className={cn(
          "font-semibold text-muted-foreground",
          compact ? "text-[10px]" : "mb-1.5 text-center text-[9px] leading-tight sm:text-[10px]"
        )}
      >
        {t("deals.usefulDeal")}
      </p>
      <div className={cn("flex items-center", compact ? "gap-2" : "gap-1.5")}>
        <button
          type="button"
          className={cn(
            "inline-flex flex-col items-center rounded-lg border px-2 py-1 transition-all active:scale-95",
            userVote === "hot"
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-emerald-200/80 bg-white text-emerald-600 hover:bg-emerald-50"
          )}
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <ThumbsUp className="h-4 w-4" strokeWidth={2.5} />
          <span className="mt-0.5 text-[10px] font-bold tabular-nums">{hotCount}</span>
        </button>
        <button
          type="button"
          className={cn(
            "inline-flex flex-col items-center rounded-lg border px-2 py-1 transition-all active:scale-95",
            userVote === "cold"
              ? "border-red-400 bg-red-50 text-red-600"
              : "border-red-200/80 bg-white text-red-500 hover:bg-red-50"
          )}
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <ThumbsDown className="h-4 w-4" strokeWidth={2.5} />
          <span className="mt-0.5 text-[10px] font-bold tabular-nums">{coldCount}</span>
        </button>
        {compact && percent > 0 && (
          <span className="text-[11px] font-bold text-primary">{percent}%</span>
        )}
      </div>
      {!compact && percent > 0 && (
        <p className="mt-1.5 text-center text-[10px] font-bold text-primary sm:text-[11px]">
          {percent}% {t("deals.recommendShort")}
        </p>
      )}
    </div>
  );
}

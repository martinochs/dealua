"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { voteAction } from "@/lib/actions/vote";
import { getRecommendPercent } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface DealVoteInlineProps {
  dealId: string;
  hotCount: number;
  coldCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  className?: string;
}

export function DealVoteInline({
  dealId,
  hotCount: initialHot,
  coldCount: initialCold,
  userVote: initialVote,
  isLoggedIn,
  className,
}: DealVoteInlineProps) {
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

  return (
    <div
      className={cn("inline-flex items-center gap-1.5", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-emerald-600 transition-colors active:scale-95",
          userVote === "hot" ? "border-emerald-400 bg-emerald-50" : "border-emerald-200/70 bg-white"
        )}
        onClick={(e) => handleVote("hot", e)}
        disabled={isPending}
        aria-label={t("deals.hot")}
      >
        <ThumbsUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        <span className="text-[10px] font-bold tabular-nums">{hotCount}</span>
      </button>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-red-500 transition-colors active:scale-95",
          userVote === "cold" ? "border-red-400 bg-red-50" : "border-red-200/70 bg-white"
        )}
        onClick={(e) => handleVote("cold", e)}
        disabled={isPending}
        aria-label={t("deals.cold")}
      >
        <ThumbsDown className="h-3.5 w-3.5" strokeWidth={2.5} />
        <span className="text-[10px] font-bold tabular-nums">{coldCount}</span>
      </button>
      {percent > 0 && (
        <span className="text-[10px] font-bold text-primary sm:text-[11px]">{percent}%</span>
      )}
    </div>
  );
}

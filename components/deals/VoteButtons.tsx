"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { voteAction } from "@/lib/actions/vote";
import { getScoreHeatStyles, getTemperatureLevel } from "@/lib/deal-feed";
import { cn, getVoteScore } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import Link from "next/link";

interface VoteButtonsProps {
  dealId: string;
  hotCount: number;
  coldCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  compact?: boolean;
  featured?: boolean;
}

export function VoteButtons({
  dealId,
  hotCount: initialHot,
  coldCount: initialCold,
  userVote: initialVote,
  isLoggedIn,
  compact = false,
  featured = false,
}: VoteButtonsProps) {
  const router = useRouter();
  const [hotCount, setHotCount] = useState(initialHot);
  const [coldCount, setColdCount] = useState(initialCold);
  const [userVote, setUserVote] = useState(initialVote);
  const [isPending, startTransition] = useTransition();

  const score = getVoteScore(hotCount, coldCount);
  const heat = getTemperatureLevel(score);
  const styles = getScoreHeatStyles(featured && (heat === "low" || heat === "cold") ? "medium" : heat);

  function handleVote(type: "hot" | "cold", e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) return;

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

  const columnClass = cn(
    "flex shrink-0 flex-col items-center justify-center gap-0.5 border-r border-border/40 px-1 py-2 sm:px-1.5 sm:py-2.5",
    featured ? "w-[3.5rem] sm:w-[4.5rem]" : "w-[3rem] sm:w-[4rem]",
    styles.box,
    heat === "high" && "shadow-inner"
  );

  const scoreClass = cn(
    "font-bold tabular-nums leading-none",
    featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
    styles.score
  );

  if (compact) {
    if (!isLoggedIn) {
      return (
        <div className={columnClass}>
          <ChevronUp className={cn("h-5 w-5 sm:h-7 sm:w-7", styles.icon)} strokeWidth={3} aria-hidden />
          <span className={scoreClass}>{score}</span>
          <Link
            href="/login"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-semibold leading-tight text-primary hover:underline text-center"
          >
            {t("deals.loginToVote")}
          </Link>
        </div>
      );
    }

    return (
      <div className={columnClass} onClick={(e) => e.stopPropagation()}>
        <Button
          variant={userVote === "hot" ? "default" : "outline"}
          size="icon"
          className={cn(
            "shrink-0 border-2 bg-white shadow-sm transition-all active:scale-95 sm:hover:scale-105",
            featured ? "h-10 w-10 sm:h-12 sm:w-12" : "h-9 w-9 sm:h-11 sm:w-11",
            userVote !== "hot" && "border-orange-400 hover:border-orange-500 hover:bg-orange-50"
          )}
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <ChevronUp className={cn("text-orange-600", featured ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-7 sm:w-7")} strokeWidth={3} />
        </Button>
        <span className={scoreClass}>{score}</span>
        <Button
          variant={userVote === "cold" ? "default" : "outline"}
          size="icon"
          className={cn(
            "shrink-0 border-2 bg-white shadow-sm transition-all active:scale-95 sm:hover:scale-105",
            featured ? "h-10 w-10 sm:h-12 sm:w-12" : "h-9 w-9 sm:h-11 sm:w-11",
            userVote !== "cold" && "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
          )}
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <ChevronDown className={cn("text-slate-600", featured ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-7 sm:w-7")} strokeWidth={3} />
        </Button>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className={cn("text-2xl font-black", styles.score)}>{score}</div>
        <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
          {t("deals.loginToVote")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant={userVote === "hot" ? "default" : "outline"} size="icon" onClick={(e) => handleVote("hot", e)} disabled={isPending} aria-label={t("deals.hot")}>
        <ChevronUp className="h-5 w-5" strokeWidth={3} />
      </Button>
      <div className={cn("text-xl font-black", styles.score)}>{score}</div>
      <Button variant={userVote === "cold" ? "default" : "outline"} size="icon" onClick={(e) => handleVote("cold", e)} disabled={isPending} aria-label={t("deals.cold")}>
        <ChevronDown className="h-5 w-5" strokeWidth={3} />
      </Button>
    </div>
  );
}

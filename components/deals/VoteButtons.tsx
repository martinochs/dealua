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
}

export function VoteButtons({
  dealId,
  hotCount: initialHot,
  coldCount: initialCold,
  userVote: initialVote,
  isLoggedIn,
  compact = false,
}: VoteButtonsProps) {
  const router = useRouter();
  const [hotCount, setHotCount] = useState(initialHot);
  const [coldCount, setColdCount] = useState(initialCold);
  const [userVote, setUserVote] = useState(initialVote);
  const [isPending, startTransition] = useTransition();

  const score = getVoteScore(hotCount, coldCount);
  const heat = getTemperatureLevel(score);
  const styles = getScoreHeatStyles(heat);

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

  if (compact) {
    if (!isLoggedIn) {
      return (
        <div
          className={cn(
            "flex w-[4.25rem] shrink-0 flex-col items-center justify-center gap-1.5 border-r px-1 py-4 sm:w-[4.75rem]",
            styles.box
          )}
        >
          <ChevronUp className={cn("h-6 w-6", styles.icon)} strokeWidth={3} aria-hidden />
          <span className={cn("text-2xl font-black tabular-nums leading-none sm:text-3xl", styles.score)}>
            {score}
          </span>
          <Link
            href="/login"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-semibold leading-tight text-primary transition-colors hover:underline text-center"
          >
            {t("deals.loginToVote")}
          </Link>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "flex w-[4.25rem] shrink-0 flex-col items-center justify-center gap-1 border-r px-1 py-3 sm:w-[4.75rem]",
          styles.box
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant={userVote === "hot" ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-10 w-10 shrink-0 border-2 shadow-md transition-all hover:scale-105",
            userVote === "hot" ? "" : "border-orange-400 bg-white hover:border-orange-500 hover:bg-orange-50"
          )}
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <ChevronUp className="h-6 w-6 text-orange-600" strokeWidth={3} />
        </Button>
        <span className={cn("text-2xl font-black tabular-nums leading-none sm:text-3xl", styles.score)}>
          {score}
        </span>
        <Button
          variant={userVote === "cold" ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-10 w-10 shrink-0 border-2 shadow-md transition-all hover:scale-105",
            userVote === "cold" ? "" : "border-slate-400 bg-white hover:border-slate-500 hover:bg-slate-50"
          )}
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <ChevronDown className="h-6 w-6 text-slate-600" strokeWidth={3} />
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
      <Button
        variant={userVote === "hot" ? "default" : "outline"}
        size="icon"
        onClick={(e) => handleVote("hot", e)}
        disabled={isPending}
        aria-label={t("deals.hot")}
      >
        <ChevronUp className="h-5 w-5" strokeWidth={3} />
      </Button>
      <div className={cn("text-xl font-black", styles.score)}>{score}</div>
      <Button
        variant={userVote === "cold" ? "default" : "outline"}
        size="icon"
        onClick={(e) => handleVote("cold", e)}
        disabled={isPending}
        aria-label={t("deals.cold")}
      >
        <ChevronDown className="h-5 w-5" strokeWidth={3} />
      </Button>
    </div>
  );
}

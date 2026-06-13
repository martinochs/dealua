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
            "flex w-14 shrink-0 flex-col items-center justify-center gap-1 border-r px-1 py-3 sm:w-16",
            styles.box
          )}
        >
          <ChevronUp className={cn("h-5 w-5", styles.icon)} aria-hidden />
          <span className={cn("text-xl font-extrabold tabular-nums leading-none sm:text-2xl", styles.score)}>
            {score}
          </span>
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
      <div
        className={cn(
          "flex w-14 shrink-0 flex-col items-center justify-center gap-1 border-r px-1 py-2 sm:w-16",
          styles.box
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant={userVote === "hot" ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-9 w-9 shrink-0 border-2 shadow-sm",
            userVote === "hot" ? "" : "border-orange-300 bg-white hover:bg-orange-50"
          )}
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <ChevronUp className="h-5 w-5 text-orange-600" strokeWidth={2.5} />
        </Button>
        <span className={cn("text-xl font-extrabold tabular-nums leading-none sm:text-2xl", styles.score)}>
          {score}
        </span>
        <Button
          variant={userVote === "cold" ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-9 w-9 shrink-0 border-2 shadow-sm",
            userVote === "cold" ? "" : "border-slate-300 bg-white hover:bg-slate-50"
          )}
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <ChevronDown className="h-5 w-5 text-slate-500" strokeWidth={2.5} />
        </Button>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className={cn("text-2xl font-bold", styles.score)}>{score}</div>
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
        <ChevronUp className="h-5 w-5" />
      </Button>
      <div className={cn("text-xl font-bold", styles.score)}>{score}</div>
      <Button
        variant={userVote === "cold" ? "default" : "outline"}
        size="icon"
        onClick={(e) => handleVote("cold", e)}
        disabled={isPending}
        aria-label={t("deals.cold")}
      >
        <ChevronDown className="h-5 w-5" />
      </Button>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Flame, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { voteAction } from "@/lib/actions/vote";
import { getTemperatureLevel } from "@/lib/deal-feed";
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
  const temp = getTemperatureLevel(score);

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

  const tempStyles = {
    fire: "bg-hot/15 border-hot/30",
    warm: "bg-hot/8 border-hot/20",
    neutral: "bg-muted/50 border-border",
    cold: "bg-cold/10 border-cold/25",
  }[temp];

  const scoreColor =
    temp === "cold" ? "text-cold" : temp === "neutral" ? "text-foreground" : "text-hot";

  if (compact) {
    if (!isLoggedIn) {
      return (
        <div
          className={cn(
            "flex w-11 shrink-0 flex-col items-center justify-center gap-0 border-r px-0.5 py-1 sm:w-12",
            tempStyles
          )}
        >
          <Flame className={cn("h-3.5 w-3.5", scoreColor)} aria-hidden />
          <span className={cn("text-base font-extrabold tabular-nums leading-none sm:text-lg", scoreColor)}>
            {score}
          </span>
          <Link
            href="/login"
            onClick={(e) => e.stopPropagation()}
            className="text-[9px] font-medium leading-none text-primary hover:underline text-center"
          >
            {t("deals.loginToVote")}
          </Link>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "flex w-11 shrink-0 flex-col items-center justify-center gap-0 border-r px-0.5 py-1 sm:w-12",
          tempStyles
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant={userVote === "hot" ? "hot" : "ghost"}
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <Flame className="h-3.5 w-3.5" />
        </Button>
        <span className={cn("text-base font-extrabold tabular-nums leading-none sm:text-lg", scoreColor)}>
          {score}
        </span>
        <Button
          variant={userVote === "cold" ? "cold" : "ghost"}
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <Snowflake className="h-3.5 w-3.5" />
        </Button>
        <span className="text-[9px] tabular-nums leading-none text-muted-foreground">
          {hotCount}/{coldCount}
        </span>
      </div>
    );
  }

  const isHot = score >= 15;

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className={`text-2xl font-bold ${score >= 0 ? "text-hot" : "text-cold"}`}>{score}</div>
        <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
          {t("deals.loginToVote")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {isHot && <span className="text-xs font-medium text-hot">{t("deals.hot")}</span>}
      <Button
        variant={userVote === "hot" ? "hot" : "outline"}
        size="icon"
        onClick={(e) => handleVote("hot", e)}
        disabled={isPending}
        aria-label={t("deals.hot")}
      >
        <Flame className="h-5 w-5" />
      </Button>
      <div className={`text-xl font-bold ${score >= 0 ? "text-hot" : "text-cold"}`}>{score}</div>
      <Button
        variant={userVote === "cold" ? "cold" : "outline"}
        size="icon"
        onClick={(e) => handleVote("cold", e)}
        disabled={isPending}
        aria-label={t("deals.cold")}
      >
        <Snowflake className="h-5 w-5" />
      </Button>
      <div className="text-xs text-muted-foreground text-center">
        <span>{hotCount} 🔥</span>
        <span className="mx-1">·</span>
        <span>{coldCount} ❄️</span>
      </div>
    </div>
  );
}

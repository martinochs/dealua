"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { voteAction } from "@/lib/actions/vote";
import {
  getDisplayVoteScore,
  getHeatLabelKey,
  getScoreHeatStyles,
  getTemperatureLevel,
} from "@/lib/deal-feed";
import { cn, getVoteScore } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import Link from "next/link";
import type { DealWithRelations } from "@/types/database";

interface VoteButtonsProps {
  dealId: string;
  deal?: DealWithRelations;
  hotCount: number;
  coldCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
  compact?: boolean;
}

export function VoteButtons({
  dealId,
  deal,
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
  const [pulseHot, setPulseHot] = useState(false);
  const [pulseCold, setPulseCold] = useState(false);

  const rawScore = getVoteScore(hotCount, coldCount);
  const score = deal ? getDisplayVoteScore({ ...deal, hot_count: hotCount, cold_count: coldCount }) : rawScore;
  const heat = getTemperatureLevel(score);
  const styles = getScoreHeatStyles(heat);
  const heatLabel = t(getHeatLabelKey(score));
  const isHotColumn = heat === "medium" || heat === "high";

  function handleVote(type: "hot" | "cold", e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) return;

    if (type === "hot") {
      setPulseHot(true);
      setTimeout(() => setPulseHot(false), 500);
    } else {
      setPulseCold(true);
      setTimeout(() => setPulseCold(false), 500);
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

  const columnClass = cn(
    "heat-column flex shrink-0 flex-col items-center justify-center gap-0.5 border-r border-black/[0.06] px-1 py-3 sm:py-4",
    styles.box,
    styles.column,
    heat === "high" && "shadow-[inset_0_0_28px_rgba(0,0,0,0.12)]"
  );

  const scoreClass = cn(
    "tabular-nums leading-none font-black",
    heat === "high" ? "text-[2.5rem] sm:text-[2.75rem]" : heat === "medium" ? "text-[2.25rem] sm:text-[2.5rem]" : "text-[2rem] sm:text-[2.25rem]",
    styles.score
  );

  const labelClass = cn(
    "text-center text-[10px] font-bold uppercase leading-tight tracking-wide sm:text-[11px]",
    styles.label
  );

  if (compact) {
    if (!isLoggedIn) {
      return (
        <div className={columnClass}>
          <span className="text-xl leading-none" aria-hidden>
            🔥
          </span>
          <span className={scoreClass}>{score}</span>
          <span className={labelClass}>{heatLabel}</span>
          <Link
            href="/login"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "mt-1 text-[9px] font-semibold leading-tight hover:underline text-center",
              isHotColumn ? "text-white/90" : "text-primary"
            )}
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
            "h-8 w-8 min-h-[32px] min-w-[32px] shrink-0 border-0 shadow-sm transition-all active:scale-90",
            pulseHot && "animate-vote-pulse",
            isHotColumn ? "bg-white/95 hover:bg-white" : "bg-white hover:bg-orange-50"
          )}
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <ChevronUp className="h-4 w-4 text-orange-600" strokeWidth={2.5} />
        </Button>

        <span className="text-lg leading-none sm:text-xl" aria-hidden>
          🔥
        </span>
        <span className={scoreClass}>{score}</span>
        <span className={labelClass}>{heatLabel}</span>

        <Button
          variant={userVote === "cold" ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-8 w-8 min-h-[32px] min-w-[32px] shrink-0 border-0 shadow-sm transition-all active:scale-90",
            pulseCold && "animate-vote-pulse",
            isHotColumn ? "bg-white/95 hover:bg-white" : "bg-white hover:bg-slate-50"
          )}
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <ChevronDown className="h-4 w-4 text-slate-500" strokeWidth={2.5} />
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
        <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
      </Button>
      <div className={cn("text-xl font-black", styles.score)}>{score}</div>
      <Button variant={userVote === "cold" ? "default" : "outline"} size="icon" onClick={(e) => handleVote("cold", e)} disabled={isPending} aria-label={t("deals.cold")}>
        <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
      </Button>
    </div>
  );
}

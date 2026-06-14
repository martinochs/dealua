"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
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
  inline?: boolean;
  featured?: boolean;
}

export function VoteButtons({
  dealId,
  hotCount: initialHot,
  coldCount: initialCold,
  userVote: initialVote,
  isLoggedIn,
  compact = false,
  inline = false,
  featured = false,
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

  if (inline) {
    const pillClass = cn(
      "inline-flex shrink-0 items-center rounded-md border border-border/50 bg-secondary/60",
      featured && "border-primary/15 bg-primary/[0.04]"
    );

    if (!isLoggedIn) {
      return (
        <Link
          href="/login"
          onClick={(e) => e.stopPropagation()}
          className={cn(pillClass, "gap-1 px-1.5 py-0.5 text-muted-foreground hover:bg-secondary")}
          title={t("deals.loginToVote")}
        >
          <ChevronUp className="h-3 w-3 text-orange-500/70" strokeWidth={2.5} aria-hidden />
          <span className={cn("min-w-[1.25rem] text-center text-[11px] font-bold tabular-nums", styles.score)}>
            {score}
          </span>
        </Link>
      );
    }

    return (
      <div className={cn(pillClass, "gap-0 px-0.5 py-0.5")} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={cn(
            "rounded p-0.5 transition-colors hover:bg-white/80 active:scale-95",
            userVote === "hot" && "bg-primary/10 text-primary"
          )}
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <ChevronUp className="h-3 w-3 text-orange-500/80" strokeWidth={2.5} />
        </button>
        <span className={cn("min-w-[1.35rem] px-0.5 text-center text-[11px] font-bold tabular-nums leading-none", styles.score)}>
          {score}
        </span>
        <button
          type="button"
          className={cn(
            "rounded p-0.5 transition-colors hover:bg-white/80 active:scale-95",
            userVote === "cold" && "bg-slate-200/80 text-slate-700"
          )}
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <ChevronDown className="h-3 w-3 text-slate-500/80" strokeWidth={2.5} />
        </button>
      </div>
    );
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
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-md border-2 bg-white shadow-sm transition-all active:scale-95 sm:hover:scale-105",
            featured ? "h-10 w-10 sm:h-12 sm:w-12" : "h-9 w-9 sm:h-11 sm:w-11",
            userVote === "hot" ? "border-primary bg-primary/10" : "border-orange-400/70 hover:border-orange-500 hover:bg-orange-50"
          )}
          onClick={(e) => handleVote("hot", e)}
          disabled={isPending}
          aria-label={t("deals.hot")}
        >
          <ChevronUp className={cn("text-orange-600", featured ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-7 sm:w-7")} strokeWidth={3} />
        </button>
        <span className={scoreClass}>{score}</span>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-md border-2 bg-white shadow-sm transition-all active:scale-95 sm:hover:scale-105",
            featured ? "h-10 w-10 sm:h-12 sm:w-12" : "h-9 w-9 sm:h-11 sm:w-11",
            userVote === "cold" ? "border-slate-500 bg-slate-100" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
          )}
          onClick={(e) => handleVote("cold", e)}
          disabled={isPending}
          aria-label={t("deals.cold")}
        >
          <ChevronDown className={cn("text-slate-600", featured ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-7 sm:w-7")} strokeWidth={3} />
        </button>
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
      <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-input bg-card hover:bg-accent" onClick={(e) => handleVote("hot", e)} disabled={isPending} aria-label={t("deals.hot")}>
        <ChevronUp className="h-5 w-5" strokeWidth={3} />
      </button>
      <div className={cn("text-xl font-black", styles.score)}>{score}</div>
      <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-input bg-card hover:bg-accent" onClick={(e) => handleVote("cold", e)} disabled={isPending} aria-label={t("deals.cold")}>
        <ChevronDown className="h-5 w-5" strokeWidth={3} />
      </button>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Flame, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { voteAction } from "@/lib/actions/vote";
import { getVoteScore } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import Link from "next/link";

interface VoteButtonsProps {
  dealId: string;
  hotCount: number;
  coldCount: number;
  userVote: "hot" | "cold" | null;
  isLoggedIn: boolean;
}

export function VoteButtons({
  dealId,
  hotCount: initialHot,
  coldCount: initialCold,
  userVote: initialVote,
  isLoggedIn,
}: VoteButtonsProps) {
  const router = useRouter();
  const [hotCount, setHotCount] = useState(initialHot);
  const [coldCount, setColdCount] = useState(initialCold);
  const [userVote, setUserVote] = useState(initialVote);
  const [isPending, startTransition] = useTransition();

  const score = getVoteScore(hotCount, coldCount);
  const isHot = score >= 15;

  function handleVote(type: "hot" | "cold") {
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
      {isHot && (
        <span className="text-xs font-medium text-hot">{t("deals.hot")}</span>
      )}
      <Button
        variant={userVote === "hot" ? "hot" : "outline"}
        size="icon"
        onClick={() => handleVote("hot")}
        disabled={isPending}
        aria-label={t("deals.hot")}
      >
        <Flame className="h-5 w-5" />
      </Button>
      <div className={`text-xl font-bold ${score >= 0 ? "text-hot" : "text-cold"}`}>{score}</div>
      <Button
        variant={userVote === "cold" ? "cold" : "outline"}
        size="icon"
        onClick={() => handleVote("cold")}
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

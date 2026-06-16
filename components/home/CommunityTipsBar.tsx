import { Shield, ThumbsUp, Trophy, Users } from "lucide-react";
import { t } from "@/lib/i18n/uk";

export function CommunityTipsBar() {
  const tips = [
    { icon: ThumbsUp, text: t("community.notVoted") },
    { icon: Trophy, text: t("community.voteHonestly") },
    { icon: Users, text: t("community.togetherStronger") },
    { icon: Shield, text: t("community.trustedDeals") },
  ];

  return (
    <section className="mt-6 rounded-2xl border border-border/50 bg-secondary/30 px-4 py-4 sm:px-6 sm:py-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {tips.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-sm font-medium leading-snug text-foreground/85">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

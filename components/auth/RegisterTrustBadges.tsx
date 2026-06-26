import { Lock, Shield, Users } from "lucide-react";
import { uk } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

const icons = [Shield, Lock, Users] as const;
const iconColors = [
  "bg-emerald-100 text-emerald-600",
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
] as const;

interface RegisterTrustBadgesProps {
  className?: string;
}

export function RegisterTrustBadges({ className }: RegisterTrustBadgesProps) {
  const badges = uk.auth.registerTrust.items;

  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-3xl grid-cols-3 gap-4 border-t border-border/60 pt-8 text-center sm:gap-6",
        className
      )}
    >
      {badges.map((badge, index) => {
        const Icon = icons[index] ?? Shield;
        return (
          <div key={badge.title} className="space-y-2 px-1">
            <div
              className={cn(
                "mx-auto flex h-10 w-10 items-center justify-center rounded-full",
                iconColors[index] ?? iconColors[0]
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-foreground">{badge.title}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}

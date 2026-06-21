import { Lock, Shield, Users } from "lucide-react";
import { uk } from "@/lib/i18n/uk";

const icons = [Shield, Lock, Users] as const;

export function RegisterTrustBadges() {
  const badges = uk.auth.registerTrust.items;

  return (
    <div className="mt-6 grid grid-cols-3 gap-3 text-center">
      {badges.map((badge, index) => {
        const Icon = icons[index] ?? Shield;
        return (
          <div key={badge.title} className="space-y-1.5 px-1">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-muted">
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-xs font-medium sm:text-sm">{badge.title}</p>
            <p className="hidden text-[11px] text-muted-foreground sm:block">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}

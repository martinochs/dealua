import {
  Bell,
  Flame,
  MessageCircle,
  Plus,
  Trophy,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { uk } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

const benefitIcons = [Flame, MessageCircle, Plus, Bell, Trophy] as const;
const benefitColors = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-600",
] as const;

interface RegisterBenefitsPanelProps {
  className?: string;
  variant?: "full" | "compact";
}

export function RegisterBenefitsPanel({
  className,
  variant = "full",
}: RegisterBenefitsPanelProps) {
  const { registerBenefits } = uk.auth;
  const benefits = registerBenefits.items;

  if (variant === "compact") {
    return (
      <div className={cn("space-y-3 text-center lg:hidden", className)}>
        <Logo heightClass="h-12" className="items-center" />
        <h1 className="text-xl font-bold tracking-tight">{registerBenefits.headline}</h1>
        <p className="text-sm text-muted-foreground">{registerBenefits.subheadline}</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="space-y-4">
        <Logo heightClass="h-14 sm:h-16" link={false} />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {registerBenefits.headline}
          </h1>
          <p className="text-muted-foreground">{registerBenefits.subheadline}</p>
        </div>
      </div>

      <ul className="space-y-5">
        {benefits.map((benefit, index) => {
          const Icon = benefitIcons[index] ?? Flame;
          return (
            <li key={benefit.title} className="flex gap-4">
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  benefitColors[index] ?? benefitColors[0]
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-0.5 pt-0.5">
                <p className="font-semibold">{benefit.title}</p>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <p className="font-semibold">{registerBenefits.statsTitle}</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {registerBenefits.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold text-primary sm:text-xl">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

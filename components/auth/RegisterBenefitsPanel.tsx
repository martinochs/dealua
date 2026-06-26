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
  "bg-amber-100 text-amber-600",
  "bg-violet-100 text-violet-600",
] as const;

const statEmojis = ["🔥", "🏷️", "👥"] as const;

interface RegisterBenefitsPanelProps {
  className?: string;
}

export function RegisterBenefitsPanel({ className }: RegisterBenefitsPanelProps) {
  const { registerBenefits, registerTagline } = uk.auth;
  const benefits = registerBenefits.items;

  return (
    <div className={cn("flex w-full max-w-xl flex-col gap-8 lg:max-w-none lg:pt-2", className)}>
      <div className="space-y-4">
        <div className="space-y-1">
          <Logo heightClass="h-12 sm:h-14" link={false} />
          <p className="text-sm text-muted-foreground">{registerTagline}</p>
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[2rem]">
          {registerBenefits.headlinePrefix}{" "}
          <span className="text-[#E6B800]">{registerBenefits.headlineHighlight}</span>
        </h1>
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
                <p className="font-semibold text-foreground">{benefit.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="rounded-2xl border border-uk-yellow/30 bg-uk-yellow/10 p-5 sm:p-6">
        <p className="font-semibold text-foreground">{registerBenefits.statsTitle}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center sm:gap-4">
          {registerBenefits.stats.map((stat, index) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-lg" aria-hidden="true">
                {statEmojis[index] ?? "•"}
              </p>
              <p className="text-lg font-bold text-foreground sm:text-xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

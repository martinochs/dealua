import Link from "next/link";
import { Flame, MessageCircle, Snowflake, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/profile/UserAvatar";
import { formatDateUk } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { Profile } from "@/types/database";
import type { UserProfileStats } from "@/lib/queries/profile";

interface ProfileHeaderProps {
  profile: Profile;
  stats: UserProfileStats;
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, stats, isOwnProfile }: ProfileHeaderProps) {
  const statItems = [
    {
      label: t("profile.statsDeals"),
      value: stats.dealCount,
      icon: Tag,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      label: t("profile.statsComments"),
      value: stats.commentCount,
      icon: MessageCircle,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      label: t("profile.statsHot"),
      value: stats.hotPoints,
      icon: Flame,
      iconClass: "bg-hot/10 text-hot",
    },
    {
      label: t("profile.statsCold"),
      value: stats.coldPoints,
      icon: Snowflake,
      iconClass: "bg-cold/10 text-cold",
    },
  ] as const;

  return (
    <section className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <UserAvatar
            username={profile.username}
            avatarUrl={profile.avatar_url}
            size="lg"
          />
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">@{profile.username}</h1>
              {profile.role === "admin" && (
                <Badge variant="secondary" className="text-[10px]">
                  {t("profile.adminBadge")}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {t("profile.memberSince")}{" "}
              <time dateTime={profile.created_at}>{formatDateUk(profile.created_at)}</time>
            </p>
          </div>
        </div>

        {isOwnProfile && (
          <Button asChild variant="outline" size="sm" className="shrink-0 self-start">
            <Link href="/settings">{t("profile.settings")}</Link>
          </Button>
        )}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-xl border border-border/60 bg-muted/20 px-3 py-3 text-center sm:px-4"
            >
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${item.iconClass}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <p className="text-lg font-bold tabular-nums text-foreground">{item.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.label}</p>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

import Link from "next/link";
import { Bell, Plus, User } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { UserAvatar } from "@/components/profile/UserAvatar";
import { t } from "@/lib/i18n/uk";
import type { Profile } from "@/types/database";

interface HeaderActionsProps {
  profile: Profile | null;
  pendingCount?: number;
}

export function HeaderActions({ profile, pendingCount = 0 }: HeaderActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
      <Link
        href="/submit"
        className="deal-cta mr-1 hidden h-10 items-center gap-1.5 rounded-xl px-3.5 text-sm font-bold shadow-sm transition-[filter] hover:brightness-105 md:inline-flex lg:px-4"
      >
        <Plus className="h-4 w-4" aria-hidden />
        <span className="hidden lg:inline">{t("nav.submitCtaHeader")}</span>
        <span className="lg:hidden">Deal</span>
      </Link>

      <button
        type="button"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Сповіщення"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          1
        </span>
      </button>

      {profile ? (
        <Link
          href={`/profile/${profile.username}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-opacity hover:opacity-90"
          aria-label={profile.username}
        >
          <UserAvatar username={profile.username} avatarUrl={profile.avatar_url} size="sm" />
        </Link>
      ) : (
        <Link
          href="/login"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-secondary/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label={t("nav.login")}
        >
          <User className="h-5 w-5" />
        </Link>
      )}

      <MobileNav profile={profile} pendingCount={pendingCount} />
    </div>
  );
}

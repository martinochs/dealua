import { Bell } from "lucide-react";
import { MobileNav } from "./MobileNav";
import type { Profile } from "@/types/database";

interface HeaderActionsProps {
  profile: Profile | null;
  pendingCount?: number;
}

export function HeaderActions({ profile, pendingCount = 0 }: HeaderActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Сповіщення"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          3
        </span>
      </button>
      <MobileNav profile={profile} pendingCount={pendingCount} />
    </div>
  );
}

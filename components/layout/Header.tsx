import { SearchBarWrapper } from "./SearchBarWrapper";
import { Logo } from "./Logo";
import { HeaderActions } from "./HeaderActions";
import type { Profile } from "@/types/database";

interface HeaderProps {
  profile: Profile | null;
  pendingCount?: number;
}

export function Header({ profile, pendingCount = 0 }: HeaderProps) {
  return (
    <header className="bg-card">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-start justify-between gap-2 sm:items-center sm:gap-3">
          <div className="min-w-0 flex-1 py-0.5">
            <Logo priority />
          </div>
          <HeaderActions profile={profile} pendingCount={pendingCount} />
        </div>
        <div className="mt-3 sm:mt-4">
          <SearchBarWrapper />
        </div>
      </div>
    </header>
  );
}

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
      <div className="container mx-auto px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <Logo priority size="bar" className="shrink-0" />
          <div className="hidden min-w-0 flex-1 md:block">
            <SearchBarWrapper variant="header" />
          </div>
          <HeaderActions profile={profile} pendingCount={pendingCount} />
        </div>
        <div className="mt-2.5 md:hidden">
          <SearchBarWrapper variant="header" />
        </div>
      </div>
    </header>
  );
}

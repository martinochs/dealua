import { SearchBarWrapper } from "./SearchBarWrapper";
import { Logo } from "./Logo";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header className="bg-card">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-start justify-between gap-3">
          <Logo priority showTagline />
          {actions}
        </div>
        <div className="mt-3 sm:mt-4">
          <SearchBarWrapper />
        </div>
      </div>
    </header>
  );
}

import { SearchBarWrapper } from "./SearchBarWrapper";
import { Logo } from "./Logo";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header>
      <div className="container mx-auto space-y-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Logo priority />
          {actions}
        </div>
        <SearchBarWrapper />
      </div>
    </header>
  );
}

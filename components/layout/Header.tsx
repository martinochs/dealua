import Link from "next/link";
import { SearchBarWrapper } from "./SearchBarWrapper";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header>
      <div className="container mx-auto space-y-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-bold text-lg transition-opacity hover:opacity-90"
          >
            <span className="flex h-6 w-6 shrink-0 flex-col overflow-hidden rounded-sm shadow-sm" aria-hidden>
              <span className="flex-1 bg-primary" />
              <span className="flex-1 bg-uk-yellow" />
            </span>
            <span className="text-primary">Deal</span>
            <span className="rounded bg-uk-yellow px-1.5 text-uk-yellow-foreground">UA</span>
          </Link>
          {actions}
        </div>
        <SearchBarWrapper />
      </div>
    </header>
  );
}

import Link from "next/link";
import { SearchBarWrapper } from "./SearchBarWrapper";
import { t } from "@/lib/i18n/uk";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header>
      <div className="container mx-auto space-y-2.5 px-4 py-2.5 sm:space-y-3 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-baseline gap-0.5 text-xl font-extrabold tracking-tight transition-opacity hover:opacity-90 sm:text-2xl"
          >
            <span className="text-primary">Deal</span>
            <span className="text-uk-yellow">UA</span>
            <span className="sr-only">{t("site.name")}</span>
          </Link>
          {actions}
        </div>
        <SearchBarWrapper />
      </div>
    </header>
  );
}

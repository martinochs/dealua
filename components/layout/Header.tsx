import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchBarWrapper } from "./SearchBarWrapper";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header>
      <div className="container mx-auto space-y-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-lg">
            <span className="flex h-6 w-6 shrink-0 flex-col overflow-hidden rounded-sm shadow-sm" aria-hidden>
              <span className="flex-1 bg-primary" />
              <span className="flex-1 bg-uk-yellow" />
            </span>
            <span className="text-primary">Deal</span>
            <span className="rounded bg-uk-yellow px-1.5 text-uk-yellow-foreground">UA</span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="default" className="shadow-md">
              <Link href="/submit">
                <Plus className="h-4 w-4" />
                <span className="max-[380px]:sr-only">{t("nav.submit")}</span>
              </Link>
            </Button>
            {actions}
          </div>
        </div>
        <SearchBarWrapper />
      </div>
    </header>
  );
}

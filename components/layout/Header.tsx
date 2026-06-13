import Link from "next/link";
import { Flame, Plus } from "lucide-react";
import { SearchBarWrapper } from "./SearchBarWrapper";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export function Header() {
  return (
    <header>
      <div className="container mx-auto space-y-1 px-4 py-1.5">
        <div className="flex h-8 items-center justify-between gap-2">
          <Link href="/" className="flex shrink-0 items-center gap-1.5 font-bold text-base">
            <Flame className="h-5 w-5 text-hot" aria-hidden />
            <span>{t("site.name")}</span>
          </Link>
          <Button asChild size="sm" variant="outline" className="h-8 shrink-0 sm:hidden">
            <Link href="/submit">
              <Plus className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <SearchBarWrapper />
      </div>
    </header>
  );
}

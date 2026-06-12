import Link from "next/link";
import { Flame } from "lucide-react";
import { SearchBarWrapper } from "./SearchBarWrapper";
import { t } from "@/lib/i18n/uk";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 space-y-3">
        <div className="flex h-10 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <Flame className="h-6 w-6 text-hot" />
            <span>{t("site.name")}</span>
          </Link>
          <Link href="/deals" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline shrink-0">
            Усі пропозиції
          </Link>
        </div>
        <SearchBarWrapper />
      </div>
    </header>
  );
}

import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchBarWrapper } from "./SearchBarWrapper";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header>
      <div className="container mx-auto space-y-1 px-4 py-1.5">
        <div className="flex h-8 items-center justify-between gap-2">
          <Link href="/" className="flex shrink-0 items-center gap-1.5 font-bold text-base">
            <span className="flex h-5 w-5 shrink-0 flex-col overflow-hidden rounded-sm shadow-sm" aria-hidden>
              <span className="flex-1 bg-primary" />
              <span className="flex-1 bg-uk-yellow" />
            </span>
            <span className="text-primary">Deal</span>
            <span className="rounded bg-uk-yellow px-1 text-uk-yellow-foreground">UA</span>
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

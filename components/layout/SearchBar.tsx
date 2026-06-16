"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  defaultQuery?: string;
}

export function SearchBar({ className, defaultQuery = "" }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultQuery || searchParams.get("q") || "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/deals?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/deals");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("feed.searchPlaceholder")}
            className="h-11 rounded-xl border-border/80 bg-background pl-11 shadow-sm sm:h-12"
            aria-label={t("feed.search")}
          />
        </div>
        <Button
          type="submit"
          className="deal-cta hidden h-11 shrink-0 rounded-xl px-5 font-semibold sm:inline-flex sm:h-12"
        >
          {t("feed.search")}
        </Button>
        <Button
          type="submit"
          size="icon"
          className="deal-cta h-11 w-11 shrink-0 rounded-xl sm:hidden"
          aria-label={t("feed.search")}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

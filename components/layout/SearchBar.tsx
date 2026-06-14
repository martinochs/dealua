"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

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
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("feed.searchPlaceholder")}
            className="min-h-[44px] pl-9"
            aria-label={t("feed.search")}
          />
        </div>
        <Button type="submit" variant="secondary" size="icon" className="h-11 w-11 shrink-0 sm:hidden" aria-label={t("feed.search")}>
          <Search className="h-4 w-4" />
        </Button>
        <Button type="submit" variant="secondary" className="hidden shrink-0 sm:inline-flex">
          {t("feed.search")}
        </Button>
      </div>
    </form>
  );
}

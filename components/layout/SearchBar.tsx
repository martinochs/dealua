"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
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
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("feed.searchPlaceholder")}
          className="h-10 rounded-full border-border/60 bg-[#F4F6F8] pl-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:border-primary/30 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/15"
          aria-label={t("feed.search")}
        />
      </div>
    </form>
  );
}

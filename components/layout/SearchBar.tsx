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
  variant?: "default" | "header";
}

export function SearchBar({ className, defaultQuery = "", variant = "default" }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultQuery || searchParams.get("q") || "");
  const isHeader = variant === "header";

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
      <div className={cn("flex gap-2", isHeader && "gap-0")}>
        <div className="relative flex-1">
          <Search
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-muted-foreground",
              isHeader ? "left-3.5 h-4 w-4" : "left-4 h-4 w-4"
            )}
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("feed.searchPlaceholder")}
            className={cn(
              "rounded-xl border-border/80 bg-background shadow-sm",
              isHeader
                ? "h-10 pl-10 text-sm sm:h-11 sm:pl-11"
                : "h-11 pl-11 sm:h-12"
            )}
            aria-label={t("feed.search")}
          />
        </div>
        {!isHeader && (
          <>
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
          </>
        )}
      </div>
    </form>
  );
}

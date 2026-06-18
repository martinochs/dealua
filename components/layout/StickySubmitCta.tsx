"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export function StickySubmitCta() {
  const pathname = usePathname();

  // Deal detail pages use their own fixed vote + shop bar; submit page is redundant.
  if (pathname.startsWith("/deal/") || pathname === "/submit") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-card/98 p-3 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <div className="container mx-auto max-w-6xl px-1">
        <Button asChild size="lg" className="deal-cta h-12 w-full rounded-xl text-base font-bold">
          <Link href="/submit">
            <Plus className="h-5 w-5" />
            {t("nav.submitCtaSticky")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

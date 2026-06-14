import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface DealCardCtaProps {
  dealId: string;
  featured?: boolean;
  className?: string;
}

export function DealCardCta({ dealId, featured = false, className }: DealCardCtaProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        asChild
        size="sm"
        className={cn(
          "deal-cta h-9 flex-1 text-sm font-semibold sm:h-9",
          featured && "sm:flex-none sm:min-w-[10.5rem]"
        )}
      >
        <a href={`/go/${dealId}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("deals.ctaGo")}
        </a>
      </Button>
      <Link
        href={`/deal/${dealId}`}
        className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-primary hover:underline sm:text-xs"
      >
        {t("deals.ctaView")}
        <ArrowRight className="h-3 w-3" aria-hidden />
      </Link>
    </div>
  );
}

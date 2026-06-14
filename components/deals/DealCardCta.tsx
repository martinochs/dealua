import { ExternalLink } from "lucide-react";
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
    <Button
      asChild
      size="sm"
      className={cn(
        "deal-cta h-8 shrink-0 px-3.5 text-xs font-semibold sm:h-9 sm:px-4 sm:text-sm",
        featured && "sm:min-w-[9.5rem]",
        className
      )}
    >
      <a href={`/go/${dealId}`} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {featured ? t("deals.ctaGoFeatured") : t("deals.ctaGo")}
      </a>
    </Button>
  );
}

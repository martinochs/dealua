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
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Button
        asChild
        size={featured ? "lg" : "default"}
        className={cn("deal-cta w-full font-bold", featured && "cta-glow h-12 text-base")}
      >
        <a href={`/go/${dealId}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          {t("deals.ctaGo")}
        </a>
      </Button>
      <Link
        href={`/deal/${dealId}`}
        className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-primary hover:underline sm:text-sm"
      >
        {t("deals.ctaView")}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";
import { shouldOpenDealInSameTab } from "@/lib/deal-outbound-overrides";
import { cn } from "@/lib/utils";

interface DealCardCtaProps {
  dealId: string;
  featured?: boolean;
  layout?: "default" | "side";
  className?: string;
}

export function DealCardCta({
  dealId,
  featured = false,
  layout = "default",
  className,
}: DealCardCtaProps) {
  const side = layout === "side";
  const sameTab = shouldOpenDealInSameTab(dealId);

  return (
    <Button
      asChild
      size={side ? "default" : "sm"}
      className={cn(
        "deal-cta font-semibold",
        side
          ? "h-auto min-h-[4.75rem] w-full whitespace-normal px-3 py-3 text-center text-xs leading-snug sm:min-h-[5.25rem] sm:text-sm"
          : "h-10 w-full px-4 text-sm sm:h-11",
        className
      )}
    >
      <a
        href={`/go/${dealId}`}
        {...(sameTab ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={cn(side && "flex flex-col items-center justify-center gap-1")}
      >
        <ExternalLink className={cn("shrink-0", side ? "mx-auto mb-1 h-4 w-4" : "h-3.5 w-3.5")} aria-hidden />
        {t("deals.ctaGo")}
      </a>
    </Button>
  );
}

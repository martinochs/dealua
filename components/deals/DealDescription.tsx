import { ExternalLink } from "lucide-react";
import {
  parseDealDescription,
  segmentTextWithLinks,
  splitDescriptionParagraphs,
} from "@/lib/deal-description";
import { t } from "@/lib/i18n/uk";
import { cn } from "@/lib/utils";

interface DealDescriptionProps {
  description: string;
  className?: string;
}

function DescriptionParagraph({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, index) => (
        <p key={index} className="leading-relaxed">
          {segmentTextWithLinks(line).map((segment, segmentIndex) =>
            segment.type === "link" ? (
              <a
                key={segmentIndex}
                href={segment.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all font-semibold text-primary underline-offset-2 hover:underline"
              >
                {segment.value}
              </a>
            ) : (
              <span key={segmentIndex}>{segment.value}</span>
            )
          )}
        </p>
      ))}
    </div>
  );
}

export function DealDescription({ description, className }: DealDescriptionProps) {
  const { intro, moreOffers } = parseDealDescription(description);

  return (
    <div className={cn("space-y-5", className)}>
      <div className="space-y-4 text-base">
        {splitDescriptionParagraphs(intro).map((paragraph, index) => (
          <DescriptionParagraph key={index} text={paragraph} />
        ))}
      </div>

      {moreOffers.length > 0 && (
        <section className="rounded-2xl border border-border/70 bg-muted/30 p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">
            {t("deals.moreOffers")}
          </h2>
          <ul className="space-y-2">
            {moreOffers.map((offer) => (
              <li key={offer.url}>
                <a
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-card px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-accent/40"
                >
                  <span className="min-w-0 text-sm font-medium leading-snug text-foreground group-hover:text-primary">
                    {offer.label}
                  </span>
                  <ExternalLink
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

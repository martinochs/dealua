import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export function StickySubmitCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-card/95 p-3 shadow-[0_-6px_28px_rgba(15,23,42,0.1)] backdrop-blur-md">
      <div className="container mx-auto max-w-6xl">
        <Button
          asChild
          size="lg"
          className="cta-glow h-[3.25rem] w-full text-base font-bold"
        >
          <Link href="/submit">
            <Plus className="h-5 w-5" />
            {t("nav.submitCta")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

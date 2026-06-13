import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export function StickySubmitCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-primary/10 bg-card/95 p-3 shadow-[0_-8px_32px_rgba(0,87,183,0.15)] backdrop-blur-md supports-[backdrop-filter]:bg-card/90">
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

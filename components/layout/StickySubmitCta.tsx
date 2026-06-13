import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export function StickySubmitCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-card/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-card/90">
      <div className="container mx-auto max-w-6xl">
        <Button asChild size="lg" className="h-12 w-full text-base font-bold shadow-lg transition-transform hover:scale-[1.01]">
          <Link href="/submit">
            <Plus className="h-5 w-5" />
            {t("nav.submit")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

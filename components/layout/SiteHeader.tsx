import Link from "next/link";
import { Plus } from "lucide-react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/auth/session";
import { getStats } from "@/lib/queries/deals";
import { t } from "@/lib/i18n/uk";

export async function SiteHeader() {
  const profile = await getProfile();
  const stats = await getStats();
  const pendingCount = profile?.role === "admin" ? stats.pendingDeals : 0;

  return (
    <div id="site-chrome" className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <Header />
      <div className="border-t">
        <div className="container mx-auto flex items-center justify-end gap-1.5 px-4 py-1">
          <Button asChild size="sm" className="h-7 px-2 text-xs">
            <Link href="/submit">
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden xs:inline sm:inline">{t("nav.submit")}</span>
            </Link>
          </Button>
          <MobileNav profile={profile} pendingCount={pendingCount} />
        </div>
      </div>
    </div>
  );
}

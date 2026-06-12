import Link from "next/link";
import { Plus } from "lucide-react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/auth/session";
import { getCategories, getStats } from "@/lib/queries/deals";
import { t } from "@/lib/i18n/uk";

export async function SiteHeader() {
  const profile = await getProfile();
  const categories = await getCategories();
  const stats = await getStats();
  const pendingCount = profile?.role === "admin" ? stats.pendingDeals : 0;

  return (
    <>
      <Header />
      <div className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2">
          <div className="hidden md:flex items-center gap-2 overflow-x-auto flex-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="whitespace-nowrap rounded-full border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
              >
                {cat.icon} {cat.name_uk}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/submit">
                <Plus className="h-4 w-4" />
                {t("nav.submit")}
              </Link>
            </Button>
            <MobileNav profile={profile} pendingCount={pendingCount} />
          </div>
        </div>
        <div className="md:hidden flex gap-2 overflow-x-auto px-4 pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="whitespace-nowrap rounded-full border px-3 py-1.5 text-sm hover:bg-accent"
            >
              {cat.icon} {cat.name_uk}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

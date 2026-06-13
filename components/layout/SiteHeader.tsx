import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { getProfile } from "@/lib/auth/session";
import { getStats } from "@/lib/queries/deals";

export async function SiteHeader() {
  const profile = await getProfile();
  const stats = await getStats();
  const pendingCount = profile?.role === "admin" ? stats.pendingDeals : 0;

  return (
    <div id="site-chrome" className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
      <div className="uk-flag-stripe" aria-hidden>
        <span />
        <span />
      </div>
      <Header actions={<MobileNav profile={profile} pendingCount={pendingCount} />} />
    </div>
  );
}

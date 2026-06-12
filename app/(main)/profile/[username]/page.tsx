import { notFound } from "next/navigation";
import { DealFeed } from "@/components/deals/DealFeed";
import { getProfileByUsername, getUserDeals } from "@/lib/queries/deals";
import { getProfile } from "@/lib/auth/session";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/i18n/uk";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  const currentUser = await getProfile();

  if (!profile) notFound();

  const deals = await getUserDeals(profile.id);
  const approvedDeals = deals.filter((d) => d.status === "approved");
  const pendingDeals = deals.filter((d) => d.status === "pending");
  const isOwnProfile = currentUser?.id === profile.id;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
          {profile.username[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">@{profile.username}</h1>
          {profile.role === "admin" && (
            <Badge variant="secondary" className="mt-1">Адмін</Badge>
          )}
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{t("profile.deals")} ({approvedDeals.length})</h2>
        {approvedDeals.length > 0 ? (
          <DealFeed deals={approvedDeals} />
        ) : (
          <p className="text-muted-foreground">{t("profile.noDeals")}</p>
        )}
      </section>

      {isOwnProfile && pendingDeals.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">{t("deals.pending")} ({pendingDeals.length})</h2>
          <DealFeed deals={pendingDeals} />
        </section>
      )}
    </div>
  );
}

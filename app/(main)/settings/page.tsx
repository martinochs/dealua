import Link from "next/link";
import { redirect } from "next/navigation";
import { AvatarPicker } from "@/components/account/AvatarPicker";
import { DeleteAccountForm } from "@/components/account/DeleteAccountForm";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/auth/session";
import { t } from "@/lib/i18n/uk";

export const metadata = { title: "Налаштування акаунту" };

export default async function SettingsPage() {
  const profile = await getProfile();
  if (!profile) {
    redirect("/login?next=/settings");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
        <p className="text-muted-foreground">
          {t("settings.subtitle")}{" "}
          <Link href={`/profile/${profile.username}`} className="font-medium text-primary hover:underline">
            @{profile.username}
          </Link>
        </p>
      </div>

      <AvatarPicker username={profile.username} currentAvatarUrl={profile.avatar_url} />

      <section className="space-y-4 rounded-lg border border-destructive/30 bg-destructive/5 p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-destructive">{t("settings.deleteAccountTitle")}</h2>
          <p className="text-sm text-muted-foreground">{t("settings.deleteAccountDescription")}</p>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>{t("settings.deleteAccountWarningDeals")}</li>
            <li>{t("settings.deleteAccountWarningComments")}</li>
            <li>{t("settings.deleteAccountWarningVotes")}</li>
          </ul>
        </div>

        {profile.role === "admin" ? (
          <p className="text-sm text-muted-foreground">{t("settings.deleteAccountAdminBlocked")}</p>
        ) : (
          <DeleteAccountForm username={profile.username} />
        )}
      </section>

      <Button asChild variant="outline">
        <Link href={`/profile/${profile.username}`}>{t("settings.backToProfile")}</Link>
      </Button>
    </div>
  );
}

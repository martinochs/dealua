import { redirect } from "next/navigation";
import { AdminDealQueue } from "@/components/admin/AdminDealQueue";
import { AdminClickStats } from "@/components/admin/AdminClickStats";
import { AdminStats } from "@/components/admin/AdminStats";
import { getCategories, getPendingDeals } from "@/lib/queries/deals";
import { isAdmin } from "@/lib/auth/session";
import { t } from "@/lib/i18n/uk";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect("/");
  }

  const [pendingDeals, categories] = await Promise.all([
    getPendingDeals(),
    getCategories(),
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">{t("admin.title")}</h1>

      <AdminStats />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{t("admin.pendingDeals")}</h2>
        <AdminDealQueue deals={pendingDeals} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{t("admin.categories")}</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {categories.map((cat) => (
            <li key={cat.id} className="rounded-lg border p-3 text-sm">
              {cat.icon} {cat.name_uk}
              <span className="text-muted-foreground ml-2">/{cat.slug}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Кліки по посиланнях</h2>
        <AdminClickStats />
      </section>
    </div>
  );
}

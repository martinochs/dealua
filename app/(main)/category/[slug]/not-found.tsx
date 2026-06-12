import Link from "next/link";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export default function CategoryNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <h1 className="text-2xl font-bold">Категорію не знайдено</h1>
      <p className="text-muted-foreground">Перевірте посилання або оберіть категорію зі списку.</p>
      <Button asChild>
        <Link href="/categories">{t("nav.categories")}</Link>
      </Button>
    </div>
  );
}

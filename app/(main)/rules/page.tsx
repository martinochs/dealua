import Link from "next/link";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export const metadata = { title: "Правила" };

export default function RulesPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("footer.rules")}</h1>
      <ul className="space-y-3 text-muted-foreground list-disc pl-5">
        <li>
          Користуватися VyhodaDeal можуть лише особи, яким виповнилося{" "}
          <strong className="font-semibold text-foreground">16 років</strong>. Реєструючись,
          ви підтверджуєте відповідний вік.
        </li>
        <li>Додавайте лише реальні пропозиції з актуальними цінами в гривнях (₴).</li>
        <li>Вказуйте правильне посилання на товар та магазин.</li>
        <li>Не спамте та не дублюйте однакові пропозиції.</li>
        <li>Голосуйте чесно — «гаряче» лише для справді вигідних пропозицій.</li>
        <li>Поважайте інших учасників у коментарях.</li>
        <li>Адміністрація може видалити або відхилити пропозиції без попередження.</li>
      </ul>
      <Button asChild variant="outline">
        <Link href="/submit">{t("nav.submit")}</Link>
      </Button>
    </div>
  );
}

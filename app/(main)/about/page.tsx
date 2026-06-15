import Link from "next/link";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export const metadata = { title: "Про нас" };

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("footer.about")}</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p>
          <strong className="text-foreground">VygodaUA</strong> — спільнота вигідних пропозицій та знижок для України.
          Користувачі діляться вигідними цінами, голосують за якість пропозицій та допомагають один одному економити.
        </p>
        <p>
          Зараз сайт працює в демо-режимі з тестовими даними. Незабаром — реєстрація, база даних та ще більше пропозицій.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/">{t("nav.home")}</Link>
      </Button>
    </div>
  );
}

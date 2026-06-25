import Link from "next/link";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export const metadata = { title: "Про нас" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Про нас</h1>
        <p className="text-lg font-medium text-foreground">Ласкаво просимо до VyhodaDeal!</p>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>
          <strong className="font-semibold text-foreground">VyhodaDeal</strong> — це незалежна
          спільнота, присвячена вигідним пропозиціям, знижкам та акціям в Україні. Наша мета —
          допомогти людям заощаджувати під час покупок і швидко знаходити найкращі пропозиції.
        </p>
        <p>
          На нашій платформі користувачі можуть знаходити цікаві пропозиції, оцінювати їх,
          залишати коментарі та ділитися ними з іншими. Разом ми створюємо спільноту, де
          найкращі пропозиції стають помітними, а кожен може скористатися досвідом інших.
        </p>
        <p>
          Ми цінуємо прозорість і незалежність. Пропозиції, опубліковані на VyhodaDeal, надходять
          як від нашої команди, так і від учасників спільноти. Наша мета — надавати актуальні,
          якісні та справді вигідні пропозиції.
        </p>
        <p>
          Деякі посилання на нашому сайті можуть бути партнерськими (affiliate) посиланнями. Якщо
          ви здійсните покупку за таким посиланням, ми можемо отримати невелику комісію. Для вас
          це не призведе до жодних додаткових витрат. Отримані кошти допомагають нам розвивати
          VyhodaDeal та підтримувати платформу безкоштовною для всіх користувачів.
        </p>
        <p>
          Дякуємо, що стали частиною спільноти VyhodaDeal. Разом ми знаходимо найкращі пропозиції
          для України!
        </p>
      </div>

      <Button asChild variant="outline">
        <Link href="/">{t("nav.home")}</Link>
      </Button>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Mail, Send } from "lucide-react";
import { t } from "@/lib/i18n/uk";

export const metadata = { title: "Контакти" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Контакти</h1>
        <p className="text-muted-foreground">
          <strong className="font-semibold text-foreground">VyhodaDeal</strong> — платформа для
          пошуку найкращих акцій, знижок та вигідних пропозицій в Україні.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Оператор сайту</h2>
        <div className="space-y-1 text-muted-foreground">
          <p>
            <strong className="font-semibold text-foreground">ФОП Olena Sysak</strong>
          </p>
          <p>Dniprovska Embankment 26</p>
          <p>02133 Kyiv</p>
          <p>Ukraine</p>
        </div>
      </section>

      <section className="space-y-4">
        <a
          href="mailto:support@vyhodadeal.com"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            <span className="font-medium text-foreground">E-mail:</span> support@vyhodadeal.com
          </span>
        </a>
        <a
          href="https://t.me/vyhodadeal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Send className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            <span className="font-medium text-foreground">Telegram:</span> t.me/vyhodadeal
          </span>
        </a>
        <div className="flex gap-2 text-muted-foreground">
          <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <div>
            <p className="font-medium text-foreground">Режим роботи:</p>
            <p>Понеділок – П&apos;ятниця: 09:00–18:00 (за київським часом)</p>
          </div>
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        Якщо у вас є запитання, пропозиції щодо співпраці, ви знайшли помилку або хочете
        повідомити про вигідну пропозицію, зв&apos;яжіться з нами електронною поштою або через
        Telegram.
      </p>
      <p className="text-sm text-muted-foreground">
        Ми відповідаємо, як правило, протягом 1–2 робочих днів.
      </p>

      <Button asChild variant="outline">
        <Link href="/">{t("nav.home")}</Link>
      </Button>
    </div>
  );
}

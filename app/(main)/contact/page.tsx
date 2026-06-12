import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { t } from "@/lib/i18n/uk";

export const metadata = { title: "Контакт" };

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("footer.contact")}</h1>
      <p className="text-muted-foreground">
        Маєте питання, пропозиції або знайшли помилку? Напишіть нам — відповімо якнайшвидше.
      </p>
      <a
        href="mailto:hello@dealua.local"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        <Mail className="h-4 w-4" />
        hello@dealua.local
      </a>
      <div>
        <Button asChild variant="outline">
          <Link href="/">{t("nav.home")}</Link>
        </Button>
      </div>
    </div>
  );
}

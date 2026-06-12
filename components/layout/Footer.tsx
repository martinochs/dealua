import Link from "next/link";
import { t } from "@/lib/i18n/uk";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-foreground">{t("footer.about")}</Link>
            <Link href="/rules" className="hover:text-foreground">{t("footer.rules")}</Link>
            <Link href="/contact" className="hover:text-foreground">{t("footer.contact")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

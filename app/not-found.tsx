import Link from "next/link";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">{t("errors.notFound")}</p>
      <Button asChild>
        <Link href="/">{t("nav.home")}</Link>
      </Button>
    </div>
  );
}

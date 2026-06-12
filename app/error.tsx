"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/uk";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4 text-center">
      <h2 className="text-xl font-semibold">{t("errors.generic")}</h2>
      <p className="text-sm text-muted-foreground max-w-md">{error.message}</p>
      <div className="flex gap-3">
        <Button onClick={reset}>Спробувати знову</Button>
        <Button variant="outline" asChild>
          <Link href="/">{t("nav.home")}</Link>
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { isInAppBrowser } from "@/lib/in-app-browser";
import { t } from "@/lib/i18n/uk";

interface DealOutboundLandingProps {
  dealId: string;
  dealTitle: string;
  merchantName: string | null;
  targetUrl: string;
}

export function DealOutboundLanding({
  dealId,
  dealTitle,
  merchantName,
  targetUrl,
}: DealOutboundLandingProps) {
  const [inApp, setInApp] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setInApp(isInAppBrowser(ua));
    setIsIOS(/iPhone|iPad|iPod/i.test(ua));
  }, []);

  const openLabel = merchantName?.toLowerCase().includes("aliexpress")
    ? t("go.openButton")
    : t("deals.goToOffer");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/40 px-4 py-4">
        <Logo heightClass="h-10 sm:h-12" />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-8">
        {inApp && (
          <div
            className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
            role="status"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
            <div>
              <p className="font-semibold">{t("go.inAppTitle")}</p>
              <p className="mt-1 text-amber-900/90">
                {isIOS ? t("go.inAppHintIOS") : t("go.inAppHintAndroid")}
              </p>
            </div>
          </div>
        )}

        <div className="deal-card deal-card-standard rounded-2xl p-6 text-center shadow-sm">
          {merchantName && (
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {merchantName}
            </p>
          )}
          <h1 className="text-lg font-bold leading-snug text-foreground">{dealTitle}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t("go.description")}</p>

          <Button asChild size="lg" className="deal-cta mt-6 h-12 w-full text-base font-bold">
            <a href={targetUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-5 w-5" aria-hidden />
              {openLabel}
            </a>
          </Button>

          <p className="mt-3 text-xs text-muted-foreground/70">{t("go.merchantNote")}</p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <Link href={`/deal/${dealId}`} className="text-primary hover:underline">
            {t("go.backToDeal")}
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground hover:underline">
            {t("go.backHome")}
          </Link>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { telegramSignInAction } from "@/lib/actions/telegram-auth";
import { t } from "@/lib/i18n/uk";
import type { TelegramAuthUser } from "@/lib/telegram-auth";

interface TelegramSignInButtonProps {
  next?: string;
}

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramAuthUser) => void;
  }
}

export function TelegramSignInButton({ next }: TelegramSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!botUsername || !containerRef.current) return;

    window.onTelegramAuth = async (user) => {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("payload", JSON.stringify(user));
      if (next) formData.append("next", next);

      const result = await telegramSignInAction(formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");

    containerRef.current.replaceChildren(script);

    return () => {
      delete window.onTelegramAuth;
    };
  }, [botUsername, next]);

  if (!botUsername) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className={`flex justify-center ${isLoading ? "pointer-events-none opacity-60" : ""}`}
        aria-busy={isLoading}
      />
      {isLoading && (
        <p className="text-sm text-muted-foreground text-center">{t("auth.telegramLoading")}</p>
      )}
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  );
}

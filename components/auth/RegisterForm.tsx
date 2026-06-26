"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff, Lock, Mail, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { TelegramSignInButton } from "@/components/auth/TelegramSignInButton";
import { registerAction, type ActionResult } from "@/lib/actions/auth";
import { t } from "@/lib/i18n/uk";

const cardClassName =
  "w-full rounded-2xl border border-border/60 bg-card p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] sm:p-8";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => registerAction(formData),
    {}
  );

  if (state.emailConfirmationRequired) {
    return (
      <div className={cardClassName}>
        <div className="space-y-4 pt-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-6 w-6" aria-hidden />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t("auth.confirmEmailTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("auth.confirmEmailDescription")}</p>
            {state.email && (
              <p className="text-sm font-medium text-foreground">{state.email}</p>
            )}
            <p className="text-xs text-muted-foreground">{t("auth.confirmEmailSpamHint")}</p>
          </div>
          <Button asChild className="h-12 w-full rounded-xl bg-uk-yellow text-uk-yellow-foreground hover:brightness-105">
            <Link href="/login">{t("auth.confirmEmailGoToLogin")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClassName}>
      <div className="space-y-1 pb-6">
        <h2 className="text-2xl font-bold tracking-tight">{t("auth.createAccount")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("auth.createAccountSubtitle")}{" "}
          <span className="font-medium text-emerald-600">{t("auth.createAccountSubtitleFree")}</span>
        </p>
      </div>

      <div className="space-y-5">
        <form action={formAction} className="space-y-4">
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}

          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t("auth.emailPlaceholder")}
                className="h-12 rounded-xl pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder={t("auth.passwordPlaceholder")}
                className="h-12 rounded-xl pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">{t("auth.passwordHint")}</p>
          </div>

          <div className="space-y-1.5 rounded-xl border border-border/70 bg-muted/20 p-3">
            <label htmlFor="age_confirmed" className="flex cursor-pointer items-start gap-2.5">
              <input
                id="age_confirmed"
                name="age_confirmed"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-primary"
              />
              <span className="text-sm leading-snug">
                {t("auth.ageConfirmLabel")}.{" "}
                <Link href="/rules" className="font-medium text-primary hover:underline">
                  {t("footer.rules")}
                </Link>
              </span>
            </label>
            <p className="pl-6 text-xs text-muted-foreground">{t("auth.ageConfirmHint")}</p>
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-uk-yellow text-base font-semibold text-uk-yellow-foreground shadow-sm hover:brightness-105"
            disabled={isPending}
          >
            {t("auth.registerSubmit")}
          </Button>
        </form>

        <AuthDivider />

        <div className="space-y-3">
          <GoogleSignInButton />
          <TelegramSignInButton />
          <p className="text-center text-xs text-muted-foreground">{t("auth.ageConfirmOAuth")}</p>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {t("auth.hasAccount")}{" "}
          <Link href="/login" className="font-semibold text-foreground hover:text-primary hover:underline">
            {t("auth.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}

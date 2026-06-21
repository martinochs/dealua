"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { loginAction } from "@/lib/actions/auth";
import { t } from "@/lib/i18n/uk";

interface LoginFormProps {
  mockMode?: boolean;
  next?: string;
  oauthError?: boolean;
}

export function LoginForm({ mockMode = false, next, oauthError = false }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string }, formData: FormData) => loginAction(formData),
    {}
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("auth.login")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!mockMode && (
          <>
            <GoogleSignInButton next={next} />
            <AuthDivider />
          </>
        )}
        <form action={formAction} className="space-y-4">
          {next && <input type="hidden" name="next" value={next} />}
          {(state.error || oauthError) && (
            <p className="text-sm text-destructive">
              {state.error ?? t("auth.oauthCallbackError")}
            </p>
          )}
          {mockMode ? (
            <div className="space-y-2">
              <Label htmlFor="username">{t("auth.username")}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {t("auth.login")}
          </Button>
          {!mockMode && (
            <p className="text-center text-sm text-muted-foreground">
              {t("auth.noAccount")}{" "}
              <Link href="/register" className="text-primary hover:underline">
                {t("auth.register")}
              </Link>
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { isMockMode } from "@/lib/config";
import { t } from "@/lib/i18n/uk";

export default function LoginPage() {
  if (isMockMode()) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-lg font-medium">{t("auth.login")}</p>
            <p className="text-sm text-muted-foreground">
              У демо-режимі ви автоматично увійшли як <strong>admin</strong>.
              Авторизація буде доступна після підключення Supabase.
            </p>
            <Button asChild>
              <Link href="/">{t("nav.home")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <LoginForm />
    </div>
  );
}

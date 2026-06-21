import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RegisterBenefitsPanel } from "@/components/auth/RegisterBenefitsPanel";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { RegisterTrustBadges } from "@/components/auth/RegisterTrustBadges";
import { isMockMode } from "@/lib/config";
import { t } from "@/lib/i18n/uk";

export default function RegisterPage() {
  if (isMockMode()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4 pt-6 text-center">
            <p className="text-lg font-medium">{t("auth.register")}</p>
            <p className="text-sm text-muted-foreground">
              Реєстрація буде доступна після підключення Supabase. Для входу в адмін-панель
              використовуйте логін адміністратора.
            </p>
            <Button asChild>
              <Link href="/login">{t("auth.login")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-8 lg:flex-row lg:items-center lg:justify-center lg:gap-16 xl:gap-24">
        <RegisterBenefitsPanel variant="compact" className="w-full max-w-md lg:hidden" />
        <RegisterBenefitsPanel variant="full" className="hidden w-full max-w-xl lg:flex lg:flex-1" />
        <div className="w-full max-w-md shrink-0 lg:flex-1 lg:max-w-md">
          <RegisterForm />
          <RegisterTrustBadges />
        </div>
      </div>
    </div>
  );
}

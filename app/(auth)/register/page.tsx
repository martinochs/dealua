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
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-1 flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-20">
          <RegisterBenefitsPanel className="lg:flex-1" />
          <div className="w-full max-w-md shrink-0 lg:flex-1 lg:max-w-[420px]">
            <RegisterForm />
          </div>
        </div>
        <RegisterTrustBadges className="mt-10 lg:mt-14" />
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/RegisterForm";
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
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <RegisterForm />
    </div>
  );
}

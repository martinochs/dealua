import { t } from "@/lib/i18n/uk";

export function AuthDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-card px-3 text-muted-foreground">{t("auth.or")}</span>
      </div>
    </div>
  );
}

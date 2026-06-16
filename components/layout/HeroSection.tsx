import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { t } from "@/lib/i18n/uk";

interface HeroSectionProps {
  dealCount: number;
  categoryCount: number;
}

export function HeroSection({ dealCount, categoryCount }: HeroSectionProps) {
  return (
    <section className="rounded-xl bg-gradient-to-br from-primary/10 via-background to-hot/5 border p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Logo link={false} heightClass="h-10 sm:h-11" />
          <h1 className="text-2xl font-bold sm:text-3xl">{t("site.tagline")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {dealCount} активних пропозицій · {categoryCount} категорій · голосуйте та економте
          </p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto shrink-0">
          <Link href="/deals">
            Усі пропозиції
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

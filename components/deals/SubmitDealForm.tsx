"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitDealAction } from "@/lib/actions/submit-deal";
import { t } from "@/lib/i18n/uk";
import type { Category, Merchant } from "@/types/database";

interface SubmitDealFormProps {
  categories: Category[];
  merchants: Merchant[];
  showSuccess?: boolean;
}

export function SubmitDealForm({ categories, merchants, showSuccess }: SubmitDealFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string }, formData: FormData) => submitDealAction(formData),
    {}
  );

  if (showSuccess) {
    return (
      <Card>
        <CardContent className="pt-6 text-center space-y-4">
          <p className="text-lg font-medium text-green-600">{t("submit.success")}</p>
          <Button asChild>
            <Link href="/">{t("nav.home")}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("submit.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("submit.dealTitle")}</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("submit.description")}</Label>
            <Textarea id="description" name="description" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_uah">{t("submit.price")}</Label>
              <Input id="price_uah" name="price_uah" type="number" min="1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="original_price_uah">{t("submit.originalPrice")}</Label>
              <Input id="original_price_uah" name="original_price_uah" type="number" min="1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="external_url">{t("submit.externalUrl")}</Label>
            <Input id="external_url" name="external_url" type="url" placeholder="https://" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="affiliate_url">{t("submit.affiliateUrl")}</Label>
            <Input id="affiliate_url" name="affiliate_url" type="url" placeholder="https://" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">{t("submit.imageUrl")}</Label>
            <Input id="image_url" name="image_url" type="url" placeholder="https://" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category_id">{t("submit.category")}</Label>
              <select
                id="category_id"
                name="category_id"
                required
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Оберіть...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name_uk}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="merchant_id">{t("submit.merchant")}</Label>
              <select
                id="merchant_id"
                name="merchant_id"
                required
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Оберіть...</option>
                {merchants.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

          <Button type="submit" disabled={isPending} className="w-full">
            {t("deals.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

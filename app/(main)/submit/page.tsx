import { getCategories, getMerchants } from "@/lib/queries/deals";
import { SubmitDealForm } from "@/components/deals/SubmitDealForm";
import { t } from "@/lib/i18n/uk";

interface SubmitPageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function SubmitPage({ searchParams }: SubmitPageProps) {
  const params = await searchParams;
  const [categories, merchants] = await Promise.all([getCategories(), getMerchants()]);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{t("submit.title")}</h1>
      <SubmitDealForm
        categories={categories}
        merchants={merchants}
        showSuccess={params.success === "1"}
      />
    </div>
  );
}

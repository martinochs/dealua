import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DealOutboundLanding } from "@/components/deals/DealOutboundLanding";
import { getSession } from "@/lib/auth/session";
import { getDealById, getDealOutboundUrl, logDealClick } from "@/lib/queries/deals";
import { t } from "@/lib/i18n/uk";

interface GoPageProps {
  params: Promise<{ dealId: string }>;
}

export async function generateMetadata({ params }: GoPageProps): Promise<Metadata> {
  const { dealId } = await params;
  const deal = await getDealById(dealId);
  if (!deal || deal.status !== "approved") {
    return { title: t("errors.notFound"), robots: { index: false, follow: false } };
  }

  return {
    title: t("go.title"),
    robots: { index: false, follow: false },
  };
}

export default async function GoPage({ params }: GoPageProps) {
  const { dealId } = await params;
  const deal = await getDealById(dealId);

  if (!deal || deal.status !== "approved") notFound();

  const targetUrl = await getDealOutboundUrl(dealId);
  if (!targetUrl) notFound();

  const session = await getSession();
  await logDealClick(dealId, session?.id);

  return (
    <DealOutboundLanding
      dealId={deal.id}
      dealTitle={deal.title}
      merchantName={deal.merchant?.name ?? null}
      targetUrl={targetUrl}
    />
  );
}

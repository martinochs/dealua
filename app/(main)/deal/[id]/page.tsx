import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getDealById, getComments, getUserVote } from "@/lib/queries/deals";
import { getSession } from "@/lib/auth/session";
import { VoteButtons } from "@/components/deals/VoteButtons";
import { PriceTag } from "@/components/deals/PriceTag";
import { CommentList } from "@/components/comments/CommentList";
import { CommentForm } from "@/components/comments/CommentForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { CommentWithProfile } from "@/types/database";

interface DealPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DealPageProps): Promise<Metadata> {
  const { id } = await params;
  const deal = await getDealById(id);
  if (!deal || deal.status !== "approved") return { title: t("errors.notFound") };

  return {
    title: deal.title,
    description: deal.description.slice(0, 160),
    openGraph: {
      title: deal.title,
      description: deal.description.slice(0, 160),
      images: deal.image_url ? [{ url: deal.image_url }] : [],
    },
  };
}

export default async function DealPage({ params }: DealPageProps) {
  const { id } = await params;
  const deal = await getDealById(id);

  if (!deal || deal.status !== "approved") notFound();

  const user = await getSession();
  const [comments, userVote] = await Promise.all([
    getComments(id),
    user ? getUserVote(id, user.id) : Promise.resolve(null),
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex gap-4">
        <div className="hidden sm:block">
          <VoteButtons
            dealId={deal.id}
            hotCount={deal.hot_count}
            coldCount={deal.cold_count}
            userVote={userVote}
            isLoggedIn={!!user}
          />
        </div>

        <div className="flex-1 space-y-4">
          {deal.image_url && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image src={deal.image_url} alt={deal.title} fill className="object-cover" priority />
            </div>
          )}

          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {deal.category && (
                <Link href={`/category/${deal.category.slug}`}>
                  <Badge variant="secondary">{deal.category.icon} {deal.category.name_uk}</Badge>
                </Link>
              )}
              {deal.merchant && <Badge variant="outline">{deal.merchant.name}</Badge>}
            </div>
            <h1 className="text-2xl font-bold">{deal.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t("deals.submittedBy")}{" "}
              {deal.profile ? (
                <Link href={`/profile/${deal.profile.username}`} className="text-primary hover:underline">
                  {deal.profile.username}
                </Link>
              ) : "—"}{" "}
              · {formatRelativeTime(deal.created_at)}
            </p>
          </div>

          <PriceTag
            price={Number(deal.price_uah)}
            originalPrice={deal.original_price_uah ? Number(deal.original_price_uah) : null}
            size="lg"
          />

          <p className="text-base whitespace-pre-wrap leading-relaxed">{deal.description}</p>

          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={`/go/${deal.id}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              {t("deals.goToOffer")}
            </a>
          </Button>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-3 flex items-center justify-between gap-4 z-40">
        <VoteButtons
          dealId={deal.id}
          hotCount={deal.hot_count}
          coldCount={deal.cold_count}
          userVote={userVote}
          isLoggedIn={!!user}
        />
        <Button asChild className="flex-1">
          <a href={`/go/${deal.id}`} target="_blank" rel="noopener noreferrer">
            {t("deals.goToOffer")}
          </a>
        </Button>
      </div>

      <section className="space-y-4 pb-20 sm:pb-0">
        <h2 className="text-lg font-semibold">{t("deals.comments")}</h2>
        <CommentForm dealId={deal.id} isLoggedIn={!!user} />
        <CommentList comments={comments as CommentWithProfile[]} />
      </section>
    </div>
  );
}

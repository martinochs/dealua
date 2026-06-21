import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getDealById, getComments, getUserVote } from "@/lib/queries/deals";
import { getSession } from "@/lib/auth/session";
import { VoteButtons } from "@/components/deals/VoteButtons";
import { PriceTag } from "@/components/deals/PriceTag";
import { PopularityIndicator } from "@/components/deals/PopularityIndicator";
import { SocialProof } from "@/components/deals/SocialProof";
import { CommentList } from "@/components/comments/CommentList";
import { CommentForm } from "@/components/comments/CommentForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime, getVoteScore } from "@/lib/utils";
import { isHotDeal } from "@/lib/deal-feed";
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

  const score = getVoteScore(deal.hot_count, deal.cold_count);
  const hot = isHotDeal(deal);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-28 sm:pb-6">
      <div className="flex gap-4">
        <div className="hidden sm:block">
          <VoteButtons
            dealId={deal.id}
            hotCount={deal.hot_count}
            coldCount={deal.cold_count}
            userVote={userVote}
            isLoggedIn={!!user}
            featured={hot}
          />
        </div>

        <div className="flex-1 space-y-4">
          {deal.image_url && (
            <div className="overflow-hidden rounded-lg bg-muted">
              <Image
                src={deal.image_url}
                alt={deal.title}
                width={1024}
                height={1024}
                className="mx-auto h-auto w-full"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              {deal.category && (
                <Link href={`/category/${deal.category.slug}`}>
                  <Badge variant="secondary">{deal.category.icon} {deal.category.name_uk}</Badge>
                </Link>
              )}
              {deal.merchant && <Badge variant="outline">{deal.merchant.name}</Badge>}
              {hot && (
                <Badge className="border-0 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  🔥 {t("badges.hotDeal")}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">{deal.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
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

          <div className="flex flex-col gap-0.5">
            <PopularityIndicator score={score} className="text-xs sm:text-sm" />
            <SocialProof deal={deal} className="text-xs sm:text-sm" />
          </div>

          <p className="whitespace-pre-wrap text-base leading-relaxed">{deal.description}</p>

          <div className="hidden sm:block">
            <Button asChild size="default" className="deal-cta h-10 font-semibold sm:min-w-[14rem]">
              <a href={`/go/${deal.id}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t("deals.ctaGo")}
              </a>
            </Button>
            <p className="text-center text-sm text-muted-foreground sm:text-left">
              {t("deals.ctaView")} — {t("deals.goToOffer")}
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 border-t bg-card/95 p-3 shadow-[0_-6px_28px_rgba(15,23,42,0.1)] backdrop-blur-md sm:hidden">
        <VoteButtons
          dealId={deal.id}
          hotCount={deal.hot_count}
          coldCount={deal.cold_count}
          userVote={userVote}
          isLoggedIn={!!user}
          compact
          featured={hot}
        />
        <Button asChild className="deal-cta h-9 flex-1 text-sm font-semibold">
          <a href={`/go/${deal.id}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            {t("deals.ctaGo")}
          </a>
        </Button>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{t("deals.comments")}</h2>
        <CommentForm dealId={deal.id} isLoggedIn={!!user} />
        <CommentList comments={comments as CommentWithProfile[]} />
      </section>
    </div>
  );
}

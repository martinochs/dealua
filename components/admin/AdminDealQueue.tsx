"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { approveDealAction, rejectDealAction } from "@/lib/actions/admin";
import { formatUAH } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { DealWithRelations } from "@/types/database";

interface AdminDealQueueProps {
  deals: DealWithRelations[];
}

export function AdminDealQueue({ deals }: AdminDealQueueProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleApprove(id: string) {
    startTransition(() => {
      void approveDealAction(id).then(() => router.refresh());
    });
  }

  function handleReject(id: string) {
    startTransition(() => {
      void rejectDealAction(id).then(() => router.refresh());
    });
  }

  if (deals.length === 0) {
    return <p className="text-muted-foreground">{t("admin.noPending")}</p>;
  }

  return (
    <div className="space-y-4">
      {deals.map((deal) => (
        <Card key={deal.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              {deal.image_url && (
                <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <Image src={deal.image_url} alt="" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{deal.title}</h3>
                <p className="text-sm text-muted-foreground">{formatUAH(Number(deal.price_uah))}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {deal.profile?.username} · {deal.merchant?.name}
                </p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Button size="sm" onClick={() => handleApprove(deal.id)} disabled={isPending}>
                  {t("admin.approve")}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleReject(deal.id)} disabled={isPending}>
                  {t("admin.reject")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

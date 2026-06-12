"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { commentAction } from "@/lib/actions/comment";
import { t } from "@/lib/i18n/uk";
import Link from "next/link";

interface CommentFormProps {
  dealId: string;
  isLoggedIn: boolean;
}

export function CommentForm({ dealId, isLoggedIn }: CommentFormProps) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <p className="text-sm text-muted-foreground">
        <Link href="/login" className="text-primary hover:underline">
          {t("deals.loginToComment")}
        </Link>
      </p>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(() => {
      void commentAction(dealId, body).then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setBody("");
          router.refresh();
        }
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={t("deals.commentPlaceholder")}
        maxLength={2000}
        disabled={isPending}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={isPending || !body.trim()}>
        {t("deals.addComment")}
      </Button>
    </form>
  );
}

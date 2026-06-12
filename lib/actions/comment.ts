"use server";

import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/config";
import { getSession } from "@/lib/auth/session";
import { getMockProfile, mockAddComment } from "@/lib/mock/store";
import { supabaseAddComment } from "@/lib/supabase/queries/deals";
import { commentSchema } from "@/lib/validators/schemas";
import { stripHtml } from "@/lib/utils";

export type CommentResult = { error?: string; success?: boolean };

export async function commentAction(
  dealId: string,
  body: string
): Promise<CommentResult> {
  const parsed = commentSchema.safeParse({ deal_id: dealId, body: stripHtml(body) });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message };

  if (isMockMode()) {
    const user = getMockProfile();
    const comment = mockAddComment(dealId, user.id, parsed.data.body);
    if (!comment) return { error: "Не вдалося додати коментар" };
    revalidatePath(`/deal/${dealId}`);
    return { success: true };
  }

  const session = await getSession();
  if (!session) return { error: "Увійдіть, щоб коментувати" };

  const comment = await supabaseAddComment(dealId, session.id, parsed.data.body);
  if (!comment) return { error: "Не вдалося додати коментар" };

  revalidatePath(`/deal/${dealId}`);
  return { success: true };
}

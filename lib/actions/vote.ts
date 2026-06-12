"use server";

import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/config";
import { getSession } from "@/lib/auth/session";
import { getMockProfile, mockVote } from "@/lib/mock/store";
import { supabaseVote } from "@/lib/supabase/queries/deals";
import { voteSchema } from "@/lib/validators/schemas";

export type VoteResult = {
  error?: string;
  hot_count?: number;
  cold_count?: number;
  user_vote?: "hot" | "cold" | null;
};

export async function voteAction(
  dealId: string,
  voteType: "hot" | "cold"
): Promise<VoteResult> {
  const parsed = voteSchema.safeParse({ deal_id: dealId, vote_type: voteType });
  if (!parsed.success) return { error: "Невірні дані" };

  if (isMockMode()) {
    const user = getMockProfile();
    const result = mockVote(dealId, user.id, voteType);
    if (!result) return { error: "Пропозицію не знайдено" };
    revalidatePath(`/deal/${dealId}`);
    revalidatePath("/");
    revalidatePath("/deals");
    return result;
  }

  const session = await getSession();
  if (!session) return { error: "Увійдіть, щоб голосувати" };

  const result = await supabaseVote(dealId, session.id, voteType);
  if (!result) return { error: "Пропозицію не знайдено" };

  revalidatePath(`/deal/${dealId}`);
  revalidatePath("/");
  revalidatePath("/deals");
  return result;
}

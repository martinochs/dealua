"use server";

import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/config";
import { mockApproveDeal, mockRejectDeal } from "@/lib/mock/store";
import { supabaseApproveDeal, supabaseRejectDeal } from "@/lib/supabase/queries/deals";

export type AdminResult = { error?: string; success?: boolean };

export async function approveDealAction(dealId: string): Promise<AdminResult> {
  if (isMockMode()) {
    mockApproveDeal(dealId);
  } else {
    await supabaseApproveDeal(dealId);
  }
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/deals");
  return { success: true };
}

export async function rejectDealAction(dealId: string): Promise<AdminResult> {
  if (isMockMode()) {
    mockRejectDeal(dealId);
  } else {
    await supabaseRejectDeal(dealId);
  }
  revalidatePath("/admin");
  return { success: true };
}

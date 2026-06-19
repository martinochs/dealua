"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isMockMode } from "@/lib/config";
import { getSession } from "@/lib/auth/session";
import { getMockProfile, mockAddDeal } from "@/lib/mock/store";
import { supabaseAddDeal } from "@/lib/supabase/queries/deals";
import { submitDealSchema } from "@/lib/validators/schemas";

export type SubmitDealResult = { error?: string; success?: boolean };

export async function submitDealAction(formData: FormData): Promise<SubmitDealResult> {
  const originalPrice = formData.get("original_price_uah");
  const imageUrl = formData.get("image_url");

  const parsed = submitDealSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price_uah: formData.get("price_uah"),
    original_price_uah: originalPrice || undefined,
    affiliate_url: formData.get("affiliate_url"),
    image_url: imageUrl || undefined,
    category_id: formData.get("category_id"),
    merchant_id: formData.get("merchant_id"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message };
  }

  if (isMockMode()) {
    const user = getMockProfile();
    mockAddDeal({
      user_id: user.id,
      category_id: parsed.data.category_id,
      merchant_id: parsed.data.merchant_id,
      title: parsed.data.title,
      description: parsed.data.description,
      price_uah: parsed.data.price_uah,
      original_price_uah: parsed.data.original_price_uah ?? null,
      external_url: parsed.data.external_url,
      affiliate_url: parsed.data.affiliate_url,
      image_url: parsed.data.image_url ?? null,
      status: "pending",
      hot_count: 0,
      cold_count: 0,
      expires_at: null,
      category: null,
      merchant: null,
      profile: { username: user.username, avatar_url: user.avatar_url },
    });
  } else {
    const session = await getSession();
    if (!session) return { error: "Увійдіть, щоб додати пропозицію" };

    try {
      await supabaseAddDeal({
        user_id: session.id,
        category_id: parsed.data.category_id,
        merchant_id: parsed.data.merchant_id,
        title: parsed.data.title,
        description: parsed.data.description,
        price_uah: parsed.data.price_uah,
        original_price_uah: parsed.data.original_price_uah ?? null,
        external_url: parsed.data.external_url,
        affiliate_url: parsed.data.affiliate_url ?? null,
        image_url: parsed.data.image_url ?? null,
      });
    } catch {
      return { error: "Не вдалося надіслати пропозицію" };
    }
  }

  revalidatePath("/admin");
  redirect("/submit?success=1");
}

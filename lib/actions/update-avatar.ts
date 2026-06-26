"use server";

import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/config";
import { getProfile } from "@/lib/auth/session";
import { isAllowedAvatarUrl } from "@/lib/avatars/presets";
import { updateMockProfileAvatar } from "@/lib/mock/store";
import { createClient } from "@/lib/supabase/server";

export type UpdateAvatarResult = { error?: string; success?: boolean };

export async function updateAvatarAction(avatarUrl: string | null): Promise<UpdateAvatarResult> {
  const profile = await getProfile();
  if (!profile) {
    return { error: "Увійдіть, щоб змінити аватар" };
  }

  if (!isAllowedAvatarUrl(avatarUrl)) {
    return { error: "Невірний аватар" };
  }

  if (isMockMode()) {
    updateMockProfileAvatar(profile.id, avatarUrl);
    revalidatePath("/settings");
    revalidatePath(`/profile/${profile.username}`);
    revalidatePath("/", "layout");
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", profile.id);

  if (error) {
    return { error: "Не вдалося оновити аватар" };
  }

  revalidatePath("/settings");
  revalidatePath(`/profile/${profile.username}`);
  revalidatePath("/", "layout");
  return { success: true };
}

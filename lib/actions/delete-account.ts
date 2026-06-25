"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/config";
import { clearMockSession } from "@/lib/auth/mock-session";
import { getProfile } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type DeleteAccountResult = { error?: string };

export async function deleteAccountAction(formData: FormData): Promise<DeleteAccountResult> {
  const profile = await getProfile();
  if (!profile) {
    redirect("/login?next=/settings");
  }

  const confirmation = String(formData.get("confirmation") ?? "").trim();
  if (confirmation !== profile.username) {
    return { error: "Ім'я користувача не збігається" };
  }

  if (profile.role === "admin") {
    return {
      error:
        "Акаунт адміністратора не можна видалити самостійно. Зверніться до підтримки: support@vyhodadeal.com",
    };
  }

  if (isMockMode()) {
    await clearMockSession();
    revalidatePath("/", "layout");
    redirect("/");
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.deleteUser(profile.id);
    if (error) {
      return { error: "Не вдалося видалити акаунт" };
    }
  } catch {
    return { error: "Не вдалося видалити акаунт" };
  }

  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

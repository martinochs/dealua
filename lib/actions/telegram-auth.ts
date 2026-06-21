"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { safeRedirectPath } from "@/lib/site-url";
import {
  getTelegramDisplayName,
  getTelegramProfileUsername,
  getTelegramUserCredentials,
  verifyTelegramAuth,
  type TelegramAuthUser,
} from "@/lib/telegram-auth";
import { t } from "@/lib/i18n/uk";

export type TelegramSignInResult = { error?: string };

export async function telegramSignInAction(
  formData: FormData
): Promise<TelegramSignInResult> {
  if (isMockMode()) {
    return { error: t("auth.telegramUnavailable") };
  }

  const next = safeRedirectPath(formData.get("next") as string | null);
  const payloadRaw = formData.get("payload");

  let user: TelegramAuthUser;
  try {
    user = JSON.parse(String(payloadRaw)) as TelegramAuthUser;
  } catch {
    return { error: t("auth.telegramError") };
  }

  if (!verifyTelegramAuth(user)) {
    return { error: t("auth.telegramError") };
  }

  const { email, password } = getTelegramUserCredentials(user.id);
  const supabase = await createClient();
  let { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    try {
      const admin = createAdminClient();
      const { error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          username: getTelegramProfileUsername(user),
          full_name: getTelegramDisplayName(user),
          avatar_url: user.photo_url ?? null,
          telegram_id: user.id,
          provider: "telegram",
        },
      });

      if (createError && !createError.message.toLowerCase().includes("already")) {
        return { error: t("auth.telegramError") };
      }

      ({ error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      }));
    } catch {
      return { error: t("auth.telegramError") };
    }
  }

  if (signInError) {
    return { error: t("auth.telegramError") };
  }

  revalidatePath("/", "layout");
  redirect(next);
}

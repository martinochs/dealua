"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isMockMode } from "@/lib/config";
import {
  clearMockSession,
  getMockAdminProfile,
  setMockSession,
  verifyMockAdminLogin,
} from "@/lib/auth/mock-session";
import { createClient } from "@/lib/supabase/server";
import { safeRedirectPath } from "@/lib/site-url";
import { loginSchema, mockLoginSchema, registerSchema } from "@/lib/validators/schemas";

export type ActionResult = { error?: string; success?: boolean };

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const next = safeRedirectPath(formData.get("next") as string | null);

  if (isMockMode()) {
    const parsed = mockLoginSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    if (!parsed.success) {
      return { error: parsed.error.errors[0]?.message };
    }

    if (!verifyMockAdminLogin(parsed.data.username, parsed.data.password)) {
      return { error: "Невірне ім'я користувача або пароль" };
    }

    const admin = getMockAdminProfile();
    if (!admin) {
      return { error: "Адміністратора не знайдено" };
    }

    await setMockSession(admin.id);
    revalidatePath("/", "layout");
    redirect(next);
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: "Невірний email або пароль" };
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  if (isMockMode()) {
    redirect("/login");
  }

  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  });
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { username: parsed.data.username } },
  });

  if (error) {
    return { error: "Не вдалося створити акаунт" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoutAction() {
  if (isMockMode()) {
    await clearMockSession();
    revalidatePath("/", "layout");
  } else {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
  }
  redirect("/");
}

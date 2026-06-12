import type { Profile } from "@/types/database";
import { isMockMode } from "@/lib/config";
import { getMockProfile } from "@/lib/mock/store";
import { createClient } from "@/lib/supabase/server";
import { supabaseGetProfile } from "@/lib/supabase/queries/deals";

export async function getSession() {
  if (isMockMode()) {
    return { id: getMockProfile().id, email: "demo@dealua.local" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? "" };
}

export async function getProfile(): Promise<Profile | null> {
  if (isMockMode()) {
    return getMockProfile();
  }

  const session = await getSession();
  if (!session) return null;
  return supabaseGetProfile(session.id);
}

export async function isAdmin() {
  const profile = await getProfile();
  return profile?.role === "admin";
}

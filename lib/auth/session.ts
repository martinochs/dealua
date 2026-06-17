import type { Profile } from "@/types/database";
import { isMockMode } from "@/lib/config";
import { getMockProfileById, getMockSessionUserId } from "@/lib/auth/mock-session";
import { createClient } from "@/lib/supabase/server";
import { supabaseGetProfile } from "@/lib/supabase/queries/deals";

export async function getSession() {
  if (isMockMode()) {
    const userId = await getMockSessionUserId();
    if (!userId) return null;
    const profile = getMockProfileById(userId);
    if (!profile) return null;
    return { id: profile.id, email: "demo@dealua.local" };
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
    const userId = await getMockSessionUserId();
    if (!userId) return null;
    return getMockProfileById(userId);
  }

  const session = await getSession();
  if (!session) return null;
  return supabaseGetProfile(session.id);
}

export async function isAdmin() {
  const profile = await getProfile();
  return profile?.role === "admin";
}

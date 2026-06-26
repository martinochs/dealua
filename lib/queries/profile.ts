import { isMockMode } from "@/lib/config";
import { getMockUserProfileStats } from "@/lib/mock/store";
import {
  supabaseGetUserProfileStats,
  type UserProfileStats,
} from "@/lib/supabase/queries/profile";

export type { UserProfileStats };

export async function getUserProfileStats(userId: string): Promise<UserProfileStats> {
  return isMockMode()
    ? getMockUserProfileStats(userId)
    : supabaseGetUserProfileStats(userId);
}

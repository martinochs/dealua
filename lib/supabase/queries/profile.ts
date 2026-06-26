import { createClient } from "@/lib/supabase/server";

export type UserProfileStats = {
  dealCount: number;
  commentCount: number;
  hotPoints: number;
  coldPoints: number;
};

export async function supabaseGetUserProfileStats(userId: string): Promise<UserProfileStats> {
  const supabase = await createClient();

  const [dealsResult, commentsResult] = await Promise.all([
    supabase
      .from("deals")
      .select("hot_count, cold_count")
      .eq("user_id", userId)
      .eq("status", "approved"),
    supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
  ]);

  if (dealsResult.error) throw dealsResult.error;
  if (commentsResult.error) throw commentsResult.error;

  const deals = dealsResult.data ?? [];

  return {
    dealCount: deals.length,
    commentCount: commentsResult.count ?? 0,
    hotPoints: deals.reduce((sum, deal) => sum + deal.hot_count, 0),
    coldPoints: deals.reduce((sum, deal) => sum + deal.cold_count, 0),
  };
}

import { createClient } from "@/lib/supabase/server";
import type {
  Category,
  CommentWithProfile,
  DealWithRelations,
  Merchant,
  Profile,
  SortMode,
} from "@/types/database";

const DEAL_SELECT = `
  *,
  category:categories(slug, name_uk, icon),
  merchant:merchants(name, slug, logo_url),
  profile:profiles(username, avatar_url)
`;

function mapDeal(row: Record<string, unknown>): DealWithRelations {
  const { category, merchant, profile, ...deal } = row;
  return {
    ...(deal as DealWithRelations),
    category: (category as DealWithRelations["category"]) ?? null,
    merchant: (merchant as DealWithRelations["merchant"]) ?? null,
    profile: (profile as DealWithRelations["profile"]) ?? null,
  };
}

async function getCategoryIdBySlug(slug: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  return data?.id ?? null;
}

export async function supabaseGetDeals(
  sort: SortMode = "hot",
  categorySlug?: string,
  limit = 20,
  offset = 0,
  query?: string
): Promise<DealWithRelations[]> {
  const supabase = await createClient();
  let dbQuery = supabase.from("deals").select(DEAL_SELECT).eq("status", "approved");

  if (categorySlug) {
    const categoryId = await getCategoryIdBySlug(categorySlug);
    if (!categoryId) return [];
    dbQuery = dbQuery.eq("category_id", categoryId);
  }

  if (query?.trim()) {
    const q = query.trim();
    dbQuery = dbQuery.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (sort === "new") {
    dbQuery = dbQuery.order("created_at", { ascending: false });
  } else if (sort === "top") {
    const cutoff = new Date(Date.now() - 24 * 3600000).toISOString();
    dbQuery = dbQuery.gte("created_at", cutoff).order("hot_count", { ascending: false });
  } else {
    dbQuery = dbQuery.order("hot_count", { ascending: false }).order("created_at", { ascending: false });
  }

  dbQuery = dbQuery.range(offset, offset + limit - 1);

  const { data, error } = await dbQuery;
  if (error) throw error;
  return (data ?? []).map(mapDeal);
}

export async function supabaseGetCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function supabaseGetMerchants(): Promise<Merchant[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("merchants").select("*").order("name");
  if (error) throw error;
  return data ?? [];
}

export async function supabaseCountDeals(
  sort: SortMode = "hot",
  categorySlug?: string,
  query?: string
): Promise<number> {
  const supabase = await createClient();
  let dbQuery = supabase
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  if (categorySlug) {
    const categoryId = await getCategoryIdBySlug(categorySlug);
    if (!categoryId) return 0;
    dbQuery = dbQuery.eq("category_id", categoryId);
  }

  if (query?.trim()) {
    const q = query.trim();
    dbQuery = dbQuery.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (sort === "top") {
    const cutoff = new Date(Date.now() - 24 * 3600000).toISOString();
    dbQuery = dbQuery.gte("created_at", cutoff);
  }

  const { count, error } = await dbQuery;
  if (error) throw error;
  return count ?? 0;
}

export async function supabaseGetDealById(id: string): Promise<DealWithRelations | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("deals").select(DEAL_SELECT).eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapDeal(data) : null;
}

export async function supabaseGetUserVote(
  dealId: string,
  userId: string
): Promise<"hot" | "cold" | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("votes")
    .select("vote_type")
    .eq("deal_id", dealId)
    .eq("user_id", userId)
    .maybeSingle();
  return (data?.vote_type as "hot" | "cold" | undefined) ?? null;
}

export async function supabaseGetComments(dealId: string): Promise<CommentWithProfile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*, profile:profiles(username, avatar_url)")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => {
    const { profile, ...comment } = row;
    return {
      ...comment,
      profile: profile ?? null,
    } as CommentWithProfile;
  });
}

export async function supabaseGetProfileByUsername(username: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function supabaseGetUserDeals(userId: string): Promise<DealWithRelations[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("deals")
    .select(DEAL_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapDeal);
}

export async function supabaseGetPendingDeals(): Promise<DealWithRelations[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("deals")
    .select(DEAL_SELECT)
    .eq("status", "pending")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapDeal);
}

export async function supabaseGetStats() {
  const supabase = await createClient();
  const [approved, pending, categories] = await Promise.all([
    supabase.from("deals").select("*", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("deals").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("categories").select("*", { count: "exact", head: true }).eq("is_active", true),
  ]);
  return {
    approvedDeals: approved.count ?? 0,
    pendingDeals: pending.count ?? 0,
    categories: categories.count ?? 0,
  };
}

export async function supabaseGetClickStats(): Promise<
  { dealId: string; title: string; clicks: number }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("click_events").select("deal_id");
  if (error) throw error;

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.deal_id] = (counts[row.deal_id] ?? 0) + 1;
  }

  const dealIds = Object.keys(counts);
  if (dealIds.length === 0) return [];

  const { data: deals } = await supabase.from("deals").select("id, title").in("id", dealIds);
  const titles = new Map((deals ?? []).map((d) => [d.id, d.title]));

  return Object.entries(counts)
    .map(([dealId, clicks]) => ({
      dealId,
      title: titles.get(dealId) ?? dealId,
      clicks,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);
}

export async function supabaseGetDealUrl(dealId: string): Promise<string | null> {
  const deal = await supabaseGetDealById(dealId);
  if (!deal) return null;
  return deal.affiliate_url ?? deal.external_url;
}

export async function supabaseLogClick(dealId: string, userId?: string | null) {
  const supabase = await createClient();
  await supabase.from("click_events").insert({
    deal_id: dealId,
    user_id: userId ?? null,
  });
}

export async function supabaseVote(
  dealId: string,
  userId: string,
  voteType: "hot" | "cold"
): Promise<{ hot_count: number; cold_count: number; user_vote: "hot" | "cold" | null } | null> {
  const supabase = await createClient();

  const { data: deal } = await supabase
    .from("deals")
    .select("hot_count, cold_count")
    .eq("id", dealId)
    .maybeSingle();
  if (!deal) return null;

  const { data: existing } = await supabase
    .from("votes")
    .select("id, vote_type")
    .eq("deal_id", dealId)
    .eq("user_id", userId)
    .maybeSingle();

  let hotCount = deal.hot_count;
  let coldCount = deal.cold_count;
  let userVote: "hot" | "cold" | null = voteType;

  if (existing?.vote_type === voteType) {
    await supabase.from("votes").delete().eq("id", existing.id);
    if (voteType === "hot") hotCount--;
    else coldCount--;
    userVote = null;
  } else if (existing) {
    await supabase.from("votes").update({ vote_type: voteType }).eq("id", existing.id);
    if (existing.vote_type === "hot") {
      hotCount--;
      coldCount++;
    } else {
      coldCount--;
      hotCount++;
    }
  } else {
    await supabase.from("votes").insert({ deal_id: dealId, user_id: userId, vote_type: voteType });
    if (voteType === "hot") hotCount++;
    else coldCount++;
  }

  await supabase.from("deals").update({ hot_count: hotCount, cold_count: coldCount }).eq("id", dealId);

  return { hot_count: hotCount, cold_count: coldCount, user_vote: userVote };
}

export async function supabaseApproveDeal(dealId: string) {
  const supabase = await createClient();
  await supabase.from("deals").update({ status: "approved" }).eq("id", dealId);
}

export async function supabaseRejectDeal(dealId: string) {
  const supabase = await createClient();
  await supabase.from("deals").update({ status: "rejected" }).eq("id", dealId);
}

export async function supabaseAddComment(
  dealId: string,
  userId: string,
  body: string
): Promise<CommentWithProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .insert({ deal_id: dealId, user_id: userId, body })
    .select("*, profile:profiles(username, avatar_url)")
    .single();
  if (error || !data) return null;
  const { profile, ...comment } = data;
  return { ...comment, profile: profile ?? null } as CommentWithProfile;
}

export async function supabaseAddDeal(input: {
  user_id: string;
  category_id: string;
  merchant_id: string;
  title: string;
  description: string;
  price_uah: number;
  original_price_uah?: number | null;
  external_url: string;
  affiliate_url?: string | null;
  image_url?: string | null;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("deals").insert({
    ...input,
    status: "pending",
    hot_count: 0,
    cold_count: 0,
  });
  if (error) throw error;
}

export async function supabaseGetProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

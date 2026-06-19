import {
  MOCK_CATEGORIES,
  MOCK_COMMENTS,
  MOCK_CURRENT_USER,
  MOCK_DEALS,
  MOCK_MERCHANTS,
  MOCK_PROFILES,
  MOCK_VOTES,
} from "./data";
import type {
  Category,
  CommentWithProfile,
  DealWithRelations,
  Merchant,
  Profile,
  SortMode,
} from "@/types/database";

type MockStore = {
  deals: DealWithRelations[];
  comments: CommentWithProfile[];
  votes: Record<string, "hot" | "cold">;
  clickCounts: Record<string, number>;
};

declare global {
  // eslint-disable-next-line no-var
  var __dealuaMockStore: MockStore | undefined;
}

function createStore(): MockStore {
  return {
    deals: structuredClone(MOCK_DEALS),
    comments: structuredClone(MOCK_COMMENTS),
    votes: { ...MOCK_VOTES },
    clickCounts: {},
  };
}

export function getStore(): MockStore {
  if (!global.__dealuaMockStore) {
    global.__dealuaMockStore = createStore();
  }
  return global.__dealuaMockStore;
}

function enrichDeal(deal: DealWithRelations): DealWithRelations {
  const category = MOCK_CATEGORIES.find((c) => c.id === deal.category_id);
  const merchant = MOCK_MERCHANTS.find((m) => m.id === deal.merchant_id);
  const profile = MOCK_PROFILES.find((p) => p.id === deal.user_id);
  return {
    ...deal,
    category: category
      ? { slug: category.slug, name_uk: category.name_uk, icon: category.icon }
      : deal.category,
    merchant: merchant
      ? { name: merchant.name, slug: merchant.slug, logo_url: merchant.logo_url }
      : deal.merchant,
    profile: profile
      ? { username: profile.username, avatar_url: profile.avatar_url }
      : deal.profile,
  };
}

export function getMockCategories(): Category[] {
  return MOCK_CATEGORIES.filter((c) => c.is_active).sort((a, b) => a.sort_order - b.sort_order);
}

export function getMockMerchants(): Merchant[] {
  return [...MOCK_MERCHANTS].sort((a, b) => a.name.localeCompare(b.name));
}

export function getMockProfile(): Profile {
  return MOCK_CURRENT_USER;
}

export function getMockProfileByUsername(username: string): Profile | null {
  return MOCK_PROFILES.find((p) => p.username === username) ?? null;
}

export function getMockDeals(
  sort: SortMode = "hot",
  categorySlug?: string,
  limit = 20,
  offset = 0,
  query?: string
): DealWithRelations[] {
  const store = getStore();
  let deals = store.deals
    .filter((d) => d.status === "approved")
    .map(enrichDeal);

  if (categorySlug) {
    deals = deals.filter((d) => d.category?.slug === categorySlug);
  }

  if (query?.trim()) {
    const q = query.trim().toLowerCase();
    deals = deals.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.merchant?.name.toLowerCase().includes(q) ||
        d.category?.name_uk.toLowerCase().includes(q)
    );
  }

  if (sort === "new") {
    deals.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (sort === "top") {
    const cutoff = Date.now() - 24 * 3600000;
    deals = deals
      .filter((d) => new Date(d.created_at).getTime() >= cutoff)
      .sort((a, b) => {
        const scoreA = a.hot_count - a.cold_count;
        const scoreB = b.hot_count - b.cold_count;
        return scoreB - scoreA;
      });
  } else if (sort === "commented") {
    const counts = getMockCommentCounts();
    deals.sort((a, b) => {
      const diff = (counts[b.id] ?? 0) - (counts[a.id] ?? 0);
      if (diff !== 0) return diff;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } else {
    deals.sort((a, b) => {
      const scoreA = a.hot_count - a.cold_count;
      const scoreB = b.hot_count - b.cold_count;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }

  return deals.slice(offset, offset + limit);
}

export function countMockDeals(
  sort: SortMode = "hot",
  categorySlug?: string,
  query?: string
): number {
  return getMockDeals(sort, categorySlug, 1000, 0, query).length;
}

export function getMockClickStats(): { dealId: string; title: string; clicks: number }[] {
  const store = getStore();
  return Object.entries(store.clickCounts)
    .map(([dealId, clicks]) => {
      const deal = store.deals.find((d) => d.id === dealId);
      return { dealId, title: deal?.title ?? dealId, clicks };
    })
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);
}

export function getMockDealById(id: string): DealWithRelations | null {
  const store = getStore();
  const deal = store.deals.find((d) => d.id === id);
  return deal ? enrichDeal(deal) : null;
}

export function getMockUserVote(dealId: string, userId: string): "hot" | "cold" | null {
  return getStore().votes[`${dealId}:${userId}`] ?? null;
}

export function getMockUserVotes(
  dealIds: string[],
  userId: string
): Record<string, "hot" | "cold" | null> {
  const votes: Record<string, "hot" | "cold" | null> = {};
  for (const dealId of dealIds) {
    votes[dealId] = getMockUserVote(dealId, userId);
  }
  return votes;
}

export function getMockComments(dealId: string): CommentWithProfile[] {
  return getStore()
    .comments.filter((c) => c.deal_id === dealId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getMockCommentCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const comment of getStore().comments) {
    counts[comment.deal_id] = (counts[comment.deal_id] ?? 0) + 1;
  }
  return counts;
}

export function getMockUserDeals(userId: string): DealWithRelations[] {
  return getStore()
    .deals.filter((d) => d.user_id === userId)
    .map(enrichDeal)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getMockPendingDeals(): DealWithRelations[] {
  return getStore()
    .deals.filter((d) => d.status === "pending")
    .map(enrichDeal)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

export function mockVote(dealId: string, userId: string, voteType: "hot" | "cold") {
  const store = getStore();
  const deal = store.deals.find((d) => d.id === dealId);
  if (!deal) return null;

  const key = `${dealId}:${userId}`;
  const existing = store.votes[key];
  let userVote: "hot" | "cold" | null = voteType;

  if (existing === voteType) {
    delete store.votes[key];
    if (voteType === "hot") deal.hot_count--;
    else deal.cold_count--;
    userVote = null;
  } else if (existing) {
    store.votes[key] = voteType;
    if (existing === "hot") {
      deal.hot_count--;
      deal.cold_count++;
    } else {
      deal.cold_count--;
      deal.hot_count++;
    }
  } else {
    store.votes[key] = voteType;
    if (voteType === "hot") deal.hot_count++;
    else deal.cold_count++;
  }

  return { hot_count: deal.hot_count, cold_count: deal.cold_count, user_vote: userVote };
}

export function mockAddComment(dealId: string, userId: string, body: string): CommentWithProfile | null {
  const store = getStore();
  const profile = MOCK_PROFILES.find((p) => p.id === userId);
  if (!profile) return null;

  const comment: CommentWithProfile = {
    id: `comment-${Date.now()}`,
    deal_id: dealId,
    user_id: userId,
    body,
    created_at: new Date().toISOString(),
    profile: { username: profile.username, avatar_url: profile.avatar_url },
  };
  store.comments.unshift(comment);
  return comment;
}

export function mockAddDeal(deal: Omit<DealWithRelations, "id" | "created_at">) {
  const store = getStore();
  const newDeal: DealWithRelations = {
    ...deal,
    id: `deal-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  store.deals.unshift(enrichDeal(newDeal));
  return newDeal;
}

export function mockApproveDeal(dealId: string) {
  const deal = getStore().deals.find((d) => d.id === dealId);
  if (deal) deal.status = "approved";
}

export function mockRejectDeal(dealId: string) {
  const deal = getStore().deals.find((d) => d.id === dealId);
  if (deal) deal.status = "rejected";
}

export function mockLogClick(dealId: string) {
  const store = getStore();
  store.clickCounts[dealId] = (store.clickCounts[dealId] ?? 0) + 1;
}

export function mockGetDealUrl(dealId: string): string | null {
  const deal = getStore().deals.find((d) => d.id === dealId);
  if (!deal || deal.status !== "approved" || !deal.affiliate_url) return null;
  return deal.affiliate_url;
}

export function getMockStats() {
  const store = getStore();
  return {
    approvedDeals: store.deals.filter((d) => d.status === "approved").length,
    pendingDeals: store.deals.filter((d) => d.status === "pending").length,
    categories: MOCK_CATEGORIES.filter((c) => c.is_active).length,
  };
}

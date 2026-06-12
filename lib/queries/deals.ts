import { isMockMode } from "@/lib/config";
import {
  getMockCategories,
  getMockComments,
  getMockDealById,
  getMockDeals,
  getMockMerchants,
  getMockPendingDeals,
  getMockProfileByUsername,
  getMockUserDeals,
  getMockUserVote,
  countMockDeals,
  getMockStats,
  getMockClickStats,
} from "@/lib/mock/store";
import {
  supabaseGetCategories,
  supabaseGetComments,
  supabaseGetDealById,
  supabaseGetDeals,
  supabaseGetMerchants,
  supabaseGetPendingDeals,
  supabaseGetProfileByUsername,
  supabaseGetUserDeals,
  supabaseGetUserVote,
  supabaseCountDeals,
  supabaseGetStats,
  supabaseGetClickStats,
} from "@/lib/supabase/queries/deals";
import type { SortMode } from "@/types/database";

export async function getCategories() {
  return isMockMode() ? getMockCategories() : supabaseGetCategories();
}

export async function getMerchants() {
  return isMockMode() ? getMockMerchants() : supabaseGetMerchants();
}

export async function getDeals(
  sort: SortMode = "hot",
  categorySlug?: string,
  limit = 20,
  offset = 0,
  query?: string
) {
  return isMockMode()
    ? getMockDeals(sort, categorySlug, limit, offset, query)
    : supabaseGetDeals(sort, categorySlug, limit, offset, query);
}

export async function getDealById(id: string) {
  return isMockMode() ? getMockDealById(id) : supabaseGetDealById(id);
}

export async function getUserVote(dealId: string, userId: string) {
  return isMockMode() ? getMockUserVote(dealId, userId) : supabaseGetUserVote(dealId, userId);
}

export async function getComments(dealId: string) {
  return isMockMode() ? getMockComments(dealId) : supabaseGetComments(dealId);
}

export async function getProfileByUsername(username: string) {
  return isMockMode()
    ? getMockProfileByUsername(username)
    : supabaseGetProfileByUsername(username);
}

export async function getUserDeals(userId: string) {
  return isMockMode() ? getMockUserDeals(userId) : supabaseGetUserDeals(userId);
}

export async function getPendingDeals() {
  return isMockMode() ? getMockPendingDeals() : supabaseGetPendingDeals();
}

export async function countDeals(
  sort: SortMode = "hot",
  categorySlug?: string,
  query?: string
) {
  return isMockMode()
    ? countMockDeals(sort, categorySlug, query)
    : supabaseCountDeals(sort, categorySlug, query);
}

export async function getStats() {
  return isMockMode() ? getMockStats() : supabaseGetStats();
}

export async function getClickStats() {
  return isMockMode() ? getMockClickStats() : supabaseGetClickStats();
}

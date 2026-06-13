import type { SortMode } from "@/types/database";

export const DEALS_PAGE_SIZE = 16;
export const HOME_PAGE_SIZE = 26;

export const SORT_MODES = ["hot", "new", "top", "commented"] as const;

export function parseSortMode(value?: string): SortMode {
  return SORT_MODES.includes(value as SortMode) ? (value as SortMode) : "hot";
}

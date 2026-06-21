/** Deals that open /go in the same tab (long affiliate URLs break in a new tab on mobile). */
const SAME_TAB_DEAL_IDS = new Set([
  "deal-7",
  "44444444-4444-4444-4444-444444444507",
]);

export function shouldOpenDealInSameTab(dealId: string): boolean {
  return SAME_TAB_DEAL_IDS.has(dealId);
}

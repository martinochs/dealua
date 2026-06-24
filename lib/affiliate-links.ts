const AFFILIATE_HOSTS = ["rzekl.com", "wbbsv.com", "hxbok.com", "dbnua.com", "admitad.com", "ad.admitad.com"];

export function isAffiliateUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return AFFILIATE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

/** Extract a clean product URL from an Admitad / rzekl / wbbsv affiliate link. */
export function extractExternalUrlFromAffiliate(affiliateUrl: string): string | null {
  try {
    const url = new URL(affiliateUrl);
    const ulp = url.searchParams.get("ulp");
    if (!ulp) return null;

    const decoded = decodeURIComponent(ulp);
    return normalizeAliExpressProductUrl(decoded) ?? normalizeExternalProductUrl(decoded);
  } catch {
    return null;
  }
}

export function normalizeExternalProductUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    return parsed.origin + parsed.pathname;
  } catch {
    return null;
  }
}

export function normalizeAliExpressProductUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("aliexpress.com")) return null;

    const match = parsed.pathname.match(/\/item\/(\d+)\.html/i);
    if (match) {
      return `https://www.aliexpress.com/item/${match[1]}.html`;
    }

    return parsed.origin + parsed.pathname;
  } catch {
    return null;
  }
}

export function resolveDealLinksFromAffiliate(affiliateUrl: string):
  | { affiliate_url: string; external_url: string }
  | { error: string } {
  const trimmed = affiliateUrl.trim();

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") {
      return { error: "Посилання має бути https://" };
    }
  } catch {
    return { error: "Невірне партнерське посилання" };
  }

  if (!isAffiliateUrl(trimmed)) {
    return { error: "Використовуйте партнерське посилання Admitad (rzekl.com / wbbsv.com / hxbok.com / dbnua.com)" };
  }

  const external_url = extractExternalUrlFromAffiliate(trimmed);
  if (!external_url) {
    return { error: "У посиланні не знайдено URL товару (ulp=)" };
  }

  return { affiliate_url: trimmed, external_url };
}

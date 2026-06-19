/** Detect embedded in-app browsers (Instagram, Facebook, etc.) where affiliate redirects often fail. */
export function isInAppBrowser(userAgent: string): boolean {
  if (!userAgent) return false;

  if (/FBAN|FBAV|Instagram|Twitter|LinkedInApp|TikTok|Snapchat|Line\//i.test(userAgent)) {
    return true;
  }

  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS && /AppleWebKit/i.test(userAgent) && !/Safari/i.test(userAgent)) {
    return true;
  }

  if (isAndroid && /;\s*wv\)|Version\/[\d.]+.*Chrome\/(?!.*Safari)/i.test(userAgent)) {
    return true;
  }

  return false;
}

export function isMobileUserAgent(userAgent: string): boolean {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);
}

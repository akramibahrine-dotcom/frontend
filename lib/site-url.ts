const FALLBACK_ORIGIN = "https://baytseha.shop";

/**
 * Absolute site origin for metadata, JSON-LD, and canonical URLs.
 * Handles missing/blank env and invalid values — avoids crashing `new URL("")` during metadata resolution.
 */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_ORIGIN;
  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const u = new URL(withProtocol);
    if (!u.hostname) return FALLBACK_ORIGIN;
    return u.origin;
  } catch {
    return FALLBACK_ORIGIN;
  }
}

export function getMetadataBase(): URL {
  return new URL(getSiteOrigin());
}

import type { CurrencyCode } from "@/lib/currency";

/** ISO country → fallback currency when API omits currency.code */
const COUNTRY_FALLBACK: Record<string, CurrencyCode> = {
  SA: "SAR",
  AE: "AED",
  QA: "QAR",
  OM: "OMR",
  BH: "BHD",
  KW: "KWD",
  EG: "EGP",
  JO: "JOD",
  US: "USD",
  GB: "GBP",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  ES: "EUR",
  LB: "LBP",
  MA: "MAD",
  TN: "TND",
  TR: "TRY",
  PK: "PKR",
  IN: "INR",
  CA: "CAD",
  AU: "AUD",
  JP: "JPY",
  CN: "CNY",
  IQ: "IQD",
  SD: "SDG",
  LY: "LYD",
  YE: "YER",
  SY: "SYP",
  DZ: "DZD",
  MY: "MYR",
  ID: "IDR",
  NG: "NGN"
};

/**
 * Best-effort geo currency from visitor IP (client-side).
 * Falls back to null if blocked, timeout, or unsupported currency.
 */
export async function fetchCurrencyFromGeo(timeoutMs = 4500): Promise<CurrencyCode | null> {
  if (typeof window === "undefined") return null;

  function fetchWithTimeout(url: string, perRequestMs = timeoutMs): Promise<Response> {
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), perRequestMs);
    return fetch(url, { signal: ctrl.signal, cache: "no-store" }).finally(() => clearTimeout(t));
  }

  // 1. Try our own backend GeoIP endpoint (which reads CF-IPCountry or falls back to IPAPI)
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.Baytseha.shop";
    const res = await fetchWithTimeout(`${apiBase}/api/v1/currency/geo`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        const code = COUNTRY_FALLBACK[data.country_code.toUpperCase()];
        if (code) return code;
      }
    }
  } catch {
    // Ignore and fallback
  }

  // 2. Try Cloudflare trace (Bulletproof, unblocked by adblockers, very fast)
  try {
    const res = await fetchWithTimeout("https://cloudflare.com/cdn-cgi/trace");
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/loc=([A-Z]{2})/);
      if (match && match[1]) {
        const code = COUNTRY_FALLBACK[match[1]];
        if (code) return code;
      }
    }
  } catch {
    // Ignore and fallback
  }
  
  // 3. Try freeipapi.com
  try {
    const res = await fetchWithTimeout("https://freeipapi.com/api/json");
    if (res.ok) {
      const data = await res.json();
      if (data && data.currencies && data.currencies.length > 0) {
        return data.currencies[0].toUpperCase();
      }
      if (data && data.countryCode) {
        return COUNTRY_FALLBACK[data.countryCode.toUpperCase()] ?? null;
      }
    }
  } catch {
    // Ignore and fallback
  }

  // 4. Try ipwho.is
  try {
    const res = await fetchWithTimeout("https://ipwho.is/");
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        let code = data.currency?.code?.toUpperCase();
        if (!code && data.country_code) {
          code = COUNTRY_FALLBACK[data.country_code.toUpperCase()];
        }
        if (code) return code;
      }
    }
  } catch {
    // Ignore and fallback
  }

  // 5. Fallback API
  try {
    const res = await fetchWithTimeout("https://api.country.is/");
    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        return COUNTRY_FALLBACK[data.country.toUpperCase()] ?? null;
      }
    }
  } catch {
    // Ignore and return null
  }

  return null;
}

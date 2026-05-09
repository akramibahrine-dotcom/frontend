import type { CurrencyCode } from "@/lib/currency";

type IpWhoCurrency = { code?: string };
type IpWhoResponse = {
  success?: boolean;
  country_code?: string;
  currency?: IpWhoCurrency;
};

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
};

/**
 * Best-effort geo currency from visitor IP (client-side).
 * Falls back to null if blocked, timeout, or unsupported currency.
 */
export async function fetchCurrencyFromGeo(timeoutMs = 4500): Promise<CurrencyCode | null> {
  if (typeof window === "undefined") return null;
  const ctrl = new AbortController();
  const t = window.setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch("https://ipwho.is/", {
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as IpWhoResponse;
    if (!data.success) return null;

    let code = data.currency?.code?.toUpperCase();
    if (!code && data.country_code) {
      code = COUNTRY_FALLBACK[data.country_code.toUpperCase()];
    }
    return code ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

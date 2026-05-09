import { create } from "zustand";
import {
  type CurrencyCode,
  type CurrencyRates,
  detectCurrencyFromTimezone,
  convertSarTo,
  formatPrice,
  CURRENCY_CONFIG,
} from "@/lib/currency";
import { getCurrencyRates } from "@/lib/api";
import { fetchCurrencyFromGeo } from "@/lib/geo-ip";

type CurrencyState = {
  currency: CurrencyCode;
  rates: CurrencyRates;
  isLoaded: boolean;

  setCurrency: (code: CurrencyCode) => void;
  initCurrency: () => Promise<void>;
  convertFromSar: (amountSar: number) => number;
  format: (amountSar: number) => string;
  formatInCurrency: (amountSar: number, currencyCode: CurrencyCode) => string;
};

const STORAGE_KEY = "bsh_currency";
const MANUAL_KEY = "bsh_currency_manual";

function readSaved(): CurrencyCode | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CURRENCY_CONFIG[saved]) return saved;
  } catch { /* noop */ }
  return null;
}

function isManualCurrency(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(MANUAL_KEY) === "1";
  } catch {
    return false;
  }
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: "SAR",
  rates: { SAR: 1 },
  isLoaded: false,

  setCurrency: (code) => {
    set({ currency: code });
    try {
      localStorage.setItem(STORAGE_KEY, code);
      localStorage.setItem(MANUAL_KEY, "1");
    } catch { /* noop */ }
  },

  initCurrency: async () => {
    const saved = readSaved();
    const manual = isManualCurrency();

    try {
      const { rates } = await getCurrencyRates();

      let picked: CurrencyCode = "SAR";
      if (manual && saved && rates[saved]) {
        picked = saved;
      } else if (!manual) {
        const geoCode = await fetchCurrencyFromGeo();
        if (geoCode && rates[geoCode]) picked = geoCode;
        else {
          const fallback = saved || detectCurrencyFromTimezone();
          picked = rates[fallback] ? fallback : "SAR";
        }
        try {
          localStorage.setItem(STORAGE_KEY, picked);
        } catch { /* noop */ }
      } else {
        const fallback = saved || detectCurrencyFromTimezone();
        picked = rates[fallback] ? fallback : "SAR";
      }

      set({ currency: picked, rates, isLoaded: true });
    } catch {
      const fallback = manual && saved ? saved : detectCurrencyFromTimezone();
      set({ currency: fallback, rates: { SAR: 1 }, isLoaded: true });
    }
  },

  convertFromSar: (amountSar) => {
    const { currency, rates } = get();
    return convertSarTo(amountSar, currency, rates);
  },

  format: (amountSar) => {
    const { currency, rates } = get();
    const converted = convertSarTo(amountSar, currency, rates);
    return formatPrice(converted, currency);
  },

  formatInCurrency: (amountSar, currencyCode) => {
    const { rates } = get();
    const converted = convertSarTo(amountSar, currencyCode, rates);
    return formatPrice(converted, currencyCode);
  },
}));

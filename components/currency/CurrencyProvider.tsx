"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/store/currency-store";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";

export function CurrencyProvider() {
  const initCurrency = useCurrencyStore((s) => s.initCurrency);
  const hydratePromo = useWelcomePromoStore((s) => s.hydrate);

  useEffect(() => {
    hydratePromo();
    initCurrency();
  }, [initCurrency, hydratePromo]);

  return null;
}

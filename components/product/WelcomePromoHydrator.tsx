"use client";

import { useEffect } from "react";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";

export function WelcomePromoHydrator() {
  const hydrate = useWelcomePromoStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}

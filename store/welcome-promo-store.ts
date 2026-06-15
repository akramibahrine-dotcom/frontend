import { create } from "zustand";
import { WELCOME_PROMO_ENABLED } from "@/lib/pricing";

const STORAGE_KEY = "bsh_welcome_promo_active";

type WelcomePromoState = {
  active: boolean;
  hydrated: boolean;
  hydrate: () => void;
  setActive: (active: boolean) => void;
};

export const useWelcomePromoStore = create<WelcomePromoState>((set) => ({
  active: false,
  hydrated: false,

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      if (!WELCOME_PROMO_ENABLED) {
        localStorage.removeItem(STORAGE_KEY);
        set({ active: false, hydrated: true });
        return;
      }
      const active = localStorage.getItem(STORAGE_KEY) === "1";
      set({ active, hydrated: true });
    } catch {
      set({ active: false, hydrated: true });
    }
  },

  setActive: (active) => {
    if (!WELCOME_PROMO_ENABLED) {
      set({ active: false });
      return;
    }
    set({ active });
    try {
      if (active) localStorage.setItem(STORAGE_KEY, "1");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  },
}));

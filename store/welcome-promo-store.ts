import { create } from "zustand";

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
      const active = localStorage.getItem(STORAGE_KEY) === "1";
      set({ active, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  setActive: (active) => {
    set({ active });
    try {
      if (active) localStorage.setItem(STORAGE_KEY, "1");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  },
}));

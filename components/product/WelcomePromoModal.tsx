"use client";

import { useEffect, useState } from "react";
import { WELCOME_PROMO_ENABLED } from "@/lib/pricing";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";

const MODAL_SEEN_KEY = "bsh_welcome_modal_seen";

export function WelcomePromoModal() {
  const [open, setOpen] = useState(false);
  const hydrate = useWelcomePromoStore((s) => s.hydrate);
  const setActive = useWelcomePromoStore((s) => s.setActive);

  useEffect(() => {
    hydrate();
    
    if (!WELCOME_PROMO_ENABLED) return;

    try {
      if (typeof window !== "undefined" && !localStorage.getItem(MODAL_SEEN_KEY)) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, [hydrate]);

  function dismissSeen() {
    try {
      localStorage.setItem(MODAL_SEEN_KEY, "1");
    } catch {
      /* noop */
    }
    setOpen(false);
  }

  function acceptPromo() {
    setActive(true);
    dismissSeen();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-promo-title"
    >
      <div className="w-full max-w-sm rounded-2xl bg-[#071C12] shadow-2xl p-8 text-center relative overflow-hidden animate-scale-in border border-[#C99A45]/30">
        {/* Decorative gold ring */}
        <div
          aria-hidden
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full border-[3px] border-[#C99A45]/20"
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full border-[3px] border-[#C99A45]/10"
        />

        <div className="relative">
          <div className="text-5xl mb-4" aria-hidden>
            🎁
          </div>

          <h2
            id="welcome-promo-title"
            className="text-2xl md:text-3xl font-extrabold text-[#C99A45] mb-3 leading-tight"
          >
            خصم 10% — لأنك تستحق البداية
          </h2>

          <p className="text-white/70 text-sm mb-8">
            عرض محدود على طلبك الأول
          </p>

          <button
            type="button"
            onClick={acceptPromo}
            className="w-full py-3.5 rounded-full bg-[#C99A45] text-[#071C12] font-extrabold text-lg hover:bg-[#d4a94f] active:scale-[0.98] transition-all"
          >
            احصل على الخصم
          </button>

          <button
            type="button"
            onClick={dismissSeen}
            className="mt-4 text-white/40 text-sm hover:text-white/60 transition-colors"
          >
            لا شكرًا
          </button>
        </div>
      </div>
    </div>
  );
}

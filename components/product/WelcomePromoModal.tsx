"use client";

import { useEffect, useState } from "react";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";
import { WELCOME_PROMO_CODE, WELCOME_REFERENCE_MARKUP_PERCENT } from "@/lib/pricing";

const MODAL_SEEN_KEY = "bsh_welcome_modal_seen";

export function WelcomePromoModal() {
  const [open, setOpen] = useState(false);
  const hydrate = useWelcomePromoStore((s) => s.hydrate);
  const setActive = useWelcomePromoStore((s) => s.setActive);

  useEffect(() => {
    hydrate();
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
      className="fixed inset-0 z-[80] bg-[#071C12]/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-promo-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#F8F1E7] to-white border-2 border-[#C99A45]/50 shadow-2xl p-6 md:p-8 text-center relative overflow-hidden animate-scale-in">
        <div
          aria-hidden
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30 bg-[#155235]"
        />
        <div className="relative">
          <div className="text-4xl mb-3" aria-hidden>
            🎉
          </div>
          <h2 id="welcome-promo-title" className="text-xl md:text-2xl font-extrabold text-[#071C12] mb-2">
            مبروك! أنت عميل جديد عندنا
          </h2>
          <p className="text-[#567063] leading-relaxed mb-4 text-sm md:text-base">
            السعر المرجعي الذي تراه قبل التفعيل أعلى بـ{" "}
            <span className="font-extrabold text-[#155235]">{WELCOME_REFERENCE_MARKUP_PERCENT}%</span> عن أسعار
            الباقات الفعلية — وبعد الضغط أدناه تثبت الأسعار على{" "}
            <span className="font-extrabold text-[#071C12] whitespace-nowrap">١٩٩ / ٢٧٩ / ٣٤٩</span> ريال
            (والعرض الإضافي بـ <span className="whitespace-nowrap">٩٩</span> ريال). رمز الترحيب:
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#071C12] text-[#C99A45] font-mono font-bold text-lg tracking-wide mb-6 border border-[#C99A45]/40">
            {WELCOME_PROMO_CODE}
          </div>
          <p className="text-xs text-[#567063] mb-6 leading-relaxed">
            بعد الضغط أدناه نُظهر أسعار الباقات مباشرة بدون السعر المرجعي المرتفع. الأسعار تُتحقق على الخادم لحمايتك من
            التلاعب.
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={acceptPromo}
              className="w-full py-3.5 rounded-full bg-[#155235] text-white font-extrabold hover:bg-[#0f3d28] transition-colors"
            >
              تفعيل عرض الترحيب
            </button>
            <button
              type="button"
              onClick={dismissSeen}
              className="w-full py-3 rounded-full border border-[#E8D8C3] text-[#567063] font-bold hover:bg-[#F5F3EE] transition-colors text-sm"
            >
              شكراً، أتابع كما هو معروض
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

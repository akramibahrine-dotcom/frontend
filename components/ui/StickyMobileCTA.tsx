"use client";

import { useEffect, useState } from "react";
import { useCurrencyStore } from "@/store/currency-store";
import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  label?: string;
  sublabel?: string;
  price?: number;
};

export function StickyMobileCTA({
  onClick,
  label = "أضف الباقة للسلة",
  sublabel = "الدفع عند الاستلام - بدون بطاقة",
  price,
}: Props) {
  const format = useCurrencyStore((s) => s.format);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30",
        "bg-white/95 backdrop-blur-sm border-t border-[#E8D8C3] p-3 safe-area-inset-bottom",
        "transition-transform duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <button
        onClick={onClick}
        className="w-full max-w-md py-4 rounded-full bg-[#155235] text-white font-extrabold text-base flex items-center justify-center gap-2 hover:bg-[#0A3622] transition-colors active:scale-[0.98] shadow-lg shadow-[#155235]/30"
      >
        {price && <span>{format(price)} -</span>}
        <span>{label}</span>
      </button>
      <p className="text-xs text-center text-[#6E675F] mt-1.5">{sublabel}</p>
    </div>
  );
}

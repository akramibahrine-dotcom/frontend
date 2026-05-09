"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrencyStore } from "@/store/currency-store";
import { CURRENCY_CONFIG } from "@/lib/currency";
import { cn } from "@/lib/utils";

const POPULAR_CURRENCIES = [
  "SAR", "AED", "KWD", "BHD", "OMR", "QAR", "EGP", "JOD",
  "USD", "EUR", "GBP", "TRY", "MAD", "PKR", "INR",
];

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, rates, setCurrency, isLoaded } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoaded) return null;

  const available = POPULAR_CURRENCIES.filter((c) => rates[c]);
  const config = CURRENCY_CONFIG[currency];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-[#155235]/50 bg-[#0D2B1D] hover:bg-[#155235]/40 transition-colors text-[#C99A45]"
        aria-label="تغيير العملة"
        aria-expanded={open}
      >
        <span>{config?.symbol ?? currency}</span>
        <span className="text-[#FFFFFF]/60">{currency}</span>
        <svg className={cn("w-3 h-3 text-[#FFFFFF]/40 transition-transform", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-48 max-h-64 overflow-y-auto rounded-xl border border-[#155235]/60 bg-[#0D2B1D] shadow-2xl py-1 animate-fade-in">
          {available.map((code) => {
            const c = CURRENCY_CONFIG[code];
            if (!c) return null;
            const isActive = code === currency;
            return (
              <button
                key={code}
                onClick={() => { setCurrency(code); setOpen(false); }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-xs transition-colors",
                  isActive
                    ? "bg-[#155235]/40 text-[#C99A45] font-bold"
                    : "text-white/80 hover:bg-[#155235]/20"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="font-bold text-sm w-6">{c.symbol}</span>
                  <span>{c.labelAr}</span>
                </span>
                <span className="text-[#FFFFFF]/40">{code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { COPY } from "@/content/copy";
import { COPY_EN } from "@/content/store-en";
import { useCopy } from "@/hooks/useCopy";

export function TrustStrip({ className }: { className?: string }) {
  const { isEn } = useCopy();
  const items = isEn
    ? COPY_EN.trust.map((item, index) => ({ icon: COPY.trust[index]?.icon ?? "✓", text: item.text }))
    : COPY.trust.map((item) => ({ icon: item.icon, text: item.textAr }));

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2.5 px-4",
        "bg-[#1C1C1E] border-b border-[#1C1C1E]/50",
        className
      )}
      aria-label={isEn ? "Store benefits" : "مزايا المتجر"}
    >
      {items.map((item) => (
        <div key={item.text} className="flex items-center gap-1.5 text-xs text-[#C9A96E] font-medium whitespace-nowrap">
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export function CODBadge({ className }: { className?: string }) {
  const { footer } = useCopy();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
        "bg-[#1C1C1E] text-[#C9A96E] border border-[#C9A96E]/20",
        className
      )}
    >
      ◆ {footer.cod}
    </span>
  );
}

export function TrustBadgeRow({ className }: { className?: string }) {
  const { footer, cart } = useCopy();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <CODBadge />
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAFAF8] text-[#1C1C1E] border border-[#E8E0D4]">
        {cart.shippingIncluded}
      </span>
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAFAF8] text-[#1C1C1E] border border-[#E8E0D4]">
        ✦ {footer.support}
      </span>
    </div>
  );
}

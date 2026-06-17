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
        "bg-[#0D2B1D] border-b border-[#155235]/50",
        className
      )}
      aria-label={isEn ? "Store benefits" : "مزايا المتجر"}
    >
      {items.map((item) => (
        <div key={item.text} className="flex items-center gap-1.5 text-xs text-[#C99A45] font-medium whitespace-nowrap">
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
        "bg-[#155235] text-[#C99A45] border border-[#C99A45]/20",
        className
      )}
    >
      💳 {footer.cod}
    </span>
  );
}

export function TrustBadgeRow({ className }: { className?: string }) {
  const { footer, cart } = useCopy();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <CODBadge />
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F3EE] text-[#155235] border border-[#E8E2D8]">
        {cart.shippingIncluded}
      </span>
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F3EE] text-[#155235] border border-[#E8E2D8]">
        💬 {footer.support}
      </span>
    </div>
  );
}

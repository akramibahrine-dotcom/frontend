import { cn } from "@/lib/utils";
import { COPY } from "@/content/copy";

export function TrustStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2.5 px-4",
        "bg-[#0D2B1D] border-b border-[#155235]/50",
        className
      )}
      aria-label="مزايا المتجر"
    >
      {COPY.trust.map((item) => (
        <div key={item.textAr} className="flex items-center gap-1.5 text-xs text-[#C99A45] font-medium whitespace-nowrap">
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.textAr}</span>
        </div>
      ))}
    </div>
  );
}

export function CODBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
        "bg-[#155235] text-[#C99A45] border border-[#C99A45]/20",
        className
      )}
    >
      💳 دفع عند الاستلام
    </span>
  );
}

export function TrustBadgeRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <CODBadge />
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F3EE] text-[#155235] border border-[#E8E2D8]">
        🚚 توصيل داخل السعودية
      </span>
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F3EE] text-[#155235] border border-[#E8E2D8]">
        💬 دعم قبل وبعد الطلب
      </span>
    </div>
  );
}

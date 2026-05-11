"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.baytseha.shop";

export function StoreAccessGate() {
  const pathname = usePathname();
  const [blocked, setBlocked] = useState<{ reason: string; ruleType: string } | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    let cancelled = false;
    fetch(`${API_BASE}/api/v1/store/access`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { allowed: true }))
      .then((data) => {
        if (!cancelled && data.allowed === false) {
          setBlocked({
            reason: data.reason || "access_control",
            ruleType: data.rule_type || "rule",
          });
        }
      })
      .catch(() => {
        // Keep the store open if the access-control check is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!blocked) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071C12] px-4 text-white">
      <div className="max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#C99A45]">Baytseha</p>
        <h2 className="text-2xl font-black">المتجر غير متاح مؤقتًا لهذا الزائر</h2>
        <p className="mt-3 text-sm text-white/70">
          تم تطبيق قاعدة دخول من لوحة التحكم: {blocked.reason} ({blocked.ruleType}).
        </p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { CurrencySelector } from "@/components/currency/CurrencySelector";
import { useTranslation } from "@/hooks/useTranslation";
import { useCopy } from "@/hooks/useCopy";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/content/translations";

type NavLink = { href: string; key: TranslationKey };

type Props = {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ links, isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const { brand, isEn } = useCopy();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 animate-fade-in md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-50 bg-gradient-to-b from-[#F5F3EE] to-white shadow-2xl flex flex-col",
          "transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label={isEn ? "Navigation menu" : "قائمة التنقل"}
        aria-hidden={!isOpen}
      >
        <div className="bg-[#071C12] px-4 py-3 flex items-center justify-center">
          <span className="text-[#C99A45] font-bold text-sm tracking-wide">{brand.homeLabel}</span>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-[#E8D8C3]">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F8F1E7] flex items-center justify-center hover:bg-[#E8D8C3] transition-colors"
            aria-label={isEn ? "Close menu" : "إغلاق القائمة"}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col p-4 gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="px-4 py-3 rounded-xl text-[#1D1D1B] font-medium hover:bg-[#F8F1E7] hover:text-[#1F6B4E] transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="mt-auto p-4 border-t border-[#E8D8C3] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6E675F] font-medium">{isEn ? "Currency" : "العملة"}</span>
            <CurrencySelector />
          </div>
          <p className="text-xs text-[#6E675F] leading-relaxed text-center">
            {isEn ? "Daily wellness herbal tea products" : "منتجات شاي عشبية داعمة للعافية اليومية"}
          </p>
        </div>
      </nav>
    </>
  );
}

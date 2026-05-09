"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { CurrencySelector } from "@/components/currency/CurrencySelector";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };

type Props = {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ links, isOpen, onClose }: Props) {
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
          "fixed top-0 left-0 h-full w-72 z-50 bg-white shadow-2xl flex flex-col",
          "transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="قائمة التنقل"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#E8D8C3]">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F8F1E7] flex items-center justify-center hover:bg-[#E8D8C3] transition-colors"
            aria-label="إغلاق القائمة"
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
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto p-4 border-t border-[#E8D8C3] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6E675F] font-medium">العملة</span>
            <CurrencySelector />
          </div>
          <p className="text-xs text-[#6E675F] leading-relaxed text-center">
            منتجات شاي عشبية داعمة للعافية اليومية
          </p>
        </div>
      </nav>
    </>
  );
}

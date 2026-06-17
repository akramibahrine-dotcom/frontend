"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/store/cart-store";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CurrencySelector } from "@/components/currency/CurrencySelector";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { formatInteger } from "@/lib/format-number";
import { FormattedAmount } from "@/components/currency/FormattedAmount";
import type { TranslationKey } from "@/content/translations";

const NAV_LINKS: Array<{ href: string; key: TranslationKey }> = [
  { href: "/", key: "nav.home" },
  { href: "/categories", key: "nav.categories" },
  { href: "/collections", key: "nav.products" },
  { href: "/news", key: "nav.news" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-all duration-300",
          scrolled
            ? "bg-[#071C12] shadow-lg shadow-black/30 border-b border-[#155235]/40"
            : "bg-[#071C12] border-b border-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 min-h-[4.5rem] py-2.5 flex items-center justify-between gap-4">
          <BrandLogo size="md" dark />

          <nav className="hidden md:flex items-center gap-6" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#FFFFFF]/80 hover:text-[#C99A45] transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageSwitcher />
            <CurrencySelector />
            <button
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-[#155235]/50 transition-colors"
              aria-label={`سلة التسوق - ${itemCount} منتج`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#C99A45]">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {itemCount > 0 && (
                <FormattedAmount
                  className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#C99A45] text-[#071C12] text-xs font-bold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {itemCount > 9 ? "9+" : formatInteger(itemCount)}
                </FormattedAmount>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-[#155235]/50 transition-colors"
              aria-label="فتح القائمة"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#C99A45]">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu links={NAV_LINKS} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer />
    </>
  );
}

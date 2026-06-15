"use client";

import { useState } from "react";
import Link from "next/link";
import { COPY } from "@/content/copy";
import { PRODUCTS } from "@/content/products";
import { cn } from "@/lib/utils";

// Collapsible Section Component
function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#155235]/30 py-4 lg:border-none lg:py-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between lg:pointer-events-none"
      >
        <h3 className="font-bold text-sm lg:text-xs mb-0 lg:mb-4 text-[#C99A45] tracking-widest uppercase">
          {title}
        </h3>
        <span className="lg:hidden text-[#C99A45] text-xl transition-transform duration-300 transform" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
          +
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 lg:h-auto lg:opacity-100 lg:mt-0",
          isOpen ? "h-auto max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#071C12] text-[#FFFFFF] mt-0">
      <div className="divider-mint" />

      <div className="max-w-[1200px] mx-auto px-4 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
        {/* Brand column */}
        <div className="mb-6 lg:mb-0">
          <div className="mb-4 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex-shrink-0 shadow-lg shadow-green-900/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="بيت الصحة" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white">بيت الصحة</span>
              <span className="text-xs text-[#C99A45]/60 tracking-wide">Baytseha</span>
            </div>
          </div>
          <p className="text-xs text-[#C99A45]/60 leading-relaxed max-w-xs">
            {COPY.footer.descriptionAr}
          </p>
        </div>

        {/* Shop links */}
        <FooterSection title={COPY.footer.shopTitle}>
          <ul className="space-y-3">
            <li>
              <Link href="/collections" className="text-sm text-[#FFFFFF]/70 hover:text-[#C99A45] transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#C99A45]/50"></span> جميع المنتجات
              </Link>
            </li>
            {PRODUCTS.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="text-sm text-[#FFFFFF]/70 hover:text-[#C99A45] transition-colors line-clamp-1 flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C99A45]/50"></span> {p.shortNameAr}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Help links */}
        <FooterSection title={COPY.footer.helpTitle}>
          <ul className="space-y-3">
            {[
              { href: "/news", label: COPY.nav.newsAr },
              { href: "/contact", label: COPY.footer.links.contact },
              { href: "/returns", label: COPY.footer.links.returns },
              { href: "/privacy", label: COPY.footer.links.privacy },
              { href: "/terms", label: COPY.footer.links.terms },
              { href: "/about", label: COPY.footer.links.about },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-[#FFFFFF]/70 hover:text-[#C99A45] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C99A45]/50"></span> {label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Trust & Socials */}
        <FooterSection title={COPY.footer.trustTitle}>
          <ul className="space-y-3 text-sm text-[#FFFFFF]/70 mb-6">
            <li className="flex items-center gap-2"><span>💳</span> الدفع عند الاستلام</li>
            <li className="flex items-center gap-2"><span>🚚</span> توصيل لجميع دول الخليج العربي</li>
            <li className="flex items-center gap-2"><span>💬</span> دعم قبل وبعد الطلب</li>
          </ul>
          
          <div>
            <p className="text-xs text-[#C99A45]/70 mb-3 font-bold">تواصل معنا على</p>
            <div className="flex gap-3">
              <a href="https://www.tiktok.com/@baytseha" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C99A45] hover:text-[#071C12] text-[#C99A45] transition-all duration-300 hover:scale-110" aria-label="TikTok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C99A45] hover:text-[#071C12] text-[#C99A45] transition-all duration-300 hover:scale-110" aria-label="Snapchat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.12 1.34c-2.4 0-4.68 1.4-5.32 3.84-.2.74-.23 1.55-.26 2.37v.45c0 .35.25.68.61.68h.42c.15 0 .28.1.33.25.1.28.2.56.33.83.18.38.4.74.63 1.09.12.18.06.42-.1.54l-.44.3c-.23.16-.54.1-.7-.14-.23-.33-.43-.68-.6-1.05-.1-.23-.34-.36-.58-.36h-.4c-.45 0-.74-.46-.57-.86.32-.78.68-1.54 1.1-2.26C7.54 4.83 9.7 3.32 12.1 3.32c2.4 0 4.57 1.51 5.53 3.67.42.72.78 1.48 1.1 2.26.17.4.12.86-.33.86h-.4c-.24 0-.48.13-.58.36-.17.37-.37.72-.6 1.05-.16.24-.47.3-.7.14l-.44-.3c-.16-.12-.22-.36-.1-.54.23-.35.45-.71.63-1.09.13-.27.23-.55.33-.83.05-.15.18-.25.33-.25h.42c.36 0 .61-.33.61-.68v-.45c-.03-.82-.06-1.63-.26-2.37-.64-2.44-2.92-3.84-5.32-3.84zM12.01 22.8c-1.38 0-2.67-.3-3.8-.83-.45-.2-.93-.15-1.35.1l-1.04.62c-.36.21-.83-.02-.85-.44l-.06-1.34c-.02-.32-.23-.6-.54-.68-1.58-.45-2.73-1.6-3.2-3.17-.18-.6-.2-1.25-.2-1.9 0-.42.34-.76.76-.76h.54c.32 0 .58-.26.58-.58v-.45c0-1.12.12-2.22.38-3.28.18-.74.6-1.42 1.18-1.96.65-.6 1.53-.94 2.45-1.02.82-.07 1.66.1 2.43.43.34.14.73.1 1.02-.12l.62-.48c.32-.25.77-.25 1.09 0l.62.48c.29.22.68.26 1.02.12.77-.33 1.6-.5 2.43-.43.92.08 1.8.42 2.45 1.02.58.54 1 1.22 1.18 1.96.26 1.06.38 2.16.38 3.28v.45c0 .32.26.58.58.58h.54c.42 0 .76.34.76.76 0 .65-.02 1.3-.2 1.9-.47 1.57-1.62 2.72-3.2 3.17-.31.08-.52.36-.54.68l-.06 1.34c-.02.42-.49.65-.85.44l-1.04-.62c-.42-.25-.9-.3-1.35-.1-1.13.53-2.42.83-3.8.83z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/baytseha/" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C99A45] hover:text-[#071C12] text-[#C99A45] transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C99A45] hover:text-[#071C12] text-[#C99A45] transition-all duration-300 hover:scale-110" aria-label="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </FooterSection>
      </div>

      <div className="border-t border-[#155235]/40 py-6 px-4 bg-[#05140D]">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <p className="text-xs text-[#C99A45]/30 text-center">
            © {new Date().getFullYear()} بيت الصحة - Baytseha. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
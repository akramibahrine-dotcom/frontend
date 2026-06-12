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
            <li className="flex items-center gap-2"><span>🚚</span> توصيل داخل المملكة العربية السعودية</li>
            <li className="flex items-center gap-2"><span>💬</span> دعم قبل وبعد الطلب</li>
          </ul>
          
          <div>
            <p className="text-xs text-[#C99A45]/70 mb-3 font-bold">تواصل معنا على</p>
            <div className="flex gap-3">
              {[
                {
                  href: "https://www.tiktok.com/@baytseha",
                  label: "TikTok",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/baytseha/",
                  label: "Instagram",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C99A45] hover:text-[#071C12] text-[#C99A45] transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
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
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/content/products";
import { ProductImage } from "@/components/product/ProductImage";
import { FormattedAmount } from "@/components/currency/FormattedAmount";
import { useCurrencyStore } from "@/store/currency-store";
import { useCopy } from "@/hooks/useCopy";
import { getLocalizedProduct } from "@/lib/get-localized-product";

type OrderItem = {
  productId: string;
  quantity: number;
  priceSar: number;
};

type OrderSummary = {
  orderId: string;
  publicOrderNumber: string;
  customerName: string;
  totalSar: number;
  currency?: string;
  items: OrderItem[];
  upsell: { productId: string; priceSar: number } | null;
  createdAt: string;
};

function getProduct(productId: string) {
  return PRODUCTS.find((p) => p.id === productId);
}

export function ThankYouClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const { formatInCurrency } = useCurrencyStore();
  const { lang, thankYou, page, packLabel } = useCopy();
  const shortId = orderId.slice(-8).toUpperCase();
  const orderCurrency = order?.currency ?? "SAR";

  function formatOrderAmount(amountSar: number): string {
    return formatInCurrency(amountSar, orderCurrency);
  }

  function getProductName(productId: string): string {
    const product = getProduct(productId);
    if (!product) return productId;
    return getLocalizedProduct(product, lang).shortName;
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("baytseha_last_order");
      if (raw) {
        const parsed = JSON.parse(raw) as OrderSummary;
        if (parsed.orderId === orderId) {
          setOrder(parsed);
        }
      }
    } catch {
      /* ignore */
    }
  }, [orderId]);

  const crossSellProducts = PRODUCTS.filter(
    (p) => !order?.items.some((i) => i.productId === p.id) && p.id !== order?.upsell?.productId
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAF8] to-white" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1C1C1E]/10 mb-6">
            <svg className="w-10 h-10 text-[#1C1C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C1C1E] mb-3 leading-tight">
            {thankYou.headline}
          </h1>
          <p className="text-[#3D3D3D] text-lg leading-relaxed max-w-xl mx-auto">{thankYou.sub}</p>
        </div>

        <div className="bg-white border border-[#E8E0D4]/80 shadow-lg rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between border-b border-[#E8E0D4] pb-4 mb-6">
            <span className="text-sm text-[#3D3D3D]">{thankYou.orderNumberPrefix}</span>
            <span className="font-mono font-bold text-[#1C1C1E] text-lg tracking-wide">
              {order?.publicOrderNumber ? `#${order.publicOrderNumber}` : `#${shortId}`}
            </span>
          </div>

          {order && (
            <div className="mb-6 space-y-3">
              <h3 className="font-bold text-[#1C1C1E] text-sm mb-3">{page.thankYouProducts}</h3>
              {order.items.map((item) => {
                const product = getProduct(item.productId);
                return (
                  <div key={item.productId} className="flex items-center gap-3 bg-[#FAFAF8] rounded-2xl p-3">
                    <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-[#E8E0D4]/30">
                      {product ? (
                        <ProductImage
                          product={product}
                          quantity={item.quantity}
                          alt={getProductName(item.productId)}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#1C1C1E] text-sm">{getProductName(item.productId)}</p>
                      <p className="text-xs text-[#3D3D3D]">{packLabel(item.quantity)}</p>
                    </div>
                    <FormattedAmount className="font-bold text-[#1C1C1E] text-sm">
                      {formatOrderAmount(item.priceSar)}
                    </FormattedAmount>
                  </div>
                );
              })}

              {order.upsell &&
                (() => {
                  const upsellProduct = getProduct(order.upsell.productId);
                  return (
                    <div className="flex items-center gap-3 bg-[#C9A96E]/5 border border-[#C9A96E]/20 rounded-2xl p-3">
                      <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-[#E8E0D4]/30">
                        {upsellProduct ? (
                          <ProductImage
                            product={upsellProduct}
                            quantity={1}
                            alt={getProductName(order.upsell.productId)}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#1C1C1E] text-sm">{getProductName(order.upsell.productId)}</p>
                        <p className="text-xs text-[#C9A96E] font-bold">{thankYou.upsellBadge}</p>
                      </div>
                      <FormattedAmount className="font-bold text-[#C9A96E] text-sm">
                        {formatOrderAmount(order.upsell.priceSar)}
                      </FormattedAmount>
                    </div>
                  );
                })()}

              <div className="flex items-center justify-between border-t border-[#E8E0D4] pt-4 mt-4">
                <span className="font-bold text-[#1C1C1E]">{page.thankYouTotal}</span>
                <FormattedAmount className="font-extrabold text-[#1C1C1E] text-xl">
                  {formatOrderAmount(order.totalSar)}
                </FormattedAmount>
              </div>
            </div>
          )}

          <div className="space-y-5 border-t border-[#E8E0D4] pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center text-white font-bold text-sm shadow-md">
                1
              </div>
              <div className="pt-1.5">
                <h3 className="font-bold text-[#1C1C1E] text-base">{page.thankYouStep1Title}</h3>
                <p className="text-[#3D3D3D] text-sm mt-0.5">{page.thankYouStep1Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] font-bold text-sm border-2 border-[#C9A96E]/40">
                2
              </div>
              <div className="pt-1.5">
                <h3 className="font-bold text-[#1C1C1E] text-base">{page.thankYouStep2Title}</h3>
                <p className="text-[#3D3D3D] text-sm mt-0.5">{page.thankYouStep2Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E8E0D4]/50 flex items-center justify-center text-[#3D3D3D] font-bold text-sm border-2 border-[#E8E0D4]">
                3
              </div>
              <div className="pt-1.5">
                <h3 className="font-bold text-[#1C1C1E] text-base">{page.thankYouStep3Title}</h3>
                <p className="text-[#3D3D3D] text-sm mt-0.5">{page.thankYouStep3Desc(thankYou.codBadge)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 bg-[#C9A96E]/10 border border-[#C9A96E]/20 p-4 rounded-2xl mb-6">
          <span className="text-[#C9A96E] text-xl">✦</span>
          <span className="text-sm font-bold text-[#1C1C1E]">{thankYou.deliveryNote}</span>
        </div>

        <div className="flex items-start gap-4 bg-[#1C1C1E]/10 border border-[#1C1C1E]/30 p-5 rounded-2xl mb-10">
          <div className="w-10 h-10 shrink-0 rounded-full bg-[#1C1C1E] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <p className="text-sm font-bold text-[#1C1C1E] leading-relaxed pt-1.5">{page.thankYouContact}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          <div className="bg-white border border-[#E8E0D4]/60 rounded-2xl p-4 text-center">
            <span className="text-2xl mb-2 block">❖</span>
            <span className="text-xs font-bold text-[#1C1C1E]">{page.thankYouDeliveryKsa}</span>
          </div>
          <div className="bg-white border border-[#E8E0D4]/60 rounded-2xl p-4 text-center">
            <span className="text-2xl mb-2 block">◆</span>
            <span className="text-xs font-bold text-[#1C1C1E]">{page.thankYouReturn}</span>
          </div>
          <div className="bg-white border border-[#E8E0D4]/60 rounded-2xl p-4 text-center">
            <span className="text-2xl mb-2 block">✦</span>
            <span className="text-xs font-bold text-[#1C1C1E]">{page.thankYouArabicTeam}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-[#E8E0D4] pt-12">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#1C1C1E]/10 text-[#1C1C1E] text-xs font-bold px-4 py-1.5 rounded-full mb-3">
              {page.thankYouCrossSellBadge}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1C1E]">{page.thankYouCrossSellTitle}</h2>
            <p className="text-[#3D3D3D] text-sm mt-2">{page.thankYouCrossSellSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {crossSellProducts.map((product) => {
              const lp = getLocalizedProduct(product, lang);
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-3xl border border-[#E8E0D4] p-5 flex gap-4 items-center shadow-sm hover:shadow-lg hover:border-[#C9A96E]/40 transition-all duration-200 group"
                >
                  <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-[#FAFAF8]">
                    <ProductImage
                      product={product}
                      alt={lp.shortName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1C1C1E] text-sm mb-1 leading-snug">{lp.shortName}</h3>
                    <p className="text-xs text-[#3D3D3D] mb-2 line-clamp-2">{lp.headline}</p>
                    <span className="inline-block text-xs font-bold text-[#1C1C1E] bg-[#1C1C1E]/10 px-3 py-1 rounded-full">
                      {page.thankYouBrowseProduct}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1C1C1E] text-white font-bold rounded-full hover:bg-[#1C1C1E] transition-colors shadow-md"
          >
            <span>{thankYou.continueCTA}</span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

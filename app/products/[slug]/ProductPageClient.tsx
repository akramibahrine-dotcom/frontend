"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { OfferSelector } from "@/components/product/OfferSelector";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImage } from "@/components/product/ProductImage";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { TrustBadgeRow } from "@/components/ui/TrustBadge";
import { COPY } from "@/content/copy";
import type { Product } from "@/content/products";
import { getProductBundleOffers, getProductSavings } from "@/content/products";
import { getProductImageCandidates } from "@/lib/product-images";
import { useCurrencyStore } from "@/store/currency-store";
import { generateEventId } from "@/lib/events";
import { trackViewContent, trackAddToCart } from "@/lib/tracking";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";
import { getPayableBundlePriceSar, getWelcomeReferenceBundlePriceSar, shouldShowWelcomeReferencePricing } from "@/lib/pricing";
import { getProductPageSections } from "@/lib/product-page-copy";
import { FormattedAmount } from "@/components/currency/FormattedAmount";
import { MiniTestimonialStrip } from "@/components/product/MiniTestimonialStrip";

const WelcomePromoModal = dynamic(
  () => import("@/components/product/WelcomePromoModal").then((m) => m.WelcomePromoModal),
  { ssr: false }
);
const BeforeAfterCarousel = dynamic(
  () => import("@/components/product/BeforeAfterCarousel").then((m) => m.BeforeAfterCarousel),
  { ssr: false }
);

type Props = {
  product: Product;
  crossSells: Product[];
};

function HeroCarousel({ product }: { product: Product }) {
  const [current, setCurrent] = useState(0);
  const images = useMemo(() => {
    if (product.images.length > 0) return product.images;
    return getProductImageCandidates(product).slice(0, 3);
  }, [product]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="order-first md:order-last relative w-full min-w-0">
        <div className="relative bg-white rounded-[3rem] p-4 shadow-2xl shadow-[#155235]/10 border border-[#E8D8C3] overflow-hidden">
          <ProductImage
            product={product}
            alt={product.nameAr}
            className="w-full aspect-square rounded-3xl object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="order-first md:order-last relative w-full min-w-0 max-w-[400px] mx-auto md:max-w-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#155235]/5 to-transparent rounded-[2rem] sm:rounded-[3rem] -rotate-3 scale-105 transition-transform duration-500 hover:rotate-0 pointer-events-none" />
      <div className="relative w-full bg-white rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-2xl shadow-[#155235]/10 border border-[#E8D8C3] overflow-hidden">
        <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F5F3EE]">
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${product.nameAr} - صورة ${i + 1}`}
              // @ts-expect-error fetchPriority not in React types yet
              fetchpriority={i === 0 ? "high" : "low"}
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-700 ease-in-out ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`صورة ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-[#155235] scale-125 shadow-md" : "bg-[#155235]/40 hover:bg-[#155235]/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Floating Badge */}
        <div className="absolute top-3 end-3 sm:top-6 sm:end-4 bg-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-[#E8D8C3] flex items-center gap-1.5 sm:gap-2 z-10 max-w-[70%]">
          <span className="text-base sm:text-xl shrink-0">{product.imageTheme === "herbal-skin" ? "✨" : "🌿"}</span>
          <span className="text-[10px] sm:text-sm font-bold text-[#155235] truncate">{product.concernAr}</span>
        </div>
      </div>
    </div>
  );
}

export function ProductPageClient({ product, crossSells }: Props) {
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(2);
  const { addBundle, openCart } = useCartStore();
  const { format } = useCurrencyStore();
  const welcomePromo = useWelcomePromoStore((s) => s.active);

  const productOffers = getProductBundleOffers(product);
  const productSavings = getProductSavings(product);
  const sections = getProductPageSections(product);
  const payableOfferSar = getPayableBundlePriceSar(selectedQty, productOffers);
  const referenceOfferSar = getWelcomeReferenceBundlePriceSar(selectedQty, productOffers);

  useEffect(() => {
    const eventId = generateEventId();
    trackViewContent(
      product.id,
      product.nameAr,
      eventId
    );
  }, [product.id, product.nameAr, product.imageTheme]);

  function handleAddToCart() {
    const eventId = generateEventId();
    addBundle(product.id, product.slug, product.nameAr, selectedQty, product.imageTheme, "product_page");
    trackAddToCart(product.id, product.nameAr, payableOfferSar, selectedQty, eventId);
    openCart();
  }

  return (
    <>
      <WelcomePromoModal />

      {/* ═══ MARQUEE BANNER ═══ */}
      <div className="bg-[#071C12] border-y border-[#C99A45]/30 overflow-hidden py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex gap-16 px-8 text-[#C99A45] font-extrabold text-base md:text-lg items-center"
            >
              {COPY.homeMarquee.map((line) => (
                <span key={`${dup}-${line}`}>{line}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 1. Hero Section (Image Left, Text Right in RTL) */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-[#F5F3EE] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="text-right min-w-0">
              <div className="mb-4">
                <Link href="/collections" className="inline-flex items-center gap-2 px-3 py-1 bg-[#155235]/10 text-[#155235] rounded-full text-sm font-bold hover:bg-[#155235]/20 transition-colors">
                  <span>←</span> عُدْ إلى رفّ المجموعة
                </Link>
              </div>

              <h1 className={`text-3xl md:text-5xl font-extrabold mb-4 leading-tight ${product.slug === "fertility-tea" ? "text-[#FF0A74]" : "text-[#005727]"}`}>
                {product.headlineAr}
              </h1>
              <p className="text-[#6E675F] text-lg mb-6 leading-relaxed">
                {product.subheadlineAr}
              </p>

              <div className="flex items-center gap-3 mb-8 py-3 px-4 rounded-2xl bg-[#F5F3EE] border border-[#E8E2D8]">
                <div className="flex text-[#C99A45] text-lg">★★★★★</div>
                <span className="text-sm font-bold text-[#567063]">
                  +10,000 عميل يثقون بنا
                </span>
              </div>

              <TrustBadgeRow className="mb-8" />

              <MiniTestimonialStrip productSlug={product.slug} />

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#E8D8C3] mb-6">
                <p className="text-base font-extrabold text-[#0F1A14] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C99A45] animate-pulse"></span>
                  اختر العرض المناسب لك:
                </p>
                <OfferSelector selectedQuantity={selectedQty} onChange={setSelectedQty} welcomePromo={welcomePromo} offerImages={product.offerImages} productImage={product.images[0]} bundleOffers={productOffers} savingsMap={productSavings} />
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full relative overflow-hidden group bg-[#155235] hover:bg-[#1A6341] text-white py-5 rounded-full font-extrabold text-xl transition-all active:scale-[0.98] mb-3 shadow-xl shadow-[#155235]/20"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 flex-wrap">
                  {COPY.bundleBadges.addToCart}
                  <span className="inline-flex items-center gap-1.5" dir="ltr">
                    {shouldShowWelcomeReferencePricing(welcomePromo) && referenceOfferSar > payableOfferSar && (
                      <FormattedAmount className="text-white/55 line-through text-base">
                        {format(referenceOfferSar)}
                      </FormattedAmount>
                    )}
                    <FormattedAmount>{format(payableOfferSar)}</FormattedAmount>
                  </span>
                </span>
              </button>
              
              <div className="flex justify-center items-center gap-4 text-xs font-bold text-[#6E675F]">
                <span className="flex items-center gap-1">💳 الدفع عند الاستلام</span>
                <span className="w-1 h-1 rounded-full bg-[#D1C6B4]" />
                <span className="flex items-center gap-1">شامل للتوصيل</span>
              </div>
            </div>

            {/* Hero Image Carousel */}
            <HeroCarousel product={product} />
          </div>
        </div>
      </section>

      {/* Before & After transformations carousel */}
      <BeforeAfterCarousel productSlug={product.slug} />

      {/* 2. Pain & Emotion Section (Text Left, Image Right in RTL -> code wise: text order-last, image order-first) */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8F1E7] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image (Right in RTL) */}
            <div className="order-first relative group">
              <div className="absolute inset-0 bg-[#F8F1E7] rounded-3xl rotate-3 transition-transform group-hover:rotate-6"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                  src={product.imageSection2 || "/product-galery/6.jpg"}
                alt={sections.empathy.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full relative z-10 rounded-3xl shadow-lg object-cover aspect-square grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Text (Left in RTL) */}
            <div className="order-last text-right">
              <span className="inline-block px-4 py-1.5 bg-[#155235]/10 text-[#155235] rounded-full text-sm font-bold mb-4">
                {COPY.productPageEmpathyEyebrowAr}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F1A14] mb-6 leading-tight">
                {sections.empathy.heading}
              </h2>
              <div className="space-y-4 text-lg text-[#6E675F] leading-relaxed">
                <p>
                  الضغط والقلق على الأكل والوقت الضائع… كلّها تجعل «العناية بنفسك» تبدو كمالًا، وهي ليست كمالًا —
                  هي بقاءٌ في رحمةِ يومك.
                </p>
                <p className="font-medium text-[#155235] bg-[#155235]/5 p-4 rounded-xl border-r-4 border-[#155235]">
                  {product.painAwareAr}
                </p>
                <p>
                  {sections.empathy.closing}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageCertificates || "/product-galery/certificates.png?v=3"}
              alt="شهادات الجودة والاعتماد"
              className="w-full max-w-4xl rounded-3xl shadow-sm object-contain border border-[#E8D8C3]"
            />
          </div>
        </div>
      </section>

      {/* 3. جودة ووعود تناسب بيت الصحة */}
      <section className="py-16 md:py-24 bg-[#0F1A14] text-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/20">
                <span className="text-[#C99A45]">🌿</span>
                <span className="text-sm font-bold tracking-wide">ذوق بيت الصحة</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                نحترم ذكاءك: لا أرقام تفتيش وهمية، ولا أختامٌ لا نملك أصلها
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {sections.quality.intro}
              </p>

              <ul className="space-y-4 mb-8">
                {sections.quality.points.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-[#155235]/40 flex items-center justify-center shrink-0">
                      <span className="text-[#C99A45] font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-first md:order-last relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#155235] to-[#0a291a] rounded-full blur-2xl opacity-40 animate-pulse" />

              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[3rem] max-w-sm w-full text-center">
                <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-900/50 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.jpg" alt="بيت الصحة" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-extrabold mb-2 text-white">البيت أولاً</h3>
                <p className="text-gray-300 text-sm mb-6">
                  {sections.quality.cardTagline}
                </p>
                <div className="h-px w-1/2 mx-auto bg-white/20 mb-6" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  أي تسجيلٍ رسميٍّ أو شهادةٍ تظهر لاحقًا ستُذكر هنا حرفيًا، من غير زيادةٍ في التسويق.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. مكوّنات — دون ادعاءات علاجية */}
      <section className="py-16 md:py-24 bg-[#F8F1E7]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F1A14] mb-4">
              {sections.ingredients.title}
            </h2>
            <p className="text-[#6E675F] text-lg leading-relaxed">
              {sections.ingredients.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group order-first">
              <div className="absolute inset-0 bg-white rounded-[3rem] rotate-[-3deg] transition-transform group-hover:rotate-0" />
              <div className="relative bg-gradient-to-br from-[#155235]/10 to-transparent p-4 rounded-[3rem] border border-white overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageSection4 || "/product-galery/4.jpg"}
                  alt={sections.ingredients.imageAlt}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="order-last text-right space-y-6">
              {sections.ingredients.points.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8D8C3]">
                  <h4 className="text-xl font-extrabold text-[#0F1A14] mb-2 flex items-center gap-2">
                    <span className="text-[#155235]">{idx + 1}</span> {item.title}
                  </h4>
                  <p className="text-[#6E675F] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. وعودٌ نقدر نفي بها */}
      <section className="py-12 border-y border-[#E8D8C3] bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#F8F1E7]/50 rounded-3xl overflow-hidden">
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-white/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.imagePromisePackaging || "/product-galery/promise-packaging.jpg"} alt="تغليف فاخر" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0F1A14] mb-2">تغليف فاخر يليق بك</h3>
              <p className="text-sm text-[#6E675F]">
                كل طرد يصلك بتغليف أنيق يعكس جودة المنتج — لأن التجربة تبدأ قبل الفتح.
              </p>
            </div>
            <div className="text-center p-6 bg-[#F8F1E7]/50 rounded-3xl overflow-hidden">
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-white/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.imagePromiseDelivery || "/product-galery/promise-delivery.jpg"} alt="توصيل سريع" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0F1A14] mb-2">توصيل سريع لباب بيتك</h3>
              <p className="text-sm text-[#6E675F]">
                نوصّل داخل المملكة العربية السعودية — الدفع عند الاستلام.
              </p>
            </div>
            <div className="text-center p-6 bg-[#F8F1E7]/50 rounded-3xl overflow-hidden">
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-white/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.imagePromiseCod || "/product-galery/promise-cod.jpg"} alt="الدفع عند الاستلام" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0F1A14] mb-2">الدفع عند الاستلام</h3>
              <p className="text-sm text-[#6E675F]">
                لا تدفع ولا ريال قبل ما يوصلك المنتج — ثقة كاملة من البداية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ritual (Image Left, Text Right) */}
      <section className="py-16 md:py-24 bg-[#F5F3EE]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-last text-right">
              <span className="text-[#155235] font-bold text-sm tracking-widest uppercase mb-2 block">خطوات بسيطة</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F1A14] mb-6">{sections.ritual.title}</h2>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E8D8C3] mb-6 relative">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#C99A45] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  الروتين اليومي
                </div>
                <p className="text-[#6E675F] leading-relaxed text-lg mt-2">
                  {product.ritualAr}
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#155235]/5 rounded-xl border border-[#155235]/20">
                <span className="text-[#155235] mt-1">💡</span>
                <p className="text-sm text-[#6E675F]">
                  {sections.ritual.tip}
                </p>
              </div>
            </div>
            
            <div className="order-first flex justify-center">
              <div className="w-full max-w-sm relative">
                <div className="absolute inset-0 border-2 border-dashed border-[#C99A45]/30 rounded-3xl animate-spin-slow pointer-events-none" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageRitual || "/product-galery/5.jpg"}
                  alt={sections.ritual.imageAlt}
                  className="w-full rounded-3xl shadow-2xl shadow-[#155235]/10 border-4 border-[#F8F1E7] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 8. ختامٌ يدعوك بلطفِ بيتٍ */}
      <section className="py-16 md:py-24 bg-[#0F1A14] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-[1000px] mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            إن رضيتَ عن القراءة، فالخطوة التالية من باب بيت الصحة
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            اختر باقتك أدناه؛ سنؤكد معك الطلب قبل الشحن. الدفع لا يُستحق إلا عندما يقف المندوب أمامك.
          </p>

          <div className="bg-white text-black p-8 rounded-3xl max-w-2xl mx-auto shadow-2xl mb-8">
            <h3 className="text-xl font-extrabold text-[#0F1A14] mb-6">الباقة (الدفع عند الاستلام)</h3>
            <OfferSelector selectedQuantity={selectedQty} onChange={setSelectedQty} welcomePromo={welcomePromo} offerImages={product.offerImages} productImage={product.images[0]} bundleOffers={productOffers} savingsMap={productSavings} />
            <button
              onClick={handleAddToCart}
              className="w-full mt-6 bg-[#C99A45] hover:bg-[#b3883b] text-white py-5 rounded-full font-extrabold text-xl transition-all active:scale-[0.98] shadow-lg shadow-[#C99A45]/30"
            >
              أضِف إلى سلّتي{" "}
              <span className="inline-flex items-center gap-1.5" dir="ltr">
                {shouldShowWelcomeReferencePricing(welcomePromo) && referenceOfferSar > payableOfferSar ? (
                  <>
                    <FormattedAmount className="line-through text-white/50 text-lg">
                      {format(referenceOfferSar)}
                    </FormattedAmount>
                    <FormattedAmount>{format(payableOfferSar)}</FormattedAmount>
                  </>
                ) : (
                  <FormattedAmount>{format(payableOfferSar)}</FormattedAmount>
                )}
              </span>
            </button>
            <p className="text-sm font-medium text-[#6E675F] mt-4 text-center">
              {sections.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 bg-[#F8F1E7]">
        <div className="max-w-[800px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0F1A14] mb-4">سألت… وأجاب بيت الصحة</h2>
            <p className="text-[#6E675F]">جمعنا أسئلةً تتكرر، بلسانٍ واضحٍ بلا تزيينٍ في المعنى</p>
          </div>
          <FAQAccordion items={product.faq} />
        </div>
      </section>

      {/* 10. Related products */}
      {crossSells.length > 0 && (
        <section className="py-16 bg-white border-t border-[#E8D8C3]">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-[#0F1A14] text-center mb-10">
              قد يهمّك من أرصفة بيت الصحة الأخرى
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {crossSells.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}

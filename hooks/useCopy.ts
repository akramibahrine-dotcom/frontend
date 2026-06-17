import { useLanguageStore } from "@/store/language-store";
import { COPY } from "@/content/copy";
import { BRAND, COPY_EN } from "@/content/store-en";
import { localizeText } from "@/lib/store-i18n";

export function useCopy() {
  const lang = useLanguageStore((s) => s.lang);
  const isEn = lang === "en";

  return {
    lang,
    isEn,
    brand: isEn ? BRAND.en : BRAND.ar,
    localize: (text: string) => localizeText(text, lang),
    nav: isEn
      ? COPY_EN.nav
      : {
          home: COPY.nav.homeAr,
          categories: COPY.nav.categoriesAr,
          products: COPY.nav.productsAr,
          news: COPY.nav.newsAr,
          about: COPY.nav.aboutAr,
          contact: COPY.nav.contactAr,
        },
    footer: isEn
      ? COPY_EN.footer
      : {
          shopTitle: COPY.footer.shopTitle,
          helpTitle: COPY.footer.helpTitle,
          trustTitle: COPY.footer.trustTitle,
          description: COPY.footer.descriptionAr,
          links: COPY.footer.links,
          allProducts: "جميع المنتجات",
          cod: "الدفع عند الاستلام",
          deliveryGcc: "توصيل لجميع دول الخليج العربي",
          support: "دعم قبل وبعد الطلب",
          contactOn: "تواصل معنا على",
          copyright: (year: number) => `© ${year} بيت الصحة - Baytseha. جميع الحقوق محفوظة.`,
        },
    cart: isEn
      ? COPY_EN.cart
      : {
          cta: COPY.cart.ctaAr,
          scarcity: COPY.cart.scarcityAr,
          empty: COPY.cart.emptyAr,
          emptySub: COPY.cart.emptySubAr,
          crossSellTitle: COPY.cart.crossSellTitleAr,
          title: "سلة التسوق",
          close: "إغلاق السلة",
          chooseProduct: "اختر منتجًا",
          selectedProducts: "منتجاتك المختارة",
          reviewBundles: "راجع تفاصيل الباقات قبل إتمام الطلب",
          total: "الإجمالي",
          confirmBeforePack: "🚚 تأكيد قبل التجهيز",
          shippingIncluded: "شامل للتوصيل",
          codNoCard: "دفع عند الاستلام - بدون بطاقة",
          add: "أضف",
        },
    checkout: isEn ? COPY_EN.checkout : {
      title: COPY.checkout.titleAr,
      namePlaceholder: COPY.checkout.namePlaceholderAr,
      phonePlaceholder: COPY.checkout.phonePlaceholderAr,
      cta: COPY.checkout.ctaAr,
      privacy: COPY.checkout.privacyAr,
      nameError: COPY.checkout.nameErrorAr,
      phoneError: COPY.checkout.phoneErrorAr,
      phoneConfirmError: "يرجى تأكيد رقم الجوال",
      phoneMismatchError: "رقم الجوال غير متطابق",
      addressError: "أدخلي العنوان كاملاً (حي، شارع، مدينة)",
      addressPlaceholder: "مثال: حي النزهة، شارع الأمير محمد، الرياض",
      submitting: COPY.checkout.submittingAr,
      networkError: COPY.checkout.networkErrorAr,
      geoError: COPY.checkout.geoErrorAr,
      fullNameLabel: "الاسم الكامل",
      phoneLabel: "رقم الجوال",
      phoneConfirmLabel: "تأكيد رقم الجوال",
      phoneConfirmPlaceholder: "أعد كتابة رقم الجوال",
      addressLabel: "العنوان الكامل (حي، شارع، مدينة)",
      orderTotal: "إجمالي الطلب",
      welcomePromo: "✓ عرض ترحيب بيت الصحة مفعّل — أسعار الباقات كما هي معروضة",
      returnGuarantee: "ضمان استرجاع مجاني لمدة 7 أيام",
      close: "إغلاق",
    },
    upsell: isEn
      ? COPY_EN.upsell
      : {
          title: COPY.upsell.titleAr,
          price: COPY.upsell.priceAr,
          trust: COPY.upsell.trustAr,
          cta: COPY.upsell.ctaAr,
          skip: COPY.upsell.skipAr,
          countdownPrefix: COPY.upsell.countdownPrefixAr,
          countdownSuffix: COPY.upsell.countdownSuffixAr,
          confirming: "جاري التأكيد...",
          confirmingOrder: "جاري تأكيد طلبك...",
          confirmOrder: "تأكيد الطلب",
          priceMismatch: "سعر الباقة غير متطابق. حدّث الصفحة وحاول مرة أخرى.",
        },
    bundle: isEn
      ? COPY_EN.bundleBadges
      : {
          addToCart: COPY.bundleBadges.addToCart,
          microcopy: COPY.bundleBadges.microcopy,
          cartMicro: COPY.bundleBadges.cartMicro,
          launchOffer: COPY.bundleBadges.launchOffer,
        },
    packLabel: (quantity: number) => {
      if (isEn) {
        return quantity === 1 ? "1 pack" : quantity === 2 ? "2 packs" : "3 packs";
      }
      return quantity === 1 ? "عبوة واحدة" : quantity === 2 ? "عبوتان" : "3 عبوات";
    },
  };
}

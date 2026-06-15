import type { Language } from "@/store/language-store";

const translations = {
  // Navigation
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.categories": { ar: "مشاكلك الصحية", en: "Health Issues" },
  "nav.products": { ar: "الأكثر طلبا", en: "Best Sellers" },
  "nav.news": { ar: "الأخبار والمقالات", en: "News & Articles" },
  "nav.about": { ar: "من نحن", en: "About Us" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact Us" },

  // Hero
  "hero.headline": {
    ar: "بيت الصحة: عناية يومية بلمسة عُرفٍ سعوديٍّ، من غير تعقيد",
    en: "Baytseha: Daily care with a Saudi touch, simply delivered",
  },
  "hero.subheadline": {
    ar: "نختار لك أعشابًا بروائح هادئة وأسلوب واضح: تفاصيل الاستخدام أمامك، طلبك بخطوة بسيطة، والدفع عندما يصلك الطلب إلى باب بيتك داخل المملكة.",
    en: "We select herbs with calming aromas and clear instructions: usage details upfront, simple ordering, and cash on delivery right to your door.",
  },
  "hero.cta": { ar: "تصفح روتينك من المجموعة", en: "Browse Our Collection" },
  "hero.ctaSecondary": { ar: "اقترب من المنتجات", en: "Explore Products" },

  // Trust badges
  "trust.cod": { ar: "دفع عند الاستلام", en: "Cash on Delivery" },
  "trust.noCard": { ar: "بدون بطاقة", en: "No Card Needed" },
  "trust.delivery": { ar: "شامل للتوصيل", en: "Free Shipping" },
  "trust.ingredients": { ar: "قائمة مكوّنات واضحة", en: "Clear Ingredients" },
  "trust.support": { ar: "نجيبك قبل الطلب وبعده", en: "Support Before & After" },

  // Collection
  "collection.headline": { ar: "من أي باب يدخل راحتك اليوم؟", en: "Which door brings you comfort today?" },
  "collection.subheadline": {
    ar: "كل خلطة في بيت الصحة جاءت لتكون «كوبًا ثابتًا» في يومك: شرح للمكوّنات، وطريقة استخدام واضحة، من غير لفّ.",
    en: "Every blend at Baytseha is designed to be your daily cup: clear ingredients, simple usage instructions, no confusion.",
  },

  // Cart
  "cart.cta": { ar: "واصل تأكيد الطلب — الدفع عند الاستلام", en: "Continue to Checkout — Cash on Delivery" },
  "cart.empty": { ar: "سلتك ما زالت فارغة", en: "Your cart is empty" },
  "cart.emptySub": { ar: "ابدأ من المجموعة واختر ما يلائم يومك", en: "Browse our collection and pick what fits your day" },

  // Checkout
  "checkout.title": { ar: "تأكيد الطلب", en: "Confirm Order" },
  "checkout.name": { ar: "الاسم الكامل", en: "Full Name" },
  "checkout.phone": { ar: "رقم الجوال", en: "Phone Number" },
  "checkout.phoneConfirm": { ar: "تأكيد رقم الجوال", en: "Confirm Phone Number" },
  "checkout.address": { ar: "العنوان الكامل (حي، شارع، مدينة)", en: "Full Address (district, street, city)" },
  "checkout.cta": { ar: "تأكيد الطلب", en: "Confirm Order" },
  "checkout.privacy": {
    ar: "نستخدم بياناتك فقط لتأكيد طلبك وتوصيله إليك في أسرع وقت — خصوصيتك أولويتنا.",
    en: "We only use your data to confirm and deliver your order — your privacy is our priority.",
  },

  // Thank you
  "thankYou.headline": { ar: "بشراك أنّ طلبك وصلنا", en: "Your order has been received!" },
  "thankYou.orderNumber": { ar: "رقم الطلب:", en: "Order Number:" },
  "thankYou.sub": {
    ar: "فريق بيت الصحة سيطلب منك تأكيدًا سريعًا قبل التجهيز، لنسجّل عنوانك كما تحبّ ونكمّل مسار الشحن بسلاسة.",
    en: "Our team will contact you for a quick confirmation before processing, to ensure your address is correct and shipping goes smoothly.",
  },
  "thankYou.continueCTA": { ar: "عد إلى المجموعة", en: "Back to Collection" },

  // Footer
  "footer.shop": { ar: "المتجر", en: "Shop" },
  "footer.help": { ar: "المساعدة", en: "Help" },
  "footer.trust": { ar: "ثقتك معنا", en: "Trust" },
  "footer.privacy": { ar: "خصوصيتك", en: "Privacy" },
  "footer.terms": { ar: "الشروط", en: "Terms" },
  "footer.returns": { ar: "الإرجاع والاستبدال", en: "Returns" },
  "footer.about": { ar: "قصتنا", en: "Our Story" },

  // Generic
  "generic.addToCart": { ar: "أضِف الباقة إلى السلّة", en: "Add to Cart" },
  "generic.viewProduct": { ar: "عرض المنتج", en: "View Product" },
  "generic.whyBaytseha": { ar: "ليش بيت الصحة؟", en: "Why Baytseha?" },
  "generic.faq": { ar: "ما الذي يدور في بالك؟", en: "Frequently Asked Questions" },
  "generic.categories": { ar: "تصفّح حسب الحاجة", en: "Browse by Need" },
  "generic.categoriesHeadline": { ar: "ما المشكلة الصحية التي تبحث عنها؟", en: "What health issue are you looking for?" },
  "generic.allCategories": { ar: "كل التصنيفات ←", en: "All Categories ←" },
  "generic.bundleOffers": { ar: "باقات التوفير", en: "Bundle Offers" },
  "generic.bundleHeadline": { ar: "كلما زادت الباقة، زاد التوفير", en: "Bigger bundles, bigger savings" },
  "generic.enterCollection": { ar: "ادخل المجموعة ←", en: "Enter Collection ←" },
  "generic.finalCTA": { ar: "بابٌ عشبيٌّ في بيتك… نفتحه لك اليوم", en: "An herbal door in your home... we open it for you today" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Language): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.ar;
}

export default translations;

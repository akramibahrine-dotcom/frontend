import translations from "@/content/translations";
import { COPY } from "@/content/copy";
import { PRODUCTS, BUNDLE_OFFERS } from "@/content/products";
import { CATEGORIES } from "@/content/categories";
import {
  BRAND,
  COPY_EN,
  CATEGORY_EN,
  PRODUCT_EN,
  UI_PAIRS,
  type ProductEn,
} from "@/content/store-en";
import type { Product } from "@/content/products";

function addPair(map: Map<string, string>, ar: string | undefined, en: string | undefined) {
  const a = ar?.trim();
  const e = en?.trim();
  if (!a || !e || a === e) return;
  map.set(a, e);
}

function addProductPairs(map: Map<string, string>, product: Product, en: ProductEn | undefined) {
  if (!en) return;
  addPair(map, product.nameAr, en.name);
  addPair(map, product.shortNameAr, en.shortName);
  addPair(map, product.headlineAr, en.headline);
  addPair(map, product.subheadlineAr, en.subheadline);
  addPair(map, product.concernAr, en.concern);
  addPair(map, product.painAwareAr, en.painAware);
  addPair(map, product.ritualAr, en.ritual);
  en.whyBaytsehaPoints?.forEach((point, i) => {
    addPair(map, product.whyBaytsehaPoints[i], point);
  });
  product.faq.forEach((item, i) => {
    const translated = en.faq?.[i];
    if (!translated) return;
    addPair(map, item.question, translated.question);
    addPair(map, item.answer, translated.answer);
  });
}

function collectCopyPairs(map: Map<string, string>) {
  addPair(map, COPY.brand.nameAr, BRAND.en.name);
  addPair(map, COPY.brand.taglineAr, BRAND.en.taglineShort);
  addPair(map, "عودة للأصل", BRAND.en.tagline);

  addPair(map, COPY.hero.headlineAr, COPY_EN.hero.headline);
  addPair(map, COPY.hero.subheadlineAr, COPY_EN.hero.subheadline);
  addPair(map, COPY.hero.ctaAr, COPY_EN.hero.cta);
  addPair(map, COPY.hero.ctaSecondaryAr, COPY_EN.hero.ctaSecondary);

  COPY.trust.forEach((item, i) => addPair(map, item.textAr, COPY_EN.trust[i]?.text ?? ""));
  COPY.homeMarquee.forEach((line, i) => addPair(map, line, COPY_EN.homeMarquee[i] ?? ""));

  addPair(map, COPY.collection.headlineAr, COPY_EN.collection.headline);
  addPair(map, COPY.collection.subheadlineAr, COPY_EN.collection.subheadline);

  addPair(map, COPY.cart.ctaAr, COPY_EN.cart.cta);
  addPair(map, COPY.cart.scarcityAr, COPY_EN.cart.scarcity);
  addPair(map, COPY.cart.emptyAr, COPY_EN.cart.empty);
  addPair(map, COPY.cart.emptySubAr, COPY_EN.cart.emptySub);
  addPair(map, COPY.cart.crossSellTitleAr, COPY_EN.cart.crossSellTitle);

  addPair(map, COPY.checkout.titleAr, COPY_EN.checkout.title);
  addPair(map, COPY.checkout.namePlaceholderAr, COPY_EN.checkout.namePlaceholder);
  addPair(map, COPY.checkout.phonePlaceholderAr, COPY_EN.checkout.phonePlaceholder);
  addPair(map, COPY.checkout.ctaAr, COPY_EN.checkout.cta);
  addPair(map, COPY.checkout.privacyAr, COPY_EN.checkout.privacy);
  addPair(map, COPY.checkout.nameErrorAr, COPY_EN.checkout.nameError);
  addPair(map, COPY.checkout.phoneErrorAr, COPY_EN.checkout.phoneError);
  addPair(map, COPY.checkout.submittingAr, COPY_EN.checkout.submitting);
  addPair(map, COPY.checkout.networkErrorAr, COPY_EN.checkout.networkError);
  addPair(map, COPY.checkout.geoErrorAr, COPY_EN.checkout.geoError);

  addPair(map, COPY.upsell.titleAr, COPY_EN.upsell.title);
  addPair(map, COPY.upsell.trustAr, COPY_EN.upsell.trust);
  addPair(map, COPY.upsell.skipAr, COPY_EN.upsell.skip);
  addPair(map, COPY.upsell.countdownPrefixAr, COPY_EN.upsell.countdownPrefix);
  addPair(map, COPY.upsell.countdownSuffixAr, COPY_EN.upsell.countdownSuffix);

  addPair(map, COPY.thankYou.headlineAr, COPY_EN.thankYou.headline);
  addPair(map, COPY.thankYou.orderNumberPrefixAr, COPY_EN.thankYou.orderNumberPrefix);
  addPair(map, COPY.thankYou.subAr, COPY_EN.thankYou.sub);
  addPair(map, COPY.thankYou.deliveryNoteAr, COPY_EN.thankYou.deliveryNote);
  addPair(map, COPY.thankYou.codBadgeAr, COPY_EN.thankYou.codBadge);
  addPair(map, COPY.thankYou.upsellBadgeAr, COPY_EN.thankYou.upsellBadge);
  addPair(map, COPY.thankYou.continueCTAAr, COPY_EN.thankYou.continueCTA);

  addPair(map, COPY.disclaimer, COPY_EN.disclaimer);

  addPair(map, COPY.bundleBadges.addToCart, COPY_EN.bundleBadges.addToCart);
  addPair(map, COPY.bundleBadges.microcopy, COPY_EN.bundleBadges.microcopy);
  addPair(map, COPY.bundleBadges.cartMicro, COPY_EN.bundleBadges.cartMicro);
  addPair(map, COPY.bundleBadges.launchOffer, COPY_EN.bundleBadges.launchOffer);

  addPair(map, COPY.about.headlineAr, COPY_EN.about.headline);
  addPair(map, COPY.about.storyAr, COPY_EN.about.story);
  addPair(map, COPY.about.promiseTitle, COPY_EN.about.promiseTitle);
  COPY.about.beliefPoints.forEach((point, i) => {
    addPair(map, point, COPY_EN.about.beliefPoints[i] ?? "");
  });

  COPY.faqGlobal.forEach((item, i) => {
    const en = COPY_EN.faqGlobal[i];
    if (!en) return;
    addPair(map, item.question, en.question);
    addPair(map, item.answer, en.answer);
  });

  addPair(map, COPY.nav.homeAr, COPY_EN.nav.home);
  addPair(map, COPY.nav.categoriesAr, COPY_EN.nav.categories);
  addPair(map, COPY.nav.productsAr, COPY_EN.nav.products);
  addPair(map, COPY.nav.newsAr, COPY_EN.nav.news);
  addPair(map, COPY.nav.aboutAr, COPY_EN.nav.about);
  addPair(map, COPY.nav.contactAr, COPY_EN.nav.contact);

  addPair(map, COPY.footer.shopTitle, COPY_EN.footer.shopTitle);
  addPair(map, COPY.footer.helpTitle, COPY_EN.footer.helpTitle);
  addPair(map, COPY.footer.trustTitle, COPY_EN.footer.trustTitle);
  addPair(map, COPY.footer.descriptionAr, COPY_EN.footer.description);
  addPair(map, COPY.footer.links.privacy, COPY_EN.footer.links.privacy);
  addPair(map, COPY.footer.links.terms, COPY_EN.footer.links.terms);
  addPair(map, COPY.footer.links.returns, COPY_EN.footer.links.returns);
  addPair(map, COPY.footer.links.contact, COPY_EN.footer.links.contact);
  addPair(map, COPY.footer.links.about, COPY_EN.footer.links.about);

  addPair(map, COPY.reviewsPlaceholderTitleAr, COPY_EN.reviewsPlaceholderTitle);
  addPair(map, COPY.reviewsPlaceholderBodyAr, COPY_EN.reviewsPlaceholderBody);
  addPair(map, COPY.productPageEmpathyEyebrowAr, COPY_EN.productPageEmpathyEyebrow);
}

function mergeApiOverrides(map: Map<string, string>, api: Record<string, string>) {
  for (const [key, value] of Object.entries(api)) {
    if (/[\u0600-\u06FF]/.test(key)) {
      addPair(map, key, value);
    }
  }
}

export function buildArToEnMap(apiOverrides: Record<string, string> = {}): Map<string, string> {
  const map = new Map<string, string>();

  for (const entry of Object.values(translations)) {
    addPair(map, entry.ar, entry.en);
  }

  collectCopyPairs(map);

  for (const product of PRODUCTS) {
    addProductPairs(map, product, PRODUCT_EN[product.id]);
    for (const offer of product.bundleOffers ?? BUNDLE_OFFERS) {
      addPair(map, offer.badgeAr, offer.badgeAr === "الأكثر توفيراً" ? "Best Value" : offer.badgeAr === "الأكثر طلباً" ? "Most Popular" : "Try One");
      addPair(map, offer.labelAr, offer.labelAr === "ثلاث عبوات" ? "3 packs" : offer.labelAr === "عبوتان" ? "2 packs" : "1 pack");
    }
  }

  for (const category of CATEGORIES) {
    const en = CATEGORY_EN[category.slug];
    if (!en) continue;
    addPair(map, category.nameAr, en.name);
    addPair(map, category.shortNameAr, en.shortName);
    addPair(map, category.descriptionAr, en.description);
    addPair(map, category.concernAr, en.concern);
  }

  for (const offer of BUNDLE_OFFERS) {
    addPair(map, offer.badgeAr, offer.badgeAr === "الأكثر توفيراً" ? "Best Value" : offer.badgeAr === "الأكثر طلباً" ? "Most Popular" : "Try One");
    addPair(map, offer.labelAr, offer.labelAr === "ثلاث عبوات" ? "3 packs" : offer.labelAr === "عبوتان" ? "2 packs" : "1 pack");
  }

  for (const [ar, en] of UI_PAIRS) {
    addPair(map, ar, en);
  }

  mergeApiOverrides(map, apiOverrides);

  return map;
}

let cachedSortedPairs: [string, string][] | null = null;

export function getSortedArToEnPairs(apiOverrides: Record<string, string> = {}): [string, string][] {
  if (!apiOverrides || Object.keys(apiOverrides).length === 0) {
    if (cachedSortedPairs) return cachedSortedPairs;
    cachedSortedPairs = [...buildArToEnMap()].sort((a, b) => b[0].length - a[0].length);
    return cachedSortedPairs;
  }
  return [...buildArToEnMap(apiOverrides)].sort((a, b) => b[0].length - a[0].length);
}

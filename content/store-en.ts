export const BRAND = {
  ar: {
    name: "بيت الصحة",
    tagline: "عودة للأصل",
    taglineShort: "أعشاب تليق ببيتك",
    homeLabel: "بيت الصحة — أعشاب تليق ببيتك",
  },
  en: {
    name: "Baytseha",
    tagline: "Return to origin",
    taglineShort: "Herbs that suit your home",
    homeLabel: "Baytseha — Herbs that suit your home",
  },
} as const;

export type ProductEn = {
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  concern: string;
  painAware: string;
  ritual: string;
  whyBaytsehaPoints?: string[];
  faq?: { question: string; answer: string }[];
};

export const COPY_EN = {
  hero: {
    headline: "Baytseha: Daily care with a Saudi touch, simply delivered",
    subheadline:
      "We select herbs with calming aromas and clear instructions: usage details upfront, simple ordering, and cash on delivery right to your door in Saudi Arabia.",
    cta: "Browse your routine from the collection",
    ctaSecondary: "Explore products",
  },
  trust: [
    { text: "Pay on delivery — no card needed" },
    { text: "Delivered across Saudi Arabia" },
    { text: "Clear ingredient list" },
    { text: "Support before and after your order" },
  ],
  homeMarquee: [
    "🌿 Baytseha — simple daily herbal routine",
    "✨ Clear ingredients and usage instructions",
    "🏠 An elegant ordering experience for your home",
  ],
  collection: {
    headline: "Which door brings you comfort today?",
    subheadline:
      "Every blend at Baytseha is designed to be your steady daily cup: clear ingredients, simple usage, no confusion.",
  },
  cart: {
    cta: "Continue to checkout — Cash on Delivery",
    scarcity: "Launch bundle offers may change without prior notice",
    empty: "Your cart is still empty",
    emptySub: "Start from the collection and choose what fits your day",
    crossSellTitle: "Complete your care routine at exclusive limited-time prices 🔥",
    title: "Shopping Cart",
    close: "Close cart",
    chooseProduct: "Choose a product",
    selectedProducts: "Your selected products",
    reviewBundles: "Review bundle details before completing your order",
    total: "Total",
    confirmBeforePack: "🚚 Confirmation before packing",
    shippingIncluded: "Shipping included",
    codNoCard: "Cash on delivery — no card",
    add: "Add",
  },
  checkout: {
    title: "Confirm Order",
    namePlaceholder: "Full name as shown on ID",
    phonePlaceholder: "Phone number (05XXXXXXXX or +9715XXXXXXXX)",
    cta: "Confirm Order",
    privacy: "We only use your data to confirm and deliver your order — your privacy is our priority.",
    nameError: "Please enter your full name",
    phoneError: "Please enter a valid phone number (Saudi or GCC)",
    phoneConfirmError: "Please confirm your phone number",
    phoneMismatchError: "Phone numbers do not match",
    addressError: "Enter your full address (district, street, city)",
    addressPlaceholder: "e.g. Al Nuzha District, Prince Mohammed St, Riyadh",
    submitting: "Submitting order...",
    networkError: "Connection failed. Please retry or message us on WhatsApp.",
    geoError: "Sorry, we cannot complete your order right now. Please try later or contact us on WhatsApp.",
    fullNameLabel: "Full Name",
    phoneLabel: "Phone Number",
    phoneConfirmLabel: "Confirm Phone Number",
    phoneConfirmPlaceholder: "Re-enter phone number",
    addressLabel: "Full Address (district, street, city)",
    orderTotal: "Order Total",
    welcomePromo: "✓ Baytseha welcome offer active — bundle prices as shown",
    returnGuarantee: "7-day free return guarantee",
    close: "Close",
  },
  upsell: {
    title: "One-time offer — before we finalize your order",
    price: (price: string) => `Exclusive price ${price} — with this shipment only`,
    trust: "Added to the same order and delivery — pay on delivery",
    cta: (price: string) => `Grab the offer — add for ${price}`,
    skip: "No thanks, complete my order as is",
    countdownPrefix: "This offer disappears in",
    countdownSuffix: "seconds",
    confirming: "Confirming...",
    confirmingOrder: "Confirming your order...",
    confirmOrder: "Confirm Order",
    priceMismatch: "Bundle price mismatch. Refresh the page and try again.",
  },
  thankYou: {
    headline: "Your order has been received!",
    orderNumberPrefix: "Order Number:",
    sub: "The Baytseha team will contact you for a quick confirmation before processing, to record your address correctly and ship smoothly.",
    deliveryNote: "A quick reply to our call or message helps us deliver faster.",
    codBadge: "Cash on Delivery",
    upsellBadge: "⏳ Limited offer — attached to your order only",
    continueCTA: "Back to Collection",
  },
  disclaimer:
    "Baytseha products — daily herbal and natural care — are not medicines and do not replace medical or nutrition advice. If you take medication or have a chronic condition, ask your specialist before use.",
  bundleBadges: {
    addToCart: "Add bundle to cart",
    microcopy: "Cash on delivery — no card needed",
    cartMicro: "You can edit your cart before tapping Confirm Order",
    launchOffer: "Launch bundles may change; prices shown at checkout apply",
  },
  about: {
    headline: "A short story about Baytseha",
    story:
      "We set out to build a home for daily care: clear writing, thoughtful packing, and an ordering experience that does not complicate your day. Baytseha blends the herbal heritage of our homes with modern service.",
    promiseTitle: "What we stand behind",
    beliefPoints: [
      "Herbs we choose as we would for our own home",
      "No medical claims and no hype in advertising",
      "Simple ordering from your phone without hassle",
      "A human voice that answers before and after your order",
    ],
  },
  faqGlobal: [
    {
      question: "Are your products a treatment?",
      answer:
        "No. At Baytseha we offer herbal and natural care products for your daily routine; they are not medicines and do not replace diagnosis or a prescription.",
    },
    {
      question: "When will I notice a difference?",
      answer:
        "Experience varies. We recommend consistent use alongside balanced sleep, food, and hydration — without promising a specific result.",
    },
    {
      question: "I take medication — can I drink the tea?",
      answer: "If you are on treatment or have a chronic condition, consult your doctor or pharmacist before any herbal product.",
    },
    {
      question: "Is payment on delivery?",
      answer: "Yes for purchases within Saudi Arabia — you pay cash when your order arrives.",
    },
    {
      question: "How do I choose between 1, 2, or 3 packs?",
      answer:
        "One pack to try, two for a longer week, and three for better value for your household or to share.",
    },
  ],
  nav: {
    home: "Home",
    categories: "Health Issues",
    products: "Best Sellers",
    news: "News & Articles",
    about: "About Us",
    contact: "Contact Us",
  },
  footer: {
    shopTitle: "Shop",
    helpTitle: "Help",
    trustTitle: "Trust",
    description:
      "Baytseha — daily herbal and natural care in Saudi Arabia. Clear ingredients, simple ordering, and cash on delivery.",
    links: {
      privacy: "Privacy",
      terms: "Terms",
      returns: "Returns & Exchanges",
      contact: "Contact Us",
      about: "Our Story",
    },
    allProducts: "All Products",
    cod: "Cash on Delivery",
    deliveryGcc: "Delivery across the GCC",
    support: "Support before and after your order",
    contactOn: "Reach us on",
    copyright: (year: number) => `© ${year} Baytseha. All rights reserved.`,
  },
  reviewsPlaceholderTitle: "Baytseha friends",
  reviewsPlaceholderBody: "Stories from people who tried a calm herbal routine — in their own words.",
  productPageEmpathyEyebrow: "Close to your day",
} as const;

export const CATEGORY_EN: Record<
  string,
  { name: string; shortName: string; description: string; concern: string }
> = {
  "weight-support": {
    name: "Weight Management Support",
    shortName: "Weight Management",
    concern: "Weight management companion",
    description:
      "Daily herbs to accompany your weight journey — sipped calmly between meals and movement, within a balanced lifestyle.",
  },
  "colon-comfort": {
    name: "Colon & Gas Comfort",
    shortName: "Stomach Comfort",
    concern: "Colon and gas comfort",
    description:
      "An herbal blend that soothes your stomach after heavy meals and restores calm to your day.",
  },
  "hemorrhoid-comfort": {
    name: "Hemorrhoid Comfort",
    shortName: "Hemorrhoid Comfort",
    concern: "Daily comfort with hemorrhoids",
    description:
      "A simple, discreet herbal routine from order to packaging for daily comfort support.",
  },
  "liver-wellness": {
    name: "Liver Wellness Support",
    shortName: "Liver Wellness",
    concern: "Liver wellness companion",
    description:
      "Calming herbs for a supportive daily cup alongside sleep, water, and balanced food.",
  },
  "lung-smoking-support": {
    name: "Lung & Smoking Support",
    shortName: "Lungs & Smoking",
    concern: "Chest and smoking effects companion",
    description:
      "A warm cup to accompany reducing smoking — a companion to your steps, not a substitute for medical programs.",
  },
  "prostate-wellness": {
    name: "Prostate Wellness Support",
    shortName: "Prostate Wellness",
    concern: "Prostate wellness companion",
    description:
      "An herbal blend for men who track daily health, with privacy in service and packaging.",
  },
  "womens-health": {
    name: "Women's Health Support",
    shortName: "Women's Health",
    concern: "Women's health companion",
    description:
      "A warm herbal blend to accompany women's health and fertility support within a balanced lifestyle.",
  },
  "herbal-skin": {
    name: "Herbal Skin Care",
    shortName: "Skin Care",
    concern: "Skin and complexion care",
    description:
      "Natural herbal products designed to improve skin health, even tone, and address dark spots.",
  },
};

export const PRODUCT_EN: Record<string, ProductEn> = {
  "weight-support-tea": {
    name: "Natural Herbal Weight Support Tea",
    shortName: "Weight Support Tea",
    headline: "Shed excess weight — the natural support your body has been waiting for",
    subheadline:
      "An herbal blend sipped as a pause between meals and movement — Baytseha offers it as supportive routine alongside balanced eating and gentle habits.",
    concern: "Weight management and slimming support",
    painAware:
      "Sometimes the obstacle is not motivation but consistency. We made this blend light on the palate and your day, so it is easier to keep.",
    ritual:
      "One cup morning or evening, with sleep and food you know. If you have a treatment plan, ask your specialist before trying.",
    whyBaytsehaPoints: [
      "Blends we pack as we would pack gifts for our own home",
      "From your phone to your door — without disrupting your day",
      "Pay when the courier hands you the parcel",
      "We answer after your order as we do when you ask",
    ],
    faq: [
      {
        question: "Does this tea burn fat?",
        answer:
          "No. This tea supports your daily routine and weight management within a balanced lifestyle — not treatment or guaranteed results. Experience varies.",
      },
      {
        question: "When should I drink it?",
        answer: "One cup at a fixed time daily, following what is on the Baytseha pack.",
      },
      {
        question: "Is it safe with my medication?",
        answer: "Herbs may interact with medicines. If you are diagnosed or on treatment, consult your doctor before continuing.",
      },
      {
        question: "How does delivery work?",
        answer: "We deliver within Saudi Arabia — you pay when your order arrives.",
      },
    ],
  },
  "colon-comfort-tea": {
    name: "Baytseha Herbal Tea for Calmer Days with Stomach & Gas",
    shortName: "Stomach Comfort Tea",
    headline: "After eating… a cup that soothes your stomach and restores your calm",
    subheadline:
      "A daily digestive comfort blend — no hype; we write usage transparently as we would for our own family.",
    concern: "Colon and gas comfort",
    painAware:
      "Stress, travel, and heavy meals weigh on the stomach until your chest tightens. We brought a warm blend that reminds you care starts with a regular cup.",
    ritual:
      "A cup after a rich meal, as warm as possible, within your routine. Water and fiber are companions to this cup.",
    whyBaytsehaPoints: [
      "Herbs chosen for daily calm, not advertising noise",
      "Discreet packaging — no embarrassment",
      "Payment is reassurance at your door",
      "A team that speaks Arabic you understand",
    ],
    faq: [
      {
        question: "Does it treat IBS?",
        answer: "No. We offer it for daily comfort within your lifestyle; diagnosis and treatment belong to your doctor.",
      },
      {
        question: "For daily use?",
        answer: "Designed for consecutive days per pack instructions, with enough water and reasonable sleep.",
      },
      {
        question: "How do I order?",
        answer: "Choose your bundle, enter your details, and Baytseha will contact you before closing the order — cash on delivery.",
      },
    ],
  },
  "hemorrhoid-comfort-tea": {
    name: "Baytseha Herbal Tea for Daily Comfort with Hemorrhoids",
    shortName: "Hemorrhoid Comfort Tea",
    headline: "For sensitive topics — a calm order and discreet delivery",
    subheadline:
      "A supportive blend for daily wellness, with a purchase experience that respects your privacy from order to packaging.",
    concern: "Daily comfort with hemorrhoids",
    painAware:
      "Some needs do not need a lecture. We simply place a simple herbal routine in your hands and leave treatment paths to doctors.",
    ritual:
      "A daily cup with plenty of water and fiber in your food; consult a specialist if pain persists or worsens.",
    whyBaytsehaPoints: [
      "Packaging that does not reveal contents to neighbors",
      "Polite WhatsApp confirmation",
      "No payment until our courier holds the parcel",
      "Baytseha — a name we carry before we sell",
    ],
    faq: [
      {
        question: "Does it cure hemorrhoids?",
        answer: "No. An herbal product for daily comfort; persistent pain or bleeding needs a doctor immediately.",
      },
      {
        question: "Does the parcel show the contents?",
        answer: "No, we use neutral packaging where possible — see shipping policy for details.",
      },
    ],
  },
  "liver-wellness-tea": {
    name: "Baytseha Herbal Tea to Support Liver Wellness in Your Day",
    shortName: "Liver Wellness Tea",
    headline: "A morning cup that aligns your day with movement and hydration",
    subheadline:
      "Herbs to try as a calm habit beside sleep and water — Baytseha offers them as a simple routine, not a drug substitute.",
    concern: "Liver wellness companion",
    painAware:
      "The liver needs calm in food and timing; we add a warm cup without claiming it treats disease.",
    ritual:
      "A cup before breakfast or after lunch — regularly with enough water; check your specialist if you take liver medication.",
    whyBaytsehaPoints: [
      "Clear Arabic, honest and plain",
      "We do not hide recommended use",
      "One order is enough to start your routine",
      "Within the Kingdom — we serve you wherever you are",
    ],
    faq: [
      {
        question: "Does it treat liver disease?",
        answer: "Absolutely not. Herbal tea for daily support within a healthy lifestyle; tests and symptoms belong to your doctor.",
      },
      {
        question: "With medication?",
        answer: "Do not mix without advice — herbs are not immune to interactions.",
      },
    ],
  },
  "lung-smoking-support-tea": {
    name: "Baytseha Herbal Tea for Chest & Breath While Reducing Smoking",
    shortName: "Chest Support Tea",
    headline: "An aromatic step beside a bigger decision about smoking",
    subheadline:
      "A warm cup as you reduce cigarettes — not a substitute for medical quit programs, but a gentle companion to your day.",
    concern: "Chest and smoking effects companion",
    painAware:
      "Every big step starts small — we offer a light herbal session that reminds you that you started caring for yourself, without magical quit promises.",
    ritual:
      "A regular morning cup; real quitting is a decision with a doctor or clinic — this cup is only a companion.",
    whyBaytsehaPoints: [
      "We are not a clinic — we are a home for routine",
      "A calm taste that makes consistency easier",
      "Cash on delivery removes cart hesitation",
      "We answer your questions without a fight",
    ],
    faq: [
      {
        question: "Will it make me quit smoking?",
        answer: "No. It accompanies your day herbally; quitting needs a health plan, not an ad.",
      },
      {
        question: "Any side effects?",
        answer: "It may interact with your medicines; ask your doctor if you have chronic chest tightness.",
      },
    ],
  },
  "prostate-wellness-tea": {
    name: "Baytseha Herbal Tea for Men Who Track Daily Health",
    shortName: "Prostate Wellness Tea",
    headline: "Calm daily routine for the man who follows his health",
    subheadline:
      "An herbal blend for a steady day — a private order, delivery to your door, with a reminder that medical follow-up is essential.",
    concern: "Prostate wellness companion",
    painAware:
      "Smart care is not postponed. Baytseha makes the herbal step easy and leaves diagnosis to specialists.",
    ritual:
      "A daily cup with moderate activity and water; any pain or urinary change needs a doctor immediately.",
    whyBaytsehaPoints: [
      "Privacy in service and packaging",
      "Straight talk without green hype",
      "Cash on delivery — decision comfort",
      "We support you during and after the order",
    ],
    faq: [
      {
        question: "Does it treat prostate inflammation?",
        answer: "No. Tea for daily support; pain, fever, and urinary issues are strictly medical.",
      },
      {
        question: "How do I order quickly?",
        answer: "Name, phone, and confirmation through us — then the parcel arrives under the Baytseha name.",
      },
    ],
  },
  "fertility-tea": {
    name: "Baytseha Fertility Support Tea",
    shortName: "Fertility Tea",
    headline: "Natural support for your fertility journey and women's health",
    subheadline:
      "A warm herbal blend to accompany women's health and fertility support within a balanced lifestyle.",
    concern: "Women's health and fertility support",
    painAware:
      "The fertility journey can be stressful. We designed this blend as a daily moment of calm and care with natural ingredients that suit your body.",
    ritual:
      "One warm cup daily during your relaxation moments. Consult your doctor if you follow a fertility treatment plan.",
    whyBaytsehaPoints: [
      "Natural herbs carefully selected for women's health",
      "Packaging that preserves privacy and delivers to your door",
      "Cash on delivery with comfort and safety",
      "A support team to answer your questions",
    ],
    faq: [
      {
        question: "Does this tea help pregnancy?",
        answer:
          "This tea supports women's health and fertility naturally as part of a healthy lifestyle; it is not medical treatment or a substitute for specialist care.",
      },
      {
        question: "Can I drink it during my period?",
        answer: "Yes, its warm natural ingredients may help ease discomfort during menstruation.",
      },
    ],
  },
  "axis-y-serum": {
    name: "Axis-Y Dark Spot Correcting Serum",
    shortName: "Axis-Y Serum",
    headline: "Natural glow and even skin tone",
    subheadline:
      "An herbal serum designed to correct dark spots and even skin tone with natural ingredients.",
    concern: "Even skin tone and spot correction",
    painAware:
      "Dark spots and pigmentation can affect your confidence. Axis-Y offers a gentle herbal solution for brighter, more even skin.",
    ritual:
      "Apply a few drops to clean dry skin twice daily. Massage gently until absorbed. Use sunscreen during the day.",
    whyBaytsehaPoints: [
      "Gentle herbal formula for all skin types",
      "Helps reduce pigmentation and dark spots effectively",
      "Original and completely safe product",
      "Noticeable results with consistent use",
    ],
    faq: [
      {
        question: "Is it suitable for sensitive skin?",
        answer: "Yes, its gentle herbal formula is designed even for sensitive skin.",
      },
      {
        question: "When will I see results?",
        answer:
          "Results vary, but most users notice improved tone within weeks of regular use.",
      },
    ],
  },
};

/** Extra UI strings not in COPY — homepage, cart, header, etc. */
export const UI_PAIRS: readonly (readonly [string, string])[] = [
  ["بيت الصحة", "Baytseha"],
  ["عودة للأصل", "Return to origin"],
  ["بيت الصحة — أعشاب تليق ببيتك", "Baytseha — Herbs that suit your home"],
  ["بيت الصحة - Baytseha. جميع الحقوق محفوظة.", "© Baytseha. All rights reserved."],
  ["جميع الحقوق محفوظة.", "All rights reserved."],
  ["جميع المنتجات", "All Products"],
  ["تصفّح حسب الحاجة", "Browse by Need"],
  ["ما المشكلة الصحية التي تبحث عنها؟", "What health issue are you looking for?"],
  ["اضغط على الحاجة الأقرب لك لتنتقل إلى تصنيف المنتجات المناسب.", "Tap the need closest to yours to browse the right category."],
  ["كل التصنيفات ←", "All Categories ←"],
  ["المجموعة", "The Collection"],
  ["ليش بيت الصحة؟", "Why Baytseha?"],
  ["روتينك اليومي", "Your Daily Routine"],
  ["بيت الصحة: كوبٌ في يومك يذكّرك أنك تستحق هدوءًا", "Baytseha: A cup in your day that reminds you that you deserve calm"],
  ["لا حاجة لانتظار «الوقت المناسب». أحيانًا يكفي أن تجلس دقيقتين مع بخارٍ يعبق بالأعشاب، فتعود إلى نهضك وأنت أهدأ قليلًا.", "No need to wait for the perfect moment. Sometimes two minutes with herbal steam is enough to return to your day a little calmer."],
  ["اختر الباقة التي تلائم بيتك — لك ولمن تحب — ودع عتبة بيت الصحة تقرّب لك الممارسة اليومية.", "Choose the bundle that fits your home — for you and those you love — and let Baytseha bring daily practice closer."],
  ["تصفَّح المجموعة", "Browse Collection"],
  ["باقات التوفير", "Bundle Offers"],
  ["كلما زادت الباقة، زاد التوفير", "Bigger bundles, bigger savings"],
  ["أسعار الباقات الافتراضية لمعظم الأعشاب — كل منتج له أسعاره على صفحته", "Default bundle prices for most herbs — each product has its own prices on its page"],
  ["ادخل المجموعة ←", "Enter Collection ←"],
  ["ريال", "SAR"],
  ["عبوة", "pack"],
  ["عبوات", "packs"],
  ["عبوة واحدة", "1 pack"],
  ["عبوتان", "2 packs"],
  ["3 عبوات", "3 packs"],
  ["ثلاث عبوات", "3 packs"],
  ["الأكثر توفيراً", "Best Value"],
  ["الأكثر طلباً", "Most Popular"],
  ["للتجربة", "Try One"],
  ["وفّر", "Save"],
  ["وفّر مع باقة 2 أو 3", "Save with 2 or 3 packs"],
  ["تبدأ من", "From"],
  ["عرض المنتج", "View Product"],
  ["✓ دفع عند الاستلام", "✓ Cash on Delivery"],
  ["✓ بدون بطاقة", "✓ No Card Needed"],
  ["✓ توصيل السعودية", "✓ Saudi Delivery"],
  ["💳 الدفع عند الاستلام", "💳 Cash on Delivery"],
  ["🚚 توصيل السعودية", "🚚 Saudi Delivery"],
  ["🌿 طبيعي 100%", "🌿 100% Natural"],
  ["منتجات بيت الصحة — أعشاب طبيعية فاخرة", "Baytseha products — premium natural herbs"],
  ["أعشابٌ كما للبيت", "Herbs as for home"],
  ["نختار المزيج ونوضح المكوّنات وكيفية الشرب — بلا غموضٍ يضيّق عليك.", "We choose the blend, explain ingredients and how to drink — no confusing mystery."],
  ["ثقتك قبل مالك", "Your trust before your money"],
  ["تتأكد من الطلب، ثم تدفع عندما يصلك المندوب — بلا بطاقةٍ ولا ترتيباتٍ جانبية.", "Confirm your order, then pay when the courier arrives — no card or side arrangements."],
  ["من مخازننا إلى رحاب بيتك", "From our warehouse to your home"],
  ["نوصل داخل حدود المملكة؛ عنوانك يُؤكَّد مع فريق بيت الصحة قبل التجهيز.", "We deliver within the Kingdom; your address is confirmed with the Baytseha team before packing."],
  ["صوتٌ يسمَعك", "A voice that listens"],
  ["قبل أن تضغط «اشترِ» وبعد أن يصل الطرد — نجيبك كما يجب أن يُجاب الزائر على باب بيتٍ كريمٍ.", "Before you tap buy and after the parcel arrives — we answer as a guest should be answered at a generous home."],
  ["لحظات العناية اليومية مع بيت الصحة", "Daily care moments with Baytseha"],
  ["بابٌ عشبيٌّ في بيتك… نفتحه لك اليوم", "An herbal door in your home… we open it for you today"],
  ["بيت الصحة يلخّص لك الأعشاب في عبوّاتٍ واضحةٍ وطلبٍ بلا تعقيد — والدفع عندما يقرّب المندوب الطرد منك.", "Baytseha summarizes herbs in clear packs and simple ordering — pay when the courier is near."],
  ["ما الذي يدور في بالك؟", "Frequently Asked Questions"],
  ["سلة التسوق", "Shopping Cart"],
  ["إغلاق السلة", "Close cart"],
  ["اختر منتجًا", "Choose a product"],
  ["منتجاتك المختارة", "Your selected products"],
  ["راجع تفاصيل الباقات قبل إتمام الطلب", "Review bundle details before completing your order"],
  ["الإجمالي", "Total"],
  ["🚚 تأكيد قبل التجهيز", "🚚 Confirmation before packing"],
  ["شامل للتوصيل", "Shipping included"],
  ["دفع عند الاستلام - بدون بطاقة", "Cash on delivery — no card"],
  ["💳 دفع عند الاستلام", "💳 Cash on Delivery"],
  ["💬 دعم قبل وبعد الطلب", "💬 Support before and after your order"],
  ["تواصل معنا على", "Reach us on"],
  ["توصيل لجميع دول الخليج العربي", "Delivery across the GCC"],
  ["الدفع عند الاستلام", "Cash on Delivery"],
  ["أضف", "Add"],
  ["التنقل الرئيسي", "Main navigation"],
  ["فتح القائمة", "Open menu"],
  ["قائمة التنقل", "Navigation menu"],
  ["إغلاق القائمة", "Close menu"],
  ["العملة", "Currency"],
  ["تغيير العملة", "Change currency"],
  ["منتجات شاي عشبية داعمة للعافية اليومية", "Daily wellness herbal tea products"],
  ["بيت الصحة - الصفحة الرئيسية", "Baytseha — Home"],
  ["يرجى تأكيد رقم الجوال", "Please confirm your phone number"],
  ["أدخلي العنوان كاملاً (حي، شارع، مدينة)", "Enter your full address (district, street, city)"],
  ["رقم الجوال غير متطابق", "Phone numbers do not match"],
  ["إغلاق", "Close"],
  ["إجمالي الطلب", "Order Total"],
  ["✓ عرض ترحيب بيت الصحة مفعّل — أسعار الباقات كما هي معروضة", "✓ Baytseha welcome offer active — bundle prices as shown"],
  ["ضمان استرجاع مجاني لمدة 7 أيام", "7-day free return guarantee"],
  ["الاسم الكامل", "Full Name"],
  ["رقم الجوال", "Phone Number"],
  ["تأكيد رقم الجوال", "Confirm Phone Number"],
  ["أعد كتابة رقم الجوال", "Re-enter phone number"],
  ["العنوان الكامل (حي، شارع، مدينة)", "Full Address (district, street, city)"],
  ["مثال: حي النزهة، شارع الأمير محمد، الرياض", "e.g. Al Nuzha District, Prince Mohammed St, Riyadh"],
  ["جاري التأكيد...", "Confirming..."],
  ["جاري تأكيد طلبك...", "Confirming your order..."],
  ["تأكيد الطلب", "Confirm Order"],
  ["خصم 10% — لأنك تستحق البداية", "10% off — because you deserve a start"],
  ["عرض محدود على طلبك الأول", "Limited offer on your first order"],
  ["احصل على الخصم", "Get the discount"],
  ["لا شكرًا", "No thanks"],
  ["مزايا المتجر", "Store benefits"],
  ["تهانينا! ستحصل على هدية مفاجأة مجانية مع طلبك!", "Congratulations! You'll get a free surprise gift with your order!"],
  ["للحصول على هدية مجانية!", "to get a free gift!"],
  ["عند الوصول لـ", "When you reach"],
  ["تحصل على هدية مفاجأة", "you get a surprise gift"],
  ["المتجر غير متاح مؤقتًا لهذا الزائر", "Store temporarily unavailable for this visitor"],
];

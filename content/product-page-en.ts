import type { ProductPageSections } from "@/lib/product-page-copy";
import { COPY_EN } from "@/content/store-en";

export const TEA_SECTIONS_EN: ProductPageSections = {
  empathy: {
    imageAlt: "Your wellness in a cup",
    heading: "A busy day deserves a cup that softens its edge",
    closing:
      "At Baytseha we turn herbs into a routine that can stick with you — no medical promises and no confusion about ingredients. What we promise is an elegant experience from order to first sip.",
  },
  quality: {
    intro:
      "We strive for every Baytseha pack to feel close to an Arab home that cares about the table, water, and calm. Detailed ingredient lists are completed with trusted suppliers and shown when ready — without claiming registrations we cannot document.",
    points: [
      {
        title: "Honest promises",
        desc: "What the Baytseha name on the pack says should match what you receive — so we avoid medical talk before its time.",
      },
      {
        title: "Herbs with an Arab kitchen spirit",
        desc: "We choose a blend you drink and smell, not fear; steady sips matter more than advertising surprises.",
      },
      {
        title: "Continuous improvement",
        desc: "We review packaging and copy with every batch; your WhatsApp feedback reaches a team that speaks your language.",
      },
    ],
    cardTagline: "Our motto is not \"we treat\" — but \"we bring care closer to your guest room\", cup by cup.",
  },
  ingredients: {
    title: "Ingredients chosen with home taste… details coming soon",
    intro:
      "We work with suppliers we trust for an accurate list on every pack. Until then, remember this tea is a companion to a calm day — not a substitute for your doctor's word.",
    imageAlt: "Herbal blend ingredients",
    points: [
      {
        title: "Aromatic variety",
        desc: "We prepare the blend to be gentle on the throat and suitable for consistency, not a bitter surprise abandoned after days.",
      },
      {
        title: "Clarity before drinking",
        desc: "You'll find usage instructions in clear language on the Baytseha pack; any warning or exception will be stated literally.",
      },
      {
        title: "No exaggeration",
        desc: "We won't promise a \"short path\" to a medical result — we promise the first cup will feel expected, not worryingly surprising.",
      },
    ],
  },
  ritual: {
    title: "How do you drink it at home?",
    tip: "Baytseha tip: fix your cup time like you fix work hours — consistency beats intensity. Make it a habit in a quiet corner of your home.",
    imageAlt: "Tea preparation steps",
  },
  disclaimer: COPY_EN.disclaimer,
};

export const SKINCARE_SECTIONS_EN: ProductPageSections = {
  empathy: {
    imageAlt: "Daily skin care",
    heading: "A busy day deserves a moment that restores your skin's calm",
    closing:
      "At Baytseha we choose care that can stick with your routine — no medical promises and no confusion about ingredients. What we promise is an elegant experience from order to first use.",
  },
  quality: {
    intro:
      "We strive for every Baytseha pack to reflect a home that cares about daily care, privacy, and trust. Detailed ingredient lists are completed with trusted suppliers and shown when ready — without claiming registrations we cannot document.",
    points: [
      {
        title: "Honest promises",
        desc: "What the Baytseha name on the pack says should match what you receive — so we avoid medical talk before its time.",
      },
      {
        title: "Natural care spirit",
        desc: "We choose ingredients applied gently to skin, not harsh doses; steady steps matter more than exaggerated promises.",
      },
      {
        title: "Continuous improvement",
        desc: "We review packaging and copy with every batch; your WhatsApp feedback reaches a team that speaks your language.",
      },
    ],
    cardTagline: "Our motto is not \"we treat\" — but \"we bring care closer to your daily routine\", application by application.",
  },
  ingredients: {
    title: "Ingredients chosen with care… details coming soon",
    intro:
      "We work with suppliers we trust for a clear formula on every pack. Until the full list is ready, remember this serum companions your daily routine — not a substitute for a dermatologist.",
    imageAlt: "Axis-Y serum formula",
    points: [
      {
        title: "Gentle on skin",
        desc: "We choose ingredients that let you stay consistent without irritation, not a \"overnight miracle\" that disappoints after days.",
      },
      {
        title: "Clarity before use",
        desc: "You'll find usage instructions in clear language on the Baytseha pack; any warning or exception will be stated literally.",
      },
      {
        title: "No exaggeration",
        desc: "We won't promise \"instant glow\" like hyped products — we promise an elegant routine that builds with you step by step.",
      },
    ],
  },
  ritual: {
    title: "How do you use it in your routine?",
    tip: "Baytseha tip: fix morning and evening application like any important habit — consistency matters more than quantity.",
    imageAlt: "Serum application steps",
  },
  disclaimer:
    "Baytseha skincare products support your daily routine; they are not medicines or a substitute for dermatologist advice. If you take treatment or have a chronic skin condition, ask your specialist before use.",
};

export const PRODUCT_PAGE_UI = {
  ar: {
    chooseOffer: "اختر العرض المناسب لك:",
    socialProof: (count: string) => `+${count} شخص طلبوا — الشحنة الحالية تنفد قريباً`,
    codShort: "💳 الدفع عند الاستلام",
    shippingIncluded: "شامل للتوصيل",
    painIntro:
      "الضغط والقلق على الأكل والوقت الضائع… كلّها تجعل «العناية بنفسك» تبدو كمالًا، وهي ليست كمالًا — هي بقاءٌ في رحمةِ يومك.",
    qualityBadge: "ذوق بيت الصحة",
    qualityHeadline: "نحترم ذكاءك: لا أرقام تفتيش وهمية، ولا أختامٌ لا نملك أصلها",
    homeFirst: "البيت أولاً",
    certNote: "أي تسجيلٍ رسميٍّ أو شهادةٍ تظهر لاحقًا ستُذكر هنا حرفيًا، من غير زيادةٍ في التسويق.",
    certAlt: "شهادات الجودة والاعتماد",
    promisePackagingTitle: "تغليف فاخر يليق بك",
    promisePackagingDesc: "كل طرد يصلك بتغليف أنيق يعكس جودة المنتج — لأن التجربة تبدأ قبل الفتح.",
    promiseDeliveryTitle: "توصيل سريع لباب بيتك",
    promiseDeliveryDesc: "نوصّل داخل المملكة العربية السعودية — الدفع عند الاستلام.",
    promiseCodTitle: "الدفع عند الاستلام",
    promiseCodDesc: "لا تدفع ولا ريال قبل ما يوصلك المنتج — ثقة كاملة من البداية.",
    promisePackagingAlt: "تغليف فاخر",
    promiseDeliveryAlt: "توصيل سريع",
    promiseCodAlt: "الدفع عند الاستلام",
    simpleSteps: "خطوات بسيطة",
    dailyRoutine: "الروتين اليومي",
    closingHeadline: "إن رضيتَ عن القراءة، فالخطوة التالية من باب بيت الصحة",
    closingSub:
      "اختر باقتك أدناه؛ سنؤكد معك الطلب قبل الشحن. الدفع لا يُستحق إلا عندما يقف المندوب أمامك.",
    bundleTitle: "الباقة (الدفع عند الاستلام)",
    addToCart: "أضِف إلى سلّتي",
    faqHeadline: "سألت… وأجاب بيت الصحة",
    faqSub: "جمعنا أسئلةً تتكرر، بلسانٍ واضحٍ بلا تزيينٍ في المعنى",
    relatedHeadline: "قد يهمّك من أرصفة بيت الصحة الأخرى",
    imageN: (n: number) => `صورة ${n}`,
    chooseBundle: "اختر الباقة",
    packAlt: (n: number) => `${n} عبوة`,
    save: "وفّر",
  },
  en: {
    chooseOffer: "Choose the offer that fits you:",
    socialProof: (count: string) => `+${count} people ordered — current batch selling out soon`,
    codShort: "💳 Cash on Delivery",
    shippingIncluded: "Shipping included",
    painIntro:
      "Stress, rushed meals, and lost time make self-care feel like a luxury — but it isn't luxury, it's how you survive your day with grace.",
    qualityBadge: "Baytseha taste",
    qualityHeadline: "We respect your intelligence: no fake inspection numbers, no seals we don't own",
    homeFirst: "Home first",
    certNote: "Any official registration or certificate that appears later will be stated here literally, without marketing inflation.",
    certAlt: "Quality and certification badges",
    promisePackagingTitle: "Premium packaging worthy of you",
    promisePackagingDesc: "Every parcel arrives in elegant packaging that reflects product quality — the experience starts before opening.",
    promiseDeliveryTitle: "Fast delivery to your door",
    promiseDeliveryDesc: "We deliver within Saudi Arabia — cash on delivery.",
    promiseCodTitle: "Cash on Delivery",
    promiseCodDesc: "You don't pay a riyal until the product reaches you — full trust from the start.",
    promisePackagingAlt: "Premium packaging",
    promiseDeliveryAlt: "Fast delivery",
    promiseCodAlt: "Cash on Delivery",
    simpleSteps: "Simple steps",
    dailyRoutine: "Daily routine",
    closingHeadline: "If you're satisfied with what you read, the next step is through Baytseha's door",
    closingSub:
      "Choose your bundle below; we'll confirm with you before shipping. Payment is only due when the courier stands at your door.",
    bundleTitle: "Bundle (Cash on Delivery)",
    addToCart: "Add to my cart",
    faqHeadline: "You asked… Baytseha answered",
    faqSub: "Frequently asked questions in plain language, without dressing up the meaning",
    relatedHeadline: "You may also like from other Baytseha shelves",
    imageN: (n: number) => `Image ${n}`,
    chooseBundle: "Choose bundle",
    packAlt: (n: number) => `${n} pack${n > 1 ? "s" : ""}`,
    save: "Save",
  },
} as const;

export const PAGE_UI = {
  ar: {
    aboutStoryTitle: "قصتنا",
    aboutStoryExtra: "التجربة مو مجرد شاي. هي وضوح بالمكونات، شرح للاستخدام، تغليف مرتب، ودعم قبل وبعد الطلب.",
    aboutIllustration: "صورة توضيحية",
    aboutQualityTitle: "وعدنا بالجودة",
    aboutQuality1: "✅ نتحقق من الموردين قبل تبنّي أي منتج.",
    aboutQuality2: "✅ نراجع التغليف والمواصفات بشكل دوري.",
    aboutQuality3: "✅ نستمع لملاحظات العملاء ونُحسّن المنتجات باستمرار.",
    aboutQuality4: "✅ لا ندّعي تأثيرات طبية غير مؤكدة أو غير موثقة.",
    aboutCta: "اكتشف المجموعة",
    collectionsBrowseTitle: "تصفّح حسب الحاجة الصحية",
    collectionsBrowseSub: "اختر التصنيف الأقرب لاحتياجك، ثم تصفح المنتجات داخل كل تصنيف.",
    collectionsAllCategories: "عرض كل التصنيفات ←",
    collectionsFaq: "أسئلة شائعة",
    categoriesHeroTitle: "اختر حسب حاجتك الصحية",
    categoriesHeroSub:
      "تصنيفات بيت الصحة مرتبة حسب الاحتياج اليومي — اختر التصنيف الأقرب لك، ثم تصفح المنتجات المتوفرة فيه.",
    categoriesBrowse: "تصفح التصنيف ←",
    reviewsMarqueeSub:
      "لمحاتٌ من ناسٍ جرّبوا روتينًا عشبيًا هادئًا — كلماتهم عن التجربة، لا عن نتائجٍ طبيةٍ نعد بها.",
    thankYouProducts: "المنتجات في طلبك:",
    thankYouTotal: "الإجمالي",
    thankYouStep1Title: "تأكيد الطلب",
    thankYouStep1Desc: "سيتواصل معك فريق بيت الصحة خلال ساعات قليلة لتأكيد عنوانك",
    thankYouStep2Title: "التجهيز والشحن",
    thankYouStep2Desc: "نجهّز طلبك بعناية ونشحنه إلى عنوانك داخل المملكة",
    thankYouStep3Title: "الاستلام والدفع",
    thankYouStep3Desc: (cod: string) => `${cod} — ادفع فقط عند استلام الطرد`,
    thankYouContact:
      "ستتواصل معك موظفتنا بين الساعة 9 صباحًا و 9 مساءً للإجابة على جميع استفساراتك قبل الشحن",
    thankYouDeliveryKsa: "توصيل داخل المملكة",
    thankYouReturn: "ضمان استرجاع مجاني 7 أيام",
    thankYouArabicTeam: "فريق يجيبك بالعربي",
    thankYouCrossSellBadge: "أكمل روتينك",
    thankYouCrossSellTitle: "رُفوفٌ أخرى في بيت الصحة قد تُكمل يومك",
    thankYouCrossSellSub: "اختر ما يناسبك — لا إلزام ولا ضغط",
    thankYouBrowseProduct: "تصفّح المنتج ←",
  },
  en: {
    aboutStoryTitle: "Our story",
    aboutStoryExtra:
      "The experience is more than tea. It's clear ingredients, usage instructions, neat packaging, and support before and after your order.",
    aboutIllustration: "Illustration",
    aboutQualityTitle: "Our quality promise",
    aboutQuality1: "✅ We verify suppliers before adopting any product.",
    aboutQuality2: "✅ We review packaging and specs regularly.",
    aboutQuality3: "✅ We listen to customer feedback and keep improving.",
    aboutQuality4: "✅ We don't claim unverified medical effects.",
    aboutCta: "Discover the collection",
    collectionsBrowseTitle: "Browse by health need",
    collectionsBrowseSub: "Choose the category closest to your need, then browse products inside it.",
    collectionsAllCategories: "View all categories ←",
    collectionsFaq: "Frequently Asked Questions",
    categoriesHeroTitle: "Choose by your health need",
    categoriesHeroSub:
      "Baytseha categories organized by daily need — choose the closest category, then browse products inside it.",
    categoriesBrowse: "Browse category ←",
    reviewsMarqueeSub:
      "Stories from people who tried a calm herbal routine — in their own words, not medical results we promise.",
    thankYouProducts: "Products in your order:",
    thankYouTotal: "Total",
    thankYouStep1Title: "Order confirmation",
    thankYouStep1Desc: "The Baytseha team will contact you within a few hours to confirm your address",
    thankYouStep2Title: "Preparation & shipping",
    thankYouStep2Desc: "We carefully prepare your order and ship it to your address in the Kingdom",
    thankYouStep3Title: "Delivery & payment",
    thankYouStep3Desc: (cod: string) => `${cod} — pay only when you receive the parcel`,
    thankYouContact:
      "Our team will contact you between 9 AM and 9 PM to answer all your questions before shipping",
    thankYouDeliveryKsa: "Delivery within the Kingdom",
    thankYouReturn: "7-day free return guarantee",
    thankYouArabicTeam: "Team that answers in Arabic",
    thankYouCrossSellBadge: "Complete your routine",
    thankYouCrossSellTitle: "Other Baytseha shelves may complete your day",
    thankYouCrossSellSub: "Choose what suits you — no obligation, no pressure",
    thankYouBrowseProduct: "Browse product ←",
  },
} as const;

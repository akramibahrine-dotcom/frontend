export type ImageTheme = "weight" | "colon" | "hemorrhoid" | "liver" | "lung" | "prostate" | "womens-health" | "herbal-skin" | "scar-gel" | "c60-fullerene";

export type BundleOffer = {
  quantity: number;
  priceSar: number;
  badgeAr: string;
  labelAr: string;
  priceOverrides?: Partial<Record<string, number>>;
};

export const BUNDLE_OFFERS: readonly BundleOffer[] = [
  { quantity: 3, priceSar: 349, badgeAr: "الأكثر توفيراً", labelAr: "ثلاث عبوات" },
  { quantity: 2, priceSar: 279, badgeAr: "الأكثر طلباً", labelAr: "عبوتان" },
  { quantity: 1, priceSar: 199, badgeAr: "للتجربة", labelAr: "عبوة واحدة" },
] as const;

export const UPSELL_PRICE_SAR = 99;

export type FAQItem = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  nameAr: string;
  shortNameAr: string;
  headlineAr: string;
  subheadlineAr: string;
  concernAr: string;
  painAwareAr: string;
  imageTheme: ImageTheme;
  upsellProductId: string;
  crossSellProductIds: string[];
  faq: FAQItem[];
  ritualAr: string;
  whyBaytsehaPoints: string[];
  images: string[];
  imageSection2?: string;
  imageSection4?: string;
  imageIngredients?: string;
  imagePromisePackaging?: string;
  imagePromiseDelivery?: string;
  imagePromiseCod?: string;
  imageRitual?: string;
  imageCertificates?: string;
  imageSecondaryCertificates?: string;
  /** Image shown above the bottom/closing offer block */
  imageClosingOffer?: string;
  offerImages?: Record<number, string>;
  bundleOffers?: readonly BundleOffer[];
};

export const PRODUCTS: Product[] = [
  {
    id: "weight-support-tea",
    slug: "weight-support-tea",
    sku: "BAYT-WST-001",
    nameAr: "شاي الأعشاب للتخسيس الطبيعي",
    shortNameAr: "شاي مرافقة الوزن",
    headlineAr: "تخلّص من الوزن الزائد — الحل الطبيعي الذي ينتظره جسمك",
    subheadlineAr:
      "خلطة عشبية تُشرب كنقطة استراحة بين وجبتك وحركتك — بيت الصحة يقدّمها كروتين داعم مع أكلٍ متوازنٍ وعاداتٍ لطيفة.",
    concernAr: "حل لمشاكل الوزن و سرعة التخسيس",
    painAwareAr:
      "أحيانًا العقبة مو الحماس، إنما الاستمرار. جعلنا هذا المزيج خفيفًا على الحلق وعلى يومك، ليسهل أن يثبت معك.",
    imageTheme: "weight",
    images: ["/products/weight-support-tea/1.jpg", "/products/weight-support-tea/2.jpg", "/products/weight-support-tea/3.jpg"],
    imageSection2: "/products/weight-support-tea/2.jpg",
    imageSection4: "/products/weight-support-tea/3.jpg",
    imagePromisePackaging: "/products/weight-support-tea/1.jpg",
    imagePromiseDelivery: "/products/weight-support-tea/2.jpg",
    imagePromiseCod: "/products/weight-support-tea/3.jpg",
    imageRitual: "/products/weight-support-tea/1.jpg",
    offerImages: {
      1: "/products/weight-support-tea/1.jpg",
      2: "/products/weight-support-tea/2.jpg",
      3: "/products/weight-support-tea/3.jpg",
    },
    upsellProductId: "colon-comfort-tea",
    crossSellProductIds: ["colon-comfort-tea", "liver-wellness-tea"],
    ritualAr:
      "كوبٌ واحد صباحًا أو مساءً، مع نومٍ وأكلٍ يعرفك. إن كان لديك خطة علاج، سلٍ مختصّك قبل التجربة.",
    whyBaytsehaPoints: [
      "خلطات نعبّئها كما نودّ أن تُعبَّأ لهدايا بيتنا",
      "من جوالك إلى بابك — بلا تعطيل يومك",
      "ادفع عندما يمسك المندوب الطرد",
      "نجيبك بعد الطلب كما نكون معك عند الاستفسار",
    ],
    faq: [
      {
        question: "هل هذا الشاي «يحرق» الدهون؟",
        answer:
          "لا. هذا الشاي مُصمّم لدعم روتينك اليومي وإدارة الوزن ضمن نمط حياة متوازن — وليس علاجًا أو وعدًا بنتائج مضمونة. التجربة تختلف من شخص لآخر.",
      },
      {
        question: "متى أشربه؟",
        answer: "كوبٌ واحد في وقتٍ ثابت يوميًا، واتبع ما يذكر على عبوة بيت الصحة.",
      },
      {
        question: "هل يصلح مع أدويتي؟",
        answer:
          "الأعشاب قد تتفاعل مع الأدوية. إن كنت مشخصًا أو تتناول علاجًا، راجع طبيبك قبل الاستمرار.",
      },
      {
        question: "كيف يصلني الطلب؟",
        answer:
          "نوصّل داخل المملكة العربية السعودية — دفعك عندما يصلك الطلب.",
      },
    ],
  },
  {
    id: "bloom-coffee",
    slug: "bloom-coffee",
    sku: "CopAffCoffeeBloom",
    nameAr: "قهوة بلوم لفقدان الوزن وصحة الجهاز الهضمي",
    shortNameAr: "قهوة بلوم",
    headlineAr: "قهوة يومية تدعم وزنك… وتهدّئ جهازك الهضمي",
    subheadlineAr:
      "خلطة قهوة بلوم من بيت الصحة — طعم غني وروتين بسيط يرافقك في إدارة الوزن ودعم الهضم ضمن نمط حياة متوازن.",
    concernAr: "فقدان الوزن وصحة الجهاز الهضمي",
    painAwareAr:
      "أحيانًا الثقل بعد الأكل والوزن الزائد يسرقان راحتك. قهوة بلوم صُممت لتكون لحظة يومية خفيفة تساعدك تستمر — بدون تعقيد وبدون وعود مبالغ فيها.",
    imageTheme: "weight",
    // Carousel = 3 images; 3.jpg first (hero), then 1, 2
    images: [
      "/products/bloom-coffee/3.jpg",
      "/products/bloom-coffee/1.jpg",
      "/products/bloom-coffee/2.jpg",
    ],
    imageSection2: "/products/bloom-coffee/4.jpg",
    imageSection4: "/products/bloom-coffee/6.jpg",
    imageIngredients: "/products/bloom-coffee/6.jpg",
    imagePromisePackaging: "/products/bloom-coffee/7.jpg",
    imagePromiseDelivery: "/products/bloom-coffee/8.jpg",
    imagePromiseCod: "/products/bloom-coffee/9.jpg",
    imageRitual: "/products/bloom-coffee/5.jpg",
    imageCertificates: "/products/bloom-coffee/11.jpg",
    imageClosingOffer: "/products/bloom-coffee/12.jpg",
    // Same product pack shot for every offer row
    offerImages: {
      1: "/products/bloom-coffee/1.jpg",
      2: "/products/bloom-coffee/1.jpg",
      3: "/products/bloom-coffee/1.jpg",
    },
    bundleOffers: [
      { quantity: 3, priceSar: 349, badgeAr: "الأكثر توفيراً", labelAr: "ثلاث عبوات", priceOverrides: { OMR: 29 } },
      { quantity: 2, priceSar: 279, badgeAr: "الأكثر طلباً", labelAr: "عبوتان", priceOverrides: { OMR: 21 } },
      { quantity: 1, priceSar: 199, badgeAr: "للتجربة", labelAr: "عبوة واحدة", priceOverrides: { OMR: 13 } },
    ],
    upsellProductId: "weight-support-tea",
    crossSellProductIds: ["weight-support-tea", "colon-comfort-tea"],
    ritualAr:
      "كوب واحد صباحًا أو بعد الوجبة، بحرارة معتدلة. إن كنت حساسًا للكافيين أو لديك خطة علاج، راجع مختصّك قبل الاستمرار.",
    whyBaytsehaPoints: [
      "قهوة بلوم بطعم غني وروتين يومي سهل الالتزام",
      "تدعم إدارة الوزن وراحة الجهاز الهضمي معًا",
      "تغليف أنيق وشحن لكل دول الخليج",
      "ادفع عند الاستلام — بلا بطاقة",
    ],
    faq: [
      {
        question: "هل قهوة بلوم بديل عن الرجيم والرياضة؟",
        answer:
          "لا. قهوة بلوم مرافقة لروتينك اليومي ضمن أكل متوازن وحركة مناسبة — وليست علاجًا أو وعدًا بنتائج مضمونة.",
      },
      {
        question: "متى أشربها؟",
        answer: "كوب واحد في وقت ثابت يوميًا، ويفضّل صباحًا أو بعد الوجبة حسب تحملك للكافيين.",
      },
      {
        question: "هل تناسب الجهاز الهضمي الحساس؟",
        answer:
          "صُممت لدعم راحة الهضم بشكل لطيف. إن كنت تعاني من حالة هضمية مشخصة، استشر طبيبك قبل الاستخدام.",
      },
      {
        question: "كيف يصلني الطلب؟",
        answer: "نوصّل لجميع دول الخليج — والدفع عند الاستلام.",
      },
    ],
  },
  {
    id: "colon-comfort-tea",
    slug: "colon-comfort-tea",
    sku: "BAYT-CCT-002",
    nameAr: "شاي عشبي من بيت الصحة لأيامٍ أهدأ مع البطن والغازات",
    shortNameAr: "شاي راحة البطن",
    headlineAr: "بعد الأكل… كوبٌ يلطّف معدتك ويعيدك لهدوءك",
    subheadlineAr:
      "مزيجٌ يوميٌّ للاسترخاء الهضمي — بلا مبالغة؛ نكتب لك الاستخدام بشفافية كما نكتبه لأهل بيتنا.",
    concernAr: "راحة القولون والغازات",
    painAwareAr:
      "الضغط والسفر والوجبات الثقيلة تَثقل البطن حتى يضيق صدرك. جئنا بخلطة دافئة تُذكّرك أن العناية تبدأ بكوبٍ منتظم.",
    imageTheme: "colon",
    images: ["/products/colon-comfort-tea/1.jpg", "/products/colon-comfort-tea/2.jpg", "/products/colon-comfort-tea/3.jpg"],
    imageSection2: "/products/colon-comfort-tea/2.jpg",
    imageSection4: "/products/colon-comfort-tea/3.jpg",
    imagePromisePackaging: "/products/colon-comfort-tea/1.jpg",
    imagePromiseDelivery: "/products/colon-comfort-tea/2.jpg",
    imagePromiseCod: "/products/colon-comfort-tea/3.jpg",
    imageRitual: "/products/colon-comfort-tea/1.jpg",
    offerImages: {
      1: "/products/colon-comfort-tea/1.jpg",
      2: "/products/colon-comfort-tea/2.jpg",
      3: "/products/colon-comfort-tea/3.jpg",
    },
    upsellProductId: "liver-wellness-tea",
    crossSellProductIds: ["weight-support-tea", "hemorrhoid-comfort-tea"],
    ritualAr:
      "كوبٌ بعد الوجبة الغنية، دافئًا قدر الإمكان، ضمن روتينك. الماءُ والأليافُ رفيقان لهذا الكوب.",
    whyBaytsehaPoints: [
      "أعشاب نختارها لسكونٍ يوميٍّ لا لصخبٍ إعلاني",
      "خصوصية تغليف — ما نعرّضك لحرج",
      "الدفع رسالة اطمئنان عند بابك",
      "فريقٌ يتكلم العربية التي تفهمها",
    ],
    faq: [
      {
        question: "هل يعالج القولون العصبي؟",
        answer:
          "لا. نقدّمه لراحة يومية مريحة ضمن نمط حياتك؛ التشخيص والعلاج من اختصاص الطبيب.",
      },
      {
        question: "هل للاستخدام اليومي؟",
        answer: "صُمم لأيامٍ متتابعة ضمن تعليمات العبوة، مع مراعاة ماءٍ كافٍ ونومٍ معقول.",
      },
      {
        question: "كيف أطلب؟",
        answer: "اختر باقتك، أدخل بياناتك، وسيتواصل معك بيت الصحة قبل إغلاق الطلب — والدفع عند الاستلام.",
      },
    ],
  },
  {
    id: "hemorrhoid-comfort-tea",
    slug: "hemorrhoid-comfort-tea",
    sku: "BAYT-HCT-003",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة الراحة اليومية مع البواسير",
    shortNameAr: "شاي مرافقة البواسير",
    headlineAr: "للمواضيع الحسّاسة — طلبٌ بهدوء وطردٌ بلا إحراج",
    subheadlineAr:
      "خلطة داعمة لعافية يومك، مع تجربة شراء نحترم فيها خصوصيتك من الطلب حتى التغليف.",
    concernAr: "راحة يومية مع البواسير",
    painAwareAr:
      "بعض الاحتياجات لا تحتاج خطبة. نكتفي أن نضع بين يديك روتينًا عشبيًا بسيطًا، ونترك الطبيب لحديث المسارات العلاجية.",
    imageTheme: "hemorrhoid",
    images: ["/products/hemorrhoid-comfort-tea/1.jpg", "/products/hemorrhoid-comfort-tea/2.jpg", "/products/hemorrhoid-comfort-tea/3.jpg"],
    imageSection2: "/products/hemorrhoid-comfort-tea/2.jpg",
    imageSection4: "/products/hemorrhoid-comfort-tea/3.jpg",
    imagePromisePackaging: "/products/hemorrhoid-comfort-tea/1.jpg",
    imagePromiseDelivery: "/products/hemorrhoid-comfort-tea/2.jpg",
    imagePromiseCod: "/products/hemorrhoid-comfort-tea/3.jpg",
    imageRitual: "/products/hemorrhoid-comfort-tea/1.jpg",
    offerImages: {
      1: "/products/hemorrhoid-comfort-tea/1.jpg",
      2: "/products/hemorrhoid-comfort-tea/2.jpg",
      3: "/products/hemorrhoid-comfort-tea/3.jpg",
    },
    upsellProductId: "colon-comfort-tea",
    crossSellProductIds: ["colon-comfort-tea", "liver-wellness-tea"],
    ritualAr:
      "كوبٌ يومي مع ماءٍ وفير وأليافٍ في طعامك؛ استشر مختصّك إن استمرّ الألم أو زاد.",
    whyBaytsehaPoints: [
      "تغليفٌ لا يفضح محتواه بين جيرانك",
      "تأكيدٌ واتسّابٌ بأسلوبٍ مهذّب",
      "لا دفع إلا عندما يمسك الطرد مندوبنا",
      "بيت الصحة — اسمٌ نحمله قبل أن نبيع",
    ],
    faq: [
      {
        question: "هل يشفّي البواسير؟",
        answer:
          "لا. منتج عشبي لراحة يومك؛ الألم المستمر أو النزف يستوجب طبيبًا مباشرة.",
      },
      {
        question: "هل الطرد يوضّح المحتوى؟",
        answer:
          "لا، نراعي تغليفًا محايدًا قدر الإمكان — التفاصيل في سياسة الشحن.",
      },
    ],
  },
  {
    id: "liver-wellness-tea",
    slug: "liver-wellness-tea",
    sku: "BAYT-LWT-004",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة صحة الكبد في يومك",
    shortNameAr: "شاي مرافقة الكبد",
    headlineAr: "كوبٌ صباحيٌّ ينسّق يومك مع حركتك ومائك",
    subheadlineAr:
      "أعشابٌ تُتجرّب كنمطٍ هادئٍ بجانب نومك ومائك — بيت الصحة يقدّمها كعادةٍ بسيطة لا كبديل دوائي.",
    concernAr: "مرافقة عافية الكبد",
    painAwareAr:
      "الكبد يحتاج هدوءًا في الأكل والوقت، نحن نضيف له كوبًا دافئًا من دون أن نزعم أنه يعالج مرضًا.",
    imageTheme: "liver",
    images: ["/products/liver-wellness-tea/1.jpg", "/products/liver-wellness-tea/2.jpg", "/products/liver-wellness-tea/3.jpg"],
    imageSection2: "/products/liver-wellness-tea/2.jpg",
    imageSection4: "/products/liver-wellness-tea/3.jpg",
    imagePromisePackaging: "/products/liver-wellness-tea/1.jpg",
    imagePromiseDelivery: "/products/liver-wellness-tea/2.jpg",
    imagePromiseCod: "/products/liver-wellness-tea/3.jpg",
    imageRitual: "/products/liver-wellness-tea/1.jpg",
    offerImages: {
      1: "/products/liver-wellness-tea/1.jpg",
      2: "/products/liver-wellness-tea/2.jpg",
      3: "/products/liver-wellness-tea/3.jpg",
    },
    upsellProductId: "weight-support-tea",
    crossSellProductIds: ["weight-support-tea", "colon-comfort-tea"],
    ritualAr:
      "كوبٌ قبل الإفطار أو بعد الغداء — بانتظامٍ مع ماءٍ كافٍ؛ راجع مختصّك إن كنت على أدوية كبد.",
    whyBaytsehaPoints: [
      "وضوحٌ بكلمة عربيةٍ فصيحةٍ وبليغة",
      "لا نلتف على «الاستخدام الموصى»",
      "طلبٌ واحد يكفي ليبدأ روتينك",
      "داخل المملكة — نخدمك حيثما وُجدت",
    ],
    faq: [
      {
        question: "هل يعالج أمراض الكبد؟",
        answer:
          "لا مطلقًا. شاي عشبي لدعم يومك ضمن نمط صحي؛ الفحص والعلامات المرضية للطبيب.",
      },
      {
        question: "مع الأدوية؟",
        answer: "لا تخلط دون استشارة — الأعشاب ليست معصومة من التفاعلات.",
      },
    ],
  },
  {
    id: "lung-smoking-support-tea",
    slug: "lung-smoking-support-tea",
    sku: "BAYT-LST-005",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة الصدر والنفس في أيام التقليل عن التدخين",
    shortNameAr: "شاي مرافقة الصدر",
    headlineAr: "خطوة عطريةٌ بجانب قرارٍ أكبر عن تدخينك",
    subheadlineAr:
      "كوبٌ دافئٌ يصحبك وأنت تقلّل السجائر — لا يُغني عن برامج الإقلاع الطبية، بل يرافق يومك بلينٍ.",
    concernAr: "مرافقة الصدر وآثار التدخين",
    painAwareAr:
      "كلُّ خطوةٍ كبيرةٍ تبدأ بخطوةٍ صغيرة — نمنحك جلسةً عشبيةً خفيفةً تذكّرك أنك بدأت تهتمّ بنفسك، من دون وعودٍ بإقلاعٍ سحري.",
    imageTheme: "lung",
    images: ["/products/lung-smoking-support-tea/1.jpg", "/products/lung-smoking-support-tea/2.jpg", "/products/lung-smoking-support-tea/3.jpg"],
    imageSection2: "/products/lung-smoking-support-tea/2.jpg",
    imageSection4: "/products/lung-smoking-support-tea/3.jpg",
    imagePromisePackaging: "/products/lung-smoking-support-tea/1.jpg",
    imagePromiseDelivery: "/products/lung-smoking-support-tea/2.jpg",
    imagePromiseCod: "/products/lung-smoking-support-tea/3.jpg",
    imageRitual: "/products/lung-smoking-support-tea/1.jpg",
    offerImages: {
      1: "/products/lung-smoking-support-tea/1.jpg",
      2: "/products/lung-smoking-support-tea/2.jpg",
      3: "/products/lung-smoking-support-tea/3.jpg",
    },
    upsellProductId: "liver-wellness-tea",
    crossSellProductIds: ["liver-wellness-tea", "colon-comfort-tea"],
    ritualAr:
      "كوبٌ صباحيٌّ منتظم؛ الإقلاع الحقيقي قرارٌ مع طبيبٍ أو عيادة تدخين — هذا الكوب مرافقٌ فقط.",
    whyBaytsehaPoints: [
      "لسنا عيادة — نحن بيتٌ للروتين",
      "طعمٌ هادئٌ يسهّل الالتزام",
      "دفعٌ عند الاستلام يزيل حيرة السلة",
      "نجيب على أسئلتك بلا مبارزة",
    ],
    faq: [
      {
        question: "هل يخلّيني أبطل التدخين؟",
        answer:
          "لا. يرافق يومك عشبيًا؛ الإقلاع يحتاج خطة صحية، وليس إعلانًا.",
      },
      {
        question: "هل له أضرار؟",
        answer:
          "قد يتفاعل مع أدويتك؛ اسأل طبيبك إن كنت تعاني ضيقًا مزمنًا في الصدر.",
      },
    ],
  },
  {
    id: "prostate-wellness-tea",
    slug: "prostate-wellness-tea",
    sku: "BAYT-PWT-006",
    nameAr: "شاي عشبي من بيت الصحة لمرافقة رجلٍ يهتمّ بصحّته اليومية",
    shortNameAr: "شاي مرافقة البروستات",
    headlineAr: "هدوءُ روتينٍ يوميٍّ للرجل الذي يتابع نفسه",
    subheadlineAr:
      "مزيجٌ عشبيٌّ لمزاجٍ رتيبٍ في يومك — طلبٌ خاص، وتسليمٌ لباب بيتك، مع تذكيرٍ أنّ المتابعة الطبية خطٌ أحمر.",
    concernAr: "مرافقة عافية البروستات",
    painAwareAr:
      "العناية الذكية لا تُؤجّل. بيت الصحة يسّهل لك الخطوة العشبية، ويترك التشخيص لأهل الاختصاص.",
    imageTheme: "prostate",
    images: ["/products/prostate-wellness-tea/1.jpg", "/products/prostate-wellness-tea/2.jpg", "/products/prostate-wellness-tea/3.jpg"],
    imageSection2: "/products/prostate-wellness-tea/2.jpg",
    imageSection4: "/products/prostate-wellness-tea/3.jpg",
    imagePromisePackaging: "/products/prostate-wellness-tea/1.jpg",
    imagePromiseDelivery: "/products/prostate-wellness-tea/2.jpg",
    imagePromiseCod: "/products/prostate-wellness-tea/3.jpg",
    imageRitual: "/products/prostate-wellness-tea/1.jpg",
    offerImages: {
      1: "/products/prostate-wellness-tea/1.jpg",
      2: "/products/prostate-wellness-tea/2.jpg",
      3: "/products/prostate-wellness-tea/3.jpg",
    },
    upsellProductId: "liver-wellness-tea",
    crossSellProductIds: ["liver-wellness-tea", "lung-smoking-support-tea"],
    ritualAr:
      "كوبٌ يوميٌّ مع نشاطٍ معتدلٍ وماءٍ؛ أي ألمٍ أو تغيّرٍ في التبوّل يستدعي طبيبًا فورًا.",
    whyBaytsehaPoints: [
      "خصوصيةٌ في المعاملة والتغليف",
      "لغةٍ رجاليةٍ بلا تهويلٍ أخضر",
      "الدفع عند الاستلام — راحة قرار",
      "ندعمك أثناء الطلب كما بعده",
    ],
    faq: [
      {
        question: "هل يعالج التهاب البروستات؟",
        answer:
          "لا. شايٌ لدعم يومك؛ الألم والحرارة والخلل في التبوّل طبيٌّ بحت.",
      },
      {
        question: "كيف أطلب بسرعة؟",
        answer: "اسمٌ وجوالٌ وتأكيدٌ عبرنا — ثم يصلك الطرد باسم بيت الصحة.",
      },
    ],
  },
  {
    id: "fertility-tea",
    slug: "fertility-tea",
    sku: "BAYT-FTT-007",
    nameAr: "شاي الخصوبة الجنسية من بيت الصحة",
    shortNameAr: "شاي Fertility",
    headlineAr: "دعم طبيعي لرحلة الخصوبة وصحة المرأة",
    subheadlineAr:
      "مزيج عشبي دافئ لمرافقة صحة المرأة ودعم الخصوبة، ضمن نمط حياة متوازن.",
    concernAr: "دعم صحة الأنثى والخصوبة",
    painAwareAr:
      "رحلة الخصوبة قد تكون مليئة بالضغوط. صممنا هذا المزيج ليكون لحظة هدوء وعناية يومية لكِ، بمكونات طبيعية تُلائم طبيعة جسمك.",
    imageTheme: "womens-health",
    images: [
      "/products/fertility-tea/4.jpg",
      "/products/fertility-tea/5.jpg",
      "/products/fertility-tea/6.jpg",
    ],
    imageSection2: "/products/fertility-tea/section2-new.jpg",
    imageSection4: "/products/fertility-tea/section4-new.jpg",
    imagePromisePackaging: "/products/fertility-tea/promise-pkg-fertility-v3.jpg",
    imagePromiseDelivery: "/products/fertility-tea/promise-del-fertility-v3.jpg",
    imagePromiseCod: "/products/fertility-tea/promise-cod-fertility-v3.jpg",
    imageRitual: "/products/fertility-tea/ritual-new.png",
    imageCertificates: "/products/fertility-tea/certificates.png",
    upsellProductId: "",
    crossSellProductIds: ["axis-y-serum", "weight-support-tea"],
    bundleOffers: [
      { quantity: 3, priceSar: 449, badgeAr: "الأكثر توفيراً", labelAr: "ثلاث عبوات" },
      { quantity: 2, priceSar: 349, badgeAr: "الأكثر طلباً", labelAr: "عبوتان" },
      { quantity: 1, priceSar: 229, badgeAr: "للتجربة", labelAr: "عبوة واحدة" },
    ],
    ritualAr:
      "كوبٌ دافئ يومياً يرافق لحظات استرخائك. يُنصح باستشارة طبيبتك إذا كنتِ تتابعين خطة علاجية للخصوبة.",
    whyBaytsehaPoints: [
      "أعشاب طبيعية مختارة بعناية لدعم صحة المرأة",
      "تغليف يحفظ الخصوصية ويصلك لباب بيتك",
      "الدفع عند الاستلام بكل راحة وأمان",
      "فريق دعم للإجابة على استفساراتك"
    ],
    offerImages: {
      1: "/products/fertility-tea/offer-1.png",
      2: "/products/fertility-tea/offer-2.png",
      3: "/products/fertility-tea/offer-3.png",
    },
    faq: [
      {
        question: "هل يساعد هذا الشاي على الحمل؟",
        answer:
          "هذا الشاي مُصمم لدعم صحة الأنثى والخصوبة بشكل طبيعي كجزء من نمط حياة صحي، ولا يُعتبر علاجاً طبياً أو بديلاً عن الاستشارة الطبية المتخصصة.",
      },
      {
        question: "هل يمكنني شربه أثناء الدورة الشهرية؟",
        answer: "نعم، مكوناته الطبيعية الدافئة قد تساعد في تخفيف الانزعاج المرافق للدورة الشهرية.",
      },
    ],
  },
  {
    id: "axis-y-serum",
    slug: "axis-y-serum",
    sku: "BAYT-SKN-001",
    nameAr: "سيروم اكسس واي لتصحيح البقع",
    shortNameAr: "سيروم اكسس واي",
    headlineAr: "إشراقة طبيعية وبشرة موحدة اللون",
    subheadlineAr:
      "سيروم عشبي مصمم خصيصاً لتصحيح البقع الداكنة وتوحيد لون البشرة بفضل مكوناته الطبيعية.",
    concernAr: "توحيد لون البشرة وتصحيح البقع",
    painAwareAr:
      "البقع الداكنة والتصبغات قد تؤثر على ثقتك بنفسك. سيروم اكسس واي يقدم لك الحل العشبي اللطيف لبشرة أكثر إشراقاً وتجانساً.",
    imageTheme: "herbal-skin",
    images: [
      "/products/axis-y-serum/1.webp",
      "/products/axis-y-serum/hero.png",
      "/products/axis-y-serum/section2.jpg",
    ],
    imageSection2: "/products/axis-y-serum/section2.jpg",
    imageSection4: "/products/axis-y-serum/1.webp",
    imagePromisePackaging: "/products/axis-y-serum/promise-pkg-serum.jpg",
    imagePromiseDelivery: "/products/axis-y-serum/promise-del-serum.jpg",
    imagePromiseCod: "/products/axis-y-serum/promise-cod-serum.jpg",
    imageRitual: "/products/axis-y-serum/ritual-serum.jpg",
    offerImages: {
      1: "/products/axis-y-serum/1.webp",
      2: "/products/axis-y-serum/1.webp",
      3: "/products/axis-y-serum/1.webp",
    },
    upsellProductId: "weight-support-tea",
    crossSellProductIds: ["colon-comfort-tea"],
    ritualAr:
      "ضعي بضع قطرات على بشرة نظيفة وجافة مرتين يومياً. دلكيه بلطف حتى يمتص تماماً. ينصح باستخدام واقي شمس نهاراً.",
    whyBaytsehaPoints: [
      "تركيبة عشبية لطيفة على جميع أنواع البشرة",
      "يساعد في تقليل التصبغات والبقع الداكنة بفعالية",
      "منتج أصلي وآمن تماماً",
      "نتائج ملحوظة مع الاستمرار"
    ],
    faq: [
      {
        question: "هل يناسب البشرة الحساسة؟",
        answer: "نعم، تركيبته العشبية اللطيفة مصممة لتناسب حتى البشرة الحساسة.",
      },
      {
        question: "متى تظهر النتائج؟",
        answer: "تختلف النتائج من شخص لآخر، ولكن معظم المستخدمين يلاحظون تحسناً في توحيد لون البشرة خلال أسابيع من الاستخدام المنتظم.",
      }
    ],
  },
  {
    id: "scar-gel",
    slug: "scar-gel",
    sku: "CopAkramGeL!",
    nameAr: "جل السيليكون الأمريكي لعلاج الندوب والحروق",
    shortNameAr: "جل علاج الندوب",
    headlineAr: "جيل سيليكون الأمريكي لعلاج الندوب و الحروق",
    subheadlineAr:
      "جل السيليكون المتقدم بالريتينول والألانتوين — يخفف الندوب القديمة والجديدة، الحروق، وآثار العمليات خلال أسابيع قليلة. سهل الاستخدام ومناسب لجميع أنواع البشرة.",
    concernAr: "علاج الندوب والحروق وآثار العمليات",
    painAwareAr:
      "الندوب ليست مجرد أثر على الجلد — إنها تؤثر على ثقتك بنفسك وراحتك اليومية. جل السيليكون الأمريكي صُمم ليعيد لبشرتك نعومتها الطبيعية بلطف وفعالية، بدون ألم وبدون آثار جانبية.",
    imageTheme: "scar-gel",
    images: [
      "/products/scar-gel/1.jpg",
      "/products/scar-gel/2.jpg",
      "/products/scar-gel/3.jpg",
    ],
    imageSection2: "/products/scar-gel/6.jpg",
    imageSection4: "/products/scar-gel/14.jpg",
    imageIngredients: "/products/scar-gel/14.jpg",
    imagePromisePackaging: "/products/scar-gel/8.jpg",
    imagePromiseDelivery: "/products/scar-gel/9.jpg",
    imagePromiseCod: "/products/scar-gel/10.jpg",
    imageRitual: "/products/scar-gel/7.jpg",
    imageCertificates: "/products/scar-gel/5.jpg",
    imageSecondaryCertificates: "/products/scar-gel/11.jpg",
    offerImages: {
      1: "/products/scar-gel/3.jpg",
      3: "/products/scar-gel/3.jpg",
      5: "/products/scar-gel/3.jpg",
    },
    upsellProductId: "",
    crossSellProductIds: ["axis-y-serum", "fertility-tea"],
    bundleOffers: [
      { quantity: 5, priceSar: 249, badgeAr: "قيمة حصرية", labelAr: "خمس عبوات" },
      { quantity: 3, priceSar: 199, badgeAr: "الأكثر طلباً", labelAr: "ثلاث عبوات" },
      { quantity: 1, priceSar: 179, badgeAr: "للتجربة", labelAr: "عبوة واحدة" },
    ],
    ritualAr:
      "ضع كمية صغيرة على الندبة مرة واحدة يومياً مساءً، ثم دلّك بلطف بحركات دائرية لمدة 1 إلى 2 دقيقة حتى يمتص الجل تماماً. انتظر 3 إلى 5 دقائق قبل وضع الملابس أو المستحضرات الأخرى.",
    whyBaytsehaPoints: [
      "تركيبة أمريكية متقدمة بالسيليكون والريتينول والألانتوين",
      "مناسب لجميع أنواع الندوب: الحروق، العمليات، حب الشباب، الجروح",
      "نتائج مرئية خلال 3 أسابيع مع الاستخدام المنتظم",
      "آمن على جميع أنواع البشرة ولطيف بدون آثار جانبية"
    ],
    faq: [
      {
        question: "هل الجل يناسب الندوب القديمة؟",
        answer: "نعم، الجل مصمم للندوب القديمة (8 أسابيع فأكثر) والندوب الجديدة (3-6 أشهر). كلما بدأت مبكراً كانت النتائج أسرع.",
      },
      {
        question: "هل يناسب جميع أنواع البشرة؟",
        answer: "نعم، تركيبته اللطيفة بالسيليكون والألانتوين مناسبة لجميع أنواع البشرة بما فيها البشرة الحساسة.",
      },
      {
        question: "متى تظهر النتائج؟",
        answer: "تبدأ النتائج بالظهور خلال 3 أسابيع من الاستخدام المنتظم. للندوب العميقة والقديمة قد تحتاج 8-12 أسبوعاً للنتائج المثلى.",
      },
      {
        question: "هل يمكن استخدامه على الوجه؟",
        answer: "نعم، الجل آمن للاستخدام على الوجه والجسم. تجنّب ملامسة العينين والأغشية المخاطية.",
      },
    ],
  },
  {
    id: "eelhoe-fresh-breath",
    slug: "eelhoe-fresh-breath",
    sku: "CopAffFreshBreath",
    nameAr: "إكسير EELHOE لعلاج رائحة الفم الكريهة",
    shortNameAr: "إكسير رائحة الفم",
    headlineAr: "نفسٌ واحد... يغيّر كل شيء بينكما",
    subheadlineAr: "قطرات طبيعية 100% لنفس منعش يدوم 24 ساعة من أول استخدام.",
    concernAr: "علاج رائحة الفم الكريهة",
    painAwareAr: "كم مرة ابتعدت... بدون ما تقول السبب؟ رائحة الفم تبني جداراً غير مرئي بينك وبين من تحب، تسرق أجمل لحظاتكم وما أحد يجرؤ يقولك! المشكلة ليست في فمك — المشكلة في البكتيريا المخفية.. والحل أصبح موجوداً.",
    imageTheme: "herbal-skin",
    images: [
      "/products/eelhoe-fresh-breath/1.jpg",
      "/products/eelhoe-fresh-breath/2.jpg",
      "/products/eelhoe-fresh-breath/3.jpg",
    ],
    imageSection2: "/products/eelhoe-fresh-breath/2.jpg",
    imageSection4: "/products/eelhoe-fresh-breath/3.jpg",
    imagePromisePackaging: "/products/axis-y-serum/promise-pkg-serum.jpg",
    imagePromiseDelivery: "/products/axis-y-serum/promise-del-serum.jpg",
    imagePromiseCod: "/products/axis-y-serum/promise-cod-serum.jpg",
    imageRitual: "/products/eelhoe-fresh-breath/1.jpg",
    // Product bottle only (not lifestyle/promo creatives)
    offerImages: {
      1: "/products/eelhoe-fresh-breath/4.jpg",
      2: "/products/eelhoe-fresh-breath/4.jpg",
      3: "/products/eelhoe-fresh-breath/4.jpg",
    },
    upsellProductId: "",
    crossSellProductIds: ["axis-y-serum", "scar-gel"],
    bundleOffers: [
      { quantity: 3, priceSar: 249, badgeAr: "الأكثر توفيراً", labelAr: "ثلاث عبوات", priceOverrides: { OMR: 29 } },
      { quantity: 2, priceSar: 199, badgeAr: "الأكثر طلباً", labelAr: "عبوتان", priceOverrides: { OMR: 21 } },
      { quantity: 1, priceSar: 129, badgeAr: "للتجربة", labelAr: "عبوة واحدة", priceOverrides: { OMR: 13 } },
    ],
    ritualAr: "ضع بضع قطرات في الفم يومياً. تركيبة طبيعية 100% وآمنة تماماً بدون كحول، وآمنة للاستخدام حتى أثناء الصيام.",
    whyBaytsehaPoints: [
      "قطرات طبيعية 100% تقضي على البكتيريا المخفية",
      "نفس منعش يدوم 24 ساعة من أول استخدام",
      "بدون كحول، وآمن تماماً للصيام",
      "المنتج الأكثر مبيعاً في أوروبا وأمريكا، الآن في الإمارات والسعودية"
    ],
    faq: [
      {
        question: "هل المنتج آمن للاستخدام اليومي؟",
        answer: "نعم، تركيبته طبيعية 100% وآمنة تماماً للاستخدام اليومي.",
      },
      {
        question: "هل يحتوي على كحول؟",
        answer: "لا، المنتج خالي تماماً من الكحول وآمن للصيام.",
      },
      {
        question: "متى يبدأ مفعول المنتج؟",
        answer: "يبدأ المفعول من أول استخدام، ويدوم النفس المنعش لمدة 24 ساعة.",
      },
    ],
  },
  {
    id: "c60-fullerene-serum",
    slug: "c60-fullerene-serum",
    sku: "CopaffFullereneSerum",
    nameAr: "كبسولات سيروم فوليرين C60 متعددة المفعول",
    shortNameAr: "كبسولات C60 الذهبية",
    headlineAr: "صاحبتج بنفس عمرج —\nليش بشرتها أحسن منج؟",
    subheadlineAr:
      "كبسولات سيروم ذهبية بتقنية النانو — تحيّد الجذور الحرة بكفاءة أعلى 172 مرة من فيتامين C وتجدد ألياف الكولاجين من الداخل.",
    concernAr: "تجديد البشرة ومكافحة التجاعيد والبقع الداكنة",
    painAwareAr:
      "شمس الخليج تأخذ من بشرتك كل يوم بصمت تام. بشرتك تفقد 1% من كولاجينها كل سنة بعد 25 — وكل يوم بدون حماية هو يوم يبعدك عن بشرة صحية ونضرة. هذا ليس قدراً. هذا كيمياء — ولها حل.",
    imageTheme: "c60-fullerene",
    images: [
      "/products/c60-fullerene-serum/1.jpg",
      "/products/c60-fullerene-serum/2.jpg",
      "/products/c60-fullerene-serum/3.jpg",
      "/products/c60-fullerene-serum/4.jpg",
      "/products/c60-fullerene-serum/5.jpg",
      "/products/c60-fullerene-serum/6.jpg",
      "/products/c60-fullerene-serum/7.jpg",
      "/products/c60-fullerene-serum/8.jpg",
      "/products/c60-fullerene-serum/9.jpg",
      "/products/c60-fullerene-serum/10.jpg",
    ],
    imageSection2: "/products/c60-fullerene-serum/2.jpg",
    imageSection4: "/products/c60-fullerene-serum/3.jpg",
    imageCertificates: "/products/c60-fullerene-serum/problem.jpg",
    imageIngredients: "/products/c60-fullerene-serum/6.jpg",
    imagePromisePackaging: "/products/c60-fullerene-serum/7.jpg",
    imagePromiseDelivery: "/products/c60-fullerene-serum/8.jpg",
    imagePromiseCod: "/products/c60-fullerene-serum/9.jpg",
    imageRitual: "/products/c60-fullerene-serum/10.jpg",
    offerImages: {
      2: "/products/c60-fullerene-serum/3.jpg",
      4: "/products/c60-fullerene-serum/4.jpg",
      6: "/products/c60-fullerene-serum/5.jpg",
    },
    upsellProductId: "",
    crossSellProductIds: ["eelhoe-fresh-breath", "bloom-coffee"],
    // quantity = total boxes shipped (BOGO): 1+1 free → 2, 2+2 → 4, 3+3 → 6
    bundleOffers: [
      { quantity: 6, priceSar: 349, badgeAr: "عبوة العائلة", labelAr: "3 عبوات + 3 مجاناً", priceOverrides: { OMR: 39 } },
      { quantity: 4, priceSar: 279, badgeAr: "الأكثر طلباً", labelAr: "2 عبوة + 2 مجاناً", priceOverrides: { OMR: 29 } },
      { quantity: 2, priceSar: 199, badgeAr: "ابدئي بثقة", labelAr: "1 عبوة + 1 مجاناً", priceOverrides: { OMR: 21 } },
    ],
    ritualAr:
      "قبل النوم: نظفي وجهك، اكسري كبسولة واحدة، دلكي السيروم لمدة 60 ثانية، ثم نامي. بين الساعة 11 ليلاً و2 صباحاً هرمون النمو في ذروته — خلاياك تصلح نفسها والكبسولة تعطيها الوقود.",
    whyBaytsehaPoints: [
      "Fullerene C60 يحيّد الجذور الحرة بكفاءة أعلى 172× من فيتامين C",
      "تقنية تغليف معقم بالفراغ — كل كبسولة نقية 100% بدون تأكسد",
      "5 مواد فعّالة مثبتة سريرياً في تركيبة واحدة متوازنة",
      "نتائج مبنية على اختبارات سريرية: 73% تراجع الخطوط، 89% زيادة الترطيب",
      "مناسب لجميع أنواع البشرة — مختبر معتمد ومكونات طبيعية"
    ],
    faq: [
      {
        question: "ما هو Fullerene C60 وكيف يعمل؟",
        answer: "Fullerene C60 هو جزيء نانوي حائز على جائزة نوبل 1996، يلتقط الجذور الحرة قبل أن تُحدث ضررها بكفاءة أعلى 172 مرة من فيتامين C — وفقاً لمجلة Free Radical Biology and Medicine.",
      },
      {
        question: "لماذا كبسولات وليس كريم عادي؟",
        answer: "كل كريم فتحته بدأ يتدهور في تلك اللحظة. المواد الفعالة تتأكسد بمجرد تعرضها للهواء. كبسولة واحدة معقمة = جرعة نقية 100%. لا تلوث، لا تأكسد، لا فقدان للفعالية.",
      },
      {
        question: "متى تظهر النتائج؟",
        answer: "النتائج مبنية على اختبارات سريرية لمدة 30 يوماً: 73% تراجع الخطوط الدقيقة، 89% زيادة الترطيب العميق، 68% تحسن الإشراق، 61% تراجع البقع الداكنة.",
      },
      {
        question: "هل يناسب جميع أنواع البشرة؟",
        answer: "نعم، التركيبة مصممة لتناسب جميع أنواع البشرة بما فيها الحساسة. مختبر معتمد ومكونات طبيعية فعّالة.",
      },
      {
        question: "ما هي المكونات الفعّالة؟",
        answer: "5 مواد فعّالة: Fullerene C60 (الدرع الجزيئي)، مستخلص المشيمة النباتية (محرك التجديد)، فيتامين C الطبيعي (المؤخر والمفتح)، جل الصبار (المهدئ العميق)، ومستخلص الكرانبيري (الحماية البيئية).",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getUpsellProduct(mainProductId: string): Product | undefined {
  const main = PRODUCTS.find((p) => p.id === mainProductId);
  if (!main) return undefined;
  return PRODUCTS.find((p) => p.id === main.upsellProductId);
}

export function getCrossSellProducts(productId: string): Product[] {
  const main = PRODUCTS.find((p) => p.id === productId);
  if (!main) return [];
  return main.crossSellProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];
}

export const SAVINGS_MAP: Record<number, number> = {
  2: 199 * 2 - 279,
  3: 199 * 3 - 349,
};

export function getProductBundleOffers(product: Product): readonly BundleOffer[] {
  return product.bundleOffers ?? BUNDLE_OFFERS;
}

export function getProductSavings(product: Product): Record<number, number> {
  const offers = getProductBundleOffers(product);
  const base = [...offers].sort((a, b) => a.quantity - b.quantity)[0];
  if (!base) return {};
  const result: Record<number, number> = {};
  for (const offer of offers) {
    if (offer.quantity <= base.quantity) continue;
    const multiples = offer.quantity / base.quantity;
    if (Number.isInteger(multiples)) {
      // BOGO packs (e.g. C60 2/4/6) or standard 1/2/3
      result[offer.quantity] = base.priceSar * multiples - offer.priceSar;
    } else if (base.quantity === 1) {
      // Non-multiple ladders like scar-gel 1/3/5
      result[offer.quantity] = base.priceSar * offer.quantity - offer.priceSar;
    }
  }
  return result;
}

"use client";

type Transformation = {
  id: number;
  nameAr: string;
  cityAr: string;
  age: number;
  lostKg: number;
  durationAr: string;
  quoteAr: string;
  image: string;
};

type ProductReview = {
  id: number;
  nameAr: string;
  cityAr: string;
  age: number;
  quoteAr: string;
  rating: number;
  badge: string;
};

const TRANSFORMATIONS: Transformation[] = [
  {
    id: 1,
    nameAr: "سعود المطيري",
    cityAr: "🇸🇦 الرياض",
    age: 30,
    lostKg: 14,
    durationAr: "3 أشهر",
    quoteAr: "كنت أجرب كل شيء وما ينفع، بس هالشاي غيّر حياتي. نزلت 14 كيلو بدون حرمان!",
    image: "/transformations/ba-01.jpg",
  },
  {
    id: 2,
    nameAr: "نورة الشمري",
    cityAr: "🇸🇦 جدة",
    age: 28,
    lostKg: 11,
    durationAr: "3 أشهر",
    quoteAr: "بعد الولادة وزني زاد كثير، واليوم رجعت لوزني الطبيعي. مشكورين بيت الصحة!",
    image: "/transformations/ba-02.jpg",
  },
  {
    id: 3,
    nameAr: "فهد القحطاني",
    cityAr: "🇸🇦 الدمام",
    age: 45,
    lostKg: 18,
    durationAr: "3 أشهر",
    quoteAr: "عمري 45 وكنت فاقد الأمل، لكن بفضل الله ثم هالمنتج نزلت 18 كيلو. أحس بطاقة شباب!",
    image: "/transformations/ba-03.jpg",
  },
  {
    id: 4,
    nameAr: "ريم العتيبي",
    cityAr: "🇸🇦 مكة",
    age: 25,
    lostKg: 9,
    durationAr: "شهرين",
    quoteAr: "كوب واحد يوميًا وانتظام بالأكل — والنتيجة تتكلم عن نفسها. 9 كيلو راحوا!",
    image: "/transformations/ba-04.jpg",
  },
  {
    id: 5,
    nameAr: "خالد الدوسري",
    cityAr: "🇸🇦 بريدة",
    age: 38,
    lostKg: 16,
    durationAr: "3 أشهر",
    quoteAr: "كرشي اختفى والحمدلله! زوجتي ما صدقت الفرق. شكرًا بيت الصحة على المنتج الرهيب.",
    image: "/transformations/ba-05.jpg",
  },
  {
    id: 6,
    nameAr: "هيا السبيعي",
    cityAr: "🇸🇦 الطائف",
    age: 35,
    lostKg: 13,
    durationAr: "3 أشهر",
    quoteAr: "جسمي تغيّر بشكل ملحوظ والأهم إني ما حسّيت بأي تعب. طبيعي 100% وفعّال.",
    image: "/transformations/ba-06.jpg",
  },
  {
    id: 7,
    nameAr: "عبدالله الحربي",
    cityAr: "🇸🇦 المدينة",
    age: 50,
    lostKg: 20,
    durationAr: "4 أشهر",
    quoteAr: "نزلت 20 كيلو وأنا في الخمسين! الدكتور استغرب وقالي استمر على اللي تسويه.",
    image: "/transformations/ba-07.jpg",
  },
  {
    id: 8,
    nameAr: "لطيفة آل سعود",
    cityAr: "🇸🇦 الرياض",
    age: 22,
    lostKg: 8,
    durationAr: "شهرين",
    quoteAr: "كنت خجلانة من شكلي، واليوم ثقتي بنفسي رجعت. أنصح كل بنت تجربه!",
    image: "/transformations/ba-08.jpg",
  },
  {
    id: 9,
    nameAr: "ماجد الغامدي",
    cityAr: "🇦🇪 دبي",
    age: 33,
    lostKg: 15,
    durationAr: "3 أشهر",
    quoteAr: "طلبته وأنا بالإمارات ووصلني بسرعة. 15 كيلو فرق والملابس القديمة صارت واسعة!",
    image: "/transformations/ba-09.jpg",
  },
  {
    id: 10,
    nameAr: "منيرة الزهراني",
    cityAr: "🇸🇦 أبها",
    age: 40,
    lostKg: 17,
    durationAr: "3 أشهر",
    quoteAr: "بعد سنين من المعاناة مع الوزن، أخيرًا لقيت الحل. 17 كيلو نزلت والهضم تحسّن!",
    image: "/transformations/ba-10.jpg",
  },
  {
    id: 11,
    nameAr: "يوسف العمري",
    cityAr: "🇰🇼 الكويت",
    age: 28,
    lostKg: 12,
    durationAr: "شهرين ونص",
    quoteAr: "ما توقعت أعشاب تسوي هالفرق! جسمي خفّ وطاقتي زادت بشكل واضح.",
    image: "/transformations/ba-11.jpg",
  },
  {
    id: 12,
    nameAr: "شيخة المري",
    cityAr: "🇶🇦 الدوحة",
    age: 32,
    lostKg: 10,
    durationAr: "شهرين",
    quoteAr: "أسهل دايت سويته بحياتي — كوب شاي وأكل صحي، و10 كيلو راحوا بدون رجعة!",
    image: "/transformations/ba-12.jpg",
  },
  {
    id: 13,
    nameAr: "أحمد البلوشي",
    cityAr: "🇴🇲 مسقط",
    age: 42,
    lostKg: 19,
    durationAr: "4 أشهر",
    quoteAr: "كنت 105 كيلو وصرت 86. الشاي مع المشي اليومي سوّوا عجايب. ممتاز!",
    image: "/transformations/ba-13.jpg",
  },
  {
    id: 14,
    nameAr: "دلال الكندري",
    cityAr: "🇧🇭 المنامة",
    age: 27,
    lostKg: 11,
    durationAr: "3 أشهر",
    quoteAr: "صديقتي نصحتني فيه وما ندمت لحظة. بطني انسدّ والأكل الزايد قلّ بشكل كبير.",
    image: "/transformations/ba-14.jpg",
  },
  {
    id: 15,
    nameAr: "تركي الشهري",
    cityAr: "🇸🇦 خميس مشيط",
    age: 36,
    lostKg: 14,
    durationAr: "3 أشهر",
    quoteAr: "والله إني فرحان بالنتيجة. صحتي تحسّنت وكرشي راح. أفضل قرار أخذته!",
    image: "/transformations/ba-15.jpg",
  },
];

const FERTILITY_REVIEWS: ProductReview[] = [
  {
    id: 1,
    nameAr: "نوف الحربي",
    cityAr: "🇸🇦 الرياض",
    age: 29,
    quoteAr: "بعد سنتين محاولات، بديت أشرب الشاي بانتظام وحسّيت بتغيّر في دورتي وانتظامها. الحمدلله أنا الحين حامل في الشهر الثالث!",
    rating: 5,
    badge: "🌸 نتيجة مباركة",
  },
  {
    id: 2,
    nameAr: "مريم الشامسي",
    cityAr: "🇦🇪 أبوظبي",
    age: 31,
    quoteAr: "كنت أعاني من عدم انتظام الدورة، وبعد شهرين من الشاي صارت منتظمة. طعمه لذيذ وأحس بفرق واضح في طاقتي.",
    rating: 5,
    badge: "✅ دورة منتظمة",
  },
  {
    id: 3,
    nameAr: "سارة العتيبي",
    cityAr: "🇸🇦 جدة",
    age: 27,
    quoteAr: "دكتورتي نصحتني بأعشاب طبيعية مع العلاج، وهالشاي كان الخيار المثالي. أحس براحة نفسية وجسدية مع كل كوب.",
    rating: 5,
    badge: "💆‍♀️ راحة يومية",
  },
  {
    id: 4,
    nameAr: "فاطمة الكويتية",
    cityAr: "🇰🇼 حولي",
    age: 34,
    quoteAr: "أختي جرّبته قبلي وحملت بعد 4 أشهر. أنا بديت أشربه وألاحظ تحسّن بالدورة والمزاج. منتج طبيعي 100%.",
    rating: 5,
    badge: "🌿 طبيعي وآمن",
  },
  {
    id: 5,
    nameAr: "هدى القحطاني",
    cityAr: "🇸🇦 الدمام",
    age: 26,
    quoteAr: "من أفضل القرارات اللي أخذتها! الشاي ساعدني أحافظ على توازن هرموناتي. أنصح كل بنت تجربه.",
    rating: 5,
    badge: "⚖️ توازن هرموني",
  },
  {
    id: 6,
    nameAr: "عائشة البلوشي",
    cityAr: "🇴🇲 مسقط",
    age: 30,
    quoteAr: "طلبته لعُمان ووصلني بأسبوع. طعمه خفيف وأحبه مع العسل. دورتي تحسّنت وآلامها خفّت كثير.",
    rating: 5,
    badge: "🚚 وصل بسرعة",
  },
  {
    id: 7,
    nameAr: "لطيفة السبيعي",
    cityAr: "🇸🇦 مكة",
    age: 33,
    quoteAr: "كنت أعاني من تكيّس المبايض وبديت أشرب الشاي كمكمّل طبيعي. الحمدلله أحس بتحسّن ملحوظ في كل شيء.",
    rating: 5,
    badge: "💪 تحسّن ملحوظ",
  },
  {
    id: 8,
    nameAr: "دانة المطيري",
    cityAr: "🇶🇦 الدوحة",
    age: 28,
    quoteAr: "جرّبت أشياء كثيرة وهذا أول منتج حسّيت بفرق حقيقي معه. دورتي انتظمت والتقلّبات المزاجية خفّت!",
    rating: 5,
    badge: "🎯 فرق حقيقي",
  },
  {
    id: 9,
    nameAr: "زينب حسن",
    cityAr: "🇧🇭 المنامة",
    age: 35,
    quoteAr: "الشاي صار جزء من روتيني اليومي. أحس بهدوء نفسي وراحة، وأنا وزوجي نخطط ونثق أن الله يرزقنا.",
    rating: 5,
    badge: "☕ روتين يومي",
  },
  {
    id: 10,
    nameAr: "أمل الراشد",
    cityAr: "🇸🇦 الرياض",
    age: 32,
    quoteAr: "زوجي هو اللي طلبه لي كهدية. صراحة أحسن هدية! بشرتي تحسّنت ودورتي صارت منتظمة.",
    rating: 5,
    badge: "🎁 هدية مثالية",
  },
  {
    id: 11,
    nameAr: "رنا الزعبي",
    cityAr: "🇱🇧 بيروت",
    age: 29,
    quoteAr: "طلبته من لبنان ووصلني. طعمه ناعم ولذيذ وأحس إنه ساعدني على الاسترخاء وتنظيم هرموناتي.",
    rating: 5,
    badge: "🌸 استرخاء وعناية",
  },
  {
    id: 12,
    nameAr: "شيماء العراقية",
    cityAr: "🇮🇶 بغداد",
    age: 27,
    quoteAr: "أعشاب طبيعية ومفعولها واضح. بعد شهر ونص دورتي انتظمت وآلام البطن اختفت تقريبًا.",
    rating: 5,
    badge: "✅ نتيجة سريعة",
  },
  {
    id: 13,
    nameAr: "حنان العلي",
    cityAr: "🇸🇦 أبها",
    age: 36,
    quoteAr: "عمري 36 وكنت خايفة إن الوقت فات. بس بعد ما بديت الشاي وتغيّر نمط حياتي، أنا الحين حامل والحمدلله!",
    rating: 5,
    badge: "🤰 حمل مبارك",
  },
  {
    id: 14,
    nameAr: "منى الليبية",
    cityAr: "🇱🇾 طرابلس",
    age: 30,
    quoteAr: "وصلني المنتج لليبيا بعد 10 أيام. مكونات طبيعية وطعم رائع. أحس بتحسّن في صحتي العامة ونشاطي.",
    rating: 5,
    badge: "🌍 توصيل دولي",
  },
  {
    id: 15,
    nameAr: "ريم الدوسري",
    cityAr: "🇸🇦 الخبر",
    age: 25,
    quoteAr: "أنا عروس جديدة وبديت أشرب الشاي من باب الوقاية والعناية. أحبه مع الزنجبيل وأنصح كل عروس فيه!",
    rating: 5,
    badge: "💍 عناية العروس",
  },
];

function TransformationCard({ t }: { t: Transformation }) {
  return (
    <article
      className="relative shrink-0 w-[min(90vw,320px)] md:w-[340px] rounded-2xl overflow-hidden bg-white border border-[#E8D8C3] shadow-lg"
      dir="rtl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.image}
          alt={`تحوّل ${t.nameAr} — قبل وبعد`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          قبل
        </div>
        <div className="absolute top-3 right-3 bg-[#155235] text-white text-[10px] font-bold px-2 py-1 rounded-full">
          بعد
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-2">
          <span className="text-[#C99A45] font-extrabold text-sm">-{t.lostKg} كغ</span>
          <span className="text-white/60 text-xs">في {t.durationAr}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-extrabold text-[#0F1A14] text-sm">{t.nameAr}</p>
            <p className="text-[#567063] text-xs">{t.cityAr} · {t.age} سنة</p>
          </div>
          <div className="text-[#C99A45] text-sm" aria-hidden="true">★★★★★</div>
        </div>
        <p className="text-[#567063] text-sm leading-relaxed line-clamp-3">
          &ldquo;{t.quoteAr}&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
            ✅ نتيجة حقيقية
          </span>
          <span className="text-[10px] bg-[#F5F3EE] text-[#567063] px-2 py-0.5 rounded-full border border-[#E8E2D8]">
            🍵 شاي التخسيس
          </span>
        </div>
      </div>
    </article>
  );
}

function ProductReviewCard({ r, productName, badgeColor, borderColor }: { r: ProductReview; productName: string; badgeColor: string; borderColor: string; }) {
  return (
    <article
      className={`relative shrink-0 w-[min(90vw,320px)] md:w-[340px] rounded-2xl overflow-hidden bg-white border ${borderColor} shadow-lg`}
      dir="rtl"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-extrabold text-[#0F1A14] text-sm">{r.nameAr}</p>
            <p className="text-[#567063] text-xs">{r.cityAr} · {r.age} سنة</p>
          </div>
          <div className="text-[#C99A45] text-sm" aria-hidden="true">★★★★★</div>
        </div>
        <p className="text-[#567063] text-sm leading-relaxed mb-3">
          &ldquo;{r.quoteAr}&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badgeColor}`}>
            {r.badge}
          </span>
          <span className="text-[10px] bg-[#F5F3EE] text-[#567063] px-2 py-0.5 rounded-full border border-[#E8E2D8]">
            {productName}
          </span>
        </div>
      </div>
    </article>
  );
}

const REVIEWS_MAP: Record<string, ProductReview[]> = {
  "fertility-tea": FERTILITY_REVIEWS,
  "colon-comfort-tea": [
    { id: 1, nameAr: "فيصل الشمري", cityAr: "🇸🇦 الرياض", age: 34, quoteAr: "سنوات من الانتفاخ بعد الأكل راحت مع هالشاي. كوب واحد بعد العشا والقولون هادي تماماً.", rating: 5, badge: "🌼 قولون مرتاح" },
    { id: 2, nameAr: "منى العتيبي", cityAr: "🇸🇦 جدة", age: 28, quoteAr: "الغازات كانت تحرجني بالدوام. جربت الشاي هذا والحمدلله النتيجة رهيبة ومريحة.", rating: 5, badge: "✅ بدون غازات" },
    { id: 3, nameAr: "سالم الظاهري", cityAr: "🇦🇪 دبي", age: 41, quoteAr: "طعم الشاي ممتاز وما فيه مرارة. خفف عني أعراض القولون العصبي بشكل واضح.", rating: 4, badge: "☕ طعم لذيذ" },
    { id: 4, nameAr: "أماني الكندري", cityAr: "🇰🇼 الكويت", age: 31, quoteAr: "من أفضل المنتجات للقولون. أقدر آكل براحتي بدون الخوف من المغص والنفخة.", rating: 5, badge: "🎯 نتيجة مبهرة" },
    { id: 5, nameAr: "عبدالله الهاجري", cityAr: "🇶🇦 الدوحة", age: 38, quoteAr: "المنتج طبيعي ومريح للمعدة. أنصح فيه بشدة لكل من يعاني من مشاكل الهضم.", rating: 5, badge: "🌿 راحة طبيعية" },
    { id: 6, nameAr: "عالية البلوشي", cityAr: "🇴🇲 مسقط", age: 45, quoteAr: "وصلني بسرعة وبديت أستخدمه. الفرق واضح من أول أسبوع وتخلصت من الثقل بعد الأكل.", rating: 5, badge: "🚚 توصيل سريع" },
  ],
  "hemorrhoid-comfort-tea": [
    { id: 1, nameAr: "خالد الحربي", cityAr: "🇸🇦 الدمام", age: 39, quoteAr: "المنتج ساعدني أرجع لحياتي الطبيعية. العناية بالبواسير صارت أسهل وأكثر راحة بفضل هالشاي.", rating: 5, badge: "🌸 راحة يومية" },
    { id: 2, nameAr: "فاطمة الدوسري", cityAr: "🇸🇦 الرياض", age: 32, quoteAr: "الخصوصية في الطلب والتغليف مريحة جداً، والنتيجة كانت ممتازة. الشاي خفف الألم بشكل ملحوظ.", rating: 5, badge: "📦 تغليف سري" },
    { id: 3, nameAr: "سعيد النيادي", cityAr: "🇦🇪 أبوظبي", age: 44, quoteAr: "كنت متردد بس الحمدلله جربته. ساعد في تخفيف الاحتقان وأقدر أجلس وأتحرك بدون ألم.", rating: 5, badge: "✅ نتيجة حقيقية" },
    { id: 4, nameAr: "نورة المطيري", cityAr: "🇰🇼 الأحمدي", age: 29, quoteAr: "منتج محترم جداً، الألم خف بنسبة 80% في أول أسبوع. شاي مريح ومهدئ.", rating: 5, badge: "💆‍♀️ تأثير مهدئ" },
    { id: 5, nameAr: "يوسف القحطاني", cityAr: "🇸🇦 أبها", age: 47, quoteAr: "عانيت سنوات من البواسير. هالشاي مع النظام الغذائي ريحني ووفر علي التعب.", rating: 4, badge: "🌿 طبيعي 100%" },
    { id: 6, nameAr: "هدى جاسم", cityAr: "🇧🇭 المنامة", age: 36, quoteAr: "شكراً بيت الصحة. الدفع عند الاستلام ريحني، والمنتج نتيجته أسرع من المتوقع.", rating: 5, badge: "💳 دفع مريح" },
  ],
  "liver-wellness-tea": [
    { id: 1, nameAr: "عمر السبيعي", cityAr: "🇸🇦 الرياض", age: 42, quoteAr: "الشاي نظف جسمي وحسيت بطاقة جديدة. تحسنت تحاليلي ونشاطي زاد.", rating: 5, badge: "🌿 تنظيف السموم" },
    { id: 2, nameAr: "ريم الزهراني", cityAr: "🇸🇦 جدة", age: 35, quoteAr: "طعم الشاي خفيف ويساعد في الاسترخاء. استخدمه من شهر ونتيجته واضحة على بشرتي وطاقتي.", rating: 5, badge: "✨ نضارة وصحة" },
    { id: 3, nameAr: "حمد المري", cityAr: "🇶🇦 الدوحة", age: 50, quoteAr: "أفضل ديتوكس طبيعي جربته للكبد. مريح للمعدة وما يسبب أي مغص.", rating: 5, badge: "✅ ديتوكس طبيعي" },
    { id: 4, nameAr: "سعاد البوسعيدي", cityAr: "🇴🇲 صلالة", age: 39, quoteAr: "نصحني فيه طبيبي كعامل مساعد. الحمدلله الشاي مهدئ وصحتي العامة في تحسن مستمر.", rating: 5, badge: "💪 صحة أفضل" },
    { id: 5, nameAr: "عبدالعزيز الغامدي", cityAr: "🇸🇦 مكة", age: 48, quoteAr: "منتج رائع وخدمة عملاء راقية. التغليف ممتاز والتأثير إيجابي جداً على نشاطي الصباحي.", rating: 5, badge: "☕ روتين يومي" },
    { id: 6, nameAr: "نواف الشامسي", cityAr: "🇦🇪 الشارقة", age: 41, quoteAr: "بديت أحس بخفة في جسمي بعد أسبوعين. أنصح كل مهتم بصحته يدخله في نظامه.", rating: 4, badge: "🎯 فرق ملموس" },
  ],
  "lung-smoking-support-tea": [
    { id: 1, nameAr: "ماجد المطيري", cityAr: "🇸🇦 بريدة", age: 38, quoteAr: "أنا مدخن من 15 سنة. الشاي هذا ريح صدري كثير، وخفف عني الكحة الصباحية بشكل كبير.", rating: 5, badge: "🍀 تنفس أسهل" },
    { id: 2, nameAr: "أحمد العتيبي", cityAr: "🇸🇦 الرياض", age: 45, quoteAr: "ممتاز جداً للي يحاول يخفف تدخين. يعطيك هدوء ويخفف الرغبة بالسجائر.", rating: 5, badge: "✅ يخفف الرغبة" },
    { id: 3, nameAr: "سلطان النعيمي", cityAr: "🇦🇪 دبي", age: 33, quoteAr: "فرق واضح في النفس وقت الرياضة! الشاي نظف الرئة وصرت أتنفس براحة أكثر.", rating: 5, badge: "🏃‍♂️ نشاط رياضي" },
    { id: 4, nameAr: "تركي الدوسري", cityAr: "🇸🇦 الخبر", age: 41, quoteAr: "طعمه مريح ودافي. ساعدني أتخلص من البلغم المتراكم بصراحة منتج يستاهل.", rating: 5, badge: "🌿 طرد البلغم" },
    { id: 5, nameAr: "وليد العنزي", cityAr: "🇰🇼 الفروانية", age: 36, quoteAr: "أنصح فيه كل مدخن أو مدخن سابق. ينظف الصدر ويعطيك شعور بالانتعاش.", rating: 4, badge: "✨ انتعاش" },
    { id: 6, nameAr: "محمد الشمري", cityAr: "🇸🇦 تبوك", age: 50, quoteAr: "شكراً بيت الصحة. المنتج ساعدني كثير في تقليل التدخين، وصدري صار أصفى بكثير.", rating: 5, badge: "🎯 نتيجة فعالة" },
  ],
  "prostate-wellness-tea": [
    { id: 1, nameAr: "صالح الغامدي", cityAr: "🇸🇦 جدة", age: 55, quoteAr: "الشاي خفف عني التردد على دورة المياه بالليل. قدرت أنام براحة أخيراً.", rating: 5, badge: "🌙 نوم مريح" },
    { id: 2, nameAr: "عبدالرحمن السديري", cityAr: "🇸🇦 الرياض", age: 60, quoteAr: "منتج محترم يحترم خصوصية الرجل. ساعدني في تخفيف الاحتقان وأعراض التضخم.", rating: 5, badge: "🌱 راحة طبيعية" },
    { id: 3, nameAr: "حسن المناعي", cityAr: "🇦🇪 عجمان", age: 52, quoteAr: "أعشاب ممتازة ومدروسة. لاحظت تحسن في تدفق البول بعد استخدام أسبوعين.", rating: 5, badge: "✅ تحسن ملحوظ" },
    { id: 4, nameAr: "ابراهيم العبدالله", cityAr: "🇶🇦 الدوحة", age: 58, quoteAr: "الشراء آمن والتوصيل سريع. الشاي له تأثير مهدئ ومفيد جداً لصحة البروستات.", rating: 5, badge: "📦 ثقة وأمان" },
    { id: 5, nameAr: "سعد الشهري", cityAr: "🇸🇦 نجران", age: 62, quoteAr: "طلبته بناءً على نصيحة صديق. فعال جداً ومريح، وما حسيت بأي أعراض جانبية.", rating: 5, badge: "💪 صحة وعافية" },
    { id: 6, nameAr: "مبارك الرشيدي", cityAr: "🇰🇼 الجهراء", age: 54, quoteAr: "شكراً لكم. المنتج يستحق كل ريال. ريحني كثير وأصبح جزء من يومي.", rating: 4, badge: "☕ جزء من يومي" },
  ],
  "axis-y-serum": [
    { id: 1, nameAr: "سارة الحمد", cityAr: "🇸🇦 الرياض", age: 26, quoteAr: "السيروم سحر! آثار الحبوب اختفت بنسبة 70% في ثلاث أسابيع بس. بشرتي صارت تلمع.", rating: 5, badge: "✨ لمعان ملحوظ" },
    { id: 2, nameAr: "ليلى العامري", cityAr: "🇦🇪 دبي", age: 31, quoteAr: "خفيف على البشرة الحساسة وما يهيجها أبداً. وحد لون بشرتي بشكل واضح.", rating: 5, badge: "🌸 لطيف ومريح" },
    { id: 3, nameAr: "شهد القحطاني", cityAr: "🇸🇦 الدمام", age: 24, quoteAr: "أفضل منتج كوري استخدمته لتصحيح البقع. يعطي نضارة فورية وتأثيره يطول.", rating: 5, badge: "🎯 تصحيح البقع" },
    { id: 4, nameAr: "نوف العازمي", cityAr: "🇰🇼 العاصمة", age: 29, quoteAr: "يمتص بسرعة وممتاز تحت المكياج. التصبغات خفت كثير ومستمرة عليه.", rating: 5, badge: "✅ امتصاص سريع" },
    { id: 5, nameAr: "أسماء الشمري", cityAr: "🇸🇦 حائل", age: 34, quoteAr: "شكراً بيت الصحة على توفير المنتج الأصلي. سعره ممتاز والنتيجة مضمونة.", rating: 5, badge: "📦 منتج أصلي" },
    { id: 6, nameAr: "مها البوسعيدي", cityAr: "🇴🇲 مسقط", age: 28, quoteAr: "توصيل سريع وخدمة راقية. السيروم وحد لون وجهي وأخفى الكلف الخفيف.", rating: 4, badge: "🌿 توحيد اللون" },
  ],
  "scar-gel": [
    { id: 1, nameAr: "عبدالله الشهري", cityAr: "🇸🇦 الرياض", age: 34, quoteAr: "ندبة عملية الزائدة عمرها 3 سنوات. بعد شهر ونص من الجل اختفت تقريباً! زوجتي ما صدقت الفرق.", rating: 5, badge: "✅ ندبة قديمة اختفت" },
    { id: 2, nameAr: "نورة الدوسري", cityAr: "🇸🇦 جدة", age: 28, quoteAr: "تعرضت لحرق زيت بالمطبخ قبل سنتين. الأثر كان واضح على يدي والحين بعد شهرين من الجل خفّ بنسبة 90%. منتج عجيب!", rating: 5, badge: "🔥 آثار حروق اختفت" },
    { id: 3, nameAr: "خالد المنصوري", cityAr: "🇦🇪 أبوظبي", age: 40, quoteAr: "عندي أثر عملية جراحية بالبطن من 7 سنوات. ما كنت أتوقع شي يساعد بس الجل هذا فعلاً فرّق. الندبة صارت بالكاد تنشاف.", rating: 5, badge: "💪 ندبة 7 سنوات" },
    { id: 4, nameAr: "حمد الكواري", cityAr: "🇶🇦 الدوحة", age: 31, quoteAr: "عانيت من ندوب حب الشباب على وجهي سنوات. بعد 3 أسابيع فقط من الجل، الملمس صار ناعم والندوب خفّت بشكل واضح.", rating: 5, badge: "💎 وجه صافي" },
    { id: 5, nameAr: "فاطمة البلوشي", cityAr: "🇴🇲 مسقط", age: 25, quoteAr: "أثر جرح على ذراعي من حادث سيارة. الدكتور قال ما راح يروح. بعد شهرين من الجل صار شبه مختفي! شكراً بيت الصحة.", rating: 5, badge: "🌟 نتيجة مذهلة" },
    { id: 6, nameAr: "سعود العتيبي", cityAr: "🇸🇦 الدمام", age: 37, quoteAr: "حرق قديم على رقبتي من أيام الطفولة. استخدمت الجل 6 أسابيع والفرق كبير جداً. اللون تقارب مع بشرتي والملمس تحسّن.", rating: 5, badge: "🎯 فرق واضح" },
    { id: 7, nameAr: "مريم الشامسي", cityAr: "🇦🇪 دبي", age: 29, quoteAr: "بعد العملية القيصرية كان عندي ندبة كبيرة. الجل خلّاها تقريباً مو موجودة بعد شهرين. خفيف على البشرة وما يهيّج.", rating: 5, badge: "🤱 بعد القيصرية" },
    { id: 8, nameAr: "ناصر الحربي", cityAr: "🇸🇦 مكة", age: 45, quoteAr: "عندي ندوب من عملية قلب مفتوح. بديت أستخدم الجل من 3 أشهر والتحسّن ملحوظ جداً. الندوب خفّت وبشرتي صارت ناعمة.", rating: 5, badge: "❤️ بعد عملية القلب" },
    { id: 9, nameAr: "هند السبيعي", cityAr: "🇰🇼 الكويت", age: 33, quoteAr: "آثار ليزر فاشل على وجهي سبب لي ندوب. الجل ساعد يخففها بشكل كبير والحمدلله. أنصح فيه كل اللي عندهم نفس المشكلة.", rating: 5, badge: "✨ إصلاح البشرة" },
    { id: 10, nameAr: "محمد الزعابي", cityAr: "🇦🇪 الشارقة", age: 26, quoteAr: "كنت أخجل من ندبة على وجهي من حادث قديم. بعد 5 أسابيع من الاستخدام اليومي، الندبة خفّت 85%. ثقتي بنفسي رجعت!", rating: 5, badge: "😊 ثقة بالنفس" },
    { id: 11, nameAr: "سارة المالكي", cityAr: "🇸🇦 الطائف", age: 30, quoteAr: "ابني تعرض لحرق ماء حار وبقى أثر. استخدمنا الجل بانتظام وبعد شهرين الأثر تقريباً راح. منتج ممتاز وآمن.", rating: 5, badge: "👶 آمن للعائلة" },
    { id: 12, nameAr: "جاسم الأنصاري", cityAr: "🇧🇭 المنامة", age: 38, quoteAr: "ندبة في الوجه من 10 سنوات. جربت كل شي بدون فايدة. هالجل أول منتج يعطي نتيجة حقيقية. والله يستاهل كل ريال.", rating: 4, badge: "🏆 أخيراً نتيجة" },
  ],
};

const THEMES: Record<string, { badgeColor: string; borderColor: string; emoji: string; title: string; accentColor: string; bgFrom: string; bgTo: string }> = {
  "fertility-tea": { badgeColor: "bg-pink-50 text-pink-700 border-pink-200", borderColor: "border-pink-200", emoji: "🌸", title: "شاي Fertility", accentColor: "text-pink-400", bgFrom: "#2D0A1B", bgTo: "#1A0511" },
  "colon-comfort-tea": { badgeColor: "bg-amber-50 text-amber-700 border-amber-200", borderColor: "border-amber-200", emoji: "🌼", title: "شاي راحة القولون", accentColor: "text-[#C99A45]", bgFrom: "#0F1A14", bgTo: "#071C12" },
  "hemorrhoid-comfort-tea": { badgeColor: "bg-rose-50 text-rose-700 border-rose-200", borderColor: "border-rose-200", emoji: "🌸", title: "شاي دعم الراحة", accentColor: "text-[#C99A45]", bgFrom: "#0F1A14", bgTo: "#071C12" },
  "liver-wellness-tea": { badgeColor: "bg-teal-50 text-teal-700 border-teal-200", borderColor: "border-teal-200", emoji: "🌿", title: "شاي دعم الكبد", accentColor: "text-[#C99A45]", bgFrom: "#0F1A14", bgTo: "#071C12" },
  "lung-smoking-support-tea": { badgeColor: "bg-sky-50 text-sky-700 border-sky-200", borderColor: "border-sky-200", emoji: "🍀", title: "شاي دعم الرئة", accentColor: "text-[#C99A45]", bgFrom: "#0F1A14", bgTo: "#071C12" },
  "prostate-wellness-tea": { badgeColor: "bg-violet-50 text-violet-700 border-violet-200", borderColor: "border-violet-200", emoji: "🌱", title: "شاي البروستات", accentColor: "text-[#C99A45]", bgFrom: "#0F1A14", bgTo: "#071C12" },
  "axis-y-serum": { badgeColor: "bg-orange-50 text-orange-700 border-orange-200", borderColor: "border-orange-200", emoji: "✨", title: "عناية البشرة", accentColor: "text-[#C99A45]", bgFrom: "#0F1A14", bgTo: "#071C12" },
  "scar-gel": { badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200", borderColor: "border-cyan-200", emoji: "💧", title: "جل علاج الندوب", accentColor: "text-[#C99A45]", bgFrom: "#0F1A14", bgTo: "#071C12" },
};

export function BeforeAfterCarousel({ productSlug }: { productSlug?: string }) {
  if (!productSlug) return null;

  if (productSlug === "weight-support-tea") {
    const doubled = [...TRANSFORMATIONS, ...TRANSFORMATIONS];
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0F1A14] to-[#071C12] overflow-hidden" aria-labelledby="ba-carousel-title">
        <div className="max-w-[1200px] mx-auto px-4 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4 border border-white/20">
            <span className="text-[#C99A45]">📸</span>
            <span className="text-sm font-bold text-white tracking-wide">نتائج حقيقية</span>
          </div>
          <h2 id="ba-carousel-title" className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            قبل وبعد — عملاؤنا يتكلمون بالصور
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            نتائج حقيقية من عملاء استخدموا شاي بيت الصحة لمدة 3 أشهر مع نمط حياة صحي
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C99A45] to-transparent mx-auto mt-5" />
        </div>

        <div className="relative mb-5" dir="ltr">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#0F1A14] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#0F1A14] to-transparent" />
          <div className="flex gap-5 animate-marquee-ba py-2">
            {doubled.map((t, i) => (
              <TransformationCard key={`r1-${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "+15,000", label: "عميل سعيد", icon: "👥" },
              { value: "-12 كغ", label: "معدل النزول في 3 أشهر", icon: "⚖️" },
              { value: "98%", label: "نسبة رضا العملاء", icon: "⭐" },
              { value: "6 دول", label: "توصيل خليجي", icon: "🚚" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <span className="text-xl md:text-2xl font-extrabold text-[#C99A45] block">{stat.value}</span>
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const reviews = REVIEWS_MAP[productSlug];
  const theme = THEMES[productSlug];

  if (!reviews || !theme) return null;

  const doubled = [...reviews, ...reviews];

  return (
    <section className={`py-12 md:py-16 bg-gradient-to-b overflow-hidden`} style={{ background: `linear-gradient(to bottom, ${theme.bgFrom}, ${theme.bgTo})` }} aria-labelledby="ba-carousel-title">
      <div className="max-w-[1200px] mx-auto px-4 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4 border border-white/20">
          <span className={theme.accentColor}>{theme.emoji}</span>
          <span className="text-sm font-bold text-white tracking-wide">تجارب حقيقية</span>
        </div>
        <h2 id="ba-carousel-title" className="text-2xl md:text-4xl font-extrabold text-white mb-3">
          ثقة مجتمعك، اختيارك الذكي
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          تجارب حقيقية من عملاء في الخليج والوطن العربي استخدموا {theme.title} من بيت الصحة
        </p>
        <div className="w-24 h-0.5 mx-auto mt-5" style={{ background: `linear-gradient(to right, transparent, ${theme.bgFrom === "#2D0A1B" ? "#f472b6" : "#C99A45"}, transparent)` }} />
      </div>

      <div className="relative mb-5" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10" style={{ background: `linear-gradient(to right, ${theme.bgFrom}, transparent)` }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10" style={{ background: `linear-gradient(to left, ${theme.bgFrom}, transparent)` }} />
        <div className="flex gap-5 animate-marquee-ba py-2">
          {doubled.map((r, i) => (
            <ProductReviewCard 
              key={`fr-${r.id}-${i}`} 
              r={r} 
              productName={`${theme.emoji} ${theme.title}`} 
              badgeColor={theme.badgeColor} 
              borderColor={theme.borderColor} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "+1,240", label: "عميل راضٍ", icon: "👥" },
            { value: "4.9/5", label: "تقييم المنتج", icon: "⭐" },
            { value: "97%", label: "نسبة رضا العملاء", icon: "💕" },
            { value: "9 دول", label: "توصيل عربي", icon: "🚚" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <span className={`text-xl md:text-2xl font-extrabold ${theme.accentColor} block`}>{stat.value}</span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'components/product/BeforeAfterCarousel.tsx');
let content = fs.readFileSync(file, 'utf8');

// The new reviews and component logic
const newExport = `const REVIEWS_MAP: Record<string, ProductReview[]> = {
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
};

const THEMES: Record<string, { badgeColor: string; borderColor: string; emoji: string; title: string }> = {
  "fertility-tea": { badgeColor: "bg-pink-50 text-pink-700 border-pink-200", borderColor: "border-pink-200", emoji: "🌸", title: "شاي Fertility" },
  "colon-comfort-tea": { badgeColor: "bg-amber-50 text-amber-700 border-amber-200", borderColor: "border-amber-200", emoji: "🌼", title: "شاي راحة القولون" },
  "hemorrhoid-comfort-tea": { badgeColor: "bg-rose-50 text-rose-700 border-rose-200", borderColor: "border-rose-200", emoji: "🌸", title: "شاي دعم الراحة" },
  "liver-wellness-tea": { badgeColor: "bg-teal-50 text-teal-700 border-teal-200", borderColor: "border-teal-200", emoji: "🌿", title: "شاي دعم الكبد" },
  "lung-smoking-support-tea": { badgeColor: "bg-sky-50 text-sky-700 border-sky-200", borderColor: "border-sky-200", emoji: "🍀", title: "شاي دعم الرئة" },
  "prostate-wellness-tea": { badgeColor: "bg-violet-50 text-violet-700 border-violet-200", borderColor: "border-violet-200", emoji: "🌱", title: "شاي البروستات" },
  "axis-y-serum": { badgeColor: "bg-orange-50 text-orange-700 border-orange-200", borderColor: "border-orange-200", emoji: "✨", title: "عناية البشرة" },
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
              <TransformationCard key={\`r1-\${t.id}-\${i}\`} t={t} />
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "+15,000", label: "عميل سعيد", icon: "👥" },
              { value: "-12 كغ", label: "معدل النزول في 3 أشهر", icon: "⚖️" },
              { value: "98٪", label: "نسبة رضا العملاء", icon: "⭐" },
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
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#2D0A1B] to-[#1A0511] overflow-hidden" aria-labelledby="ba-carousel-title">
      <div className="max-w-[1200px] mx-auto px-4 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4 border border-white/20">
          <span className="text-pink-400">{theme.emoji}</span>
          <span className="text-sm font-bold text-white tracking-wide">تجارب حقيقية</span>
        </div>
        <h2 id="ba-carousel-title" className="text-2xl md:text-4xl font-extrabold text-white mb-3">
          ثقة مجتمعك، اختيارك الذكي
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          تجارب حقيقية من عملاء في الخليج والوطن العربي استخدموا {theme.title} من بيت الصحة
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-5" />
      </div>

      <div className="relative mb-5" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#2D0A1B] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#2D0A1B] to-transparent" />
        <div className="flex gap-5 animate-marquee-ba py-2">
          {doubled.map((r, i) => (
            <ProductReviewCard 
              key={\`fr-\${r.id}-\${i}\`} 
              r={r} 
              productName={\`\${theme.emoji} \${theme.title}\`} 
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
            { value: "97٪", label: "نسبة رضا العملاء", icon: "💕" },
            { value: "9 دول", label: "توصيل عربي", icon: "🚚" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <span className="text-xl md:text-2xl font-extrabold text-pink-400 block">{stat.value}</span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;

content = content.replace(/export function BeforeAfterCarousel[\s\S]*/, newExport);

fs.writeFileSync(file, content, 'utf8');
console.log('done replacing carousel');

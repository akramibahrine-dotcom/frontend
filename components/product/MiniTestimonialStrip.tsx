"use client";

type MiniReview = {
  name: string;
  flag: string;
  city: string;
  age: number;
  quote: string;
  badge: string;
};

const MINI_REVIEWS: Record<string, MiniReview[]> = {
  "fertility-tea": [
    { name: "نوف الحربي", flag: "🇸🇦", city: "الرياض", age: 29, quote: "بعد سنتين محاولات، بديت أشرب الشاي بانتظام وحسّيت بتغيّر في دورتي وانتظامها. الحمدلله أنا الحين حامل في الشهر الثالث!", badge: "🌸 نتيجة مباركة 🌸" },
    { name: "هند السبيعي", flag: "🇸🇦", city: "جدة", age: 31, quote: "كنت أعاني من عدم انتظام الدورة. بعد شهرين من الشاي، انتظمت والحمدلله حصل الحمل!", badge: "💕 حمل سعيد" },
    { name: "مريم الكعبي", flag: "🇦🇪", city: "أبوظبي", age: 27, quote: "جربت أشياء كثيرة بدون فايدة. هالشاي كان الفرق، الحمدلله أنا حامل!", badge: "🌷 بشرى سارة" },
    { name: "فاطمة المري", flag: "🇶🇦", city: "الدوحة", age: 33, quote: "3 سنوات انتظار وأخيراً الله كرمني. الشاي ساعدني أنظم هرموناتي بشكل طبيعي.", badge: "🤲 الحمدلله" },
  ],
  "weight-support-tea": [
    { name: "سعود المطيري", flag: "🇸🇦", city: "الرياض", age: 30, quote: "نزلت 14 كيلو بدون حرمان! هالشاي غيّر حياتي والله.", badge: "⚖️ -14 كغ" },
    { name: "نورة الشمري", flag: "🇸🇦", city: "جدة", age: 28, quote: "بعد الولادة وزني زاد كثير، واليوم رجعت لوزني الطبيعي. مشكورين!", badge: "🎯 هدف متحقق" },
    { name: "أحمد العنزي", flag: "🇰🇼", city: "الكويت", age: 35, quote: "كنت أحس بثقل دائم، الشاي خفف وزني وحسّن نشاطي بشكل ملحوظ.", badge: "💪 نشاط وحيوية" },
    { name: "ريم العتيبي", flag: "🇸🇦", city: "مكة", age: 25, quote: "9 كيلو في شهرين! ما توقعت النتيجة بهالسرعة.", badge: "🔥 -9 كغ" },
  ],
  "colon-comfort-tea": [
    { name: "فيصل الشمري", flag: "🇸🇦", city: "الرياض", age: 34, quote: "سنوات من الانتفاخ بعد الأكل راحت. كوب واحد بعد العشا والقولون هادي تماماً.", badge: "🌼 قولون مرتاح" },
    { name: "منى العتيبي", flag: "🇸🇦", city: "جدة", age: 28, quote: "الغازات كانت تحرجني بالدوام. النتيجة رهيبة ومريحة.", badge: "✅ بدون غازات" },
    { name: "خالد الدوسري", flag: "🇸🇦", city: "الخبر", age: 40, quote: "أخيراً لقيت شي طبيعي يريح معدتي بدون أدوية.", badge: "🍃 راحة طبيعية" },
  ],
  "hemorrhoid-comfort-tea": [
    { name: "ناصر الحربي", flag: "🇸🇦", city: "الرياض", age: 38, quote: "كنت أتألم كل يوم، والحين الحمدلله مرتاح مع الشاي بشكل يومي.", badge: "✅ راحة يومية" },
    { name: "سلمان العمري", flag: "🇸🇦", city: "أبها", age: 45, quote: "شي طبيعي وفعّال، ما احتجت أروح عيادة.", badge: "🌿 حل طبيعي" },
    { name: "عبدالله الغامدي", flag: "🇸🇦", city: "جدة", age: 42, quote: "الحمدلله تحسّن واضح من أول أسبوع.", badge: "⭐ تحسّن سريع" },
  ],
  "liver-wellness-tea": [
    { name: "محمد الزهراني", flag: "🇸🇦", city: "الطائف", age: 50, quote: "تحاليلي تحسّنت بشكل واضح بعد 3 أشهر من الاستخدام المنتظم.", badge: "📊 تحاليل ممتازة" },
    { name: "فهد البلوي", flag: "🇸🇦", city: "تبوك", age: 44, quote: "كبدي كان متعب، والحين أحس بفرق كبير والحمدلله.", badge: "💚 كبد صحي" },
    { name: "سارة المالكي", flag: "🇸🇦", city: "مكة", age: 36, quote: "شاي لطيف وخفيف، وأحس جسمي أنظف من الداخل.", badge: "✨ نقاء" },
  ],
  "lung-smoking-support-tea": [
    { name: "يوسف الشهري", flag: "🇸🇦", city: "الرياض", age: 32, quote: "تركت التدخين وهالشاي ساعدني أنظف رئتي. أتنفس أحسن بكثير.", badge: "🌬️ تنفس أفضل" },
    { name: "عادل الحارثي", flag: "🇸🇦", city: "جدة", age: 40, quote: "15 سنة تدخين والحين أحس بتحسّن واضح مع الشاي.", badge: "🍀 بداية جديدة" },
    { name: "ماجد القرني", flag: "🇸🇦", city: "الباحة", age: 28, quote: "الكحة اللي كانت معي من التدخين خفّت كثير.", badge: "💨 رئة نظيفة" },
  ],
  "prostate-wellness-tea": [
    { name: "عبدالرحمن العسيري", flag: "🇸🇦", city: "الرياض", age: 55, quote: "الاستيقاظ المتكرر بالليل قلّ بشكل ملحوظ. شاي ممتاز.", badge: "🌙 نوم مريح" },
    { name: "سلطان الدوسري", flag: "🇸🇦", city: "الدمام", age: 48, quote: "أول مرة ألقى منتج طبيعي فعلاً يساعد. مشكورين بيت الصحة.", badge: "🌱 عناية طبيعية" },
    { name: "خالد المطيري", flag: "🇰🇼", city: "الكويت", age: 52, quote: "3 أشهر استخدام وتحسّن واضح الحمدلله.", badge: "✅ نتيجة ممتازة" },
  ],
  "axis-y-serum": [
    { name: "لمياء الرشيدي", flag: "🇸🇦", city: "الرياض", age: 26, quote: "بشرتي صارت ناعمة ومشرقة من أول أسبوع! منتج رهيب.", badge: "✨ بشرة مشرقة" },
    { name: "دلال السبيعي", flag: "🇸🇦", city: "جدة", age: 30, quote: "الحبوب خفّت وبشرتي صارت صافية. أنصح فيه بقوة!", badge: "💎 بشرة صافية" },
    { name: "هيا العجمي", flag: "🇰🇼", city: "الكويت", age: 24, quote: "جربت سيرومات كثيرة بس هذا أفضلهم بصراحة.", badge: "⭐ الأفضل" },
  ],
  "scar-gel": [
    { name: "عبدالله الشهري", flag: "🇸🇦", city: "الرياض", age: 34, quote: "ندبة عملية الزائدة اختفت تقريباً بعد شهر ونص! والله ما صدقت.", badge: "✅ ندبة اختفت" },
    { name: "نورة الدوسري", flag: "🇸🇦", city: "جدة", age: 28, quote: "آثار حروق قديمة من 5 سنوات خفّت بشكل ملحوظ. الجل سحري!", badge: "🔥 حروق قديمة" },
    { name: "حمد الكواري", flag: "🇶🇦", city: "الدوحة", age: 31, quote: "ندوب حب الشباب على وجهي خفّت 80% بعد شهرين. أفضل منتج جربته.", badge: "💎 بشرة صافية" },
    { name: "فاطمة البلوشي", flag: "🇦🇪", city: "أبوظبي", age: 25, quote: "أثر الجرح على يدي صار شبه مختفي. الجل خفيف وما يترك أثر دهني.", badge: "⭐ نتيجة مبهرة" },
  ],
};

export function MiniTestimonialStrip({ productSlug }: { productSlug: string }) {
  const reviews = MINI_REVIEWS[productSlug];
  if (!reviews || reviews.length === 0) return null;

  const doubled = [...reviews, ...reviews];

  return (
    <div className="overflow-hidden py-3 mb-6 rounded-2xl bg-[#F8F1E7]/50 border border-[#E8D8C3]">
      <div className="relative" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-[#F8F1E7]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-[#F8F1E7]/80 to-transparent" />
        <div className="flex gap-4 animate-marquee-mini whitespace-nowrap py-1">
          {doubled.map((r, i) => (
            <div
              key={`mini-${r.name}-${i}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E8D8C3] shadow-sm shrink-0"
            >
              <span className="font-bold text-[#155235] text-xs">{r.name}</span>
              <span className="text-xs">{r.flag} {r.city}</span>
              <span className="text-[#C99A45] text-xs">★★★★★</span>
              <span className="text-[#6E675F] text-xs max-w-[200px] truncate">&quot;{r.quote.slice(0, 50)}...&quot;</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#F8F1E7] rounded-full text-[#155235] font-bold">{r.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

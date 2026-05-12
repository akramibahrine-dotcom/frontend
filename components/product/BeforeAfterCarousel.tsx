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

const TRANSFORMATIONS: Transformation[] = [
  {
    id: 1,
    nameAr: "سعود المطيري",
    cityAr: "🇸🇦 الرياض",
    age: 30,
    lostKg: 14,
    durationAr: "٣ أشهر",
    quoteAr: "كنت أجرب كل شيء وما ينفع، بس هالشاي غيّر حياتي. نزلت ١٤ كيلو بدون حرمان!",
    image: "/transformations/ba-01.jpg",
  },
  {
    id: 2,
    nameAr: "نورة الشمري",
    cityAr: "🇸🇦 جدة",
    age: 28,
    lostKg: 11,
    durationAr: "٣ أشهر",
    quoteAr: "بعد الولادة وزني زاد كثير، واليوم رجعت لوزني الطبيعي. مشكورين بيت الصحة!",
    image: "/transformations/ba-02.jpg",
  },
  {
    id: 3,
    nameAr: "فهد القحطاني",
    cityAr: "🇸🇦 الدمام",
    age: 45,
    lostKg: 18,
    durationAr: "٣ أشهر",
    quoteAr: "عمري ٤٥ وكنت فاقد الأمل، لكن بفضل الله ثم هالمنتج نزلت ١٨ كيلو. أحس بطاقة شباب!",
    image: "/transformations/ba-03.jpg",
  },
  {
    id: 4,
    nameAr: "ريم العتيبي",
    cityAr: "🇸🇦 مكة",
    age: 25,
    lostKg: 9,
    durationAr: "شهرين",
    quoteAr: "كوب واحد يوميًا وانتظام بالأكل — والنتيجة تتكلم عن نفسها. ٩ كيلو راحوا!",
    image: "/transformations/ba-04.jpg",
  },
  {
    id: 5,
    nameAr: "خالد الدوسري",
    cityAr: "🇸🇦 بريدة",
    age: 38,
    lostKg: 16,
    durationAr: "٣ أشهر",
    quoteAr: "كرشي اختفى والحمدلله! زوجتي ما صدقت الفرق. شكرًا بيت الصحة على المنتج الرهيب.",
    image: "/transformations/ba-05.jpg",
  },
  {
    id: 6,
    nameAr: "هيا السبيعي",
    cityAr: "🇸🇦 الطائف",
    age: 35,
    lostKg: 13,
    durationAr: "٣ أشهر",
    quoteAr: "جسمي تغيّر بشكل ملحوظ والأهم إني ما حسّيت بأي تعب. طبيعي ١٠٠٪ وفعّال.",
    image: "/transformations/ba-06.jpg",
  },
  {
    id: 7,
    nameAr: "عبدالله الحربي",
    cityAr: "🇸🇦 المدينة",
    age: 50,
    lostKg: 20,
    durationAr: "٤ أشهر",
    quoteAr: "نزلت ٢٠ كيلو وأنا في الخمسين! الدكتور استغرب وقالي استمر على اللي تسويه.",
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
    durationAr: "٣ أشهر",
    quoteAr: "طلبته وأنا بالإمارات ووصلني بسرعة. ١٥ كيلو فرق والملابس القديمة صارت واسعة!",
    image: "/transformations/ba-09.jpg",
  },
  {
    id: 10,
    nameAr: "منيرة الزهراني",
    cityAr: "🇸🇦 أبها",
    age: 40,
    lostKg: 17,
    durationAr: "٣ أشهر",
    quoteAr: "بعد سنين من المعاناة مع الوزن، أخيرًا لقيت الحل. ١٧ كيلو نزلت والهضم تحسّن!",
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
    quoteAr: "أسهل دايت سويته بحياتي — كوب شاي وأكل صحي، و١٠ كيلو راحوا بدون رجعة!",
    image: "/transformations/ba-12.jpg",
  },
  {
    id: 13,
    nameAr: "أحمد البلوشي",
    cityAr: "🇴🇲 مسقط",
    age: 42,
    lostKg: 19,
    durationAr: "٤ أشهر",
    quoteAr: "كنت ١٠٥ كيلو وصرت ٨٦. الشاي مع المشي اليومي سوّوا عجايب. ممتاز!",
    image: "/transformations/ba-13.jpg",
  },
  {
    id: 14,
    nameAr: "دلال الكندري",
    cityAr: "🇧🇭 المنامة",
    age: 27,
    lostKg: 11,
    durationAr: "٣ أشهر",
    quoteAr: "صديقتي نصحتني فيه وما ندمت لحظة. بطني انسدّ والأكل الزايد قلّ بشكل كبير.",
    image: "/transformations/ba-14.jpg",
  },
  {
    id: 15,
    nameAr: "تركي الشهري",
    cityAr: "🇸🇦 خميس مشيط",
    age: 36,
    lostKg: 14,
    durationAr: "٣ أشهر",
    quoteAr: "والله إني فرحان بالنتيجة. صحتي تحسّنت وكرشي راح. أفضل قرار أخذته!",
    image: "/transformations/ba-15.jpg",
  },
];

function TransformationCard({ t }: { t: Transformation }) {
  return (
    <article
      className="relative shrink-0 w-[min(90vw,320px)] md:w-[340px] rounded-2xl overflow-hidden bg-white border border-[#E8D8C3] shadow-lg"
      dir="rtl"
    >
      {/* Before/After Image */}
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
        {/* Weight lost badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-2">
          <span className="text-[#C99A45] font-extrabold text-sm">-{t.lostKg} كغ</span>
          <span className="text-white/60 text-xs">في {t.durationAr}</span>
        </div>
      </div>

      {/* Info */}
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

export function BeforeAfterCarousel() {
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
          نتائج حقيقية من عملاء استخدموا شاي بيت الصحة لمدة ٣ أشهر مع نمط حياة صحي
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C99A45] to-transparent mx-auto mt-5" />
      </div>

      {/* Row 1: scroll right */}
      <div className="relative mb-5" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#0F1A14] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#0F1A14] to-transparent" />
        <div className="flex gap-5 animate-marquee-ba py-2">
          {doubled.map((t, i) => (
            <TransformationCard key={`r1-${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-[1200px] mx-auto px-4 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "+١٥,٠٠٠", label: "عميل سعيد", icon: "👥" },
            { value: "-١٢ كغ", label: "معدل النزول في ٣ أشهر", icon: "⚖️" },
            { value: "٩٨٪", label: "نسبة رضا العملاء", icon: "⭐" },
            { value: "٦ دول", label: "توصيل خليجي", icon: "🚚" },
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

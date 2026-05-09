"use client";

const SLOTS = [
  { id: "b1", hintAr: "غلاف المنتج — قريبًا" },
  { id: "b2", hintAr: "لقطة استخدام يومي — قريبًا" },
  { id: "b3", hintAr: "تغليف فاخر — قريبًا" },
  { id: "b4", hintAr: "صورة العلامة — قريبًا" },
  { id: "b5", hintAr: "مجموعة العائلة — قريبًا" },
  { id: "b6", hintAr: "تجربة غمس الشاي — قريبًا" },
];

export function BrandGalleryMarquee() {
  const loop = [...SLOTS, ...SLOTS];

  return (
    <section
      className="py-14 md:py-20 bg-[#0D2B1D] overflow-hidden border-y border-[#155235]/40"
      aria-labelledby="brand-gallery-title"
    >
      <div className="max-w-[1200px] mx-auto px-4 mb-8 md:mb-10 text-center">
        <h2 id="brand-gallery-title" className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          بيت الصحة بالصورة
        </h2>
        <p className="text-[#C99A45]/80 text-sm md:text-base max-w-xl mx-auto">
          مساحة جاهزة لصوركم الرسمية والحِرف التسويقية — أضيفوا الصور لاحقًا بنفس المقاسات (جوال، تابلت، سطح مكتب).
        </p>
      </div>

      <div className="relative md:hidden px-2">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin px-2 [-webkit-overflow-scrolling:touch]">
          {SLOTS.map((slot) => (
            <figure
              key={slot.id}
              className="snap-center shrink-0 w-[85vw] max-w-sm aspect-[4/5] rounded-3xl border border-[#C99A45]/25 bg-gradient-to-br from-[#071C12] to-[#155235]/40 flex flex-col items-center justify-center p-6 text-center shadow-inner"
            >
              <span className="text-5xl mb-4 opacity-40" aria-hidden>
                🖼️
              </span>
              <figcaption className="text-[#C99A45] font-bold text-sm">{slot.hintAr}</figcaption>
              <span className="text-[#FFFFFF]/35 text-xs mt-3">Placeholder — استبدال بالصورة</span>
            </figure>
          ))}
        </div>
      </div>

      <div className="hidden md:block relative" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-[#0D2B1D] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-[#0D2B1D] to-transparent" />

        <div className="flex gap-6 lg:gap-8 animate-marquee-brand hover:[animation-play-state:paused] py-2 items-stretch">
          {loop.map((slot, i) => (
            <figure
              key={`${slot.id}-${i}`}
              className="shrink-0 w-[min(42vw,420px)] lg:w-[460px] aspect-[16/10] lg:aspect-[16/9] rounded-[2rem] border border-[#C99A45]/20 bg-gradient-to-br from-[#071C12] via-[#0D2B1D] to-[#155235]/30 flex flex-col items-center justify-center p-8 text-center shadow-xl"
            >
              <span className="text-6xl mb-4 opacity-35" aria-hidden>
                🖼️
              </span>
              <figcaption className="text-[#C99A45] font-extrabold text-base lg:text-lg">{slot.hintAr}</figcaption>
              <span className="text-[#FFFFFF]/30 text-xs mt-3 tracking-wide">Placeholder — replace image</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

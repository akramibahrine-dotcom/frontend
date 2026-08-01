"use client";

import { PRODUCTS } from "@/content/products";

const GALLERY_ITEMS = PRODUCTS.flatMap((p) =>
  p.images.slice(0, 2).map((img, i) => ({
    id: `${p.id}-${i}`,
    image: img,
    nameAr: p.nameAr,
  }))
);

export function BrandGalleryMarquee() {
  const loop = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

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
          تعرّف على منتجاتنا العشبية الطبيعية — جودة تراها قبل أن تجرّبها.
        </p>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="relative md:hidden px-2">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-2 [-webkit-overflow-scrolling:touch]">
          {GALLERY_ITEMS.map((item) => (
            <figure
              key={item.id}
              className="snap-center shrink-0 w-[75vw] max-w-xs rounded-3xl overflow-hidden border border-[#C99A45]/25 shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.nameAr}
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <figcaption className="bg-[#071C12] text-center py-3 px-2">
                <span className="text-[#C99A45] font-bold text-sm">{item.nameAr}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Desktop: auto-scrolling marquee */}
      <div className="hidden md:block relative" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-[#0D2B1D] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-[#0D2B1D] to-transparent" />

        <div className="flex gap-6 lg:gap-8 animate-marquee-brand hover:[animation-play-state:paused] py-2 items-stretch">
          {loop.map((item, i) => (
            <figure
              key={`${item.id}-${i}`}
              className="shrink-0 w-[min(38vw,380px)] lg:w-[400px] rounded-[2rem] overflow-hidden border border-[#C99A45]/20 shadow-xl group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.nameAr}
                className="w-full aspect-[16/10] lg:aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

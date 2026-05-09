"use client";

import Image from "next/image";
import { CUSTOMER_REVIEWS, portraitUrl } from "@/content/customer-reviews";
import { COPY } from "@/content/copy";

function ReviewCard({ review }: { review: (typeof CUSTOMER_REVIEWS)[0] }) {
  const src = portraitUrl(review);

  return (
    <article
      className="relative shrink-0 w-[min(88vw,280px)] md:w-[300px] rounded-2xl bg-white border border-[#E8D8C3] shadow-md overflow-hidden flex flex-col"
      dir="rtl"
    >
      <div className="relative aspect-[4/5] bg-[#0D2B1D]">
        <Image
          src={src}
          alt={`صورة مراجعة من ${review.nameAr}`}
          fill
          sizes="300px"
          className="object-cover opacity-95"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071C12]/90 via-transparent to-transparent" />
        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg text-[#155235] text-xl border-2 border-[#C99A45]/60">
            ▶
          </span>
        </button>
        <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-white font-extrabold text-sm drop-shadow-md">{review.nameAr}</p>
            <p className="text-[#C99A45] text-xs font-bold drop-shadow">{review.countryAr}</p>
          </div>
          <span className="text-xs font-bold bg-black/45 text-white px-2 py-1 rounded-full backdrop-blur-sm whitespace-nowrap border border-white/10">
            {review.sceneEmoji} {review.sceneLabelAr}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-[#C99A45] text-sm mb-2" aria-hidden>
          {"★".repeat(review.rating)}
        </div>
        <p className="text-[#567063] text-sm leading-relaxed line-clamp-4 flex-1">{review.quoteAr}</p>
      </div>
    </article>
  );
}

export function ReviewsMarquee() {
  if (CUSTOMER_REVIEWS.length === 0) {
    return (
      <section
        className="py-14 md:py-16 bg-[#F5F3EE] border-y border-[#E8E2D8]"
        aria-labelledby="reviews-marquee-title"
      >
        <div className="max-w-[720px] mx-auto px-4 text-center">
          <h2 id="reviews-marquee-title" className="text-2xl md:text-3xl font-extrabold text-[#0F1A14] mb-3">
            {COPY.reviewsPlaceholderTitleAr}
          </h2>
          <div className="divider-mint w-24 mx-auto my-5" />
          <p className="text-[#567063] leading-relaxed">{COPY.reviewsPlaceholderBodyAr}</p>
          <p className="mt-6 text-sm font-bold text-[#155235]">بيت الصحة</p>
        </div>
      </section>
    );
  }

  const doubled = [...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden" aria-labelledby="reviews-marquee-title">
      <div className="max-w-[1200px] mx-auto px-4 mb-8 text-center">
        <h2 id="reviews-marquee-title" className="text-2xl md:text-3xl font-extrabold text-[#0F1A14] mb-2">
          أصدقاء بيت الصحة
        </h2>
        <p className="text-[#567063] text-sm md:text-base max-w-2xl mx-auto">
          لمحاتٌ من ناسٍ جرّبوا روتينًا عشبيًا هادئًا — كلماتهم عن التجربة، لا عن نتائجٍ طبيةٍ نعد بها.
        </p>
        <div className="divider-mint w-24 mx-auto mt-5" />
      </div>

      <div className="relative" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="flex gap-5 animate-marquee-reviews hover:[animation-play-state:paused] py-2">
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

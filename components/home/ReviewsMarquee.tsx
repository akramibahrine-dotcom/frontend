"use client";

import Image from "next/image";
import { CUSTOMER_REVIEWS } from "@/content/customer-reviews";
import { useCopy } from "@/hooks/useCopy";
import { getLocalizedReview } from "@/lib/get-localized-product";

function ReviewCard({ review }: { review: (typeof CUSTOMER_REVIEWS)[0] }) {
  const { lang } = useCopy();
  const localized = getLocalizedReview(review, lang);
  const src = review.portraitFile;

  return (
    <article
      className="relative shrink-0 w-[min(88vw,280px)] md:w-[300px] rounded-2xl bg-white border border-[#E8D8C3] shadow-md overflow-hidden flex flex-col"
      dir="rtl"
    >
      <div className="relative h-20 bg-gradient-to-br from-[#0D2B1D] to-[#155235]">
        <div className="absolute -bottom-8 right-4">
          <div className="w-16 h-16 rounded-full border-3 border-white shadow-lg overflow-hidden bg-[#E8D8C3]">
            <Image
              src={src}
              alt={localized.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        </div>
      </div>
      <div className="p-4 pt-12 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-extrabold text-[#0F1A14] text-sm">{localized.name}</p>
            <p className="text-[#567063] text-xs">{localized.country}</p>
          </div>
          <div className="text-[#C99A45] text-sm" aria-hidden>
            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
          </div>
        </div>
        <p className="text-[#567063] text-sm leading-relaxed line-clamp-4 flex-1">{localized.quote}</p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-xs bg-[#F5F3EE] text-[#567063] px-2 py-0.5 rounded-full border border-[#E8E2D8]">
            {review.sceneEmoji} {localized.sceneLabel}
          </span>
        </div>
      </div>
    </article>
  );
}

export function ReviewsMarquee() {
  const { reviewsTitle, page } = useCopy();

  if (CUSTOMER_REVIEWS.length === 0) return null;

  const doubled = [...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden" aria-labelledby="reviews-marquee-title">
      <div className="max-w-[1200px] mx-auto px-4 mb-8 text-center">
        <h2 id="reviews-marquee-title" className="text-2xl md:text-3xl font-extrabold text-[#0F1A14] mb-2">
          {reviewsTitle}
        </h2>
        <p className="text-[#567063] text-sm md:text-base max-w-2xl mx-auto">
          {page.reviewsMarqueeSub}
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

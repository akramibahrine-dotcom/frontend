"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cart-store";
import { useCurrencyStore } from "@/store/currency-store";
import { useWelcomePromoStore } from "@/store/welcome-promo-store";
import { UpsellModal } from "./UpsellModal";
import { COPY } from "@/content/copy";
import { isValidPhone } from "@/lib/phone";
import { generateEventId } from "@/lib/events";
import { trackInitiateCheckout } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, COPY.checkout.nameErrorAr).max(80, COPY.checkout.nameErrorAr),
  phone: z.string().refine(isValidPhone, { message: COPY.checkout.phoneErrorAr }),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  onClose: () => void;
};

export function CheckoutModal({ onClose }: Props) {
  const { items, getTotal } = useCartStore();
  const format = useCurrencyStore((s) => s.format);
  const welcomePromo = useWelcomePromoStore((s) => s.active);
  const [showUpsell, setShowUpsell] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "" },
  });

  const total = getTotal();

  function onSubmit(data: FormValues) {
    setFormData(data);
    const eventId = generateEventId();
    trackInitiateCheckout(total, eventId);
    setShowUpsell(true);
  }

  if (showUpsell && formData) {
    return (
      <UpsellModal
        customer={formData}
        onClose={onClose}
        cartItems={items}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-[#071C12]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6",
          "animate-scale-in shadow-2xl",
          "bg-[#0D2B1D] border border-[#155235]/60"
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="checkout-title" className="text-xl font-bold text-white">
            {COPY.checkout.titleAr}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#155235]/50 flex items-center justify-center hover:bg-[#155235] transition-colors text-[#C99A45]"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>

        <div className="mb-5 p-3 bg-[#155235]/30 border border-[#155235]/50 rounded-xl text-sm">
          <div className="flex gap-4 items-center border-b border-[#155235]/50 pb-3 mb-3">
            {/* Offer Image Placeholder */}
            <div className="w-16 h-16 bg-[#071C12] rounded-lg border border-[#155235] flex items-center justify-center text-2xl shrink-0 shadow-inner">
              📦
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-base">باقة مختارة</h3>
              <p className="text-xs text-[#C99A45] mt-1">تأكيدٌ على الخادم + الدفع عند الاستلام</p>
            </div>
          </div>
          <div className="flex justify-between font-medium mb-2">
            <span className="text-[#FFFFFF]/70">إجمالي الطلب</span>
            <span className="font-extrabold text-[#C99A45] text-lg">{format(total)}</span>
          </div>
          {welcomePromo && (
            <p className="text-[11px] text-center text-emerald-400/90 font-bold mb-1">
              ✓ عرض ترحيب بيت الصحة مفعّل — أسعار الباقات كما هي معروضة
            </p>
          )}
          <p className="text-xs text-center text-[#FFFFFF]/50 flex items-center justify-center gap-1">
            <span className="text-[#C99A45]">🛡️</span> 
            ضمان استرجاع لمدة 30 يوم
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-bold text-[#FFFFFF] mb-1.5">
              الاسم الكامل
            </label>
            <input
              id="checkout-name"
              type="text"
              autoComplete="name"
              placeholder={COPY.checkout.namePlaceholderAr}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 text-right text-white",
                "bg-[#071C12] placeholder:text-[#567063] focus:outline-none transition-colors",
                errors.name
                  ? "border-[#B42318] focus:border-[#B42318]"
                  : "border-[#155235] focus:border-[#C99A45]"
              )}
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-[#B42318] text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="checkout-phone" className="block text-sm font-bold text-[#FFFFFF] mb-1.5">
              رقم الجوال
            </label>
            <input
              id="checkout-phone"
              type="tel"
              inputMode="tel"
              dir="rtl"
              autoComplete="tel"
              placeholder="05XXXXXXXX"
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 text-right text-white",
                "bg-[#071C12] placeholder:text-[#567063] focus:outline-none transition-colors",
                errors.phone
                  ? "border-[#B42318] focus:border-[#B42318]"
                  : "border-[#155235] focus:border-[#C99A45]"
              )}
              {...register("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-[#B42318] text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "btn-luxury w-full py-4 rounded-full font-bold text-base transition-all duration-150",
              "active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {isSubmitting ? COPY.checkout.submittingAr : COPY.checkout.ctaAr}
          </button>

          <p className="text-xs text-center text-[#FFFFFF]/50 leading-relaxed">
            {COPY.checkout.privacyAr}
          </p>
        </form>
      </div>
    </div>
  );
}

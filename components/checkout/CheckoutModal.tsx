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
import { getPayableBundlePriceSar } from "@/lib/pricing";
import { PRODUCTS } from "@/content/products";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, COPY.checkout.nameErrorAr).max(80, COPY.checkout.nameErrorAr),
  phone: z.string().refine(isValidPhone, { message: COPY.checkout.phoneErrorAr }),
  address: z.string().min(5, "أدخلي العنوان كاملاً (حي، شارع، مدينة)").max(500),
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
    defaultValues: { name: "", phone: "", address: "" },
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
        customer={{ name: formData.name, phone: formData.phone, address: formData.address }}
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
          <div className="space-y-2 border-b border-[#155235]/50 pb-3 mb-3">
            {items.map((item) => {
              const prod = PRODUCTS.find((p) => p.id === item.productId);
              const itemPrice = getPayableBundlePriceSar(item.quantity, prod?.bundleOffers);
              return (
                <div key={item.lineId} className="flex gap-3 items-center">
                  <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-[#155235] bg-[#071C12]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod?.offerImages?.[item.quantity as keyof typeof prod.offerImages] || prod?.images[0] || `/products/${item.slug}/1.jpg`}
                      alt={item.nameAr}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm line-clamp-1">{item.nameAr}</p>
                    <p className="text-xs text-[#FFFFFF]/60 mt-0.5">
                      {item.quantity === 1 ? "عبوة واحدة" : item.quantity === 2 ? "عبوتان" : "3 عبوات"}
                    </p>
                  </div>
                  <span className="font-bold text-[#C99A45] text-sm shrink-0">{format(itemPrice)}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-medium mb-2">
            <span className="text-[#FFFFFF]/70">إجمالي الطلب</span>
            <span className="font-extrabold text-[#C99A45] text-lg">{format(total)}</span>
          </div>
          {welcomePromo && (
            <p className="text-[11px] text-center text-[#C99A45] font-bold mb-1">
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

          <div>
            <label htmlFor="checkout-address" className="block text-sm font-bold text-[#FFFFFF] mb-1.5">
              العنوان الكامل (حي، شارع، مدينة)
            </label>
            <input
              id="checkout-address"
              type="text"
              autoComplete="street-address"
              placeholder="مثال: حي النزهة، شارع الأمير محمد، الرياض"
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 text-right text-white",
                "bg-[#071C12] placeholder:text-[#567063] focus:outline-none transition-colors",
                errors.address
                  ? "border-[#B42318] focus:border-[#B42318]"
                  : "border-[#155235] focus:border-[#C99A45]"
              )}
              {...register("address")}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
              <p id="address-error" className="text-[#B42318] text-xs mt-1">
                {errors.address.message}
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

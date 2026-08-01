"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { isValidPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError("رجاءً اكتب اسمك الكامل.");
      return;
    }
    if (!isValidPhone(trimmedPhone)) {
      setError("رجاءً أدخل رقم جوال صحيح.");
      return;
    }
    if (trimmedMessage.length < 5) {
      setError("رجاءً اكتب رسالتك باختصار.");
      return;
    }

    const text = [
      "مرحباً بيت الصحة،",
      "",
      `الاسم: ${trimmedName}`,
      `الجوال: ${trimmedPhone}`,
      "",
      trimmedMessage,
    ].join("\n");

    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-4" aria-label="نموذج التواصل" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-bold text-[#1C1C1E] mb-1.5">
          الاسم
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="اسمك الكامل"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E0D4] focus:border-[#1C1C1E] focus:outline-none text-right text-[#1C1C1E]"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-bold text-[#1C1C1E] mb-1.5">
          رقم الجوال
        </label>
        <input
          id="contact-phone"
          type="tel"
          inputMode="tel"
          dir="ltr"
          placeholder="05XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E0D4] focus:border-[#1C1C1E] focus:outline-none text-left text-[#1C1C1E]"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-bold text-[#1C1C1E] mb-1.5">
          الرسالة
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="ما الذي تودّ أن نسمعه منك؟"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E0D4] focus:border-[#1C1C1E] focus:outline-none text-right text-[#1C1C1E] resize-none"
        />
      </div>
      {error && (
        <p className="text-sm text-[#B42318] text-center" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className={cn(
          "w-full py-4 rounded-full bg-[#1C1C1E] text-[#FAFAF8] font-bold",
          "hover:bg-[#C9A96E] hover:text-[#1C1C1E] transition-colors active:scale-[0.98]"
        )}
      >
        إرسال عبر واتساب
      </button>
      <p className="text-xs text-center text-[#3D3D3D]">
        سيفتح واتساب برسالتك جاهزة — نرد عليك في أقرب وقت.
      </p>
    </form>
  );
}

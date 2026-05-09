import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "بابٌ مفتوحٌ لفريق بيت الصحة: اسأل قبل الطلب، أو راسلنا بعد وصول عطر الأعشاب إلى بيتك.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#1D1D1B] text-center mb-4">
          تواصل معنا
        </h1>
        <p className="text-[#6E675F] text-center mb-10 leading-relaxed">
          عندك استفسارٌ قبل أن تزور سلّتنا؟ اكتب لنا، ونجيبك بلغةِ بيتٍ يهتمّ بضيوفه — نساعدك تختار ما يلائم
          يومك من دون إلحاحِ مبيعاتٍ صاخبة.
      </p>

        <div className="grid gap-4 mb-10">
          <div className="bg-[#F8F1E7] border border-[#E8D8C3] rounded-2xl p-6 flex items-start gap-4">
            <span className="text-3xl">💬</span>
            <div>
              <h3 className="font-bold text-[#1D1D1B] mb-1">واتساب</h3>
              <p className="text-sm text-[#6E675F] mb-2">
                {/* TODO: Replace with real WhatsApp number */}
                TODO: رقم واتساب الدعم
              </p>
              <span className="text-xs text-[#6E675F]">ساعات الدعم: 9 صباحًا - 10 مساءً (بتوقيت الرياض)</span>
            </div>
          </div>

          <div className="bg-[#F8F1E7] border border-[#E8D8C3] rounded-2xl p-6 flex items-start gap-4">
            <span className="text-3xl">📧</span>
            <div>
              <h3 className="font-bold text-[#1D1D1B] mb-1">البريد الإلكتروني</h3>
              <p className="text-sm text-[#6E675F]">
                {/* TODO: Replace with real support email */}
                TODO: support@baytseha.shop
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E8D8C3] rounded-2xl p-6">
          <h2 className="font-bold text-[#1D1D1B] mb-4">راسل بيت الصحة</h2>
          <form className="space-y-4" aria-label="نموذج التواصل">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-bold text-[#1D1D1B] mb-1.5">
                الاسم
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="اسمك الكامل"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8D8C3] focus:border-[#1F6B4E] focus:outline-none text-right text-[#1D1D1B]"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-bold text-[#1D1D1B] mb-1.5">
                رقم الجوال
              </label>
              <input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                dir="ltr"
                placeholder="05XXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8D8C3] focus:border-[#1F6B4E] focus:outline-none text-left text-[#1D1D1B]"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-bold text-[#1D1D1B] mb-1.5">
                الرسالة
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="ما الذي تودّ أن نسمعه منك؟"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8D8C3] focus:border-[#1F6B4E] focus:outline-none text-right text-[#1D1D1B] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#1F6B4E] text-white font-bold hover:bg-[#124332] transition-colors"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

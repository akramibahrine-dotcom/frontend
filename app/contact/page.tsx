import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "بابٌ مفتوحٌ لفريق بيت الصحة: اسأل قبل الطلب، أو راسلنا بعد وصول عطر الأعشاب إلى بيتك.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#1C1C1E] text-center mb-4">
          تواصل معنا
        </h1>
        <p className="text-[#3D3D3D] text-center mb-10 leading-relaxed">
          عندك استفسارٌ قبل أن تزور سلّتنا؟ اكتب لنا، ونجيبك بلغةِ بيتٍ يهتمّ بضيوفه — نساعدك تختار ما يلائم
          يومك من دون إلحاحِ مبيعاتٍ صاخبة.
      </p>

        <div className="grid gap-4 mb-10">
          <div className="bg-[#FAFAF8] border border-[#E8E0D4] rounded-2xl p-6 flex items-start gap-4">
            <span className="text-3xl">✦</span>
            <div>
              <h3 className="font-bold text-[#1C1C1E] mb-1">واتساب</h3>
              <p className="text-sm text-[#3D3D3D] mb-2" dir="ltr" style={{ textAlign: "right" }}>
                +966 50 000 0000
              </p>
              <span className="text-xs text-[#3D3D3D]">ساعات الدعم: 9 صباحًا - 10 مساءً (بتوقيت الرياض)</span>
            </div>
          </div>

          <div className="bg-[#FAFAF8] border border-[#E8E0D4] rounded-2xl p-6 flex items-start gap-4">
            <span className="text-3xl">◆</span>
            <div>
              <h3 className="font-bold text-[#1C1C1E] mb-1">البريد الإلكتروني</h3>
              <p className="text-sm text-[#3D3D3D]">
                support@baytseha.shop
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E8E0D4] rounded-2xl p-6">
          <h2 className="font-bold text-[#1C1C1E] mb-4">راسل بيت الصحة</h2>
          <form className="space-y-4" aria-label="نموذج التواصل">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-bold text-[#1C1C1E] mb-1.5">
                الاسم
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="اسمك الكامل"
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
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8E0D4] focus:border-[#1C1C1E] focus:outline-none text-right text-[#1C1C1E] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#1C1C1E] text-white font-bold hover:bg-[#C9A96E] transition-colors"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

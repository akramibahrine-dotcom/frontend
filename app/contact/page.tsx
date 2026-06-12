import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildWhatsAppUrl, getWhatsAppDisplayPhone } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "بابٌ مفتوحٌ لفريق بيت الصحة: اسأل قبل الطلب، أو راسلنا بعد وصول عطر الأعشاب إلى بيتك.",
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl();
  const whatsappDisplay = getWhatsAppDisplayPhone();

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
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#1F6B4E] font-bold hover:underline mb-2 block"
                dir="ltr"
                style={{ textAlign: "right" }}
              >
                {whatsappDisplay}
              </Link>
              <span className="text-xs text-[#6E675F]">ساعات الدعم: 9 صباحًا - 10 مساءً (بتوقيت الرياض)</span>
            </div>
          </div>

          <div className="bg-[#F8F1E7] border border-[#E8D8C3] rounded-2xl p-6 flex items-start gap-4">
            <span className="text-3xl">📧</span>
            <div>
              <h3 className="font-bold text-[#1D1D1B] mb-1">البريد الإلكتروني</h3>
              <Link
                href="mailto:support@baytseha.shop"
                className="text-sm text-[#1F6B4E] font-bold hover:underline"
              >
                support@baytseha.shop
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E8D8C3] rounded-2xl p-6">
          <h2 className="font-bold text-[#1D1D1B] mb-4">راسل بيت الصحة</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

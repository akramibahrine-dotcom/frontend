import type { Metadata } from "next";
import { COPY } from "@/content/copy";
import { PRODUCTS } from "@/content/products";
import { ProductPlaceholderImage } from "@/components/product/ProductPlaceholderImage";

export const metadata: Metadata = {
  title: "تم استلام طلبك",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ orderId: string }> };

export default async function ThankYouPage({ params }: Props) {
  const { orderId } = await params;

  // Custom selected cross-sells for the Thank You page with a special discounted price
  // Example: 2 specific products, you can change their IDs or logic later
  const customCrossSells = PRODUCTS.slice(0, 2).map((p) => ({
    ...p,
    specialPrice: 149 // discounted price instead of 199
  }));

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center mb-12">
        {/* Thank You Image Placeholder */}
        <div className="w-full aspect-[21/9] md:aspect-[21/6] bg-[#071C12] rounded-3xl mb-8 flex flex-col items-center justify-center border-4 border-[#C99A45]/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#155235]/20 to-transparent"></div>
          <span className="text-5xl md:text-7xl mb-2 relative z-10">🎉</span>
          <span className="text-[#C99A45] font-bold text-sm md:text-base relative z-10">شعار صورة — يُستبدل لاحقًا</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F1A14] mb-3">
          {COPY.thankYou.headlineAr}
        </h1>
        <p className="text-[#567063] text-lg mb-8">
          {COPY.thankYou.subAr}
        </p>

        {/* Order Resume */}
        <div className="bg-white border border-[#E8D8C3] shadow-sm rounded-3xl p-6 md:p-8 mb-8 text-right">
          <h2 className="font-extrabold text-[#0F1A14] text-xl mb-6 border-b border-[#E8D8C3] pb-4">
            ملخص طلبك #{orderId.slice(-8).toUpperCase()}
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center bg-[#F5F3EE] p-4 rounded-xl">
              <span className="font-bold text-[#0F1A14]">المنتجات المختارة</span>
              <span className="text-[#155235] font-bold text-sm">ستصلك مع الطلب</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-[#E8D8C3] pt-6">
            <div className="flex items-center gap-3 text-[#567063]">
              <span className="text-[#155235] text-xl">🚚</span>
              <span className="font-bold">التوصيل داخل المملكة بعد تأكيد عنوانك معنا</span>
            </div>
            <div className="flex items-center gap-3 text-[#567063]">
              <span className="text-[#C99A45] text-xl">📋</span>
              <span className="font-bold">سياسات الإرجاع مذكورة بوضوح — بلا وعودٍ شفهيةٍ لا نستطيع إثباتها</span>
            </div>
            <div className="flex items-center gap-3 text-[#567063]">
              <span className="text-[#155235] text-xl">💬</span>
              <span className="font-bold">نجيبك قبل وبعد الطلب — اسمٌ واحدٌ: بيت الصحة</span>
            </div>
            <div className="flex items-center gap-3 text-[#567063]">
              <span className="text-[#155235] text-xl">💳</span>
              <span className="font-bold">{COPY.thankYou.codBadgeAr}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#C99A45] bg-[#C99A45]/10 p-4 rounded-xl mb-10">
          <span>⚡</span>
          <span>{COPY.thankYou.deliveryNoteAr}</span>
        </div>
      </div>

      {/* Special Offer Cross Sells */}
      <div className="border-t-2 border-dashed border-[#E8D8C3] pt-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block bg-[#B42318]/10 text-[#B42318] text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            عرض خاص لعملائنا فقط
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F1A14]">
            رُفوفٌ أخرى في بيت الصحة قد تُكمل يومك
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {customCrossSells.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl border border-[#E8D8C3] p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                <ProductPlaceholderImage theme={product.imageTheme} aspectRatio="square" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-[#0F1A14] text-sm mb-1">{product.nameAr}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-extrabold text-[#C99A45]">{product.specialPrice} ريال</span>
                  <span className="text-xs text-[#567063] line-through">199 ريال</span>
                </div>
                <button className="w-full py-2 bg-[#155235] text-white text-xs font-bold rounded-full hover:bg-[#0A3622] transition-colors">
                  أضف للطلب
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

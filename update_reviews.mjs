import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'components/product/BeforeAfterCarousel.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Rename FertilityReview to ProductReview
content = content.replace(/type FertilityReview/g, 'type ProductReview');
content = content.replace(/FertilityReview\[\]/g, 'ProductReview[]');
content = content.replace(/FertilityReviewCard/g, 'ProductReviewCard');

// 2. Change ProductReviewCard to accept productName and colors
const oldCard = `function ProductReviewCard({ r }: { r: ProductReview }) {
  return (
    <article
      className="relative shrink-0 w-[min(90vw,320px)] md:w-[340px] rounded-2xl overflow-hidden bg-white border border-pink-200 shadow-lg"
      dir="rtl"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-extrabold text-[#0F1A14] text-sm">{r.nameAr}</p>
            <p className="text-[#567063] text-xs">{r.cityAr} · {r.age} سنة</p>
          </div>
          <div className="text-[#C99A45] text-sm" aria-hidden="true">★★★★★</div>
        </div>
        <p className="text-[#567063] text-sm leading-relaxed mb-3">
          &ldquo;{r.quoteAr}&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full border border-pink-200 font-bold">
            {r.badge}
          </span>
          <span className="text-[10px] bg-[#F5F3EE] text-[#567063] px-2 py-0.5 rounded-full border border-[#E8E2D8]">
            🌸 شاي Fertility
          </span>
        </div>
      </div>
    </article>
  );
}`;

const newCard = `function ProductReviewCard({ r, productName, badgeColor, borderColor }: { r: ProductReview; productName: string; badgeColor: string; borderColor: string; }) {
  return (
    <article
      className={\`relative shrink-0 w-[min(90vw,320px)] md:w-[340px] rounded-2xl overflow-hidden bg-white border \${borderColor} shadow-lg\`}
      dir="rtl"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-extrabold text-[#0F1A14] text-sm">{r.nameAr}</p>
            <p className="text-[#567063] text-xs">{r.cityAr} · {r.age} سنة</p>
          </div>
          <div className="text-[#C99A45] text-sm" aria-hidden="true">★★★★★</div>
        </div>
        <p className="text-[#567063] text-sm leading-relaxed mb-3">
          &ldquo;{r.quoteAr}&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <span className={\`text-[10px] px-2 py-0.5 rounded-full font-bold \${badgeColor}\`}>
            {r.badge}
          </span>
          <span className="text-[10px] bg-[#F5F3EE] text-[#567063] px-2 py-0.5 rounded-full border border-[#E8E2D8]">
            {productName}
          </span>
        </div>
      </div>
    </article>
  );
}`;

content = content.replace(oldCard, newCard);

fs.writeFileSync(file, content, 'utf8');
console.log('done replacing card');

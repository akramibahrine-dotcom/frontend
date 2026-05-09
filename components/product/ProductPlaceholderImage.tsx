import { cn } from "@/lib/utils";
import type { ImageTheme } from "@/content/products";

type Props = {
  theme: ImageTheme;
  className?: string;
  aspectRatio?: "square" | "product";
  alt?: string;
};

const THEME_CONFIG: Record<ImageTheme, { gradient: string; emoji: string; labelAr: string }> = {
  weight: {
    gradient: "from-green-100 via-emerald-50 to-lime-100",
    emoji: "🍃",
    labelAr: "شاي دعم إدارة الوزن",
  },
  colon: {
    gradient: "from-amber-50 via-yellow-50 to-orange-50",
    emoji: "🌼",
    labelAr: "شاي راحة القولون",
  },
  hemorrhoid: {
    gradient: "from-rose-50 via-pink-50 to-red-50",
    emoji: "🌸",
    labelAr: "شاي دعم الراحة",
  },
  liver: {
    gradient: "from-teal-50 via-cyan-50 to-green-50",
    emoji: "🌿",
    labelAr: "شاي دعم الكبد",
  },
  lung: {
    gradient: "from-sky-50 via-blue-50 to-indigo-50",
    emoji: "🍀",
    labelAr: "شاي دعم الرئة",
  },
  prostate: {
    gradient: "from-violet-50 via-purple-50 to-indigo-50",
    emoji: "🌱",
    labelAr: "شاي دعم البروستات",
  },
};

export function ProductPlaceholderImage({ theme, className, aspectRatio = "product", alt }: Props) {
  const config = THEME_CONFIG[theme];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        aspectRatio === "square" ? "aspect-square" : "aspect-[4/5]",
        `bg-gradient-to-br ${config.gradient}`,
        className
      )}
      role="img"
      aria-label={alt ?? `صورة توضيحية لعبوة ${config.labelAr} من بيت الصحة`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="text-7xl opacity-70">{config.emoji}</span>
        <div className="flex flex-col items-center gap-1">
          <div className="h-16 w-32 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center border border-white/80">
            <span className="text-xs text-[#1F6B4E] font-bold text-center px-2">
              بيت الصحة
              <br />
              <span className="font-normal text-[#6E675F]">Baytseha</span>
            </span>
          </div>
          <span className="text-xs text-[#6E675F] text-center px-4 mt-1">
            صورة توضيحية — تُستبدل بصورة المنتج الحقيقية
          </span>
        </div>
      </div>
    </div>
  );
}

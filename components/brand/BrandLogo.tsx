import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
};

export function BrandLogo({ className, size = "md", dark = false }: Props) {
  const sizes = {
    sm: { img: 32, title: "text-lg", sub: "text-xs" },
    md: { img: 40, title: "text-xl", sub: "text-xs" },
    lg: { img: 48, title: "text-2xl", sub: "text-sm" },
  };

  const s = sizes[size];

  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2 no-underline", className)}
      aria-label="بيت الصحة - الصفحة الرئيسية"
    >
      <div className="flex flex-col gap-0.5 leading-none">
        <span
          className={cn(
            s.title,
            "font-bold leading-none whitespace-nowrap",
            dark ? "text-white" : "text-[#0F1A14]"
          )}
        >
          بيت الصحة
        </span>
        <span
          className={cn(
            s.sub,
            "font-normal tracking-wide leading-none whitespace-nowrap pb-0.5",
            dark ? "text-[#D19900]" : "text-[#567063]"
          )}
        >
          عودة للأصل
        </span>
      </div>
    </Link>
  );
}

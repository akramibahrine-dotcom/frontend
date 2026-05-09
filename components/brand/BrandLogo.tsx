import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
};

export function BrandLogo({ className, size = "md", dark = false }: Props) {
  const sizes = {
    sm: { circle: "w-8 h-8 text-base", title: "text-lg", sub: "text-xs" },
    md: { circle: "w-10 h-10 text-xl", title: "text-xl", sub: "text-xs" },
    lg: { circle: "w-12 h-12 text-2xl", title: "text-2xl", sub: "text-sm" },
  };

  const s = sizes[size];

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 no-underline", className)}
      aria-label="بيت الصحة - الصفحة الرئيسية"
    >
      <div
        className={cn(
          s.circle,
          "rounded-full flex items-center justify-center font-bold flex-shrink-0",
          dark
            ? "bg-[#C99A45] text-[#071C12]"
            : "bg-[#155235] text-[#F5F3EE]"
        )}
        aria-hidden="true"
      >
        ن
      </div>
      <div className="flex flex-col leading-tight">
        <span className={cn(s.title, "font-bold", dark ? "text-white" : "text-[#0F1A14]")}>
          بيت الصحة
        </span>
        <span className={cn(s.sub, "font-normal tracking-wide", dark ? "text-[#C99A45]/70" : "text-[#567063]")}>
          Baytseha
        </span>
      </div>
    </Link>
  );
}

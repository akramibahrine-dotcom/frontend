import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Prices and numeric amounts in RTL — always LTR Western digits. */
export function FormattedAmount({ children, className }: Props) {
  return (
    <span dir="ltr" className={cn("inline-block unicode-bidi-isolate tabular-nums", className)}>
      {children}
    </span>
  );
}

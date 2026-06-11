import { formatNumber } from "@/lib/format-number";

type Props = {
  amountSar: number;
  className?: string;
  showOriginal?: boolean;
};

export function Price({ amountSar, className, showOriginal = false }: Props) {
  const { currency, format } = useCurrencyStore();
  const formatted = format(amountSar);

  if (showOriginal && currency !== "SAR") {
    return (
      <span className={className}>
        {formatted}
        <span className="text-[0.7em] opacity-50 mr-1">({formatNumber(amountSar)} ر.س)</span>
      </span>
    );
  }

  return <span className={className}>{formatted}</span>;
}

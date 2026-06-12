"use client";

import { useCurrencyStore } from "@/store/currency-store";
import { formatNumber } from "@/lib/format-number";
import { FormattedAmount } from "@/components/currency/FormattedAmount";

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
      <FormattedAmount className={className}>
        {formatted}
        <span className="text-[0.7em] opacity-50 mr-1">({formatNumber(amountSar)} ر.س)</span>
      </FormattedAmount>
    );
  }

  return <FormattedAmount className={className}>{formatted}</FormattedAmount>;
}

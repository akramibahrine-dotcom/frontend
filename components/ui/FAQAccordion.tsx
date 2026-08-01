"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

type FAQItem = {
  readonly question: string;
  readonly answer: string;
};

type Props = {
  items: readonly FAQItem[];
  className?: string;
};

export function FAQAccordion({ items, className }: Props) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn("space-y-2", className)}
    >
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="border border-[#E8E0D4] rounded-xl overflow-hidden bg-white"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "w-full flex items-center justify-between px-5 py-4",
                "text-right text-[#1C1C1E] font-semibold text-sm",
                "hover:bg-[#FAFAF8] transition-colors duration-150",
                "group"
              )}
            >
              <span>{item.question}</span>
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1C1C1E] text-white flex items-center justify-center text-xs transition-transform duration-200 group-data-[state=open]:rotate-45 mr-3"
                aria-hidden="true"
              >
                +
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease] data-[state=closed]:animate-[accordion-up_0.2s_ease]">
            <div className="px-5 pb-4 pt-0 text-sm text-[#3D3D3D] leading-relaxed border-t border-[#E8E0D4]">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

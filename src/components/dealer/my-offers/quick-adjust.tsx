"use client";

import { cn } from "@/lib/utils";

export type QuickAdjustOption = {
  key: string;
  labelTop: string;
  labelBottom: string;
  amount: number;
  highlight?: boolean;
};

type QuickAdjustProps = {
  options: QuickAdjustOption[];
  onSelect: (amount: number, key: string) => void;
  onAddCustom?: () => void;
};

export function QuickAdjust({ options, onSelect, onAddCustom }: QuickAdjustProps) {
  return (
    <div>
      <p className="font-hero-heading text-base font-bold text-[#1E1E1E]">Quick Adjust</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((opt) => {
          const isAdd = opt.key === "add";
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                console.log("quick adjust:", opt.key, opt.amount);
                if (isAdd && onAddCustom) {
                  onAddCustom();
                  return;
                }
                onSelect(opt.amount, opt.key);
              }}
              className={cn(
                "cursor-pointer rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-center font-navbar text-xs font-semibold text-[#1E1E1E] transition hover:border-orange-400 sm:text-sm",
                opt.highlight && "border-[#FFA51F] ring-1 ring-[#FFA51F]/40"
              )}
            >
              <span className="block">{opt.labelTop}</span>
              <span className="mt-0.5 block text-[#5E5E5E]">{opt.labelBottom}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

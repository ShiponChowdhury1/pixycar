"use client";

import { CreditCard, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { VehicleInfoValues } from "@/components/seller/list-car/schemas";
import type { ConditionDetailsValues } from "@/components/seller/list-car/schemas";
import type { PhotosFormValues } from "@/components/seller/list-car/schemas";

export type FullListingPayload = {
  vehicle: VehicleInfoValues;
  condition: ConditionDetailsValues;
  photos: PhotosFormValues;
};

type ListingFeeProps = {
  formData: FullListingPayload;
  onBack: () => void;
};

export function ListingFee({ formData, onBack }: ListingFeeProps) {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  const pay = () => {
    console.log("list-car pay & publish full payload", formData);
    setToast("Listing submitted! Redirecting to your dashboard…");
    setTimeout(() => {
      router.push(ROUTES.seller.dashboard);
    }, 1200);
  };

  return (
    <div>
      {toast ? (
        <div
          className="fixed bottom-6 left-1/2 z-[110] w-[min(90vw,400px)] -translate-x-1/2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-navbar text-sm font-medium text-emerald-900 shadow-lg"
          role="status"
        >
          {toast}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Listing Fee</h1>
        <span className="rounded-full bg-neutral-200 px-3 py-1 font-navbar text-xs font-medium text-[#5E5E5E]">
          100% Refundable
        </span>
      </div>
      <p className="mt-2 max-w-2xl font-navbar text-sm text-[#5E5E5E] sm:text-base">
        If you receive no offers within 1 Hrs, we&apos;ll automatically refund your listing fee within 24 hours.
      </p>

      <div className="mx-auto mt-8 w-full max-w-lg space-y-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
        <p className="font-hero-heading text-3xl font-bold text-[#FFA51F]">$5.00</p>

        <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
          <p className="font-navbar text-sm font-semibold text-violet-900">What you&apos;ll get:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 font-navbar text-sm text-violet-900">
            <li>Multiple offers from verified dealers</li>
            <li>Direct chat with winning dealer</li>
            <li>Full refund if no offers received</li>
          </ul>
        </div>

        <div>
          <p className="font-navbar text-sm font-medium text-[#1E1E1E]">Payment by card</p>
          <div className="mt-3 rounded-xl border-2 border-emerald-500 bg-emerald-50/50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#FFA51F]">
                  <CreditCard className="size-5 text-white" aria-hidden />
                </div>
                <div>
                  <p className="font-navbar text-sm font-bold text-[#1E1E1E]">Debit Card</p>
                  <p className="font-navbar text-xs text-[#5E5E5E]">Visa</p>
                  <p className="mt-1 font-mono text-xs text-[#1E1E1E]">**** **** **** 4245</p>
                </div>
              </div>
              <p className="font-navbar text-sm font-bold text-emerald-600">$5,666</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-full bg-[#FFA51F] px-6 py-2 font-navbar text-sm font-semibold text-black hover:opacity-90"
              >
                Edit
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-full border border-red-300 bg-white p-2 text-red-600 hover:bg-red-50"
                aria-label="Remove card"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className={cn(
              "cursor-pointer rounded-xl border-2 border-[#FFA51F] px-6 py-3 font-navbar text-base font-semibold text-[#FFA51F]",
              "hover:bg-[#FFA51F]/10"
            )}
          >
            Back
          </button>
          <button
            type="button"
            onClick={pay}
            className={cn(
              "cursor-pointer rounded-xl bg-[#FFA51F] px-6 py-3 font-navbar text-base font-semibold text-white sm:min-w-[200px]",
              "hover:opacity-90"
            )}
          >
            Pay &amp; Publish
          </button>
        </div>
      </div>
    </div>
  );
}

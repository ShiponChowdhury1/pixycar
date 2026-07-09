"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createImproveOfferSchema, type ImproveOfferFormValues } from "@/components/dealer/my-offers/improve-offer-schema";

type ImproveOfferModalProps = {
  open: boolean;
  onClose: () => void;
  carName: string;
  currentOffer: number;
  minIncrement: number;
  onConfirm: (amount: number) => void;
};

export function ImproveOfferModal({
  open,
  onClose,
  carName,
  currentOffer,
  minIncrement,
  onConfirm,
}: ImproveOfferModalProps) {
  const schema = useMemo(() => createImproveOfferSchema(currentOffer, minIncrement), [currentOffer, minIncrement]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ImproveOfferFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: "" },
  });

  useEffect(() => {
    if (open) reset({ amount: "" });
  }, [open, currentOffer, reset]);

  if (!open) return null;

  const onSubmit = (data: ImproveOfferFormValues) => {
    const raw = data.amount.replace(/[$,\s]/g, "").trim();
    const n = Number(raw);
    console.log("improved offer:", n);
    onConfirm(n);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-pointer bg-black/50"
        onClick={() => {
          console.log("improve offer modal: cancel (backdrop)");
          onClose();
        }}
      />
      <div className="relative z-[121] w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-center font-hero-heading text-xl font-bold text-[#1E1E1E]">Improve Offer</h2>
        <p className="mt-2 text-center font-navbar text-sm text-[#5E5E5E]">{carName}</p>
        <p className="mt-1 text-center font-hero-heading text-2xl font-bold text-[#1E1E1E]">
          ${currentOffer.toLocaleString("en-US")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label htmlFor="improve-amount" className="font-navbar text-sm font-medium text-[#1E1E1E]">
            Improve Your Offer Amount
          </label>
          <div className="mt-2 flex rounded-xl border border-[#E5E7EB] bg-white focus-within:border-orange-400">
            <span className="flex items-center pl-3 font-navbar text-sm font-semibold text-[#5E5E5E]">$</span>
            <input
              id="improve-amount"
              inputMode="decimal"
              placeholder="26,000"
              className="w-full rounded-r-xl bg-transparent py-3 pr-3 pl-1 font-navbar text-sm text-[#1E1E1E] outline-none"
              {...register("amount")}
            />
          </div>
          {errors.amount ? (
            <p className="mt-1 font-navbar text-xs text-red-600">{errors.amount.message}</p>
          ) : (
            <p className="mt-1 font-navbar text-xs text-[#5E5E5E]">Minimum Increment: ${minIncrement.toLocaleString("en-US")}</p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                console.log("improve offer modal: cancel");
                onClose();
              }}
              className="flex-1 cursor-pointer rounded-xl border-2 border-[#FFA51F] py-3 font-navbar text-sm font-bold text-[#FFA51F] transition hover:bg-amber-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 cursor-pointer rounded-xl bg-[#FFA51F] py-3 font-navbar text-sm font-bold text-[#1E1E1E] transition hover:bg-[#e8940f]"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

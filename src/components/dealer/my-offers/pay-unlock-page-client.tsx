"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/constants/routes";
import { PaymentCard, type SavedPaymentCard } from "@/components/seller/payment/payment-card";

const INITIAL_CARD: SavedPaymentCard = {
  id: 1,
  type: "Debit Card",
  brand: "Visa",
  last4: "4245",
  balance: "$5,666",
};

type PayUnlockPageClientProps = {
  listingId: string;
};

export function PayUnlockPageClient({ listingId }: PayUnlockPageClientProps) {
  const router = useRouter();
  const [cards, setCards] = useState<SavedPaymentCard[]>([INITIAL_CARD]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {toast ? (
        <div
          className="fixed bottom-6 left-1/2 z-[110] w-[min(90vw,400px)] -translate-x-1/2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-navbar text-sm font-medium text-emerald-900 shadow-lg"
          role="status"
        >
          {toast}
        </div>
      ) : null}

      <Link
        href={ROUTES.dealer.myOffersUnlockChat(listingId)}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
      >
        <span aria-hidden>←</span>
        Back to Bidding Details
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-2">
        <h1 className="font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Unlock to Contact Seller</h1>
        <span className="font-hero-heading text-2xl font-bold text-[#22C55E] sm:text-3xl">$19.99</span>
      </div>
      <p className="mt-2 font-navbar text-sm text-[#5E5E5E]">
        If the Seller does not respond to at least 3 connection requests within 24 hrs, we will automatically refund your Access Fee
      </p>

      <div className="mt-8 rounded-xl bg-[#EEF2FF] px-4 py-4">
        <p className="font-hero-heading text-sm font-bold text-indigo-900 sm:text-base">What you&apos;ll get:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 font-navbar text-sm text-indigo-900 sm:text-base">
          <li>Direct Messaging</li>
          <li>Contact Information</li>
          <li>Location Details</li>
        </ul>
      </div>

      <h2 className="mt-8 font-hero-heading text-lg font-bold text-[#1E1E1E]">Payment by card</h2>
      <div className="mt-3 space-y-3">
        {cards.map((c) => (
          <PaymentCard
            key={c.id}
            card={c}
            editHref={ROUTES.dealer.settingsAddPaymentCard}
            onDelete={(id) => {
              console.log("delete card", id);
              setCards((prev) => prev.filter((x) => x.id !== id));
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          console.log("paid and unlocked", { listingId });
          setToast("Payment successful. Chat unlocked.");
          window.setTimeout(() => {
            router.push(ROUTES.dealer.messages);
          }, 900);
        }}
        className="mt-8 w-full cursor-pointer rounded-xl bg-[#FFA51F] py-4 font-navbar text-base font-bold text-[#1E1E1E] shadow-sm transition hover:bg-[#e8940f]"
      >
        Pay & Unlock
      </button>
    </div>
  );
}

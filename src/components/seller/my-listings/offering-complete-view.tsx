"use client";

import { useState } from "react";
import type { OfferRowData, SellerListingDetail } from "@/components/seller/my-listings/listings-dummy-data";
import { OfferRow } from "@/components/seller/my-listings/offer-row";
import { ConfirmSelectionModal } from "@/components/seller/my-listings/confirm-selection-modal";

type OfferingCompleteViewProps = {
  listing: SellerListingDetail;
};

function pickDefaultDealer(offers: OfferRowData[]): OfferRowData | null {
  return offers.find((o) => o.isHighest) ?? offers[0] ?? null;
}

export function OfferingCompleteView({ listing }: OfferingCompleteViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<OfferRowData | null>(() =>
    pickDefaultDealer(listing.offers)
  );
  const [toast, setToast] = useState<string | null>(null);

  const openConnect = () => {
    setSelectedDealer((prev) => prev ?? pickDefaultDealer(listing.offers));
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (!selectedDealer) return;
    console.log("confirm dealer selection", {
      listingId: listing.id,
      dealer: selectedDealer.dealerId,
      amount: selectedDealer.amount,
    });
    setShowModal(false);
    setToast("You’re connected with the dealer.");
    window.setTimeout(() => setToast(null), 3200);
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

      <h1 className="font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Offering Complete!</h1>
      <p className="mt-2 max-w-xl font-navbar text-sm text-[#5E5E5E] sm:text-base">
        You received offers from 40 dealers. Select one to start conversations.
      </p>

      <div className="mt-8 max-w-xl rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8">
        <h2 className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">
          All Offers ({listing.offers.length})
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {listing.offers.map((o) => (
            <button
              key={o.dealerId}
              type="button"
              onClick={() => setSelectedDealer(o)}
              className="cursor-pointer text-left transition hover:opacity-95"
            >
              <OfferRow
                dealerName={o.dealerId}
                timeAgo={o.timeAgo}
                amount={o.amount}
                isHighest={o.isHighest}
                layout="stacked"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={openConnect}
          className="mt-8 w-full cursor-pointer rounded-xl bg-[#FFA51F] py-3.5 font-navbar text-sm font-bold text-[#1E1E1E] transition hover:bg-[#e8940f] sm:text-base"
        >
          Connect with dealer
        </button>
      </div>

      <ConfirmSelectionModal
        open={showModal}
        dealerName={selectedDealer?.dealerId ?? ""}
        amount={selectedDealer?.amount ?? ""}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

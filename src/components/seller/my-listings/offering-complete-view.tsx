import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OfferRowData, SellerListingDetail } from "@/components/seller/my-listings/listings-dummy-data";
import { OfferRow } from "@/components/seller/my-listings/offer-row";
import { ConfirmSelectionModal } from "@/components/seller/my-listings/confirm-selection-modal";
import { useSelectWinningDealerMutation } from "@/store/features/listings/listingsApi";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

type OfferingCompleteViewProps = {
  listing: SellerListingDetail;
};

function pickDefaultDealer(offers: OfferRowData[]): OfferRowData | null {
  return offers.find((o) => o.isHighest) ?? offers[0] ?? null;
}

export function OfferingCompleteView({ listing }: OfferingCompleteViewProps) {
  const router = useRouter();
  const [selectDealerApi] = useSelectWinningDealerMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  const selectedDealer = listing.offers[selectedIndex] ?? listing.offers[0] ?? null;

  const openConnect = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!selectedDealer) return;
    if (selectedDealer.dealerNumericId) {
      try {
        await selectDealerApi({
          listingId: listing.id,
          dealerId: selectedDealer.dealerNumericId,
        }).unwrap();
      } catch (err) {
        console.error("Failed to select dealer:", err);
      }
    }
    setShowModal(false);
    setToast("You’re connected with the dealer.");
    window.setTimeout(() => {
      setToast(null);
      router.push(ROUTES.seller.messages);
    }, 1500);
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
        You received offers from {listing.offersCount || listing.offers.length} dealers. Select one to start conversations.
      </p>

      <div className="mt-8 max-w-xl rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8">
        <h2 className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">
          All Offers ({listing.offers.length})
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {listing.offers.map((o, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={o.id ?? `${o.dealerId}-${idx}`}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "w-full cursor-pointer text-left transition rounded-xl border-2 px-3 py-1.5",
                  isSelected
                    ? "border-[#FFA51F] bg-amber-50/50 shadow-sm"
                    : "border-[#E5E7EB] bg-white hover:border-neutral-300"
                )}
              >
                <OfferRow
                  dealerName={o.dealerId}
                  timeAgo={o.timeAgo}
                  amount={o.amount}
                  isHighest={o.isHighest}
                  layout="list"
                />
              </button>
            );
          })}
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

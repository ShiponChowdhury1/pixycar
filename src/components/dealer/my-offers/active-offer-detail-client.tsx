"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Calendar, FileText, Gauge, MapPin, TrendingUp } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { ImageCarousel } from "@/components/seller/my-listings/image-carousel";
import type { DealerBiddingListing } from "@/components/dealer/dealer-dummy-data";
import type { ActiveOfferBidState } from "@/components/dealer/my-offers/dealer-my-offers-data";
import { CarSpecsGrid } from "@/components/dealer/bidding/car-specs-grid";
import { ImproveOfferModal } from "@/components/dealer/my-offers/improve-offer-modal";
import { QuickAdjust, type QuickAdjustOption } from "@/components/dealer/my-offers/quick-adjust";

type ActiveOfferDetailClientProps = {
  listing: DealerBiddingListing;
  bid: ActiveOfferBidState;
};

function formatCountdown(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

export function ActiveOfferDetailClient({ listing, bid }: ActiveOfferDetailClientProps) {
  const [secondsLeft, setSecondsLeft] = useState(bid.initialSecondsRemaining);
  const [offerAmount, setOfferAmount] = useState(bid.baseOffer);
  const [showImproveModal, setShowImproveModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const clear = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(clear);
  }, [toast]);

  const minToLead = bid.highest + bid.minIncrement;
  const showFinalPhase = bid.showFinalTenMinutes && secondsLeft <= 10 * 60;
  const progressPct = bid.initialSecondsRemaining > 0 ? (secondsLeft / bid.initialSecondsRemaining) * 100 : 0;

  const quickOptions: QuickAdjustOption[] = useMemo(
    () => [
      {
        key: "100",
        labelTop: "+$100",
        labelBottom: `$${(offerAmount + 100).toLocaleString("en-US")}`,
        amount: offerAmount + 100,
      },
      {
        key: "500",
        labelTop: "+$500",
        labelBottom: `$${(offerAmount + 500).toLocaleString("en-US")}`,
        amount: offerAmount + 500,
      },
      {
        key: "lead",
        labelTop: "To Lead",
        labelBottom: `$${minToLead.toLocaleString("en-US")}`,
        amount: minToLead,
        highlight: true,
      },
      {
        key: "add",
        labelTop: "Add",
        labelBottom: "$00,000",
        amount: offerAmount,
      },
    ],
    [offerAmount, minToLead]
  );

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {toast ? (
        <div
          className="fixed bottom-6 left-1/2 z-[110] w-[min(90vw,400px)] -translate-x-1/2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-navbar text-sm font-medium text-emerald-900 shadow-lg"
          role="status"
        >
          {toast}
        </div>
      ) : null}

      <Link
        href={ROUTES.dealer.myOffers}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
      >
        <span aria-hidden>←</span>
        Back to My Offers
      </Link>
      <h1 className="mt-4 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Active Offer</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <ImageCarousel images={listing.images} />
          <h2 className="mt-6 font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">{listing.title}</h2>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-navbar text-sm text-[#5E5E5E]">
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {listing.miles}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {listing.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {listing.year}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {listing.vin}
            </span>
          </div>
          <p className="mt-4 font-navbar text-sm leading-relaxed text-[#5E5E5E] sm:text-base">{listing.description}</p>
          <CarSpecsGrid specs={listing.specs} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                {showFinalPhase ? (
                  <p className="font-navbar text-xs font-semibold text-[#FFA51F] sm:text-sm">Final 10 Minutes!</p>
                ) : (
                  <p className="font-navbar text-xs font-semibold text-transparent sm:text-sm" aria-hidden>
                    &nbsp;
                  </p>
                )}
                <p className="font-hero-heading text-3xl font-bold text-[#FFA51F] sm:text-4xl">{formatCountdown(secondsLeft)}</p>
              </div>
              <span className="rounded-full bg-green-500 px-3 py-1 font-navbar text-xs font-semibold text-white sm:text-sm">
                Live
              </span>
            </div>
            <svg className="h-2 w-full overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
              <rect x="0" y="0" width="100" height="2" rx="1" fill="#E5E7EB" />
              <rect x="0" y="0" width={Math.max(0, Math.min(100, progressPct))} height="2" rx="1" fill="#FFA51F" />
            </svg>
            <div className="mt-2 flex justify-between font-navbar text-xs text-[#5E5E5E] sm:text-sm">
              <span>Blind 1h50sec</span>
              <span>Final 10 Minutes!</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
              <p className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">Your Position</p>
              <p className="mt-1 font-hero-heading text-2xl font-bold text-[#1E1E1E]">
                <span className="text-3xl sm:text-4xl">#{bid.position}</span>{" "}
                <span className="text-base font-semibold text-[#5E5E5E] sm:text-lg">of {bid.totalBidders}</span>
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
              <p className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">Your Offer</p>
              <p className="mt-1 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                ${offerAmount.toLocaleString("en-US")}
              </p>
            </div>
          </div>

          <div className="relative rounded-xl border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">Current Highest</p>
                <p className="mt-1 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                  ${bid.highest.toLocaleString("en-US")}
                </p>
              </div>
              <TrendingUp className="size-8 shrink-0 text-red-500" strokeWidth={2} aria-hidden />
            </div>
            <p className="mt-2 font-navbar text-xs text-[#5E5E5E] sm:text-sm">
              Minimum to lead: ${minToLead.toLocaleString("en-US")} (Increase Min. ${bid.minIncrement.toLocaleString("en-US")})
            </p>
          </div>

          <QuickAdjust
            options={quickOptions}
            onSelect={(amount) => setOfferAmount(amount)}
            onAddCustom={() => {
              console.log("quick adjust: open improve modal");
              setShowImproveModal(true);
            }}
          />

          <button
            type="button"
            onClick={() => {
              console.log("improve offer button");
              setShowImproveModal(true);
            }}
            className="w-full cursor-pointer rounded-xl bg-[#FFA51F] py-4 font-navbar text-base font-bold text-[#1E1E1E] transition hover:bg-[#e8940f]"
          >
            Improve Offer
          </button>
        </div>
      </div>

      <ImproveOfferModal
        key={`${offerAmount}-${showImproveModal}`}
        open={showImproveModal}
        onClose={() => setShowImproveModal(false)}
        carName={listing.title}
        currentOffer={offerAmount}
        minIncrement={bid.minIncrement}
        onConfirm={(amount) => {
          setOfferAmount(amount);
          setToast("Offer updated successfully.");
        }}
      />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, FileText, Gauge, MapPin } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { ImageCarousel } from "@/components/seller/my-listings/image-carousel";
import type { DealerBiddingListing } from "@/components/dealer/dealer-dummy-data";
import { BiddingTimer } from "@/components/dealer/bidding/bidding-timer";
import { CarSpecsGrid } from "@/components/dealer/bidding/car-specs-grid";
import { OfferFeeBox } from "@/components/dealer/bidding/offer-fee-box";
import { OfferInput } from "@/components/dealer/bidding/offer-input";

type BiddingDetailsClientProps = {
  listing: DealerBiddingListing;
};

export function BiddingDetailsClient({ listing }: BiddingDetailsClientProps) {
  const router = useRouter();
  const [offer, setOffer] = useState("25,000");
  const isActive = listing.phase === "active";

  const handlePlaceOffer = () => {
    console.log("place offer", { listingId: listing.id, offer });
    router.push(ROUTES.dealer.offerFee(listing.id));
  };

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href={ROUTES.dealer.dashboard}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#FFA51F] transition hover:text-[#e8940f]"
      >
        <span aria-hidden>←</span>
        Back to dashboard
      </Link>
      <h1 className="mt-4 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Bidding Details</h1>

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
          <BiddingTimer phase={listing.phase} />
          <OfferInput value={offer} onChange={setOffer} disabled={!isActive} />
          <OfferFeeBox />
          <button
            type="button"
            disabled={!isActive}
            onClick={handlePlaceOffer}
            className="w-full cursor-pointer rounded-xl bg-[#FFA51F] py-4 font-navbar text-base font-bold text-[#1E1E1E] transition hover:bg-[#e8940f] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:bg-neutral-200"
          >
            Place Offer - $1.99
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ListingCard, type ListingCardData } from "@/components/seller/my-listings/listing-card";
import { ListingsFilter, type ListingsFilterValue } from "@/components/seller/my-listings/listings-filter";
import { SELLER_LISTINGS } from "@/components/seller/my-listings/listings-dummy-data";

function toCardData(): ListingCardData[] {
  return SELLER_LISTINGS.map((l) => ({
    id: l.id,
    title: l.title,
    offers: l.offersCount,
    location: l.location,
    highestBid: l.highestBid,
    status: l.status,
    imageSrc: l.imageSrc,
  }));
}

export default function SellerMyListingsPage() {
  const [filter, setFilter] = useState<ListingsFilterValue>("All");
  const allCards = useMemo(() => toCardData(), []);

  const visible = useMemo(() => {
    if (filter === "All") return allCards;
    return allCards.filter((c) => c.status === filter);
  }, [allCards, filter]);

  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">My Listings</h1>
      <p className="mt-2 font-navbar text-sm text-[#5E5E5E] sm:text-base">Here is your listing overview</p>

      <ListingsFilter value={filter} onChange={setFilter} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

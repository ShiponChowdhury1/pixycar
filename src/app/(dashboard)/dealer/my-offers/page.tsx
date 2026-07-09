"use client";

import { useState } from "react";
import { ActiveOfferCard } from "@/components/dealer/my-offers/active-offer-card";
import {
  DEALER_MY_OFFERS_ACTIVE,
  DEALER_MY_OFFERS_LOST_INITIAL,
  DEALER_MY_OFFERS_WON,
  type LostOfferListItem,
  type OffersTab,
} from "@/components/dealer/my-offers/dealer-my-offers-data";
import { LostOfferCard } from "@/components/dealer/my-offers/lost-offer-card";
import { OffersFilter } from "@/components/dealer/my-offers/offers-filter";
import { WonOfferCard } from "@/components/dealer/my-offers/won-offer-card";

export default function DealerMyOffersPage() {
  const [tab, setTab] = useState<OffersTab>("Active");
  const [lostOffers, setLostOffers] = useState<LostOfferListItem[]>(DEALER_MY_OFFERS_LOST_INITIAL);

  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">My Offers</h1>

      <OffersFilter value={tab} onChange={setTab} />

      {tab === "Active" ? (
        <div className="mt-8 flex max-w-2xl flex-col gap-4">
          {DEALER_MY_OFFERS_ACTIVE.map((o) => (
            <ActiveOfferCard key={o.id} offer={o} />
          ))}
        </div>
      ) : null}

      {tab === "Won" ? (
        <div className="mt-8 flex max-w-2xl flex-col gap-4">
          {DEALER_MY_OFFERS_WON.map((o) => (
            <WonOfferCard key={o.id} offer={o} />
          ))}
        </div>
      ) : null}

      {tab === "Lost" ? (
        <div className="mt-8 flex max-w-2xl flex-col gap-4">
          {lostOffers.length === 0 ? (
            <p className="font-navbar text-sm text-[#5E5E5E]">No lost offers.</p>
          ) : (
            lostOffers.map((o) => (
              <LostOfferCard key={o.id} offer={o} onDelete={(id) => setLostOffers((prev) => prev.filter((x) => x.id !== id))} />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

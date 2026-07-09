import { notFound } from "next/navigation";
import { getDealerBiddingListing } from "@/components/dealer/dealer-dummy-data";
import { getActiveOfferBidState } from "@/components/dealer/my-offers/dealer-my-offers-data";
import { ActiveOfferDetailClient } from "@/components/dealer/my-offers/active-offer-detail-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DealerActiveOfferPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getDealerBiddingListing(id);
  const bid = getActiveOfferBidState(id);
  if (!listing || !bid) notFound();
  return <ActiveOfferDetailClient listing={listing} bid={bid} />;
}

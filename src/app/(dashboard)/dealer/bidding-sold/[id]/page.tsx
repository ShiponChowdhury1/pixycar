import { notFound } from "next/navigation";
import { getDealerBiddingListing } from "@/components/dealer/dealer-dummy-data";
import { BiddingSoldView } from "@/components/dealer/bidding/bidding-sold-view";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DealerBiddingSoldPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getDealerBiddingListing(id);
  if (!listing) notFound();

  return <BiddingSoldView listing={listing} highestBid="$15,200" totalOffers={100} />;
}

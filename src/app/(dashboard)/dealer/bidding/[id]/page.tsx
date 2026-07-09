import { notFound } from "next/navigation";
import { getDealerBiddingListing } from "@/components/dealer/dealer-dummy-data";
import { BiddingDetailsClient } from "@/components/dealer/bidding/bidding-details-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DealerBiddingPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getDealerBiddingListing(id);
  if (!listing) notFound();
  return <BiddingDetailsClient listing={listing} />;
}

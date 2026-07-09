import { notFound } from "next/navigation";
import { getWonUnlockListing } from "@/components/dealer/my-offers/dealer-my-offers-data";
import { PayUnlockPageClient } from "@/components/dealer/my-offers/pay-unlock-page-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DealerPayUnlockPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getWonUnlockListing(id);
  if (!listing) notFound();
  return <PayUnlockPageClient listingId={listing.id} />;
}

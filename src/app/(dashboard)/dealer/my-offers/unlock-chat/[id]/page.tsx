import { notFound } from "next/navigation";
import { getWonUnlockListing } from "@/components/dealer/my-offers/dealer-my-offers-data";
import { UnlockChatPageClient } from "@/components/dealer/my-offers/unlock-chat-page-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DealerUnlockChatPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getWonUnlockListing(id);
  if (!listing) notFound();
  return <UnlockChatPageClient listing={listing} />;
}

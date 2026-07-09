import Link from "next/link";
import { notFound } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { getSellerListing } from "@/components/seller/my-listings/listings-dummy-data";
import { ActiveOffersView } from "@/components/seller/my-listings/active-offers-view";
import { OfferingCompleteView } from "@/components/seller/my-listings/offering-complete-view";
import { TimeOverView } from "@/components/seller/my-listings/time-over-view";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SellerListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getSellerListing(id);
  if (!listing) notFound();

  const pageTitle =
    listing.status === "Active" ? "Active Offers" : listing.status === "TimeOver" ? "Time Over" : null;

  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href={ROUTES.seller.myListings}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
      >
        <span aria-hidden>←</span>
        Back to Listings
      </Link>

      {pageTitle ? (
        <h1 className="mt-6 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">{pageTitle}</h1>
      ) : null}

      <div className={pageTitle ? "mt-8" : "mt-6"}>
        {listing.status === "Active" ? <ActiveOffersView listing={listing} /> : null}
        {listing.status === "TimeOver" ? <TimeOverView listing={listing} /> : null}
        {listing.status === "Sold" ? <OfferingCompleteView listing={listing} /> : null}
      </div>
    </div>
  );
}

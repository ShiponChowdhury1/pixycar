import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { LIVE_LISTINGS } from "@/components/(marketing)/live-listings-data";
import { LiveListingCard } from "@/components/(marketing)/live-listing-card";

export default function BrowseLiveListingsPage() {
  return (
    <div className="min-h-[60vh] bg-[#F9FAFB] py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-6">
        <Link
          href={`${ROUTES.home}#browse-cars`}
          className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
        >
          <span aria-hidden>←</span>
          Back to Live Listings
        </Link>

        <div className="mt-6">
          <h1 className="font-hero-heading text-3xl font-semibold leading-tight tracking-tight text-[#1E1E1E] sm:text-4xl">
            Live Listings
          </h1>
          <p className="mt-2 max-w-2xl font-navbar text-base leading-relaxed text-[#5E5E5E]">
            All cars currently accepting offers from dealers. Select a listing to place a bid.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {LIVE_LISTINGS.map((listing) => (
            <LiveListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}

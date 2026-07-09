import { CheckCircle, DollarSign, TrendingUp } from "lucide-react";
import { ListingCard, type ListingCardData } from "@/components/seller/my-listings/listing-card";
import { StatsCard } from "@/components/seller/dashboard/stats-card";
import { WelcomeBanner } from "@/components/seller/dashboard/welcome-banner";

const LISTINGS: ListingCardData[] = [
  {
    id: "1",
    title: "2021 Honda CR-V EX",
    offers: 5,
    location: "Queens, NY",
    highestBid: "$15,200",
    status: "Active",
    imageSrc:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    title: "2021 Honda CR-V EX",
    offers: 20,
    location: "Queens, NY",
    highestBid: "$20,000",
    status: "Sold",
    imageSrc:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=500&fit=crop",
  },
];

export default function SellerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <WelcomeBanner />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          icon={TrendingUp}
          iconWrapClass="bg-amber-100 text-amber-700"
          value="1"
          label="Bidding"
        />
        <StatsCard
          icon={CheckCircle}
          iconWrapClass="bg-emerald-100 text-emerald-700"
          value="5"
          label="Sold"
        />
        <StatsCard
          icon={DollarSign}
          iconWrapClass="bg-violet-100 text-violet-700"
          value="$36,200"
          label="Highest Offer"
        />
      </div>

      <section className="mt-10">
        <h2 className="font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">My Listings</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}

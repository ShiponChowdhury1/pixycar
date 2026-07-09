import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ActiveBidRow } from "@/components/dealer/dashboard/active-bid-row";
import { LiveMarketCard } from "@/components/dealer/dashboard/live-market-card";
import { DEALER_ACTIVE_BIDS, DEALER_LIVE_MARKET } from "@/components/dealer/dealer-dummy-data";

export default function DealerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="font-hero-heading text-[28px] font-bold leading-tight text-[#1E1E1E]">Welcome back!!!</h1>
      <p className="mt-2 font-navbar text-base text-[#5E5E5E]">Akash Saha</p>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">Active Bids</h2>
          <Link href={ROUTES.dealer.myOffers} className="font-navbar text-sm font-medium text-[#FFA51F] hover:underline sm:text-base">
            See more
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {DEALER_ACTIVE_BIDS.map((b) => (
            <ActiveBidRow key={b.id} bid={b} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <h2 className="font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">Live Market</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {DEALER_LIVE_MARKET.map((car) => (
            <LiveMarketCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { SellerListingDetail } from "@/components/seller/my-listings/listings-dummy-data";
import { ROUTES } from "@/constants/routes";
import { ImageCarousel } from "@/components/seller/my-listings/image-carousel";

type TimeOverViewProps = {
  listing: SellerListingDetail;
};

export function TimeOverView({ listing }: TimeOverViewProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
      <div>
        <ImageCarousel images={listing.images} />
        <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">All Offers</h2>
          <div className="flex min-h-[180px] items-center justify-center py-8">
            <p className="text-center font-navbar text-lg text-[#9CA3AF] sm:text-xl">No offer are here</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">{listing.title}</h2>
            <p className="mt-1 font-navbar text-sm text-[#5E5E5E] sm:text-base">{listing.mileage}</p>
          </div>
          <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 font-navbar text-xs font-semibold text-red-600">
            Time Over
          </span>
        </div>

        <div className="my-5 border-t border-[#E5E7EB]" />

        <p className="font-navbar text-sm text-[#5E5E5E]">Time is Over</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="font-hero-heading text-3xl font-bold text-[#1E1E1E] sm:text-4xl">13h Ago</span>
          <span className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">
            (You Have 24h to again relisting your car)
          </span>
        </div>

        <div className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50/90 p-4">
          <p className="font-navbar text-sm font-semibold text-emerald-800">Your Works:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 font-navbar text-sm text-emerald-800">
            <li>Re-list your car in 24h</li>
            <li>Update your photos, videos, details</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={ROUTES.seller.listCar}
            className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#FFA51F] py-3.5 font-navbar text-sm font-bold text-white transition hover:bg-[#e8940f] sm:text-base"
          >
            Re-list
          </Link>
          <Link
            href={ROUTES.seller.listCar}
            className="flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-[#FFA51F] bg-white py-3.5 font-navbar text-sm font-bold text-[#FFA51F] transition hover:bg-amber-50 sm:text-base"
          >
            Update listing
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { MapPin } from "lucide-react";
import type { SellerProfileCar } from "@/components/seller/profile/profile-dummy-data";
import { SELLER_PROFILE_DUMMY } from "@/components/seller/profile/profile-dummy-data";

type TotalAuctionSectionProps = {
  cars: SellerProfileCar[];
};

export function TotalAuctionSection({ cars }: TotalAuctionSectionProps) {
  const n = SELLER_PROFILE_DUMMY.totalAuctions;
  const label = `Total Auction (${String(n).padStart(2, "0")})`;

  return (
    <section className="mt-10 w-full">
      <h2 className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">{label}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {cars.map((car) => (
          <article
            key={car.id}
            className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm"
          >
            <div className="relative h-40 w-full">
              <Image src={car.image} alt="" fill className="rounded-t-xl object-cover" sizes="(max-width:640px) 100vw, 50vw" />
            </div>
            <div className="p-3">
              <h3 className="font-hero-heading text-base font-bold text-[#1E1E1E]">{car.name}</h3>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-navbar text-sm text-[#5E5E5E]">
                <span>{car.km}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {car.location}
                </span>
              </div>
              <button
                type="button"
                className="mt-3 w-full cursor-default rounded-lg bg-[#FFA51F] py-2 text-center font-navbar text-sm font-bold text-[#1E1E1E]"
              >
                {car.price}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

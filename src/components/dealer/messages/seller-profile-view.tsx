import Image from "next/image";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import type { SellerProfileForDealer } from "@/components/dealer/messages/seller-profile-for-dealer-dummy-data";

type SellerProfileViewProps = {
  seller: SellerProfileForDealer;
};

export function SellerProfileView({ seller }: SellerProfileViewProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative inline-flex">
          <div className="rounded-full p-0.5 ring-2 ring-orange-400 ring-offset-2 ring-offset-white">
            {seller.avatarImage ? (
              <Image
                src={seller.avatarImage}
                alt=""
                width={80}
                height={80}
                className="size-20 rounded-full object-cover sm:size-[80px]"
                unoptimized
              />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-slate-200 font-hero-heading text-2xl font-bold text-slate-800 sm:size-[80px] sm:text-3xl">
                {seller.name.charAt(0)}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => console.log("seller profile: change photo", seller.id)}
            className="absolute -bottom-0.5 -right-0.5 flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#FFA51F] text-white shadow-md transition hover:bg-[#e8940f]"
            aria-label="Change profile photo"
          >
            <Camera className="size-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <h2 className="mt-5 font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">{seller.name}</h2>
        <p className="mt-2 font-navbar text-sm text-[#5E5E5E] sm:text-base">{seller.email}</p>
      </div>

      <div className="mx-auto mt-8 max-w-xs divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB] bg-white p-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <Mail className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
          <span className="font-navbar text-sm text-[#1E1E1E]">{seller.email}</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <Phone className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
          <span className="font-navbar text-sm text-[#1E1E1E]">{seller.phone}</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <MapPin className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
          <span className="font-navbar text-sm text-[#1E1E1E]">{seller.location}</span>
        </div>
      </div>

      <section className="mt-10">
        <h3 className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">
          Total Auction ({String(seller.totalAuctions).padStart(2, "0")})
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {seller.cars.map((car) => (
            <article key={car.id} className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
              <div className="relative h-28 w-full">
                <Image src={car.image} alt="" fill className="rounded-t-xl object-cover" sizes="200px" />
              </div>
              <div className="p-2.5">
                <p className="font-hero-heading text-xs font-bold leading-tight text-[#1E1E1E] sm:text-sm">{car.name}</p>
                <p className="mt-1 font-navbar text-[10px] text-[#5E5E5E] sm:text-xs">
                  {car.km}
                  <span className="mx-1">·</span>
                  <span className="inline-flex items-center gap-0.5">
                    <MapPin className="size-3 shrink-0" strokeWidth={2} aria-hidden />
                    {car.location}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => console.log("seller profile auction card", car.id)}
                  className="mt-2 w-full cursor-pointer rounded-lg bg-[#FFA51F] py-2 text-center font-navbar text-xs font-bold text-[#1E1E1E] transition hover:bg-[#e8940f] sm:text-sm"
                >
                  {car.price}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

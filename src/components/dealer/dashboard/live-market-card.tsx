import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { DealerLiveMarketCar } from "@/components/dealer/dealer-dummy-data";

type LiveMarketCardProps = {
  car: DealerLiveMarketCar;
};

export function LiveMarketCard({ car }: LiveMarketCardProps) {
  const isOver = car.status === "timeOver";

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="relative h-44 w-full">
        <Image src={car.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      </div>
      <div className="p-3">
        <h3 className="font-hero-heading text-base font-bold text-[#1E1E1E] sm:text-lg">{car.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-navbar text-sm text-[#5E5E5E]">
          <span>{car.km}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            {car.location}
          </span>
        </div>
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 font-navbar text-sm font-medium",
            isOver ? "text-[#5E5E5E]" : "text-[#FFA51F]"
          )}
        >
          <Clock className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          {car.timer}
        </div>
        {isOver ? (
          <button
            type="button"
            disabled
            className="mt-3 w-full cursor-not-allowed rounded-xl border-2 border-[#FFA51F] bg-white py-2.5 font-navbar text-sm font-semibold text-[#FFA51F]"
          >
            Time Over
          </button>
        ) : (
          <Link
            href={ROUTES.dealer.bidding(car.id)}
            className="mt-3 flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#FFA51F] py-2.5 text-center font-navbar text-sm font-bold text-[#1E1E1E] transition hover:bg-[#e8940f] sm:text-base"
          >
            Place bid
          </Link>
        )}
      </div>
    </article>
  );
}

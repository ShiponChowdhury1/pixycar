import Image from "next/image";
import Link from "next/link";
import { Clock, Trophy } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import type { DealerActiveBid } from "@/components/dealer/dealer-dummy-data";

type ActiveBidRowProps = {
  bid: DealerActiveBid;
};

export function ActiveBidRow({ bid }: ActiveBidRowProps) {
  return (
    <Link
      href={ROUTES.dealer.myOffersActive(bid.id)}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 transition hover:bg-gray-50"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-20">
        <Image src={bid.image} alt="" fill className="object-cover" sizes="80px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-hero-heading text-base font-bold text-[#1E1E1E] sm:text-lg">{bid.car}</p>
        <p className="mt-1 font-navbar text-sm text-[#5E5E5E]">Your offer: {bid.offer}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {bid.status === "leading" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 font-navbar text-xs font-semibold text-emerald-700 sm:text-sm">
              <Trophy className="size-3.5" strokeWidth={2} aria-hidden />
              Leading
            </span>
          ) : (
            <span className="rounded-full bg-orange-100 px-3 py-0.5 font-navbar text-xs font-semibold text-orange-700 sm:text-sm">
              #{bid.rank}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-0.5 font-navbar text-xs text-[#5E5E5E] sm:text-sm">
            <Clock className="size-3.5" strokeWidth={2} aria-hidden />
            {bid.timeLeft}
          </span>
        </div>
      </div>
    </Link>
  );
}

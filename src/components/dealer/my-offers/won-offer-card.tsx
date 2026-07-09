"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import type { WonOfferListItem } from "@/components/dealer/my-offers/dealer-my-offers-data";

const UNLOCK_FEE = "$19.99";

type WonOfferCardProps = {
  offer: WonOfferListItem;
};

export function WonOfferCard({ offer }: WonOfferCardProps) {
  const href = ROUTES.dealer.myOffersUnlockChat(offer.id);

  return (
    <div className="overflow-hidden rounded-2xl border border-green-200 bg-white">
      <Link
        href={href}
        onClick={() => console.log("won offer card:", offer.id)}
        className="block cursor-pointer p-4 transition hover:bg-green-50/30"
      >
        <div className="flex items-start gap-3">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
            <Image src={offer.image} alt="" fill className="object-cover" sizes="80px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-hero-heading text-base font-bold text-[#1E1E1E] sm:text-lg">{offer.car}</p>
            <p className="mt-1 font-hero-heading text-xl font-bold text-emerald-600 sm:text-2xl">{offer.winningPrice}</p>
            <p className="mt-1 font-navbar text-xs text-[#5E5E5E] sm:text-sm">{offer.relativeTime}</p>
          </div>
        </div>
      </Link>
      <div className="border-t border-green-100 px-4 pb-4 pt-2">
        <Link
          href={href}
          onClick={() => console.log("unlock chat button:", offer.id)}
          className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#FFA51F] py-3.5 font-navbar text-sm font-bold text-[#1E1E1E] transition hover:bg-[#e8940f] sm:text-base"
        >
          Unlock Chat - {UNLOCK_FEE}
        </Link>
      </div>
    </div>
  );
}

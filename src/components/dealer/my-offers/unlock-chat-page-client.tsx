"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trophy } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import type { WonUnlockListing } from "@/components/dealer/my-offers/dealer-my-offers-data";
import { UnlockContactModal } from "@/components/dealer/my-offers/unlock-contact-modal";

type UnlockChatPageClientProps = {
  listing: WonUnlockListing;
};

export function UnlockChatPageClient({ listing }: UnlockChatPageClientProps) {
  const router = useRouter();
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href={ROUTES.dealer.myOffers}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
      >
        <span aria-hidden>←</span>
        Back to My Offers
      </Link>

      <h1 className="mt-4 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Unlock Chat</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-neutral-100">
            <Image src={listing.image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <h2 className="mt-4 font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">{listing.car}</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="font-navbar text-sm text-[#5E5E5E]">Congratulation 🎉</p>
            <p className="mt-1 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Your Offer Won</p>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <div>
              <p className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">Winning Offer</p>
              <p className="mt-1 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">{listing.winningOffer}</p>
            </div>
            <Trophy className="size-10 shrink-0 text-green-600" strokeWidth={2} aria-hidden />
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-navbar text-sm text-[#5E5E5E]">One-time unlock fee</p>
              <p className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">{listing.unlockFee}</p>
            </div>
            <p className="mt-1 font-navbar text-xs text-[#5E5E5E] sm:text-sm">Required to contact seller</p>
            <div className="mt-4 rounded-lg bg-orange-50 px-3 py-3">
              <p className="font-navbar text-sm font-bold text-orange-600">Non-refundable</p>
              <p className="mt-1 font-navbar text-xs text-orange-600 sm:text-sm">
                This fee is charged even if the deal does not complete
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              console.log("unlock chat click:", listing.id);
              setShowUnlockModal(true);
            }}
            className="w-full cursor-pointer rounded-xl bg-[#FFA51F] py-4 font-navbar text-base font-bold text-[#1E1E1E] transition hover:bg-[#e8940f]"
          >
            Unlock Chat - {listing.unlockFee}
          </button>
        </div>
      </div>

      <UnlockContactModal
        open={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onConfirm={() => {
          setShowUnlockModal(false);
          router.push(ROUTES.dealer.myOffersPayUnlock(listing.id));
        }}
      />
    </div>
  );
}

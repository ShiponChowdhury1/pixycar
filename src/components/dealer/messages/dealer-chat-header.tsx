import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";

type DealerChatHeaderProps = {
  sellerId: string;
  sellerName: string;
  sellerInitial: string;
  sellerImage: string | null;
  carName: string;
  biddingSoldListingId?: string;
  showMobileBack?: boolean;
  onMobileBack?: () => void;
};

export function DealerChatHeader({
  sellerId,
  sellerName,
  sellerInitial,
  sellerImage,
  carName,
  biddingSoldListingId,
  showMobileBack,
  onMobileBack,
}: DealerChatHeaderProps) {
  const profileHref = ROUTES.dealer.sellerProfile(sellerId);

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-[#E5E7EB] bg-[#FFFBF5] px-4 py-3">
      {showMobileBack && onMobileBack ? (
        <button
          type="button"
          onClick={onMobileBack}
          className="flex shrink-0 cursor-pointer items-center gap-0.5 rounded-lg p-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:bg-white/60 hover:text-[#1E1E1E] lg:hidden"
          aria-label="Back to conversations"
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
          <span className="sr-only sm:not-sr-only">Back</span>
        </button>
      ) : null}

      <div className="relative shrink-0">
        {sellerImage ? (
          <Image src={sellerImage} alt="" width={48} height={48} className="size-12 rounded-full object-cover" unoptimized />
        ) : (
          <div
            className="flex size-12 items-center justify-center rounded-full bg-slate-200 font-navbar text-lg font-bold text-slate-800"
            aria-hidden
          >
            {sellerInitial}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={profileHref}
          onClick={() => console.log("dealer chat: open seller profile", sellerId)}
          className="block truncate font-hero-heading text-base font-bold text-[#1E1E1E] transition hover:text-[#FFA51F] sm:text-lg"
        >
          {sellerName}
        </Link>
        <p className="truncate font-navbar text-sm text-[#FFA51F]">{carName}</p>
        {biddingSoldListingId ? (
          <Link
            href={ROUTES.dealer.biddingSold(biddingSoldListingId)}
            onClick={() => console.log("dealer chat: open bidding sold", biddingSoldListingId)}
            className="mt-1 inline-block font-navbar text-xs font-medium text-[#5E5E5E] underline transition hover:text-[#1E1E1E]"
          >
            View bidding details
          </Link>
        ) : null}
      </div>
    </div>
  );
}

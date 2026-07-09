import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";

type ChatHeaderProps = {
  dealerId: string;
  dealerName: string;
  dealerInitial: string;
  dealerImage: string | null;
  carName: string;
  showMobileBack?: boolean;
  onMobileBack?: () => void;
  /** Full path for contact profile link (defaults to seller dealer profile) */
  contactProfileHref?: string;
};

export function ChatHeader({
  dealerId,
  dealerName,
  dealerInitial,
  dealerImage,
  carName,
  showMobileBack,
  onMobileBack,
  contactProfileHref,
}: ChatHeaderProps) {
  const profileHref = contactProfileHref ?? ROUTES.seller.dealerProfile(dealerId);
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-[#E5E7EB] bg-[#FFFBF5] px-4 py-3">
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
        {dealerImage ? (
          <Image
            src={dealerImage}
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div
            className="flex size-12 items-center justify-center rounded-full bg-amber-100 font-navbar text-lg font-bold text-amber-800"
            aria-hidden
          >
            {dealerInitial}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={profileHref}
          className="block truncate font-hero-heading text-base font-bold text-[#1E1E1E] transition hover:text-[#FFA51F] sm:text-lg"
        >
          {dealerName}
        </Link>
        <p className="truncate font-navbar text-sm text-[#FFA51F]">{carName}</p>
      </div>

      <span className="shrink-0 rounded-full bg-orange-400 px-3 py-1 font-navbar text-xs font-semibold text-white sm:text-sm">
        Sold
      </span>
    </div>
  );
}

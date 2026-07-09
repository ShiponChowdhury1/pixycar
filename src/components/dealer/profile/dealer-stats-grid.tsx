import { Award, CreditCard, ShoppingBag } from "lucide-react";
import { DEALER_PROFILE_STATS } from "@/components/dealer/profile/dealer-profile-dummy-data";

export function DealerStatsGrid() {
  const { totalOffers, won, totalSpent } = DEALER_PROFILE_STATS;

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShoppingBag className="size-5" strokeWidth={2} aria-hidden />
          </div>
          <div className="min-w-0 text-left">
            <p className="font-hero-heading text-2xl font-bold text-[#1E1E1E]">{totalOffers}</p>
            <p className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">Total Offers</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Award className="size-5" strokeWidth={2} aria-hidden />
          </div>
          <div className="min-w-0 text-left">
            <p className="font-hero-heading text-2xl font-bold text-[#1E1E1E]">{won}</p>
            <p className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">Won</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FFA51F]">
          <CreditCard className="size-5" strokeWidth={2} aria-hidden />
        </div>
        <div className="min-w-0 text-left">
          <p className="font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">{totalSpent}</p>
          <p className="font-navbar text-xs text-[#5E5E5E] sm:text-sm">Total Spent on Cars</p>
        </div>
      </div>
    </div>
  );
}

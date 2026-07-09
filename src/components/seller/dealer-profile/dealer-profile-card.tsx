import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import type { DealerProfile } from "@/components/seller/messages/messages-dummy-data";

type DealerProfileCardProps = {
  dealer: DealerProfile;
};

export function DealerProfileCard({ dealer }: DealerProfileCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full p-0.5 ring-2 ring-orange-400 ring-offset-2 ring-offset-[#F9FAFB]">
        {dealer.avatarImage ? (
          <Image
            src={dealer.avatarImage}
            alt=""
            width={96}
            height={96}
            className="size-24 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-full bg-slate-200 font-navbar text-2xl font-bold text-slate-800">
            {dealer.avatarInitial}
          </div>
        )}
      </div>
      <h1 className="mt-6 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">{dealer.name}</h1>
      <p className="mt-2 font-navbar text-sm text-[#5E5E5E] sm:text-base">{dealer.email}</p>

      <div className="mx-auto mt-8 w-full max-w-xs divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white p-1 px-4 shadow-sm">
        <div className="flex items-center gap-3 py-3">
          <Mail className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
          <span className="text-left font-navbar text-sm text-[#1E1E1E] sm:text-base">{dealer.email}</span>
        </div>
        <div className="flex items-center gap-3 py-3">
          <Phone className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
          <span className="text-left font-navbar text-sm text-[#1E1E1E] sm:text-base">{dealer.phone}</span>
        </div>
        <div className="flex items-center gap-3 py-3">
          <MapPin className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
          <span className="text-left font-navbar text-sm text-[#1E1E1E] sm:text-base">{dealer.location}</span>
        </div>
      </div>
    </div>
  );
}

import { Mail, MapPin, Phone } from "lucide-react";
import { SELLER_PROFILE_DUMMY } from "@/components/seller/profile/profile-dummy-data";

export function ContactInfoCard() {
  const { email, phone, location } = SELLER_PROFILE_DUMMY;

  return (
    <div className="mx-auto w-full max-w-xs divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB] bg-white p-1 px-4">
      <div className="flex items-center gap-3 py-2.5">
        <Mail className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
        <span className="font-navbar text-sm text-[#1E1E1E] sm:text-base">{email}</span>
      </div>
      <div className="flex items-center gap-3 py-2.5">
        <Phone className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
        <span className="font-navbar text-sm text-[#1E1E1E] sm:text-base">{phone}</span>
      </div>
      <div className="flex items-center gap-3 py-2.5">
        <MapPin className="size-5 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
        <span className="font-navbar text-sm text-[#1E1E1E] sm:text-base">{location}</span>
      </div>
    </div>
  );
}

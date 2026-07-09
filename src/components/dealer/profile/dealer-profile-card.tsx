import Image from "next/image";
import { Camera } from "lucide-react";
import { DEALER_PROFILE_USER } from "@/components/dealer/profile/dealer-profile-dummy-data";

export function DealerProfileCard() {
  const { name, email, avatar } = DEALER_PROFILE_USER;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative inline-flex">
        <div className="rounded-full p-0.5 ring-2 ring-orange-400 ring-offset-2 ring-offset-[#F9FAFB]">
          <Image
            src={avatar}
            alt=""
            width={72}
            height={72}
            className="size-[72px] rounded-full object-cover"
            unoptimized
          />
        </div>
        <button
          type="button"
          onClick={() => console.log("dealer profile: change avatar")}
          className="absolute -bottom-0.5 -right-0.5 flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#FFA51F] text-white shadow-md transition hover:bg-[#e8940f]"
          aria-label="Change profile photo"
        >
          <Camera className="size-4" strokeWidth={2} aria-hidden />
        </button>
      </div>
      <h2 className="mt-5 font-hero-heading text-xl font-bold text-[#1E1E1E] sm:text-2xl">{name}</h2>
      <p className="mt-2 font-navbar text-sm text-[#5E5E5E] sm:text-base">{email}</p>
    </div>
  );
}

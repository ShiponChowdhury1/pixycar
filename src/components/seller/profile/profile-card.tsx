import Image from "next/image";
import { SELLER_PROFILE_DUMMY } from "@/components/seller/profile/profile-dummy-data";

export function ProfileCard() {
  const { name, email, avatar } = SELLER_PROFILE_DUMMY;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full p-0.5 ring-2 ring-orange-400 ring-offset-2 ring-offset-white">
        <Image
          src={avatar}
          alt=""
          width={96}
          height={96}
          className="size-20 rounded-full object-cover sm:size-24"
          unoptimized
        />
      </div>
      <h1 className="mt-6 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">{name}</h1>
      <p className="mt-2 font-navbar text-sm text-[#5E5E5E] sm:text-base">{email}</p>
    </div>
  );
}

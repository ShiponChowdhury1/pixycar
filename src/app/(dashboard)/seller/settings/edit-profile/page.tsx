"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/constants/routes";
import { FieldError } from "@/components/auth/sign-up/field-error";
import { editProfileSchema, type EditProfileInput } from "@/components/seller/settings/settings-schemas";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "mt-1.5 w-full rounded-lg border border-[#E5E7EB] px-4 py-3 font-navbar text-base text-[#1E1E1E]",
  "outline-none transition placeholder:text-neutral-400",
  "focus:border-[#FFA51F] focus:ring-2 focus:ring-[#FFA51F]/20"
);

import { useAppSelector } from "@/store";
import { selectCurrentUser } from "@/store/features/auth/authSlice";

export default function EditProfilePage() {
  const user = useAppSelector(selectCurrentUser);
  const [toast, setToast] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: user?.full_name || user?.name || (user?.email ? user.email.split("@")[0] : ""),
      phone: "",
      address: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: EditProfileInput) => {
    console.log("edit-profile", data);
    setToast("Profile saved successfully.");
    window.setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="mx-auto w-full max-w-lg flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {toast ? (
        <div
          className="fixed bottom-6 left-1/2 z-[110] w-[min(90vw,400px)] -translate-x-1/2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-navbar text-sm font-medium text-emerald-900 shadow-lg"
          role="status"
        >
          {toast}
        </div>
      ) : null}

      <Link
        href={ROUTES.seller.settings}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
      >
        <span aria-hidden>←</span>
        Back to Settings
      </Link>

      <h1 className="mt-6 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Edit personal info</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex w-full max-w-sm flex-col gap-5">
        <div>
          <label htmlFor="fullName" className="block font-navbar text-sm font-medium text-[#1E1E1E]">
            Full Name
          </label>
          <input id="fullName" type="text" placeholder="Enter your Name" className={inputClass} {...register("fullName")} />
          <FieldError message={errors.fullName?.message} />
        </div>
        <div>
          <label htmlFor="phone" className="block font-navbar text-sm font-medium text-[#1E1E1E]">
            Phone Number
          </label>
          <input id="phone" type="tel" placeholder="Mobile Number" className={inputClass} {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label htmlFor="address" className="block font-navbar text-sm font-medium text-[#1E1E1E]">
            Address
          </label>
          <input id="address" type="text" placeholder="City, State" className={inputClass} {...register("address")} />
          <FieldError message={errors.address?.message} />
        </div>
        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-xl bg-[#FFA51F] py-3 font-navbar text-base font-bold text-[#1E1E1E] transition hover:bg-[#e8940f]"
        >
          Save
        </button>
      </form>
    </div>
  );
}

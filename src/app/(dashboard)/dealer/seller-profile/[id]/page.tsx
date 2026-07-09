import Link from "next/link";
import { notFound } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { getSellerProfileForDealer } from "@/components/dealer/messages/seller-profile-for-dealer-dummy-data";
import { SellerProfileView } from "@/components/dealer/messages/seller-profile-view";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DealerSellerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const seller = getSellerProfileForDealer(id);
  if (!seller) notFound();

  return (
    <div className="mx-auto w-full max-w-lg flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href={ROUTES.dealer.messages}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
      >
        <span aria-hidden>←</span>
        Back to Message
      </Link>

      <h1 className="mt-6 font-hero-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">Profile</h1>

      <div className="mt-8">
        <SellerProfileView seller={seller} />
      </div>
    </div>
  );
}

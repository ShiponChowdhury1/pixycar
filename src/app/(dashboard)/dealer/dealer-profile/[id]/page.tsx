import Link from "next/link";
import { notFound } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { getDealerProfile } from "@/components/seller/messages/messages-dummy-data";
import { DealerProfileCard } from "@/components/seller/dealer-profile/dealer-profile-card";
import { RecentActivity } from "@/components/seller/dealer-profile/recent-activity";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DealerContactProfilePage({ params }: PageProps) {
  const { id } = await params;
  const dealer = getDealerProfile(id);
  if (!dealer) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href={ROUTES.dealer.messages}
        className="inline-flex items-center gap-1 font-navbar text-sm font-medium text-[#5E5E5E] transition hover:text-[#1E1E1E]"
      >
        <span aria-hidden>←</span>
        Back to Message
      </Link>

      <div className="mt-8">
        <DealerProfileCard dealer={dealer} />
        <RecentActivity items={dealer.recentActivity} />
      </div>
    </div>
  );
}

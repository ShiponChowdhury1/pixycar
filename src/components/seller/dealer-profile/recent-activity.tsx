import Image from "next/image";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecentActivityItem } from "@/components/seller/messages/messages-dummy-data";

type RecentActivityProps = {
  items: RecentActivityItem[];
};

function statusClass(status: RecentActivityItem["status"]) {
  if (status === "Won") return "bg-emerald-500 text-white";
  return "bg-red-100 text-red-500";
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <section className="mt-10 w-full">
      <h2 className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">Recent Activity</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 50vw" />
            </div>
            <div className="p-4">
              <h3 className="font-hero-heading text-base font-bold text-[#1E1E1E] sm:text-lg">{item.car}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-navbar text-sm text-[#5E5E5E]">
                <span>{item.km}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {item.location}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <span className="font-navbar text-base font-bold text-[#1E1E1E] sm:text-lg">{item.price}</span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 font-navbar text-xs font-semibold sm:text-sm",
                    statusClass(item.status)
                  )}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

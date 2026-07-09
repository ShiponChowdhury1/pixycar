import Image from "next/image";
import { MapPin } from "lucide-react";
import { DEALER_RECENT_ACTIVITY } from "@/components/dealer/profile/dealer-profile-dummy-data";
import { cn } from "@/lib/utils";

export function DealerRecentActivity() {
  return (
    <section className="mt-10">
      <h2 className="font-hero-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">Recent Activity</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {DEALER_RECENT_ACTIVITY.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
          >
            <div className="relative h-32 w-full">
              <Image src={item.image} alt="" fill className="rounded-t-xl object-cover" sizes="(max-width: 640px) 45vw, 200px" />
            </div>
            <div className="p-2.5">
              <p className="font-hero-heading text-xs font-bold leading-tight text-[#1E1E1E] sm:text-sm">{item.car}</p>
              <p className="mt-1 font-navbar text-[10px] text-[#5E5E5E] sm:text-xs">
                {item.km}
                <span className="mx-1">·</span>
                <span className="inline-flex items-center gap-0.5">
                  <MapPin className="size-3 shrink-0" strokeWidth={2} aria-hidden />
                  {item.location}
                </span>
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="font-hero-heading text-xs font-bold text-[#1E1E1E] sm:text-sm">{item.price}</p>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 font-navbar text-[10px] font-semibold sm:px-3 sm:py-1 sm:text-xs",
                    item.status === "Won" && "bg-green-500 text-white",
                    item.status === "Lost" && "bg-red-100 text-red-500"
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

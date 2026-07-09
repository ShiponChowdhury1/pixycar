"use client";

import { AlertTriangle, Bell, Clock, TrendingUp, Trophy, X } from "lucide-react";

export type NotificationIconKind = "trending" | "alert" | "clock" | "trophy";

export type NotificationItemData = {
  id: string;
  icon: NotificationIconKind;
  title: string;
  subtitle: string;
  timeAgo: string;
};

export const SELLER_NOTIFICATION_ITEMS: NotificationItemData[] = [
  {
    id: "1",
    icon: "trending",
    title: "New bid received",
    subtitle: "2018 Ford F-150 — New bid: $22,500",
    timeAgo: "5 min ago",
  },
  {
    id: "2",
    icon: "alert",
    title: "New message from dealer",
    subtitle: "A dealer sent you a message",
    timeAgo: "15 min ago",
  },
  {
    id: "3",
    icon: "clock",
    title: "Bidding ended",
    subtitle: "2019 Ford F-150 — Select winning dealer",
    timeAgo: "3 hour ago",
  },
];

function IconWrap({ type }: { type: NotificationIconKind }) {
  if (type === "trending") {
    return (
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
        <TrendingUp className="size-5 text-blue-700" strokeWidth={2} aria-hidden />
      </span>
    );
  }
  if (type === "alert") {
    return (
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
        <AlertTriangle className="size-5 text-orange-600" strokeWidth={2} aria-hidden />
      </span>
    );
  }
  if (type === "trophy") {
    return (
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100">
        <Trophy className="size-5 text-green-700" strokeWidth={2} aria-hidden />
      </span>
    );
  }
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
      <Clock className="size-5 text-amber-700" strokeWidth={2} aria-hidden />
    </span>
  );
}

type NotificationPanelProps = {
  onClose: () => void;
  /** Defaults to seller inbox sample data */
  items?: NotificationItemData[];
};

export function NotificationPanel({ onClose, items = SELLER_NOTIFICATION_ITEMS }: NotificationPanelProps) {
  const list = items;

  return (
    <div
      className="absolute right-0 top-full z-50 mt-2 min-w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-[#E5E7EB] bg-white shadow-xl"
      role="dialog"
      aria-label="Notifications"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="size-4 shrink-0 text-[#5E5E5E]" strokeWidth={2} aria-hidden />
          <h2 className="font-hero-heading text-sm font-bold text-[#1E1E1E] sm:text-base">Notifications</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg p-1.5 text-[#5E5E5E] transition hover:bg-neutral-100 hover:text-[#1E1E1E]"
          aria-label="Close notifications"
        >
          <X className="size-4" strokeWidth={2} />
        </button>
      </div>
      <ul className="max-h-[min(70vh,420px)] overflow-y-auto px-2 pb-3 pt-1">
        {list.map((n) => (
          <li key={n.id} className="rounded-xl px-2 py-3 transition hover:bg-neutral-50">
            <button
              type="button"
              className="flex w-full cursor-pointer gap-3 text-left"
              onClick={() => console.log("notification opened:", n.id, n.title)}
            >
              <IconWrap type={n.icon} />
              <div className="min-w-0 flex-1">
                <p className="font-hero-heading text-sm font-bold text-[#1E1E1E]">{n.title}</p>
                <p className="mt-0.5 font-navbar text-xs text-[#5E5E5E] sm:text-sm">{n.subtitle}</p>
                <p className="mt-1 font-navbar text-xs text-[#9CA3AF]">{n.timeAgo}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const NOTIFICATIONS_EXIST = SELLER_NOTIFICATION_ITEMS.length > 0;

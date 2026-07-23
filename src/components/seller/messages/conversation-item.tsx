import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/components/seller/messages/messages-dummy-data";

type ConversationItemProps = {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
};

function avatarBg(conversation: Conversation) {
  if (conversation.sellerId) {
    if (conversation.id === "2") return "bg-slate-200 text-slate-800";
    return "bg-amber-100 text-amber-800";
  }
  if (conversation.dealerInitial === "C") return "bg-slate-200 text-slate-800";
  return "bg-amber-100 text-amber-800";
}

export function ConversationItem({ conversation, isSelected, onSelect }: ConversationItemProps) {
  const isDealerInbox = Boolean(conversation.sellerId);
  const title = isDealerInbox ? (conversation.sellerName ?? conversation.dealerName) : conversation.dealerName;
  const initial = isDealerInbox ? (conversation.sellerInitial ?? conversation.dealerInitial) : conversation.dealerInitial;
  const imageUrl = isDealerInbox ? conversation.sellerImage : conversation.dealerImage;
  const carClass = isDealerInbox ? "text-teal-600" : "text-[#FFA51F]";

  const displayLastMessage =
    typeof conversation.lastMessage === "string"
      ? conversation.lastMessage
      : typeof conversation.lastMessage === "object" && conversation.lastMessage !== null
      ? (conversation.lastMessage as any).text || (conversation.lastMessage as any).content || (conversation.lastMessage as any).message || "No messages yet"
      : "No messages yet";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full cursor-pointer gap-3 border-b border-[#E5E7EB] px-4 py-3 text-left transition hover:bg-gray-50",
        isSelected && "border-l-4 border-l-orange-400 bg-[#FFF7ED] pl-3 hover:bg-[#FFF7ED]"
      )}
    >
      <div className="relative shrink-0">
        {imageUrl ? (
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
            <Image src={imageUrl} alt="" fill className="object-cover" sizes="48px" unoptimized />
          </div>
        ) : (
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-full font-navbar text-lg font-bold",
              avatarBg(conversation)
            )}
          >
            {initial}
          </div>
        )}
        {conversation.unreadCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-[#FFA51F] font-navbar text-[10px] font-bold text-white ring-2 ring-white">
            {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="truncate font-navbar text-sm font-bold text-[#1E1E1E] sm:text-base">{title}</span>
          <span className="shrink-0 font-navbar text-xs text-[#5E5E5E]">{conversation.time}</span>
        </div>
        <p className="mt-0.5 truncate font-navbar text-xs text-[#5E5E5E] sm:text-sm">{displayLastMessage}</p>
        <p className={cn("mt-1 font-navbar text-xs font-medium sm:text-sm", carClass)}>{conversation.carName}</p>
      </div>
    </button>
  );
}

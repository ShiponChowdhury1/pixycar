import type { ChatMessage } from "@/components/seller/messages/messages-dummy-data";
import { cn } from "@/lib/utils";

type ChatBubbleProps = {
  message: ChatMessage;
  currentRole: "seller" | "dealer";
  dealerPartyInitial: string;
  sellerPartyInitial: string;
};

function avatarInitial(message: ChatMessage, dealerPartyInitial: string, sellerPartyInitial: string) {
  return message.sender === "dealer" ? dealerPartyInitial : sellerPartyInitial;
}

function leftAvatarClass(message: ChatMessage) {
  if (message.sender === "dealer") {
    return "bg-amber-100 font-navbar text-sm font-bold text-amber-800";
  }
  return "bg-neutral-800 font-navbar text-sm font-bold text-white";
}

export function ChatBubble({ message, currentRole, dealerPartyInitial, sellerPartyInitial }: ChatBubbleProps) {
  const isCurrentUser = message.sender === currentRole;
  const initial = avatarInitial(message, dealerPartyInitial, sellerPartyInitial);

  if (!isCurrentUser) {
    return (
      <div className="flex max-w-[min(100%,36rem)] gap-2 self-start">
        <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", leftAvatarClass(message))} aria-hidden>
          {initial}
        </div>
        <div className="min-w-0">
          <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2.5 font-navbar text-sm leading-relaxed text-[#1E1E1E] sm:text-base">
            {message.text}
          </div>
          <p className="mt-1 pl-1 font-navbar text-xs text-[#5E5E5E]">{message.time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-[min(100%,36rem)] flex-row-reverse gap-2 self-end">
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-500 font-navbar text-sm font-bold text-white"
        aria-hidden
      >
        {initial}
      </div>
      <div className="min-w-0 text-right">
        <div className="rounded-2xl rounded-tr-none bg-[#FFA51F] px-4 py-2.5 text-left font-navbar text-sm leading-relaxed text-white sm:text-base">
          {message.text}
        </div>
        <p className="mt-1 pr-1 text-right font-navbar text-xs text-[#5E5E5E]">{message.time}</p>
      </div>
    </div>
  );
}

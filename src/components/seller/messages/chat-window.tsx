"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/components/seller/messages/messages-dummy-data";
import { ChatBubble } from "@/components/seller/messages/chat-bubble";
import { ChatHeader } from "@/components/seller/messages/chat-header";
import { ChatInput } from "@/components/seller/messages/chat-input";
import { DealerChatHeader } from "@/components/dealer/messages/dealer-chat-header";

type ChatWindowProps = {
  dealerId: string;
  dealerName: string;
  dealerInitial: string;
  dealerImage: string | null;
  carName: string;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  showMobileBack?: boolean;
  onMobileBack?: () => void;
  contactProfileHref?: string;
  /** Who is logged in: drives bubble alignment */
  currentRole?: "seller" | "dealer";
  /** Avatar initial for dealer party in thread */
  dealerPartyInitial?: string;
  /** Avatar initial for seller party in thread */
  sellerPartyInitial?: string;
  sellerId?: string;
  sellerName?: string;
  sellerInitial?: string;
  sellerImage?: string | null;
  biddingSoldListingId?: string;
};

export function ChatWindow({
  dealerId,
  dealerName,
  dealerInitial,
  dealerImage,
  carName,
  messages,
  inputValue,
  onInputChange,
  onSend,
  showMobileBack,
  onMobileBack,
  contactProfileHref,
  currentRole = "seller",
  dealerPartyInitial,
  sellerPartyInitial = "J",
  sellerId,
  sellerName,
  sellerInitial,
  sellerImage,
  biddingSoldListingId,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const dInitial = dealerPartyInitial ?? dealerInitial;
  const sInitial = sellerPartyInitial;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, dealerId, sellerId]);

  const isDealerInbox = currentRole === "dealer" && sellerId && sellerName;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white lg:min-h-[calc(100dvh-12rem)]">
      {isDealerInbox ? (
        <DealerChatHeader
          sellerId={sellerId}
          sellerName={sellerName}
          sellerInitial={sellerInitial ?? "J"}
          sellerImage={sellerImage ?? null}
          carName={carName}
          biddingSoldListingId={biddingSoldListingId}
          showMobileBack={showMobileBack}
          onMobileBack={onMobileBack}
        />
      ) : (
        <ChatHeader
          dealerId={dealerId}
          dealerName={dealerName}
          dealerInitial={dealerInitial}
          dealerImage={dealerImage}
          carName={carName}
          showMobileBack={showMobileBack}
          onMobileBack={onMobileBack}
          contactProfileHref={contactProfileHref}
        />
      )}
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#F9FAFB] px-4 py-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          {messages.map((m) => (
            <ChatBubble
              key={m.id}
              message={m}
              currentRole={currentRole}
              dealerPartyInitial={dInitial}
              sellerPartyInitial={sInitial}
            />
          ))}
          <div ref={bottomRef} aria-hidden className="h-px shrink-0" />
        </div>
      </div>
      <ChatInput value={inputValue} onChange={onInputChange} onSend={onSend} />
    </div>
  );
}

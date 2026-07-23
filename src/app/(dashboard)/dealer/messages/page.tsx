"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ChatMessage, Conversation } from "@/components/seller/messages/messages-dummy-data";
import { DEALER_CONVERSATIONS } from "@/components/seller/messages/messages-dummy-data";
import { ConversationList } from "@/components/seller/messages/conversation-list";
import { ChatWindow } from "@/components/seller/messages/chat-window";
import { useChatWebSocket } from "@/features/chat/hooks/useChatWebSocket";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function cloneConvos(): Conversation[] {
  return DEALER_CONVERSATIONS.map((c) => ({
    ...c,
    messages: c.messages.map((m) => ({ ...m })),
  }));
}

function DealerMessagesContent() {
  const searchParams = useSearchParams();
  const urlRoomId = searchParams.get("roomId") || searchParams.get("listingId");

  const [conversations, setConversations] = useState<Conversation[]>(cloneConvos);
  const [activeConvoId, setActiveConvoId] = useState(() => urlRoomId || "1");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (urlRoomId) {
      setActiveConvoId(urlRoomId);
      setMobileShowChat(true);
    }
  }, [urlRoomId]);

  const activeConvo = useMemo(() => {
    const found = conversations.find((c) => c.id === activeConvoId);
    if (found) return found;
    return conversations[0];
  }, [conversations, activeConvoId]);

  const { messages: wsMessages, sendMessage } = useChatWebSocket(activeConvoId);

  // Sync WebSocket incoming messages to active conversation
  useEffect(() => {
    if (!wsMessages || wsMessages.length === 0) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeConvoId) return c;
        const existingIds = new Set(c.messages.map((m) => m.id));
        const newOnly = wsMessages.filter((m) => !existingIds.has(m.id));
        if (newOnly.length === 0) return c;
        const last = newOnly[newOnly.length - 1];
        return {
          ...c,
          messages: [...c.messages, ...newOnly],
          lastMessage: last.text,
          time: last.time,
        };
      })
    );
  }, [wsMessages, activeConvoId]);

  const handleSelectConvo = (id: string) => {
    setActiveConvoId(id);
    setMobileShowChat(true);
    setInputValue("");
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || !activeConvo) return;

    const sentViaWs = sendMessage(text);

    const nextId = Math.max(0, ...activeConvo.messages.map((m) => m.id)) + 1;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: nextId,
      sender: "dealer",
      text,
      time,
    };

    if (!sentViaWs) {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== activeConvoId) return c;
          return {
            ...c,
            messages: [...c.messages, newMsg],
            lastMessage: text,
            time,
          };
        })
      );
    }
    setInputValue("");
  };

  if (!activeConvo || !activeConvo.sellerId || !activeConvo.sellerName) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:min-h-[calc(100dvh-9rem)]">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <ConversationList
          conversations={conversations}
          activeId={activeConvoId}
          onSelect={handleSelectConvo}
          className={cn(mobileShowChat && "hidden lg:flex")}
        />
        <section
          className={cn(
            "flex min-h-0 flex-1 flex-col border-[#E5E7EB] lg:border-l",
            !mobileShowChat && "hidden lg:flex"
          )}
        >
          <ChatWindow
            dealerId={activeConvo.dealerId}
            dealerName={activeConvo.dealerName}
            dealerInitial={activeConvo.dealerInitial}
            dealerImage={activeConvo.dealerImage}
            carName={activeConvo.carName}
            messages={activeConvo.messages}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSend={handleSend}
            showMobileBack
            onMobileBack={() => setMobileShowChat(false)}
            currentRole="dealer"
            dealerPartyInitial="J"
            sellerPartyInitial={activeConvo.sellerInitial ?? "J"}
            sellerId={activeConvo.sellerId}
            sellerName={activeConvo.sellerName}
            sellerInitial={activeConvo.sellerInitial}
            sellerImage={activeConvo.sellerImage ?? null}
            biddingSoldListingId={activeConvo.biddingSoldListingId}
          />
        </section>
      </div>
    </div>
  );
}

export default function DealerMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
          <Loader2 className="size-8 animate-spin text-[#FFA51F]" />
          <p className="font-navbar text-sm text-[#5E5E5E]">Loading messages…</p>
        </div>
      }
    >
      <DealerMessagesContent />
    </Suspense>
  );
}

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ChatMessage, Conversation } from "@/components/seller/messages/messages-dummy-data";
import { SELLER_CONVERSATIONS } from "@/components/seller/messages/messages-dummy-data";
import { ConversationList } from "@/components/seller/messages/conversation-list";
import { ChatWindow } from "@/components/seller/messages/chat-window";
import { useChatWebSocket } from "@/features/chat/hooks/useChatWebSocket";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetThreadsQuery, useGetThreadMessagesQuery } from "@/store/features/communication/communicationApi";
import { useAppSelector } from "@/store";

function cloneConvos(): Conversation[] {
  return SELLER_CONVERSATIONS.map((c) => ({
    ...c,
    messages: c.messages.map((m) => ({ ...m })),
  }));
}

function SellerMessagesContent() {
  const searchParams = useSearchParams();
  const urlRoomId = searchParams.get("roomId") || searchParams.get("listingId");
  const currentUser = useAppSelector((state) => state.auth.user);

  const { data: threadsData, isLoading: isLoadingThreads } = useGetThreadsQuery();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvoId, setActiveConvoId] = useState<string>("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Map API threads to Conversations list
  const apiConversations: Conversation[] = useMemo(() => {
    if (!threadsData?.results || threadsData.results.length === 0) return [];
    return threadsData.results.map((t) => {
      const initialLetter = t.other_party_label
        ? t.other_party_label.replace("Dealer #", "").charAt(0).toUpperCase() || "D"
        : "D";

      return {
        id: String(t.id),
        dealerId: String(t.id),
        dealerName: t.other_party_label,
        dealerInitial: initialLetter,
        dealerImage: null,
        carName: t.listing_title,
        lastMessage: typeof t.last_message === "string"
          ? t.last_message
          : typeof t.last_message === "object" && t.last_message !== null
          ? (t.last_message as any).text || (t.last_message as any).content || (t.last_message as any).message || "No messages yet"
          : "No messages yet",
        time: t.updated_at
          ? new Date(t.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "",
        unreadCount: 0,
        messages: [],
      };
    });
  }, [threadsData]);

  // Set active thread ID and sync conversation list
  useEffect(() => {
    if (apiConversations.length > 0) {
      setConversations(apiConversations);
      if (!activeConvoId) {
        let match = urlRoomId ? apiConversations.find((c) => c.id === urlRoomId) : null;
        if (!match && urlRoomId && threadsData?.results) {
          const tMatch = threadsData.results.find((t) => String(t.listing) === urlRoomId);
          if (tMatch) {
            match = apiConversations.find((c) => c.id === String(tMatch.id));
          }
        }
        setActiveConvoId(match ? match.id : apiConversations[0].id);
      }
    }
  }, [apiConversations, urlRoomId, activeConvoId, threadsData]);

  useEffect(() => {
    if (urlRoomId) {
      let matchedId = urlRoomId;
      if (threadsData?.results) {
        const tMatch = threadsData.results.find((t) => String(t.listing) === urlRoomId);
        if (tMatch) matchedId = String(tMatch.id);
      }
      setActiveConvoId(matchedId);
      setMobileShowChat(true);
    }
  }, [urlRoomId, threadsData]);

  // Query past messages for the selected thread from /communication/threads/<id>/messages/
  const { data: threadMessagesData } = useGetThreadMessagesQuery(activeConvoId, {
    skip: !activeConvoId || isNaN(Number(activeConvoId)),
  });

  // Sync API thread messages to current active conversation
  useEffect(() => {
    if (!threadMessagesData?.results || !activeConvoId) return;

    const formattedMsgs: ChatMessage[] = threadMessagesData.results.map((m) => {
      const isMe = (m.sender_id && currentUser?.id && m.sender_id === currentUser.id) ||
                   (m.sender_email && currentUser?.email && m.sender_email.toLowerCase() === currentUser.email.toLowerCase());
      return {
        id: m.id,
        sender: isMe ? "seller" : "dealer",
        text: m.text || "",
        time: m.created_at
          ? new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "",
      };
    });

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeConvoId) return c;
        const existingIds = new Set(c.messages.map((item) => item.id));
        const newItems = formattedMsgs.filter((item) => !existingIds.has(item.id));
        if (newItems.length === 0) return c;
        return {
          ...c,
          messages: [...c.messages, ...newItems].sort((a, b) => Number(a.id) - Number(b.id)),
        };
      })
    );
  }, [threadMessagesData, activeConvoId, currentUser]);

  const activeConvo = useMemo(() => {
    return conversations.find((c) => c.id === activeConvoId) || conversations[0];
  }, [conversations, activeConvoId]);

  const { messages: wsMessages, sendMessage } = useChatWebSocket(activeConvoId);

  // Sync WebSocket incoming messages to active conversation
  useEffect(() => {
    if (!wsMessages || wsMessages.length === 0 || !activeConvoId) return;
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

    // Send over WebSocket if connected
    const sentViaWs = sendMessage(text);

    const nextId = Math.max(0, ...activeConvo.messages.map((m) => m.id)) + 1;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: nextId,
      sender: "seller",
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

  if (isLoadingThreads) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-[#FFA51F]" />
        <p className="font-navbar text-sm text-[#5E5E5E]">Loading conversations…</p>
      </div>
    );
  }

  if (!activeConvo) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <p className="font-navbar text-base text-[#5E5E5E]">No active conversations found.</p>
      </div>
    );
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
            currentRole="seller"
            dealerPartyInitial={activeConvo.dealerInitial}
            sellerPartyInitial="J"
          />
        </section>
      </div>
    </div>
  );
}

export default function SellerMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
          <Loader2 className="size-8 animate-spin text-[#FFA51F]" />
          <p className="font-navbar text-sm text-[#5E5E5E]">Loading messages…</p>
        </div>
      }
    >
      <SellerMessagesContent />
    </Suspense>
  );
}

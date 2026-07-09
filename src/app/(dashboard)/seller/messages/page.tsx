"use client";

import { useMemo, useState } from "react";
import type { ChatMessage, Conversation } from "@/components/seller/messages/messages-dummy-data";
import { SELLER_CONVERSATIONS } from "@/components/seller/messages/messages-dummy-data";
import { ConversationList } from "@/components/seller/messages/conversation-list";
import { ChatWindow } from "@/components/seller/messages/chat-window";
import { cn } from "@/lib/utils";

function cloneConvos(): Conversation[] {
  return SELLER_CONVERSATIONS.map((c) => ({
    ...c,
    messages: c.messages.map((m) => ({ ...m })),
  }));
}

export default function SellerMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(cloneConvos);
  const [activeConvoId, setActiveConvoId] = useState("1");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const activeConvo = useMemo(
    () => conversations.find((c) => c.id === activeConvoId),
    [conversations, activeConvoId]
  );

  const handleSelectConvo = (id: string) => {
    setActiveConvoId(id);
    setMobileShowChat(true);
    setInputValue("");
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || !activeConvo) return;

    const nextId = Math.max(0, ...activeConvo.messages.map((m) => m.id)) + 1;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = {
      id: nextId,
      sender: "seller",
      text,
      time,
    };

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
    console.log("Message sent:", newMsg);
    setInputValue("");
  };

  if (!activeConvo) {
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
            currentRole="seller"
            dealerPartyInitial={activeConvo.dealerInitial}
            sellerPartyInitial="J"
          />
        </section>
      </div>
    </div>
  );
}

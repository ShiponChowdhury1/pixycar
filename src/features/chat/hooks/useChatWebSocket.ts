"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAppSelector } from "@/store";
import type { ChatMessage } from "@/components/seller/messages/messages-dummy-data";

export function useChatWebSocket(roomId: string | number | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reduxToken = useAppSelector((state) => state.auth.refreshToken);
  const user = useAppSelector((state) => state.auth.user);

  const getAccessToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("pixycar_access_token") || "";
    }
    return "";
  };

  useEffect(() => {
    if (!roomId || String(roomId).trim() === "" || String(roomId) === "1") return;
    const token = getAccessToken();
    if (!token) return;

    let wsBase = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsBase) {
      const apiBase =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://particularistically-transelementary-owen.ngrok-free.dev/api/v1";
      wsBase = apiBase
        .replace(/^http:\/\//, "ws://")
        .replace(/^https:\/\//, "wss://")
        .replace(/\/api\/v1\/?$/, "");
    }

    const wsUrl = `${wsBase}/ws/chat/${roomId}/?token=${encodeURIComponent(token)}`;
    console.log("[WebSocket] Connecting to:", wsUrl);

    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);
      socketRef.current = ws;
    } catch (e) {
      console.warn("[WebSocket] Failed to instantiate WebSocket:", e);
      return;
    }

    ws.onopen = () => {
      console.log("[WebSocket] Connected to room:", roomId);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("[WebSocket] Message received:", data);

        const timeStr = data.created_at || data.placed_at
          ? new Date(data.created_at || data.placed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const senderRole =
          data.sender_role?.toLowerCase() ||
          (data.user_id === user?.id
            ? user?.role?.toLowerCase()
            : data.sender === "dealer" || data.role === "DEALER"
            ? "dealer"
            : "seller");

        const textContent = data.message || data.text || data.content || "";

        if (textContent) {
          const newMsg: ChatMessage = {
            id: data.id || Date.now() + Math.random(),
            sender: (senderRole === "dealer" ? "dealer" : "seller") as "seller" | "dealer",
            text: textContent,
            time: timeStr,
          };

          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      } catch (err) {
        console.warn("[WebSocket] Error parsing message:", err);
      }
    };

    ws.onclose = (e) => {
      console.log("[WebSocket] Closed:", e.code, e.reason);
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.warn("[WebSocket] Event warning:", err);
    };

    return () => {
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        ws.close();
      }
    };
  }, [roomId, user?.id, user?.role]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return false;
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = JSON.stringify({ message: text, text: text });
      socket.send(payload);
      console.log("[WebSocket] Message sent via WS:", text);
      return true;
    } else {
      console.warn("[WebSocket] Cannot send, WS not open.");
      return false;
    }
  }, []);

  return { messages, isConnected, sendMessage, setMessages };
}

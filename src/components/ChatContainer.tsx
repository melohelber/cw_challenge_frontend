"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { Message } from "@/types";
import { sendChatMessage, ApiClientError } from "@/lib/api";
import { SUGGESTION_PROMPTS } from "@/lib/constants";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import LogoutButton from "./LogoutButton";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: response.response,
        sender: "assistant",
        timestamp: new Date(),
        agentUsed: response.agent_used,
        confidence: response.confidence,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) return;

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Desculpe, ocorreu um erro. Tente novamente.",
        sender: "assistant",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-chat-bg">
      <header
        className="flex items-center justify-between border-b border-gray-200 bg-white px-4 pb-3 md:px-6"
        style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top, 0px))" }}
      >
        <Image
          src="/infinitepay-logo.svg"
          alt="InfinitePay Agent"
          width={170}
          height={38}
          priority
        />
        <LogoutButton />
      </header>

      {hasMessages ? (
        <MessageList messages={messages} isLoading={isLoading} />
      ) : (
        <EmptyState />
      )}

      {!isLoading && (
        <div className="flex flex-wrap justify-center gap-2 bg-chat-bg px-4 py-2">
          {SUGGESTION_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-infinitepay-green hover:text-infinitepay-green"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <ChatInput onSend={handleSendMessage} isDisabled={isLoading} />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-infinitepay-green/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 96 96" fill="none">
            <rect x="12" y="18" width="72" height="60" rx="16" fill="#00ee26" opacity="0.1"/>
            <rect x="12" y="18" width="72" height="60" rx="16" stroke="#00ee26" strokeWidth="4.4"/>
            <line x1="48" y1="18" x2="48" y2="8" stroke="#00ee26" strokeWidth="4.4" strokeLinecap="round"/>
            <circle cx="48" cy="6" r="5" fill="#00ee26"/>
            <rect x="2" y="36" width="10" height="16" rx="5" fill="#00ee26" opacity="0.3"/>
            <rect x="84" y="36" width="10" height="16" rx="5" fill="#00ee26" opacity="0.3"/>
            <path d="M30 42c0-3.6 3-6.4 6.4-6.4 3.4 0 6.4 2.8 6.4 6.4s-2.8 6.4-6.4 6.4" stroke="#00ee26" strokeWidth="4" strokeLinecap="round"/>
            <path d="M42.8 42c0-3.6 3-6.4 6.4-6.4 3.4 0 6.4 2.8 6.4 6.4s-2.8 6.4-6.4 6.4" stroke="#00ee26" strokeWidth="4" strokeLinecap="round"/>
            <path d="M33 61a14 14 0 0 0 20 0" stroke="#00ee26" strokeWidth="4" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
      </div>

      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Como posso ajudar?
      </h2>
      <p className="max-w-md text-center text-sm text-gray-500">
        Sou o assistente virtual da InfinitePay. Pergunte sobre produtos, taxas, transações ou peça suporte.
      </p>
    </div>
  );
}

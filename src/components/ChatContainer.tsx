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
    <div className="flex h-screen flex-col bg-chat-bg">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:px-6">
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
        <EmptyState onSuggestionClick={handleSendMessage} />
      )}

      <ChatInput onSend={handleSendMessage} isDisabled={isLoading} />
    </div>
  );
}

interface EmptyStateProps {
  onSuggestionClick: (message: string) => void;
}

function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-infinitepay-green/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ee26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6V2H8" />
            <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
            <path d="M2 12h2" />
            <path d="M9 11v2" />
            <path d="M15 11v2" />
            <path d="M20 12h2" />
          </svg>
        </div>
      </div>

      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Como posso ajudar?
      </h2>
      <p className="mb-8 max-w-md text-center text-sm text-gray-500">
        Sou o assistente virtual da InfinitePay. Pergunte sobre produtos, taxas, transações ou peça suporte.
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTION_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSuggestionClick(prompt)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:border-infinitepay-green hover:text-infinitepay-green"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

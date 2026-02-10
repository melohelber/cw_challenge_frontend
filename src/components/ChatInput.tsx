"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { MESSAGE_MAX_LENGTH } from "@/lib/constants";

interface ChatInputProps {
  onSend: (message: string) => void;
  isDisabled: boolean;
}

export default function ChatInput({ onSend, isDisabled }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = inputValue.length;
  const isOverLimit = charCount > MESSAGE_MAX_LENGTH;
  const canSend = inputValue.trim().length > 0 && !isOverLimit && !isDisabled;

  function handleSend() {
    if (!canSend) return;
    onSend(inputValue.trim());
    setInputValue("");
    resetTextareaHeight();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function resetTextareaHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  const MAX_HEIGHT = 160;

  function handleInput() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, MAX_HEIGHT);
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
    }
  }

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            rows={1}
            placeholder="Digite sua mensagem..."
            className="w-full resize-none overflow-hidden rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-infinitepay-green focus:ring-2 focus:ring-infinitepay-green/20 disabled:opacity-50 disabled:bg-gray-50"
          />
          {charCount > 1800 && (
            <span
              className={`absolute bottom-1.5 right-14 text-[10px] ${
                isOverLimit ? "text-red-500 font-medium" : "text-gray-400"
              }`}
            >
              {charCount}/{MESSAGE_MAX_LENGTH}
            </span>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-infinitepay-green text-white transition-colors hover:bg-infinitepay-green-dark disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Enviar mensagem"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

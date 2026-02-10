import Markdown from "react-markdown";
import type { Message } from "@/types";
import AgentBadge from "./AgentBadge";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1.5`}>
      <div className={`max-w-[80%] md:max-w-[70%]`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words ${
            isUser
              ? "rounded-br-md bg-infinitepay-green text-white"
              : message.isError
                ? "rounded-bl-md bg-red-50 border border-red-200 text-red-700"
                : "rounded-bl-md bg-white border border-gray-100 text-gray-800 shadow-sm"
          }`}
        >
          {isUser ? (
            <span className="whitespace-pre-wrap">{message.content}</span>
          ) : (
            <Markdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                ul: ({ children }) => <ul className="mb-2 ml-4 list-disc last:mb-0">{children}</ul>,
                ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal last:mb-0">{children}</ol>,
                li: ({ children }) => <li className="mb-0.5">{children}</li>,
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </Markdown>
          )}
        </div>

        {!isUser && message.agentUsed && (
          <div className="mt-1 ml-1">
            <AgentBadge agentName={message.agentUsed} />
          </div>
        )}
      </div>
    </div>
  );
}

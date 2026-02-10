"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import ChatContainer from "@/components/ChatContainer";

export default function ChatPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(ROUTES.LOGIN);
      return;
    }
    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-chat-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-infinitepay-green border-t-transparent" />
      </div>
    );
  }

  return <ChatContainer />;
}

import { useState, useCallback } from "react";
import { ChatMessage, ChatConfig } from "@/types/chat";

export function useChat(config: ChatConfig) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: config.welcomeMessage,
      timestamp: new Date(),
      quickReplies: config.quickReplies,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await config.onSendMessage(content, [...messages, userMsg]);
        setMessages((prev) => [...prev, response]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Désolé, une erreur est survenue. Veuillez réessayer.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [config, messages]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: config.welcomeMessage,
        timestamp: new Date(),
        quickReplies: config.quickReplies,
      },
    ]);
  }, [config]);

  return { messages, isLoading, sendMessage, clearMessages };
}

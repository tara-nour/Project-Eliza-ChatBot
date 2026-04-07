import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatWindow } from "./ChatWindow";
import { ChatConfig } from "@/types/chat";

interface ChatWidgetProps {
  config: ChatConfig;
}

export function ChatWidget({ config }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[380px] animate-bounce-in squircle-shadow-float">
          <ChatWindow config={config} onClose={() => setIsOpen(false)} />
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-auto flex w-14 h-14 rounded-full gradient-primary shadow-chat items-center justify-center hover:scale-105 transition-transform duration-200"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>
    </div>
  );
}

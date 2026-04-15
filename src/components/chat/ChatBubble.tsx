import { ChatMessage } from "@/types/chat";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: ChatMessage;
  onQuickReply?: (reply: string) => void;
}

export function ChatBubble({ message, onQuickReply }: ChatBubbleProps) {
  const isBot = message.role === "assistant";

  return (
    <div
      className={`flex gap-3 animate-fade-in-up ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      <div className={`max-w-[75%] space-y-2`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isBot
              ? "bg-card shadow-soft text-card-foreground rounded-tl-md"
              : "gradient-chat text-primary-foreground rounded-tr-md"
          }`}
        >
          {isBot ? (
            <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ) : (
            message.content
          )}
        </div>
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => onQuickReply?.(reply)}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-primary/20 text-primary bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChatConfig } from "@/types/chat";
import { useChat } from "@/hooks/useChat";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { RotateCcw, X, ChevronDown } from "lucide-react";
import { AVAILABLE_MODELS, getCurrentModel, setCurrentModel } from "../../../llm/ollama";

interface ChatWindowProps {
  config: ChatConfig;
  onClose?: () => void;
  className?: string;
}

export function ChatWindow({ config, onClose, className = "" }: ChatWindowProps) {
  const { messages, isLoading, sendMessage, clearMessages } = useChat(config);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState(getCurrentModel());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleModelChange(m: string) {
    setCurrentModel(m);
    setModel(m);
    setDropdownOpen(false);
    clearMessages();
  }

  return (
    <div className={`flex flex-col bg-background rounded-2xl shadow-float overflow-hidden ${className}`}>
      {/* Header */}
      <div className="gradient-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src="src/assets/chat.png" alt="Logo" className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary-foreground">{config.botName}</h3>
            <p className="text-xs text-primary-foreground/70">En ligne • Prêt à vous aider</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={clearMessages} className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground/80">
            <RotateCcw className="w-4 h-4" />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground/80">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[450px]">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} onQuickReply={sendMessage} />
        ))}
       {isLoading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="src/assets/chat.png" 
                    alt="Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="bg-card shadow-soft rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" style={{ animationDelay: "200ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" style={{ animationDelay: "400ms" }} />
                  </div>
                </div>
              </div>
            )}
            </div>

      {/* Model selector */}
      <div className="relative px-4 py-2 border-t border-border bg-card flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Modèle :</span>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono text-foreground bg-muted hover:bg-accent transition-colors"
        >
          {model}
          <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute left-3 bottom-full mb-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden min-w-[140px]">
            {AVAILABLE_MODELS.map((m) => (
              <button
                key={m}
                onClick={() => handleModelChange(m)}
                className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors hover:bg-accent ${
                  m === model ? "font-semibold text-primary" : "text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      <ChatInput placeholder={config.placeholder} onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}

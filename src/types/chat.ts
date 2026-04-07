export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

export interface ChatConfig {
  botName: string;
  welcomeMessage: string;
  placeholder: string;
  quickReplies?: string[];
  onSendMessage: (message: string, history: ChatMessage[]) => Promise<ChatMessage>;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatConfig {
  botName: string;
  welcomeMessage: string;
  placeholder: string;
  onSendMessage: (message: string, history: ChatMessage[]) => Promise<ChatMessage>;
}

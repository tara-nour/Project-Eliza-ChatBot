import { ChatMessage } from "@/types/chat";
import { findBestMatch } from "../../llm/rag";

export async function mockBotReply(
  userMessage: string,
  _history: ChatMessage[]
): Promise<ChatMessage> {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  const lower = userMessage.toLowerCase();
  let content: string;
  let quickReplies: string[] | undefined;

  const bestMatch = findBestMatch(userMessage);

  if (bestMatch) {
    content = `Je comprends votre situation.
    Orientation recommandée : ${bestMatch.orientation}.

    Pour mieux vous aider :
    - ${bestMatch.questions.join("\n- ")}`;
    quickReplies = bestMatch.questions;
  } else {
    content = "Désolé, je n'ai pas compris. Pouvez-vous reformuler ou donner plus de détails ?";
  }

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content,
    timestamp: new Date(),
    quickReplies,
  };
}

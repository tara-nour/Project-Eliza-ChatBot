import { ChatMessage } from "@/types/chat";
import { findBestMatch, findRelevantChunks } from "../../llm/rag";
import { askMistral } from "../../llm/mistral";

export async function mockBotReply(
  userMessage: string,
  _history: ChatMessage[]
): Promise<ChatMessage> {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  let content: string;
  let quickReplies: string[] | undefined;

  const bestMatch = findBestMatch(userMessage);
  const chunks = await findRelevantChunks(userMessage);

  try {
    if (chunks.length > 0) {
      const context = chunks.join("\n\n---\n\n");
      content = await askMistral(userMessage, context);
    } else {
      content = "Désolé, je n'ai pas compris. Pouvez-vous reformuler ou donner plus de détails ?";
    }
  } catch (err: unknown) {
    const status = (err as { statusCode?: number })?.statusCode;
    if (status === 429) {
      content = "Je suis un peu surchargé en ce moment, réessayez dans quelques secondes.";
    } else {
      content = "Une erreur est survenue, veuillez réessayer.";
    }
  }

  quickReplies = bestMatch?.questions;

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content,
    timestamp: new Date(),
    quickReplies,
  };
}

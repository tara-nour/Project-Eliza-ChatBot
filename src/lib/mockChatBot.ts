import { ChatMessage } from "@/types/chat";
import { findBestMatch, findRelevantChunks } from "../../llm/rag";
import { askMistral } from "../../llm/mistral";

export async function mockBotReply(
  userMessage: string,
  history: ChatMessage[]
): Promise<ChatMessage> {
  let content: string;

  const chunks = await findRelevantChunks(userMessage);
  const context = chunks.length > 0 ? chunks.join("\n\n---\n\n") : undefined;

  const llmHistory = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  try {
    content = await askMistral(userMessage, context, llmHistory);
  } catch (err: unknown) {
    const status = (err as { statusCode?: number })?.statusCode;
    if (status === 429) {
      content = "Je suis un peu surchargé en ce moment, réessayez dans quelques secondes.";
    } else {
      content = "Une erreur est survenue, veuillez réessayer.";
    }
  }

  const bestMatch = findBestMatch(userMessage);

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content,
    timestamp: new Date(),
    quickReplies: bestMatch?.questions,
  };
}

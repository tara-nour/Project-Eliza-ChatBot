import { SYS_PROMPT } from "./prompt";
import { getPraticienContext } from "../src/data/praticiens";

export async function embedText(text: string): Promise<number[]> {
  try {
    const response = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "nomic-embed-text", 
        prompt: text,
      }),
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error("Erreur Embedding Ollama :", error);
    return [];
  }
}

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function askMistral(input: string, context?: string, history: HistoryMessage[] = []): Promise<string> {
  const praticiens = getPraticienContext();
  const systemContent = `${SYS_PROMPT}\n\nPraticiens disponibles :\n${praticiens}${context ? `\n\nInformations médicales de référence :\n${context}` : ""}`;

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemContent },
    ...history,
    { role: "user", content: input },
  ];

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // model: "llama3.2:3b",
        model: "phi4-mini",
        messages: messages,
        stream: false, 
      }),
    });

    if (!response.ok) return "Désolé, j'ai rencontré un problème.";
    const data = await response.json();
    return data.message?.content || "";
  } catch (error) {
    console.error("Erreur Chat Ollama :", error);
    return "Je n'arrive pas à me connecter.";
  }
}
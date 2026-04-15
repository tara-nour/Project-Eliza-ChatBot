import { SYS_PROMPT } from "./prompt";
import { getPraticienContext } from "../src/data/praticiens";
import { MODEL } from "./model";

export const AVAILABLE_MODELS = ["phi4-mini", "llama3.2:3b", "mistral:7b", "llama3.1:8b"] as const;
export type OllamaModel = (typeof AVAILABLE_MODELS)[number];

let currentModel: string = MODEL || "phi4-mini";
export const getCurrentModel = () => currentModel;
export const setCurrentModel = (model: string) => { currentModel = model; };

// Fetching text embedding from Ollama.
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

// Fetching model to Ollama localhost.
export async function askOllama(input: string, context?: string, history: HistoryMessage[] = []): Promise<string> {
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
        model: currentModel,
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
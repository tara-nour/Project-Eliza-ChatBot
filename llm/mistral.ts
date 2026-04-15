import { SYS_PROMPT } from "./prompt";

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

export async function askMistral(input: string, context?: string): Promise<string> {
  const systemContent = context
    ? `${SYS_PROMPT}\n\nInformations médicales de référence :\n${context}`
    : SYS_PROMPT;

  const messages: { role: "system" | "user"; content: string }[] = [
    { role: "system", content: systemContent },
    { role: "user", content: input },
  ];

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma2:2b",
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
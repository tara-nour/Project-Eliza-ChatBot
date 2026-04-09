import { Mistral } from "@mistralai/mistralai";
import { SYS_PROMPT } from "./prompt";

const mistral = new Mistral({
  apiKey: import.meta.env.VITE_MISTRAL_API_KEY || "",
});

export async function embedText(text: string): Promise<number[]> {
  const res = await mistral.embeddings.create({
    model: "mistral-embed",
    inputs: [text],
  });
  return res.data[0].embedding;
}

export async function askMistral(input: string, context?: string): Promise<string> {
  const systemContent = context
    ? `${SYS_PROMPT}\n\nInformations médicales de référence :\n${context}`
    : SYS_PROMPT;

  const messages: { role: "system" | "user"; content: string }[] = [
    { role: "system", content: systemContent },
    { role: "user", content: input },
  ];

  const res = await mistral.chat.complete({
    model: "mistral-small-2603",
    messages,
  });
  const rep = res.choices[0].message?.content;
  return typeof rep === "string" ? rep : "";
}

import { embedText } from "./ollama";
import ragData from "./ragVectors.json";
import intentData from "./ragData.json";

type Intent = {
  symptomes: string[];
  questions: string[];
  orientation: string;
  urgence: boolean;
};

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zàâçéèêëîïôûùüÿñæœ\s]/g, "");
}

export function findBestMatch(input: string): Intent | null {
  const words = normalize(input).split(" ");

  let bestIntent: Intent | null = null;
  let bestScore = 0;

  for (const intent of intentData.intents) {
    let score = 0;
    for (const symptome of intent.symptomes) {
      for (const word of words) {
        if (symptome.includes(word)) score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent as Intent;
    }
  }
  return bestIntent;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function findRelevantChunks(query: string, topK = 3): Promise<string[]> {
  if (!ragData.length) return [];

  const queryVec = await embedText(query);
  const scored = (ragData as { source: string; text: string; vector: number[] }[]).map(
    (entry) => ({ text: entry.text, score: cosineSimilarity(queryVec, entry.vector) })
  );
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((e) => e.text);
}

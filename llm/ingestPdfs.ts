import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import dotenv from "dotenv";

dotenv.config();

const PDF_DIR = path.resolve("pdf");
const OUTPUT = path.resolve("llm/ragVectors.json");
const CHUNK_SIZE = 800;

function getAllPdfs(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllPdfs(fullPath));
    else if (entry.name.endsWith(".pdf")) results.push(fullPath);
  }
  return results;
}

function chunkText(text: string): string[] {
  const paragraphs = text.split(/\n{2,}/);
  const chunks: string[] = [];
  let current = "";
  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (!trimmed || trimmed.length < 30) continue;
    if (current.length + trimmed.length > CHUNK_SIZE) {
      if (current) chunks.push(current.trim());
      current = trimmed;
    } else {
      current += (current ? "\n\n" : "") + trimmed;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
}


async function embedBatch(texts: string[]): Promise<number[][]> {
  const vectors: number[][] = [];
  

  for (const text of texts) {
    try {
      const response = await fetch("http://localhost:11434/api/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "nomic-embed-text",
          prompt: text,
        }),
      });
      const data = await response.json();
      vectors.push(data.embedding || []);
    } catch (e) {
      console.error("Erreur d'embedding sur un chunk :", e);
      vectors.push([]); 
    }
  }
  return vectors;
}

async function main() {
  const pdfs = getAllPdfs(PDF_DIR);
  console.log(`Found ${pdfs.length} PDFs`);

  const entries: { source: string; text: string; vector: number[] }[] = [];

  for (const pdfPath of pdfs) {
    const source = path.relative(".", pdfPath);
    console.log(`Processing: ${source}`);
    try {
      const buffer = fs.readFileSync(pdfPath);
      const parser = new PDFParse({ data: buffer });
      const { text } = await parser.getText();
      const chunks = chunkText(text);
      if (!chunks.length) {
        console.warn(`  → No chunks extracted`);
        continue;
      }
      console.log(`  → ${chunks.length} chunks`);

      for (let i = 0; i < chunks.length; i += 4) {
        const batch = chunks.slice(i, i + 4);
        const vectors = await embedBatch(batch);
        for (let j = 0; j < batch.length; j++) {
          if (vectors[j] && vectors[j].length > 0) {
            entries.push({ source, text: batch[j], vector: vectors[j] });
          }
        }
      }
    } catch (e) {
      console.error(`  → Error processing ${source}:`, e);
    }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(entries, null, 2));
  console.log(`\nDone. Saved ${entries.length} chunks to ${OUTPUT}`);
}

main();
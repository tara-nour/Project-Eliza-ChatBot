import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";

dotenv.config();

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

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
  const res = await mistral.embeddings.create({
    model: "mistral-embed",
    inputs: texts,
  });
  return res.data.map((d) => d.embedding ?? []);
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

      for (let i = 0; i < chunks.length; i += 8) {
        const batch = chunks.slice(i, i + 8);
        const vectors = await embedBatch(batch);
        for (let j = 0; j < batch.length; j++) {
          entries.push({ source, text: batch[j], vector: vectors[j] });
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

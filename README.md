![Thumbnail](eliza.png)
# Project's Goal

The Eliza project is an academic project aimed at developing a chatbot to address a problem of our choice.

To do this, we have two options: 
- Build an LLM from scratch ourselves
- Use an existing LLM, fine-tune it ourselves, and run it locally.

We chose the second option for our “MédiRDV” project: a chatbot that acts as a medical appointment assistant, helping patients find the right healthcare provider.
# Installation

## Prerequisites

- [Node.js](https://nodejs.org) v18+
- [npm](https://www.npmjs.com)
- [Ollama](https://ollama.com/download) installed and running

## Project

First, you must clone the repo.

```bash
npm install || bun install
```

## Running Ollama
```bash
ollama pull phi4-mini
ollama pull nomic-embed-text
```

> The project's model can be changed in `llm/model.ts`. `phi4-mini` is the default model.<br>
> If you want to use a model other than the default one, you must run Ollama with the corresponding model at the same time.

## Ingesting PDFs
```bash
npm run ingest
```
## Configuration
Create a .env file at the root of the project:
envVITE_MISTRAL_API_KEY=your_mistral_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here

The file `llm/ragVectors.json` will be automatically generated.

## Then
```bash
npm run dev || bun dev
```
The app will then be available on [http://localhost:8080](http://localhost:8080)

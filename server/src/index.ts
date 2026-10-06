import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const port = Number(process.env.PORT ?? 8787);
const apiKey = process.env.GEMINI_API_KEY;
const provider = process.env.AI_PROVIDER ?? "gemini";
const model = process.env.AI_MODEL ?? "gemini-2.5-flash";

if (provider === "gemini" && !apiKey) throw new Error("GEMINI_API_KEY não configurada. Crie server/.env a partir de .env.example.");
if (provider === "groq" && !process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY não configurada.");

const ai = provider === "gemini" ? new GoogleGenAI({ apiKey }) : null;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "64kb" }));

app.get("/", (_req, res) => res.type("html").send("<!doctype html><title>Plurall AI</title><h1>Plurall AI</h1><p>Servidor local ativo. Use <a href=\"/health\">/health</a> para verificar o status.</p>"));
app.get("/health", (_req, res) => res.json({ ok: true, service: "plurall-ai", provider, model }));

app.post("/api/explain", async (req, res) => {
  const { question, options, subject } = req.body as { question?: unknown; options?: unknown; subject?: unknown };
  if (typeof question !== "string" || !question.trim()) return res.status(400).json({ error: "A questão é obrigatória." });
  try {
    const prompt = [
      "Você é o assistente educacional Plurall AI.",
      "Explique em português brasileiro, com objetividade e sem inventar dados.",
      `Matéria: ${typeof subject === "string" ? subject : "não informada"}`,
      `Questão: ${question.trim()}`,
      `Alternativas: ${JSON.stringify(Array.isArray(options) ? options : [])}`,
      "Retorne a explicação, o conceito utilizado e a alternativa sugerida quando houver segurança."
    ].join("\n");
    if (provider === "groq") {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }], temperature: 0.2 }) });
      const data = await response.json() as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } };
      if (!response.ok) throw new Error(data.error?.message ?? `Groq HTTP ${response.status}`);
      return res.json({ answer: data.choices?.[0]?.message?.content ?? "", model });
    }
    const response = await ai!.models.generateContent({ model, contents: prompt });
    return res.json({ answer: response.text ?? "", model });
  } catch (error) {
    console.error("Falha na IA", error);
    return res.status(502).json({ error: "A IA não respondeu. Tente novamente." });
  }
});

app.listen(port, () => console.log(`Plurall AI server em http://localhost:${port}`));

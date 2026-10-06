export interface ExplainInput { question: string; options?: string[]; subject?: string; }
export interface ExplainResult { answer: string; model: string; }
export async function explainQuestion(input: ExplainInput): Promise<ExplainResult> {
  const response = await fetch("http://localhost:8787/api/explain", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  const body = await response.json() as ExplainResult & { error?: string };
  if (!response.ok) throw new Error(body.error ?? "Falha ao consultar a IA.");
  return body;
}

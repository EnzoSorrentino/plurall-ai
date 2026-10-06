import type { Exercise } from "../domain/models";
export function readVisibleExercises(): Exercise[] {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="/exercicio/"]')).map((a, index) => ({ id: a.href, title: a.textContent?.trim() || `Exercício ${index+1}`, url: a.href, kind: /desafio/i.test(a.textContent || "") ? "desafio" : "minima", type: "unknown", status: "pending" }));
}

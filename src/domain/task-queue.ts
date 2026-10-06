import type { Task } from "./models";
export class TaskQueue {
  constructor(private tasks: Task[] = []) {}
  add(task: Task) { this.tasks.push(task); }
  all() { return this.tasks; }
  next() { return this.tasks.find(t => t.status === "pending" && t.exercises.some(e => e.status === "pending")); }
  skipChallenges() { this.tasks.forEach(t => { if (t.exercises.length && t.exercises.every(e => e.kind === "desafio")) t.status = "skipped"; }); }
}

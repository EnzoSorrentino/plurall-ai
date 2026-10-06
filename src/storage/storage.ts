import type { Task } from "../domain/models";
import { STORAGE_KEY } from "../shared/constants";
export async function loadTasks(): Promise<Task[]> { const value = await chrome.storage.local.get(STORAGE_KEY); return (value[STORAGE_KEY] as Task[]|undefined) ?? []; }
export async function saveTasks(tasks: Task[]) { await chrome.storage.local.set({ [STORAGE_KEY]: tasks }); }

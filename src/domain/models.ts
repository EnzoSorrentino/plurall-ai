export type Subject = "biologia-a"|"biologia-b"|"matematica-a"|"matematica-b"|"quimica-a"|"quimica-b"|"fisica-a"|"fisica-b"|"geografia"|"historia"|"ingles"|"portugues";
export type TaskKind = "minima"|"complementar"|"desafio"|"leitura";
export type TaskStatus = "pending"|"running"|"completed"|"skipped"|"error"|"needs-review";
export interface Exercise { id:string; title:string; url:string; kind:TaskKind; type:"objective"|"written"|"image"|"unknown"; status:TaskStatus; }
export interface Task { id:string; subject:Subject; notebook:string; module:string; title:string; url:string; exercises:Exercise[]; status:TaskStatus; updatedAt:string; }

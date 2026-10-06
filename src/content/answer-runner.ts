import { findAnswerBox, findOption } from "./plurall-adapter";
import { WRITTEN_RESPONSE } from "../shared/constants";
export function fillWrittenAnswer() { const box = findAnswerBox(); if (!box) return false; const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(box), "value")?.set; setter?.call(box, WRITTEN_RESPONSE); box.dispatchEvent(new Event("input", { bubbles:true })); return true; }
export function selectObjective(letter: string) { const option = findOption(letter); option?.click(); return Boolean(option); }

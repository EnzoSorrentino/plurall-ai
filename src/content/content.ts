import { readVisibleExercises } from "./page-reader";
import { fillWrittenAnswer, selectObjective } from "./answer-runner";
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => { if (message?.type === "SCAN_PAGE") sendResponse({ url: location.href, title: document.title, exercises: readVisibleExercises() }); if (message?.type === "FILL_WRITTEN") sendResponse({ ok: fillWrittenAnswer() }); if (message?.type === "SELECT_OBJECTIVE") sendResponse({ ok: selectObjective(message.letter) }); return true; });

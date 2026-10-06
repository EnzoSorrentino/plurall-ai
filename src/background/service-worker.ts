chrome.runtime.onInstalled.addListener(() => console.info("Plurall AI instalado"));
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "GET_PROGRESS") chrome.storage.local.get("plurall-ai.tasks").then(sendResponse);
  return true;
});

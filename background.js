chrome.runtime.onInstalled.addListener(
    console.log("olá")
)

chrome.commands.onCommand.addListener((command) => {
    if (command === "abrir") {
      chrome.action.openPopup();
    }
});
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "highlight",
        title: "HighlightTextInYellow",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "highlight") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setHighlight
        });
    }
});

function setHighlight() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    range.surroundContents(span);
}
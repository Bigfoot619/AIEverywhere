
importScripts('./OpenAI/improveEnglish.js');

chrome.runtime.onInstalled.addListener(function () {
    const contexts = ["selection"];
    const menuItems = [
        { id: "improveEnglish", title: "Improve english" },
        { id: "improveCreative", title: "Improve english - creative" },
        { id: "addComments", title: "Add comments to code" },
        { id: "summarize", title: "Summarize to a single paragraph" },
        { id: "aiQuiz", title: "AI Quiz" }
    ];

    menuItems.forEach(item => {
        chrome.contextMenus.create({
            id: item.id,
            title: item.title,
            contexts: contexts
        });
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const selection = info.selectionText;
    if (!selection) return;

    let content = "";
    switch (info.menuItemId) {
        case "improveEnglish":
            improveEnglish(selection).then(enhancedText => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "openSidebar",
                    title: "Improve English Version",
                    originalContent: selection,
                    enhancedContent: enhancedText
                });
            }).catch(error => {
                console.error("Error improving English: ", error);
            });
            break;
        case "improveCreative":
            content = "Make this text more creative: " + selection;
            break;
        case "addComments":
            content = "Add comments to this code: " + selection;
            break;
        case "summarize":
            content = "Summarize this text to a single paragraph: " + selection;
            break;
        case "aiQuiz":
            content = "Create a quiz based on this content: " + selection;
            break;
    }
});

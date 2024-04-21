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

    switch (info.menuItemId) {
        case "improveEnglish":
            handleRequest("Improve English text", selection, tab);
            break;
        case "improveCreative":
            handleRequest("Make this text more creative", selection, tab);
            break;
        case "addComments":
            handleRequest("Add comments to this code", selection, tab);
            break;
        case "summarize":
            handleRequest("Summarize this text to a single paragraph", selection, tab);
            break;
        case "aiQuiz":
            handleRequest("Create a quiz based on this content", selection, tab);
            break;
    }
});
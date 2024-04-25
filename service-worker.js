importScripts('./OpenAI/improveEnglish.js');
importScripts('./OpenAI/addComments.js');


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
            improveEnglish(selection, true).then(enhancedText => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "openSidebar",
                    title: "Creatively Improved English",
                    originalContent: selection,
                    enhancedContent: enhancedText
                });
            }).catch(error => {
                console.error("Error improving English creatively: ", error);
            });
            break;
        case "addComments":
            addComments(selection).then(enhancedText => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "openSidebar",
                    title: "Code with Comments",
                    originalContent: selection,
                    enhancedContent: enhancedText
                });
            }).catch(error => {
                console.error("Error adding comments: ", error);
            });
            break;
        case "summarize":
            content = "Summarize this text to a single paragraph: " + selection;
            break;
        case "aiQuiz":
            content = "Create a quiz based on this content: " + selection;
            break;
    }
});

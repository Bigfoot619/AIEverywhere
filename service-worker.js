importScripts('./OpenAI/improveEnglish.js');
importScripts('./OpenAI/addComments.js');
importScripts('./OpenAI/summarize.js');
importScripts('./OpenAI/quiz.js');


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
            addComments(selection).then(commentText => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "openSidebar",
                    title: "Code with Comments",
                    originalContent: selection,
                    enhancedContent: commentText
                });
            }).catch(error => {
                console.error("Error adding comments: ", error);
            });
            break;
        case "summarize":
            summarize(selection).then(summary => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "openSidebar",
                    title: "Summary",
                    originalContent: selection,
                    enhancedContent: summary
                });
            }).catch(error => {
                console.error("Error summarizing: ", error);
            });
            break;
        case "aiQuiz":
            generate_quiz(selection).then(quizHTML => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "openSidebar",
                    title: "AI Quiz",
                    originalContent: selection,
                    enhancedContent: quizHTML
                });
            }).catch(error => {
                console.error("Error generating quiz: ", error);
            }); break;
    }
});

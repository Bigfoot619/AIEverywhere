// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "openSidebar") {
        window.toggleSidebar(request.content);
    }
});

let blockedUrls = [];

// Load saved blocked URLs from storage
chrome.storage.sync.get("blockedUrls", function(data) {
    blockedUrls = data.blockedUrls || [];
});

// Listen for web requests and block them if they match the blocked URLs
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return { cancel: blockedUrls.some(url => details.url.includes(url)) };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

// Listen for messages from the popup to add URLs
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "addUrl") {
        blockedUrls.push(request.url);
        chrome.storage.sync.set({ blockedUrls: blockedUrls });
        sendResponse({ status: "success" });
    }
});

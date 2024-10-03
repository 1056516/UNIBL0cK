const urlInput = document.getElementById('urlInput');
const addButton = document.getElementById('addButton');
const blockedList = document.getElementById('blockedList');

// Load existing blocked URLs and display them
chrome.storage.sync.get("blockedUrls", function(data) {
    const urls = data.blockedUrls || [];
    urls.forEach(url => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
        blockedList.appendChild(listItem);
    });
});

// Handle adding a new blocked URL
addButton.onclick = function() {
    const url = urlInput.value.trim();
    if (url) {
        chrome.runtime.sendMessage({ action: "addUrl", url: url }, function(response) {
            if (response.status === "success") {
                const listItem = document.createElement('li');
                listItem.textContent = url;
                blockedList.appendChild(listItem);
                urlInput.value = ''; // Clear input
            }
        });
    } else {
        alert('Please enter a valid URL.');
    }
};

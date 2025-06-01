chrome.storage.sync.get('counter', function(result) {
    document.getElementById("counterPlaceholder").innerHTML = result.counter;
});

document.getElementById("toggleThisPage").addEventListener("click", function(event) {
    const isChecked = event.target.checked;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            const currentTabUrl = new URL(tabs[0].url).origin;
            chrome.storage.sync.get('urlList', function(result) {
                let urlList = result.urlList || [];

                if (isChecked) {
                    // Entferne die URL aus der Liste
                    urlList = urlList.filter(url => url !== currentTabUrl);
                } else {
                    // Füge die URL zur Liste hinzu, falls sie noch nicht existiert
                    if (!urlList.includes(currentTabUrl)) {
                        urlList.push(currentTabUrl);
                    }
                }

                chrome.storage.sync.set({ 'urlList': urlList });
            });
        } else {
            console.log("No active tab found.");
        }
    });
});

chrome.storage.sync.get('urlList', function(result) {
    let urlList = result.urlList || [];
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        document.getElementById("toggleThisPage").checked = !urlList.includes(new URL(tabs[0].url).origin);
    });
});


chrome.storage.sync.get('counter', function(result) {
    document.getElementById("counterPlaceholder").innerHTML = result.counter;
});
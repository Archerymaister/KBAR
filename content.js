let images = document.getElementsByTagName("img");
let targetImage = images[Math.floor(Math.random() * images.length)];
let targetImageSource = targetImage.src;
let alreadyFound = false;

targetImage.addEventListener('mouseenter', function() {
    targetImage.src = chrome.runtime.getURL('images/kevin.png');
    if(!alreadyFound){
        alreadyFound = true;

        chrome.storage.sync.get('counter', function(result) {
            var value = result.counter;

            if(value == undefined){
                value = 0;
            } else {
                value += 1;
            }

            chrome.storage.sync.set({ 'counter': value }, function() {
                console.log('Data updated. Found Kevin ' + value + ' times!' );
            });
        });
    }
});

targetImage.addEventListener('mouseleave', function() {
    targetImage.src = targetImageSource
});
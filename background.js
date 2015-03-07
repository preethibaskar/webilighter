chrome.browserAction.onClicked.addListener(function(tab) {
	console.log(tab.url);
	chrome.tabs.executeScript(tab.id,{file: "highlight.js"});
});


var url = document.URL;
var contents = [];
// document.onreadystatechange = function () {
//   if (document.readyState == "complete") {
//     initApplication();
//   }
// }
// function initApplication(){
	chrome.storage.sync.get(url, function (obj) {
        console.log('To highlight', obj[url]);
        contents = JSON.parse(obj[url])
        for(i =0;i< contents.length;i++){
        	var range = window.getSelection(window.find(contents[i])).getRangeAt(0);
        	window.getSelection().removeAllRanges();
        	var wrapper = document.createElement('span');
			wrapper.style.cssText = "background-color: #FFFF66";
			wrapper.appendChild(range.extractContents());	
			range.insertNode(wrapper);

        }   
    });
//}
var content_array = [];
var x;
function highlight(){
	var range = window.getSelection().getRangeAt(0);
	var selectedLines = range.toString().split("\n");
	console.log(selectedLines);
	
	if(range.toString().trim() === ""){
				return;
	}

	for (var i = selectedLines.length - 1; i >= 0; i--) {
		if(selectedLines[i].trim() === ""){
			return;
		}
	}

	var wrapper = document.createElement('span');
		 wrapper.style.cssText = "background-color: #FFFF66";
	  wrapper.appendChild(range.extractContents());	
	range.insertNode(wrapper);

	storeHighlights(selectedLines);
}
function storeHighlights(selectedLines){
	content_array.push(selectedLines);
	//localStorage[document.URL] = JSON.stringify(content_array);
	var url = document.URL.toString();
	var obj= {};

	obj[url] = JSON.stringify(content_array);
	chrome.storage.sync.set(obj, function() {
          // Notify that we saved.
          alert('Settings saved');
        });
	chrome.storage.sync.get(url, function (obj) {
        console.log('this url', obj);
    });
      }
    


document.addEventListener("mouseup", highlight);

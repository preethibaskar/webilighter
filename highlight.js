var content_array = [];
var x;
function highlight(){
	var sel = window.getSelection && window.getSelection();
	if(sel && sel.rangeCount > 0){
	var range = sel.getRangeAt(0);
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
	getExistingHighlights();
	storeHighlights(selectedLines);
  }
}
function storeHighlights(selectedLines){
	content_array.push(selectedLines);

	//localStorage[document.URL] = JSON.stringify(content_array);
	var url = document.URL.toString();
	var obj= {};
	//content_array_new = getExistingHighlights(url,content_array);
	//console.log('updated',content_array_new);
	obj[url] = JSON.stringify(content_array);
	console.log('obj[url]',obj[url]);
	chrome.storage.sync.set(obj, function() {
          // Notify that we saved.
         console.lo('saved');
        });
	// chrome.storage.sync.get(url, function (obj) {
 //        console.log('this url', obj);
 //    });
      }
    
function getExistingHighlights(){
	var url = document.URL.toString();
		chrome.storage.sync.get(url, function (object) {
		console.log('old array',object[url]);
		contents = JSON.parse(object[url]);
		for(i=0;i<contents.length;i++){
			content_array.push(contents[i]);
		}
		
	});
		
}

document.addEventListener("mouseup", highlight);

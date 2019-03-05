/**
 * 
 */

function loadSlidedata(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/slidedata.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function initialize() {
	var sidedata;
	try {
		loadSlidedata(function(response) {
			  // Parse JSON string into object
			  slidedata = JSON.parse(response);
		 });
		console.log("Recived Slide Data!");
	}catch(e){
		console.log("Failed to Initialize because:");
		console.log(e);
		return;
	}
	initialized = true;
}

var initialized = false;
initialize();

if (!initialized) {
	document.write("Document failed to initialize! :P<br> Try reloading the page... or try changing you're browser.");
}
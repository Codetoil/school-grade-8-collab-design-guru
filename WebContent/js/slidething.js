/**
 * 
 */

var slidedata;
var slideNo = 1;
var slideCount = 1;

function Prev() {
	if (slideNo > 1)
	{
		slideNo--;
		UpdateSlideData();
	}
}

function Next() {
	if (slideNo < slideCount)
	{
		slideNo++;
		UpdateSlideData();
	}
}

function postInit() {
	//No reason for this to exist
	console.log("Finished PostInitialization Stage!");
}

function init(data) {
	slidedata = data;
	slideCount = slidedata.getElementsByTagName("lit:slide").length;
	UpdateSlideData();
	console.log("Finished Initialization Stage!");
	console.log("Starting PostInitialization Stage!");
	postInit();
}

function UpdateSlideData()
{
	var data;
	data = slidedata.getElementById("slide" + slideNo).getElementsByTagName("lit:data")[0].textContent;
	document.getElementById("main").innerHTML = data;
	if (slideNo === 1)
	{
		document.getElementById("prev").disabled = true;
	} else {
		document.getElementById("prev").disabled = false;
	}
	if (slideNo === slideCount)
	{
		document.getElementById("next").disabled = true;
	} else {
		document.getElementById("next").disabled = false;
	}
	document.getElementById("mid").disabled = true;
}

function preInit() {
	try {
		var request = new XMLHttpRequest();
		request.open('GET', "xml/slidedata.xml");
		request.send();
		request.onload = function() {
			var datatxt = request.response;
			parser = new DOMParser();
			var data = parser.parseFromString(datatxt,"text/xml");
			console.log("Recived Slide Data!");
			console.log("Finished PreInitialization Stage!")
			console.log("Entering Initialization Stage!")
			init(data);
		}
	}catch(e){
		console.log("Failed to Initialize because:");
		console.log(e);
		return;
	}
}

console.log("Entering Preinitialization...");
//PreInitialization is to get the data for the slides...
preInit();
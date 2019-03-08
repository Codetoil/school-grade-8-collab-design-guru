/**
 * 
 */

var slidedata;
var rootslidegroup;
var slideGroup;
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
			Init(data);
		}
	}catch(e){
		console.error("Failed to Initialize because:");
		console.error(e);
		return;
	}
}

function Init(data) {
	slidedata = data;
	console.log("globalized slide data!");
	if (slidedata.getElementsByTagName("lit:root_slide_group").length == 0)
	{
		console.error("No found root_slide_group! the tag name is \"lit:root_slide_group\"!");
		return;
	}
	if (slidedata.getElementsByTagName("lit:root_slide_group").length > 1)
	{
		console.error("Too many root_slide_group(s)! Combine all the root_slide_group(s) into one!");
		return;
	}
	rootslidegroup = slidedata.getElementsByTagName("lit:root_slide_group")[0];
	console.log(rootslidegroup);
	var children = rootslidegroup.children;
	//slideCount = slidedata.getElementsByTagName("lit:slide").length;
	console.log(children);
	for (var i = 0; i < children.length; i++)
	{
		console.log(children[i]);
		if (children[i].tagName === "lit:slide_group")
		{
			console.log(children[i]);
		}
	}
	UpdateSlideData();
	console.log("Finished Initialization Stage!");
	console.log("Starting PostInitialization Stage!");
	postInit();
}

console.log("Entering Preinitialization...");
//PreInitialization is to get the data for the slides...
preInit();
"use strict"

var slidedata;
var rootslidegroup;
var slide;
var slidename;
var includeLit; // true: "lit:(tagname)"; false: "(tagname)"
var initialized = false;
var slidelist;

function OnButtonPress(buttonNumber){
	switch (buttonNumber)
	{
	case 0:
		slide;
		break;
	case 1:
		break;
	case 2:
		break;
	}
}

function setSlideName(newslidename)
{
	slidename = newslidename;
	slide = rootslidegroup.children[slidename];
	UpdateSlideData();
}

function postInit() {
	console.log("Starting PostInitialization Stage!");
	initialized = true;
	console.log("Finished PostInitialization Stage!");
}



function UpdateSlideData()
{
	let data;
	document.getElementById("slideNumber").innerHTML = "Slide \"" + slideNo + "\"";
	if (includeLit)
	{
		data = rootslidegroup.children[slidename].getElementsByTagName("lit:data")[0].textContent;
	}
	else
	{
		data = rootslidegroup.children[slidename].getElementsByTagName("data")[0].textContent;
	}
	document.getElementById("main").innerHTML = data;
	
}

function addTextToList(stringToAdd)
{
	slidelist.innerHTML = slidelist.innerHTML + "<li><button id=\"slidelist_" + stringToAdd + "\" class=\"slidelistbutton\" onclick=\"setSlideGroup('" + stringToAdd + "')\">" + stringToAdd + "</button></li>";
	
}

/**
 * 
 * @param newSlideGroupName Name of the slide group to set to
 * @returns
 * @deprecated
 */
function setSlideGroup(newSlideGroupName)
{
	console.warn("This function is deprecated and does not work. Slidegroups are removed.");
	let newSlideGroup = document.getElementById("slidelist_" + newSlideGroupName);
	console.log("SETTING SLIDE GROUP TO: " + newSlideGroup.innerHTML);
	if (slidegroupbutton == null) {} else
	{
		slidegroupbutton.disabled = false;
	}
	
	//slidegroup.disabled = false;
	slidegroup = rootslidegroup.children[newSlideGroup.innerHTML];
	slidegroupbutton = newSlideGroup;
	slidegroupbutton.disabled = true;
	
	//console.log(buttonNew);
	
	slidegroupbutton.disabled = true;
	
	//slidegroup.disabled = true;
	setSlideName("home");
}

/**
 * 
 * @param newSlideGroupName slide group to set to
 * @param slideTo what slide
 * @returns
 */
function goto(slideTo)
{
	//setSlideGroup(newSlideGroupName);
	setSlideName(slideTo);
}

function getXMLDoc() {
	try {
		console.log("Starting Preinitialization...");
		var request = new XMLHttpRequest();
		request.open('GET', "xml/slidedata.xml");
		request.send();
		request.onload = function() {
			var datatxt = request.response;
			var parser = new DOMParser();
			var data = parser.parseFromString(datatxt,"text/xml");
			console.log("Recived Slide Data!");
			console.log("Finished PreInitialization Stage!");
			
			Init(data);
		}
	}catch(e){
		console.error("Failed to Initialize because:");
		console.error(e);
		return;
	}
}

function Init(data) {
	console.log("Starting Initialization Stage!");
	slidedata = data;
	console.log("globalized slide data!");
	if (slidedata.getElementsByTagName("lit:root_slide_group").length > 0)
	{
		includeLit = true;
	} else if (slidedata.getElementsByTagName("root_slide_group").length > 0)
	{
		includeLit = false;
	}
	
	if (slidedata.getElementsByTagName("lit:root_slide_group").length > 1 || slidedata.getElementsByTagName("root_slide_group").length > 1)
	{
		console.error("Too many root_slide_group(s)! Combine all the root_slide_group(s) into one!");
		return;
	}
	
	if (slidedata.getElementsByTagName("lit:root_slide_group").length == 0 && slidedata.getElementsByTagName("root_slide_group").length == 0)
	{
		console.error("No root_slide_groups! Use the tag name \"lit:root_slide_group\" in the xml!")
	}
	
	if (includeLit)
	{
		rootslidegroup = slidedata.getElementsByTagName("lit:root_slide_group")[0];
	}
	else
	{
		rootslidegroup = slidedata.getElementsByTagName("root_slide_group")[0];
	}
	
	console.log(rootslidegroup);
	var children = rootslidegroup.children;
	
	console.log(children);
	for (var i = 0; i < children.length; i++)
	{
		if ((children[i].tagName === "lit:slide") || (children[i].tagName === "slide"))
		{
			console.log(children[i]);
		}
	}
	
	/*slidelist = document.getElementById("slidelist");
	slidelist.innerHTML = "";
	for (var i = 0; i < rootslidegroup.children.length; i++)
	{
		addTextToList(rootslidegroup.children[i].id);
	}*/
	
	//setSlideGroup("home");
	goto("home");
	
	console.log("Finished Initialization Stage!");
	postInit();
}

window.onload = function() {
	//PreInitialization is to get the data for the slides...
	getXMLDoc();
}
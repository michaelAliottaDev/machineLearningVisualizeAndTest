"use strict"
window.URL = window.URL || window.webkitURL;

var fileElem;
var reader;
var parser;

//initializing the saving functionality
function saveLoadInit()
{
    fileElem = document.getElementById("fileElem");
	reader = new FileReader();
	parser = new DOMParser();
	
	reader.onload = function()
	{
		loadFile(parser.parseFromString(reader.result,"text/xml"));
	};
}

//sets content of xml file and saves it
function saveFile()
{
	var tempText = '<base>\n';
	var tempFeaturesUsed = 0
	
	tempText += ('\t<count>' + graphPointsLen + '</count>\n');
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		for (var j = 1; j <= featureCount; j++)
		{
			if (graphPoints[i][j] != undefined)
			{
				if (j > tempFeaturesUsed)
				{
					tempFeaturesUsed = j;
				}
			}
		}
	}
	
	tempText += ('\t<features>' + tempFeaturesUsed + '</features>\n');
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		tempText += '\t<point>\n';
		
		for (var j = 0; j <= tempFeaturesUsed; j++)
		{
			if (graphPoints[i][j] != undefined)
			{
				if (j == 0)
				{
					tempText += '\t\t<label>\n';
				}
				else
				{
					tempText += '\t\t<feature' + j + '>\n';
				}
				
				tempText += ('\t\t\t' + graphPoints[i][j] + '\n');
				
				if (j == 0)
				{
					tempText += '\t\t</label>\n';
				}
				else
				{
					tempText += '\t\t</feature' + j + '>\n';
				}
			}
		}
		
		tempText += '\t</point>\n';
	}
	
	tempText += '</base>';
	
	download('test.xml', tempText);
	addResponse([["Graph Saved to File"]]);
}

//sets current data to that of a loaded xml file
function loadFile(file)
{
	var dataHold = file.getElementsByTagName("point");;
	
	featureCount = file.getElementsByTagName("features")[0].innerHTML * 1;
	graphPointsLen = file.getElementsByTagName("count")[0].innerHTML * 1;
	graphPoints = [];
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		graphPoints[i] = [];
		if (dataHold[i].getElementsByTagName("label").length > 0)
		{
			graphPoints[i][0] = dataHold[i].getElementsByTagName("label")[0].innerHTML * 1.0;
		}
		
		for (var j = 1; j <= featureCount; j++)
		{
			if (dataHold[i].getElementsByTagName("feature" + j).length > 0)
			{
				graphPoints[i][j] = dataHold[i].getElementsByTagName("feature" + j)[0].innerHTML * 1.0;
			}
		}
	}
	
	drawGraph();
	drawGraphAxisBar();
	drawAllPointsOnGraph();
	addResponse([["Graph Loaded to Display"]]);
}

//===helper functions===
function openLoadFile()
{
	if (fileElem)
	{
		fileElem.click();
	}
}

function handleFiles(files) 
{
	if (files.length == 1)
	{
		reader.readAsText(files[0]);
		fileElem.value = "";
	}
}

function download(filename, text) {
	var element = document.createElement('a');
	
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
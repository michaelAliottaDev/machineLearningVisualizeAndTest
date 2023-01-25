"use strict"
window.URL = window.URL || window.webkitURL;

var fileElem;
var reader;
var parser;
	
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

function openLoadFile()
{
	if (fileElem)
	{
		fileElem.click();
	}
}

function saveFile()
{
	var tempText = '<base>\n';
	
	tempText += ('\t<count>' + graphPointsLen + '</count>\n');
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		tempText += '\t<point>\n';
		
		for (var j = 0; j <= featureCount; j++)
		{
			if (graphPoints[i][j] != undefined)
			{
				if (j == 0)
				{
					tempText += '\t\t<label>\n';
				}
				else
				{
					tempText += '\t\t<Feature' + j + '>\n';
				}
				
				tempText += ('\t\t\t' + graphPoints[i][j] + '\n');
				
				if (j == 0)
				{
					tempText += '\t\t</label>\n';
				}
				else
				{
					tempText += '\t\t</Feature' + j + '>\n';
				}
			}
		}
		
		tempText += '\t</point>\n';
	}
	
	tempText += '</base>';
	
	download('test.xml', tempText);
	addResponse([["Graph Saved to File"]]);
}

function loadFile(file)
{
	var dataHold;
	
	graphPointsLen = file.getElementsByTagName("count")[0].innerHTML * 1;
	dataHold = file.getElementsByTagName("point");
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		graphPoints[i] = [
			dataHold[i].getElementsByTagName("xCrd")[0].innerHTML * 1.0,
			dataHold[i].getElementsByTagName("yCrd")[0].innerHTML * 1.0,
			dataHold[i].getElementsByTagName("label")[0].innerHTML * 1
		];
	}
	
	drawAllPointsOnGraph();
	addResponse([["Graph Loaded to Display"]]);
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

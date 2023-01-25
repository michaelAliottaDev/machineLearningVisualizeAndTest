"use strict"

// record of inputs and responses
// []	 = line text
var lineRecord;
var lineRecordLen;

function commandLineInit()
{
	lineRecord = [];
	lineRecordLen = 0;
}

function doCommand(command)
{
	var response = [
		["Command: \"" + command + "\""]
	];
	
	if (command == "help")
	{
		response[1] = ["help:", "Show a list of commands and what they do"];
		response[2] = ["save:", "Save an xml file of the graph to your local drive"];
		response[3] = ["load:", "Load an xml file of a graph from your local drive and set the current graph to that"];
		response[4] = ["clear -g:", "Clear the graph"];
		response[5] = ["clear -c:", "Clear the console"];
	}
	else if (command == "save")
	{
		response[1] = ["Downloading Graph File..."];
	}
	else if (command == "load")
	{
		response[1] = ["Loading From File..."];
	}
	else if (command == "clear -g")
	{
		response[1] = ["Clearing Graph"];
	}
	else if (command == "clear -c")
	{
		//no response
	}
	else
	{
		response[1] = ["Command Not Recognized!"];
	}
	
	addResponse(response);
	
	if (command == "save")
	{
		saveFile();
	}
	else if (command == "load")
	{
		openLoadFile();
	}
	else if (command == "clear -g")
	{
		clearGraph();
	}
	else if (command == "clear -c")
	{
		lineRecord = [];
		lineRecordLen = 0;
		
		printRecord();
	}
}

function addResponse(response)
{
	var responseOffset = response.length + 1;
	
	if (lineRecordLen + responseOffset >= 25)
	{
		lineRecordLen = 25 - responseOffset;
	}
	
	for (var i = 0; i < lineRecordLen; i++)
	{
		lineRecord[lineRecordLen - 1 + responseOffset - i] = [];
		
		for (var j = 0; j < lineRecord[lineRecordLen - 1 - i].length; j++)
		{
			lineRecord[lineRecordLen - 1 + responseOffset - i][j] = lineRecord[lineRecordLen - 1 - i][j];
		}
	}
	
	for (var i = 0; i < responseOffset - 1; i++)
	{
		console.log("i = " + i);
		lineRecord[i] = [];
		
		for (var j = 0; j < response[i].length; j++)
		{
			console.log("j = " + j);
			lineRecord[i][j] = response[i][j];
		}
	}
	
	lineRecord[responseOffset - 1] = [""];
	
	lineRecordLen += responseOffset;
	
	printRecord();
}
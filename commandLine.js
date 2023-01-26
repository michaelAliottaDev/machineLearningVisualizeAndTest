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
		response[4] = ["show data:", "Output the number of features, number of points on the graph and value of each point to the console"];
		response[5] = ["clear -g:", "Clear the graph"];
		response[6] = ["clear -c:", "Clear the console"];
	}
	else if (command == "save")
	{
		response[1] = ["Downloading Graph File..."];
	}
	else if (command == "load")
	{
		response[1] = ["Loading From File..."];
	}
	else if (command == "show data")
	{
		response[1] = ["Features: " + featureCount];
		response[2] = ["Points: " + graphPointsLen];
		
		for (var i = 0; i < graphPoints.length && i < 20; i++)
		{
			response[3 + i] = ["Point[" + i + "]:"];
			
			for (var j = 0; j < graphPoints[i].length; j++)
			{
				if (graphPoints[i][j] !== undefined)
				{
					response[3 + i][1 + j] = graphPoints[i][j] + "";
				}
				else
				{
					response[3 + i][1 + j] = "--";
				}
			}
		}
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
		lineRecord[i] = [];
		
		for (var j = 0; j < response[i].length; j++)
		{
			lineRecord[i][j] = response[i][j];
		}
	}
	
	lineRecord[responseOffset - 1] = [""];
	
	lineRecordLen += responseOffset;
	
	printRecord();
}
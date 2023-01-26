"use strict"

// record of inputs and responses
// []	 = line text
var lineRecord;
var lineRecordLen;

var priCommands;

//initializes commandLineData
function commandLineInit()
{
	lineRecord = [];
	lineRecordLen = 0;
	
	priCommands = [
		"help",
		"save",
		"load",
		"show",
		"clear"
	];
	
	priCommandAknowlg = [
		[],
		["Downloading Graph File..."],
		["Loading From File..."],
		[],
		[]
	];
}

//reads in the command in the command line and does as it says if there is an instruction that matches it
function doCommand(command)
{
	var response = [
		["Command: \"" + command + "\""]
	];
	
	var commandAsArray = parseCommand(command);
	
	if (commandAsArray[0] == "Error Code")
	{
		for (var i = 1; i < commandAsArray.length; i++)
		{
			response[i] = [commandAsArray[i]];
		}
	}
	else if (commandAsArray[0] == "help")
	{
		response[1] = ["help:", "Show a list of commands and what they do"];
		response[2] = ["save:", "Save an xml file of the graph to your local drive"];
		response[3] = ["load:", "Load an xml file of a graph from your local drive and set the current graph to that"];
		response[4] = ["show data:", "Output the number of features, number of points on the graph and value of each point to the console"];
		response[5] = ["clear:", "Clear the graph and the console"];
	}
	else if (commandAsArray[0] == "save")
	{
		response[1] = ["Downloading Graph File..."];
	}
	else if (commandAsArray[0] == "load")
	{
		response[1] = ["Loading From File..."];
	}
	else if (commandAsArray[0] == "show")
	{
/*		if (command.substring(4, 7) == " -p")
		{
			if (command.substring(7, 11) == " -n ")
			{
				temp = command.substring(11) - 0;
				console.log(temp)
				response[1] = ["Features: " + featureCount];
				response[2] = ["Points: " + graphPointsLen];
				
				for (var i = 0; i + temp < graphPoints.length && i < 20; i++)
				{
					response[3 + i] = ["Point[" + (i + temp) + "]:"];
					
					for (var j = 0; j < graphPoints[i + temp].length; j++)
					{
						if (graphPoints[i][j] !== undefined)
						{
							response[3 + i][1 + j] = graphPoints[i + temp][j] + "";
						}
						else
						{
							response[3 + i][1 + j] = "--";
						}
					}
				}
			}
			else if (command.substring(8) == "")
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
			else 
			{
				response[1] = ["use of \"show\" command not recognized"];
			}
		}
		else 
		{
			response[1] = ["use of \"show\" command not recognized"];
		}*/
	}
	else if (commandAsArray[0] == "clear")
	{
		if (command.substring(5, 8) == " -g")
		{
			response[1] = ["Clearing Graph"];
		}
		else if (command.substring(5, 8) == " -c")
		{
			//no response
		}
		else if (command.substring(5) == "" || command.substring(5, 8) == " -a")
		{
			//no response
		}
		else 
		{
			response[1] = ["use of \"clear\" command not recognized"];
		}
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
	else if (command.substring(0, 5) == "clear")
	{
		if (command.substring(5, 8) == " -g")
		{
			clearGraph();
		}
		else if (command.substring(5, 8) == " -c")
		{
			lineRecord = [];
			lineRecordLen = 0;
			
			printRecord();
		}
		else if (command.substring(5) == "" || command.substring(5, 8) == " -a")
		{
			lineRecord = [];
			lineRecordLen = 0;
			
			printRecord();
			clearGraph();
		}
	}
}

//[0] = name of primary command
function parseCommand(command)
{
	var res = ["", []];
	var str = command.toLowerCase();
	
	for (var i = 0; i < priCommands.length; i++)
	{
		if (str.substring(0, priCommands[i].length) == priCommands[i])
		{
			res[0] = priCommands[i];
			str = str.substring(priCommands[i].length);
			i = priCommands.length;
		}
	}
	
	if (res[0] == "")
	{
		return [
			"Error Code",
			"Command Not Recognized!"
		];
	}
	
	while (str.length > 0)
	{
		console.log(str, str.length);
		if (str.substring(0, 1) == " ")
		{
			str = str.substring(1);
		}
		else if (str.substring(0, 1) == "-")
		{
			/*if (str.substring(1, 2) == "-")
			{
				//save for later
			}*/
			res[1][res[1].length] = str.substring(1, 2);
			str = str.substring(2);
		}
		else
		{
			res[1][res[1].length] = "?";
			str = str.substring(1);
		}
	}
	
	console.log(res);
	return res;
}

//refines response a bit and then outputs it
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
"use strict"

// record of inputs and responses
// []	 = line text
var lineRecord;
var lineRecordLen;

var priCommands;
var priCommandAknowlg;
var expectedArguements;
var expArgTitle;

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
		["Read command: Help", ""],
		["Read command: Save", ""],
		["Read command: Load", ""],
		["Read command: Show", ""],
		["Read command: Clear", ""]
	];
	
	expectedArguements = [
		[],
		[],
		[],
		["s=#", "p", "a"],
		["g", "c", "a"]
	];
	
	expArgTitle = [
		[],
		[],
		[],
		["Start At", "Target Points", "Target All"],
		["Graph", "Console", "All"]
	];
}

//reads in the command in the command line and does as it says if there is an instruction that matches it
function doCommand(command)
{
	var response = [
		["Command: \"" + command + "\""]
	];
	var respLength = 1;
	var didReq = false;
	var yesReq = [];
	var yesReqLength = 0;
	var noReq = [];
	var noReqLength = 0;
	var tars = [];
	var tarsLength = 0;
	var specArgOfs = 0;
	
	//calls another function to parse the command from raw text
	var commandAsArray = parseCommand(command);
	
	//attempt to parse the command ran an error code
	if (commandAsArray[0] == "Error Code")
	{
		for (var i = 1; i < commandAsArray.length; i++)
		{
			response[i] = [commandAsArray[i]];
		}
		
		addResponse(response);
		return;
	}
	
	//reads in arguements
	for (var i = 0; i < priCommands.length; i++)
	{
		if (commandAsArray[0] == priCommands[i])
		{
			//sets response to the acknowledgement statement for the command
			response[respLength] = priCommandAknowlg[i];
			respLength++;
			
			//read arguments and checking if they are expected for that command
			for (var j = 0; j < commandAsArray[1].length; j++)
			{
				didReq = false;
				
				for (var k = 0; k < expectedArguements[i].length && !didReq; k++)
				{
					if (commandAsArray[1][j] == expectedArguements[i][k])
					{
						didReq = true;
					}
					else if (expectedArguements[i][k].substring(-1) == "#")
					{
						didReq = true;
						
						for (var l = 0; expectedArguements[i][k].substring(l) != "#" && didReq; l++)
						{
							if(
								commandAsArray[1][j].substring(l + 1) != 
								expectedArguements[i][k].substring(l, l + 1)
							){
								didReq = false;
							}
						}
					}
				}
				
				if (!didReq)
				{
					noReq[noReqLength] = commandAsArray[1][j];
					noReqLength++;
				}
				else
				{
					yesReq[yesReqLength] = commandAsArray[1][j];
					yesReqLength++;
					
					response[respLength - 1][yesReqLength + 1] = expArgTitle[i][k - 1];
				}
			}
			
			i = priCommands.length;
		}
	}
	
	//listing unrecognized arguments
	for (var i = 0; i < noReqLength; i++)
	{
		response[respLength] = ["Did not recognize argument: \"-" + noReq[i] + "\", (ignoring)"];
		respLength++;
	}
	
	//Outputing acknowledgement
	addResponse(response);
	
	response = [];
	respLength = 0;
	
	//runs code specific to commands
	
	if (commandAsArray[0] == "help")
	{
		//help output
		response[respLength] = ["help:", "Show a list of commands and what they do"];
		response[respLength + 1] = ["save:", "Save an xml file of the graph to your local drive"];
		response[respLength + 2] = ["load:", "Load an xml file of a graph set the current graph to it"];
		response[respLength + 3] = ["show:", "Output info to the console about something, does nothing without an argument"];
		response[respLength + 4] = ["clear:", "Clear the graph and the console"];

		addResponse(response);
		response += 5;
	}
	else if (commandAsArray[0] == "show")
	{
		for (var i = 0; i < yesReqLength; i++)
		{
			if (yesReq[j] == " -p" || yesReq[j] == " -a")
			{
				tars[tarsLength] = ["p"];
			}
			
			if (yesReq[j].substring(0, 4) == " -n=" || yesReq[j] == " -a")
			{
				console.log(yesReq[j].substring(4) - 0.0);
			}
		}
		
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
	else if (commandAsArray[0] == "save")
	{
		saveFile();
	}
	else if (commandAsArray[0] == "load")
	{
		openLoadFile();
	}
	else if (commandAsArray[0] == "clear")
	{
		for (var i = 0; i < yesReqLength; i++)
		{
			if (yesReq[i] == "g" || yesReq[i] == "a")
			{
				clearGraph();
			}
			
			if (yesReq[i] == "c" || yesReq[i] == "a")
			{
				lineRecord = [];
				lineRecordLen = 0;
				
				printRecord();
			}
		}
		
		if (yesReqLength == 0)
		{
			clearGraph();
			
			lineRecord = [];
			lineRecordLen = 0;
			
			printRecord();
		}
	}
}

//[0] = name of primary command
//[1] = list of arguments
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
		if (str.substring(0, 1) == " ")
		{
			str = str.substring(1);
		}
		else if (str.substring(0, 1) == "-")
		{
			res[1][res[1].length] = "";
			str = str.substring(1);
			
			while (str != "" && str.substring(0, 1) != " ")
			{
				res[1][res[1].length - 1] += str.substring(0, 1);
				str = str.substring(1);
			}
		}
		else
		{
			res[1][res[1].length] = "?";
			str = str.substring(1);
		}
	}
	
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
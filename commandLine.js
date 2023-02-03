"use strict"

// record of inputs and responses
// []	 = line text
var lineRecord;
var lineRecordLen;

var priCommands;
var priCommandAknowlg;
var expectedArguements;
var expArgTitle;
var expArgTitleVar;

var commandLineInput;
var commandLineOutput;

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
		"clear",
		"display graph",
		"display data grid",
		"select",
		"activate model",
		"calc loss"
	];
	
	priCommandAknowlg = [
		["Read command: Help", ""],
		["Read command: Save", ""],
		["Read command: Load", ""],
		["Read command: Show", ""],
		["Read command: Clear", ""],
		["Read command: Display Graph", ""],
		["Read command: Display Data Grid", ""],
		["Read command: Select", ""],
		["Read command: Activate Model", ""],
		["Read command: Calculate Loss", ""]
	];
	
	expectedArguements = [
		[],
		[],
		[],
		["s=#", "p"],
		["g", "c", "a"],
		[],
		[],
		["p=#"],
		[],
		[]
	];
	
	expArgTitle = [
		[],
		[],
		[],
		["Start At: ", "Points", "All"],
		["Graph", "Console", "All"],
		[],
		[],
		["Point: "],
		[],
		[]
	];
	
	expArgTitleVar = [
		[],
		[],
		[],
		[true,	false,	false],
		[false, false,	false],
		[],
		[],
		[true],
		[],
		[]
	];
	
	commandLineInput = document.querySelector('#inputText');
	commandLineOutput = document.querySelector('#commandLineResp');
	
	commandLineInput.style.left = "0px";
	commandLineOutput.style.left = "0px";
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
	var argVar = undefined;
	
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
					else if (expectedArguements[i][k].substring(expectedArguements[i][k].length - 1, expectedArguements[i][k].length) == "#")
					{
						didReq = true;
						
						for (var l = 0; expectedArguements[i][k].substring(l) != "#" && didReq; l++)
						{
							if(
								commandAsArray[1][j].substring(l, l + 1) != 
								expectedArguements[i][k].substring(l, l + 1)
							){
								didReq = false;
							}
						}
						
						if (didReq)
						{
							argVar = commandAsArray[1][j].substring(l, commandAsArray[1][j].length);
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
					yesReq[yesReqLength] = [expectedArguements[i][k - 1]];
					yesReqLength++;
					
					response[respLength - 1][yesReqLength + 1] = expArgTitle[i][k - 1];
					
					if (argVar !== undefined)
					{
						yesReq[yesReqLength - 1][1] = argVar;
						
						if (expArgTitleVar[i][k - 1])
						{
							response[respLength - 1][yesReqLength + 1] += argVar;
						}
					}
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
		response[respLength + 5] = ["display:", "Switch which set of data is displayed"];
		response[respLength + 6] = ["select:", "Select one point (deselect all others)"];
		response[respLength + 7] = ["activate model:", "initializes the model and shows it on the graph"];
		response[respLength + 7] = ["calc loss:", "calculates loss for the model (also initializes the model if it hasn't already)"];

		addResponse(response);
	}
	else if (commandAsArray[0] == "show")
	{
		show (yesReq, yesReqLength)
	}
	else if (commandAsArray[0] == "select")
	{
		if (yesReq[0][0] == "p=#")
		{
			if (typeof(yesReq[0][1] - 0) == "number" && yesReq[0][1] - 0 == Math.floor(yesReq[0][1] - 0))
			{
				changeSelectedPoint(yesReq[0][1] - 0);
			}
			else
			{
				addResponse([["Invalid Selection, (Only Integers Accepted)"]]);
			}
		}
	}
	else if (commandAsArray[0] == "save")
	{
		saveFile();
		addResponse([["Graph Saved to File"]]);
	}
	else if (commandAsArray[0] == "load")
	{
		openLoadFile();
		addResponse([["Graph Loaded to Display"]]);
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
	else if (commandAsArray[0] == "display graph")
	{
		switchDisplayTo(0);
		addResponse([["Display set to Graph Mode"]]);
	}
	else if (commandAsArray[0] == "display data grid")
	{
		switchDisplayTo(1);
		addResponse([["Display set to Data Grid Mode"]]);
	}
	else if (commandAsArray[0] == "activate model")
	{
		activateModel();
		drawModel();
		addResponse([["Model Activated"]]);
	}
	else if (commandAsArray[0] == "calc loss")
	{
		activateModel();
		drawModel();
		drawLoss();
		addResponse([["Model Activated"]]);
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

function show(args, argsLen)
{
	var tar = [];
	var tarSet = false;
	var startAt = 0;
	var response = [];
	
	for (var i = 0; i < argsLen; i++)
	{
		if (!tarSet)
		{
			if (args[i][0] == "p")
			{
				tar = "p";
				tarSet = true;
			}
		}
		
		if (args[i][0] == "s=#")
		{
			startAt = args[i][1] - 0;
		}
	}
	
	if (!tarSet)
	{
		addResponse([["Nothing Selected (try an argument)"]]);
		return;
	}
	
	switch (tar)
	{
		case "p":
			response[0] = ["Features: " + featureCount];
			response[1] = ["Points: " + graphPointsLen];
			
			for (var i = 0; i < 18 && i + startAt < graphPointsLen; i++)
			{
				response[2 + i] = ["Point[" + (i + startAt) + "]:"];
				
				for (var j = 0; j < graphPoints[i + startAt].length; j++)
				{
					if (graphPoints[i][j] !== undefined)
					{
						response[2 + i][1 + j] = graphPoints[i + startAt][j] + "";
					}
					else
					{
							response[2 + i][1 + j] = "--";
					}
				}
				
			}
			
			addResponse(response);
			break;
		default:
			addResponse(["Invalid Data Selection"]);
			break;
	}
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

//console output
function printRecord()
{
	var resp = "";
	
	for (var i = 0; i < lineRecordLen; i++)
	{
		for (var j = 0; j < lineRecord[i].length; j++)
		{
			resp += lineRecord[i][j];
			resp += "\t";
		}
		
		resp += "\n"
	}
	
	commandLineOutput.innerHTML = resp + commandLineOutput.innerHTML;
	lineRecord = [];
	lineRecordLen = 0;
}
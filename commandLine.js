"use strict"

// record of inputs and responses
// []	 = line text
var lineRecord;

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
	
	priCommands = [
		"help",
		"save",
		"load",
		"show",
		"clear",
		"display",
		"select",
		"activate model",
		"calc loss"
	];
	
	priCommandAknowlg = [
		"Help",
		"Save",
		"Load",
		"Show",
		"Clear",
		"Display",
		"Select",
		"Activate Model",
		"Calculate Loss"
	];
	
	expectedArguements = [
		[],
		[],
		[],
		["p", "m"],
		[],
		["d", "data", "datagrid", "g", "graph"],
		["#"],
		[],
		[],
		[],
		[]
	];
	
	expArgTitle = [
		[],
		[],
		[],
		["Data Points", "Model Values"],
		[],
		["Data Grid", "Data Grid", "Data Grid", "Graph", "Graph"],
		["Point: "],
		[],
		[],
		[],
		[]
	];
	
	expArgTitleVar = [
		[],
		[],
		[],
		[],
		[],
		[false,	false,	false,	false,	false],
		[true],
		[],
		[],
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
	var acknowledgement;
	var respLength = 1;
	var didReq = false;
	var yesReq = [];
	var yesReqLength = 0;
	var noReq = [];
	var noReqLength = 0;
	var argVar = undefined;
	
	//calls another function to parse the command from raw text
	var commandAsArray = parseCommand(command);
	
	addResponse("Command: \"" + command + "\"");
	
	//attempt to parse the command ran an error code
	if (commandAsArray[0] == "Error Code")
	{
		for (var i = 1; i < commandAsArray.length; i++)
		{
			addResponse(commandAsArray[i] + "");
		}
		return;
	}
	
	//reads in arguements
	for (var i = 0; i < priCommands.length; i++)
	{
		if (commandAsArray[0] == priCommands[i])
		{
			//prepares an acknowledgement response but waits until after arguements are read to print
			acknowledgement = "Read command: " + priCommandAknowlg[i] + "";
			
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
					
					//adding recognized arguments to the end of the acknowledgement
					acknowledgement += "\t" + expArgTitle[i][k - 1];
					
					if (argVar !== undefined)
					{
						yesReq[yesReqLength - 1][1] = argVar;
						
						if (expArgTitleVar[i][k - 1])
						{
							acknowledgement += argVar;
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
		addResponse("Did not recognize argument: \"-" + noReq[i] + "\", (ignoring)");
	}
	
	//Outputing acknowledgement
	addResponse("\n" + acknowledgement);
	
	//runs code specific to commands
	switch (commandAsArray[0])
	{
		case "help":
			helpMessage();
			break;
		case "show":
			show (yesReq, yesReqLength);
			break;
		case "select":
			if (yesReq[0][0] == "#")
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
			break;
		case "save":
			saveFile();
			addResponse([["Graph Saved to File"]]);
			break;
		case "load":
			openLoadFile();
			addResponse([["Graph Loaded to Display"]]);
			break;
		case "clear":
			commandLineOutput.innerHTML = "";
			break;
		case "display":
			if (yesReqLength > 0)
			{
				if(
					yesReq[0][0] == "d" ||
					yesReq[0][0] == "data" ||
					yesReq[0][0] == "datagrid"
				)
				{
					switchDisplayTo(1);
					addResponse([["Display set to Data Grid Mode"]]);
				}
				else if(
					yesReq[0][0] == "g" ||
					yesReq[0][0] == "graph"
				)
				{
					switchDisplayTo(0);
					addResponse([["Display set to Graph Mode"]]);
				}
			}
			else 
			{
				addResponse("This Command Requires an Argument")
			}
			break;
		case "activate model":
			activateModel();
			drawModel();
			addResponse("Model Activated");
			break;
		case "calc loss":
			if (modelActive)
			{
				drawLoss();
				addResponse("Loss Calculated");
			}
			else
			{
				addResponse("You must activate the model first");
			}
			break;
		case "add feature":
			featureCount++;
			break;
		case "remove feature":
			featureCount--;
			
			for (var i = 0; i < graphPointsLen; i++)
			{
				graphPoints[i][featureCount] = undefined;
			}
			
			model[featureCount] = undefined;
			break;
		default:
			break;
	}
}

function helpMessage()
{
	//help output
	var helpMes = [
		"===Usability Commands===",
		"help:\tShow a list of commands and what they do",
		"",
		"===Save/Load Commands===",
		"save:\tSave an xml file of the graph to your local drive",
		"load:\tLoad an xml file of a graph set the current graph to it",
		"",
		"===Console Commands===",
		"show:\tOutput info to the console about something, does nothing without an argument",
		"clear:\tclearthe console",
		"",
		"===Integrated Commands===",
		"add feature:\tIncrease the number of features by one (there will still be no data for that feature)",
		"remove feature:\tDecrease the number of features by one (any data with that feature will be deleted)",
		"display:\tSwitch which set of data is displayed",
		"select:\t\tSelect one point (deselect all others)",
		"activate model:\tinitializes the model and shows it on the graph",
		"calc loss:\tcalculates loss for the model"
	];
	
	for (var i = helpMes.length - 1; i >= 0; i--)
	{
		addResponse(helpMes[i]);
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
	var response = "";
	
	for (var i = 0; i < argsLen; i++)
	{
		if (!tarSet)
		{
			if (args[i][0] == "p")
			{
				tar = "p";
				tarSet = true;
			}
			else if (args[i][0] == "m")
			{
				tar = "m";
				tarSet = true;
			}
		}
	}
	
	if (!tarSet)
	{
		addResponse("Nothing Selected (try an argument)");
		return;
	}
	
	switch (tar)
	{
		case "p":
			response += "Features: " + featureCount + "\n";
			response += "Points: " + graphPointsLen + "\n";
			
			for (var i = 0; i + startAt < graphPointsLen; i++)
			{
				response += "Point[" + (i + startAt) + "]:\t";
				
				for (var j = 0; j < graphPoints[i + startAt].length; j++)
				{
					if (graphPoints[i][j] !== undefined)
					{
						response += graphPoints[i + startAt][j] + "\t";
					}
					else
					{
						response += "--\t";
					}
				}
				
				response += "\n";
			}
			
			addResponse(response);
			break;
		case "m":
			if (modelActive)
			{
				response = "Bias:\t\ttotal\t+" + model[0] + "\n";
				
				for (var i = 1; i <= featureCount; i++)
				{
					response += "Feature[" + i + "]:\tF" + i + " \tx" + model[i] + "\n";
				}
				
				addResponse(response);
			}
			else
			{
				addResponse("You must activate the model before I can give you info about it");
			}
			break;
		default:
			addResponse("Invalid Data Selection");
			break;
	}
}

//refines response a bit and then outputs it
function addResponse(response)
{
	var resp = response + "\n";
	
	commandLineOutput.innerHTML = resp + commandLineOutput.innerHTML;
}
"use strict"

var clickDownCarry

//initializes values of input
function inputInit()
{
	canvas.onmousedown = clickDown;
	canvas.onmouseup = clickUp;
	canvas.onmousemove = mouseMove;
	
	pointsCanvas.onmousedown = clickDown;
	pointsCanvas.onmouseup = clickUp;
	pointsCanvas.onmousemove = mouseMove;
	
	modelCanvas.onmousedown = clickDown;
	modelCanvas.onmouseup = clickUp;
	modelCanvas.onmousemove = mouseMove;
	
	lineRespCanvas.onmousedown = clickDown;
	lineRespCanvas.onmouseup = clickUp;
	lineRespCanvas.onmousemove = mouseMove;
}

//adjusts X and Y of the mouse for its offset on the Canvas
function getMouse(e)
{
	var mouse = {};
	
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - e.target.offsetTop;
	
	return mouse;
}

//universal input function
//determines the input and decides what to do with it
//input = an array
//for click type input
//[0]	Sample Values: "click down", "click up"
//[1]	X
//[2]	Y
//[3]	other data
//for console inputs
//[0]	"command line arguement"
//[1]	text
function inputHandler(input)
{
	var clickUpVal;
	
	if (input[0] == "mouse move")
	{
		graphLocReport(input[1], input[2]);
	}
	else if (input[0] == "click down")
	{
		clickDownCarry = findClick(input);
	}
	else if (input[0] == "click up")
	{
		clickUpVal = findClick(input);
		
		if (clickDownCarry[0] == clickUpVal[0])
		{
			if (clickDownCarry[0] == "save button")
			{
				saveFile();
			}
			else if (clickDownCarry[0] == "load button")
			{
				openLoadFile();
			}
			else if (clickDownCarry[0] == "graph")
			{
				placeGraphPoint(
					((input[1] - graphBorder - graphInnerMargin - margin) * 2 / graphSize) - 1, 
					((graphSize + graphBorder + graphInnerMargin + margin - input[2]) * 2 / graphSize) - 1
				);
				drawPointOnGraph(graphPointsLen - 1);
			}
			else if (clickDownCarry[0] == "graphSideBar" && clickDownCarry[1] == clickUpVal[1] && clickDownCarry[1] >= 0 && clickDownCarry[1] < labelSwatchesLen)
			{
				selectedLabel = clickDownCarry[1];
				drawLabelSideBar();
			}
		}
	}
	else if (input[0] = "command line arguement")
	{
		doCommand(input[1]);
	}
	else
	{
		console.log(input);
	}
}

//returns a list of data related to the click
function findClick(input)
{
	//detect if the graph was hit
	if (
		input[1] >= graphBorder + graphInnerMargin + margin &&
		input[1] <= graphBorder + graphInnerMargin + margin + graphSize &&
		input[2] >= graphBorder + graphInnerMargin + margin &&
		input[2] <= graphBorder + graphInnerMargin + margin + graphSize 
	)
	{
		return ["graph"];
	}
	//detect if the graph sidebar was hit
	else if (
		input[1] >= margin + (graphBorder + graphInnerMargin) * 2 + graphSize &&
		input[1] <= margin + (graphBorder + graphInnerMargin) * 2 + graphSize + labelBarSize &&
		input[2] >= margin + labelBarSize - (margin + selectedLabelSwatchRad) &&
		input[2] <= margin + (graphBorder + graphInnerMargin) * 2 + graphSize - labelBarSize 
	)
	{
		return [
			"graphSideBar",
			Math.floor(
				(
					(input[2] - margin - labelBarSize) / 
					(margin + selectedLabelSwatchRad * 2)
				) + 0.5
			)
		];
	}
	//detect if it hit the save button
	else if (
		input[1] >= margin + (graphBorder + graphInnerMargin) * 2 + graphSize - ((buttonBorder * 2 + buttonSize) * 2 + margin) &&
		input[1] <= margin + (graphBorder + graphInnerMargin) * 2 + graphSize - ((buttonBorder * 2 + buttonSize) * 2 + margin) + buttonBorder * 2 + buttonSize &&
		input[2] >= margin * 2 + (graphBorder + graphInnerMargin) * 2 + graphSize &&
		input[2] <= margin * 2 + (graphBorder + graphInnerMargin) * 2 + graphSize + buttonBorder * 2 + buttonSize
	)
	{
		return ["save button"];
	}
	//detect if it hit the load button
	else if(
		input[1] >= margin + (graphBorder + graphInnerMargin) * 2 + graphSize - (buttonBorder * 2 + buttonSize) &&
		input[1] <= margin + (graphBorder + graphInnerMargin) * 2 + graphSize - (buttonBorder * 2 + buttonSize) + buttonBorder * 2 + buttonSize &&
		input[2] >= margin * 2 + (graphBorder + graphInnerMargin) * 2 + graphSize &&
		input[2] <= margin * 2 + (graphBorder + graphInnerMargin) * 2 + graphSize + buttonBorder * 2 + buttonSize
	)
	{
		return ["load button"];
	}
	else
	{
		return ["none"];
	}
}

function clickDown(e)
{
	var mouse = getMouse(e);
	var input = ["click down", mouse.x, mouse.y];
	
	inputHandler(input);
}

function clickUp(e)
{
	var mouse = getMouse(e);
	var input = ["click up", mouse.x, mouse.y];
	
	inputHandler(input);
}

function mouseMove(e)
{
	var mouse = getMouse(e);
	var input = ["mouse move", mouse.x, mouse.y];
	
	inputHandler(input);
}

function getAction() 
{
	var command = document.querySelector('#inputText').value;
	document.querySelector('#inputText').value = "";
	
	inputHandler(["command line arguement", command]);
}
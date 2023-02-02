"use strict"

var clickDownCarry

//initializes values of input
function inputInit()
{
	displayContainer.onmousedown = clickDown;
	displayContainer.onmouseup = clickUp;
	displayContainer.onmousemove = mouseMove;
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
	var temp;
	
	if (input[0] == "mouse move")
	{
		if (displayMode == 0)
		{
			graphLocReport(input[1], input[2]);
		}
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
			if (displayMode == 0)
			{
				if (clickDownCarry[0] == "graph")
				{
					if (selectedPoint == -1)
					{
						temp = displayPointToGraphPoint(input[1], input[2]);
						placeGraphPoint(
							temp[0], 
							temp[1]
						);
						drawPointOnGraph(graphPointsLen - 1);
					}
					else
					{
						temp = displayPointToGraphPoint(input[1], input[2]);
						addToSelectedGraphPoint(
							temp[0], 
							temp[1]
						);
						drawPointOnGraph(graphPointsLen - 1);
					}
				}
				if (
					clickDownCarry[0] == "XAxis+" ||
					clickDownCarry[0] == "XAxis-" ||
					clickDownCarry[0] == "YAxis+" ||
					clickDownCarry[0] == "YAxis-"
					
				)
				{
					if (clickDownCarry[0] == "XAxis+")
					{
						graphXAxis++;
						
						if(graphXAxis > featureCount)
						{
							graphXAxis = 0;
						}
					}
					if (clickDownCarry[0] == "XAxis-")
					{
						graphXAxis--;
						
						if(graphXAxis < 0)
						{
							graphXAxis = featureCount;
						}
					}
					if (clickDownCarry[0] == "YAxis+")
					{
						graphYAxis++;
						
						if(graphYAxis > featureCount)
						{
							graphYAxis = 0;
						}
					}
					if (clickDownCarry[0] == "YAxis-")
					{
						graphYAxis--;
						
						if(graphYAxis < 0)
						{
							graphYAxis = featureCount;
						}
					}
					
					drawGraphAxisBar();
					drawAllPointsOnGraph();
				}
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
//runs a series of "hit box checks" and returns [
//	a keyword indicating the location of the click, 
//	other data related to click if applicable...
//]
function findClick(input)
{
	//detect if the graph was hit
	if (
		input[1] >= graphBorder + graphInnerMargin + graphAxisBarWidth &&
		input[1] <= graphBorder + graphInnerMargin + graphAxisBarWidth + graphSize &&
		input[2] >= graphBorder + graphInnerMargin &&
		input[2] <= graphBorder + graphInnerMargin + graphSize 
	)
	{
		return ["graph"];
	}
	//detect graph's Xaxis block was hit
	else if (
		input[1] >= graphBorder + graphAxisBarWidth &&
		input[1] <= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth &&
		input[2] >= graphBorder * 2 + graphInnerMargin * 2 + graphSize &&
		input[2] <= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth
	)
	{
		if (input[1] >= graphBorder * 2 + graphInnerMargin * 2 + graphSize)
		{
			return ["XAxis+"];
		}
		else if (input[1] <= graphBorder + graphAxisBarWidth * 2)
		{
			return ["XAxis-"];
		}
		else
		{
			return ["XAxis"];
		}
	}
	//detect graph's Yaxis block was hit
	else if (
		input[1] >= graphBorder &&
		input[1] <= graphBorder + graphAxisBarInnerWidth &&
		input[2] >= graphBorder &&
		input[2] <= graphBorder + graphSize + graphInnerMargin * 2 
	)
	{
		if (input[2] <= graphBorder + graphAxisBarInnerWidth)
		{
			return ["YAxis+"];
		}
		else if (input[2] >= graphBorder + graphSize + graphInnerMargin * 2 - graphAxisBarInnerWidth)
		{
			return ["YAxis-"];
		}
		else
		{
			return ["YAxis"];
		}
	}
	else
	{
		return ["none"];
	}
}

//===Event listeners===
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
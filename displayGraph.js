"use strict"
//display data related specifically to the graph module
//===Canvases===
//"background" canvas
var graphBkgrnCanvas;
var graphBkgrnCtx;

//canvas specifically for the graph points (so they can be cleared without also redrawing the graph background)
var graphPointsCanvas;
var graphPointsCtx;

//canvas specifically for the model (so it can be overlaid over the graph)
var graphModelCanvas;
var graphModelCtx;

//===FORMATTING VALUES===
//colors of graph elements
var graphBorderCol;
var graphCol;
var graphLineCol;
var graphLineSndCol;
var graphTextCol;
var graphTriCol;
var graphPointsCol;
var graphPointsSelCol;

//colors of axis bars on graph
var graphAxisBarCol;
var buttonBorder;
var buttonSize;

//size of graph elements
var graphBorder;
var graphSize;
var graphLineWidth;
var graphLineLength;
var graphInnerMargin;
var graphLocReportTextSize;
var graphTextSize;
var graphTextWidth;
var graphAxisBarWidth;
var graphAxisBarInnerWidth;
var graphPointRad;

//feature on each axis (label if 0)
var graphXAxis;
var graphYAxis;

//set display values of the graph
function graphDisplayInit()
{
	graphBkgrnCanvas = document.querySelector('#graphBkgrnCanvas');
	canvasGallery[0][0] = graphBkgrnCanvas;
	graphBkgrnCtx = graphBkgrnCanvas.getContext('2d');
	
	graphPointsCanvas = document.querySelector('#graphPointsCanvas');
	canvasGallery[0][1] = graphPointsCanvas;
	graphPointsCtx = graphPointsCanvas.getContext('2d');
	
	graphModelCanvas = document.querySelector('#graphModelCanvas');
	canvasGallery[0][2] = graphModelCanvas;
	graphModelCtx = graphModelCanvas.getContext('2d');
	
	graphBorderCol = "#dbdbdb";
	graphLineCol = "#dbdbdb";
	graphLineSndCol = "#eeeeee";
	graphCol = "#ffffff";
	graphTextCol = "#000000"
	graphTriCol = "#000000"
	//graphPointsCol = "#4da6ff";
	//graphPointsSelCol = "#ffa64d";
	graphPointsCol = "#000000";
	graphPointsSelCol = "#80ff80";
	
	graphBorder = 2.0;
	graphInnerMargin = 5.0;
	graphSize = 512.0;
	graphLineWidth = 2.0;
	graphLineLength = 0.95;
	graphLocReportTextSize = 14;
	graphTextSize = 14;
	graphTextWidth = 90;
	graphPointRad = 2.5;
	
	graphXAxis = 1;
	graphYAxis = 0;
	
	graphAxisBarCol = "#ffffff";
	graphAxisBarInnerWidth = 20.0;
	graphAxisBarWidth = graphAxisBarInnerWidth + (graphBorder * 1.0);
	
	buttonBorder = 2.0;
	buttonSize = 32.0;
}

function switchToGraphDisplay()
{
	graphBkgrnCanvas.width			= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth;
	graphBkgrnCanvas.height			= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + graphLocReportTextSize;
	graphPointsCanvas.width			= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth;
	graphPointsCanvas.height		= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + graphLocReportTextSize;
	graphModelCanvas.width			= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth;
	graphModelCanvas.height			= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + graphLocReportTextSize;
	displayContainer.style.width	= (graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth) + "px";
	displayContainer.style.height	= (graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + graphLocReportTextSize) + "px";
	commandLineInput.style.width	= (graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth) + "px";
	commandLineOutput.style.width	= (graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth) + "px";

	drawGraph();
	drawGraphAxisBar();
	drawAllPointsOnGraph();
}

function drawModel()
{
	var projOnSides = [
		(1 - model[0]) / model[graphYAxis],		//value of Y, when X = -1
		(-1 - model[0]) / model[graphYAxis],	//value of Y, when X = +1
		(1 - model[0]) / model[graphYAxis],		//value of X, when Y = -1
		(-1 - model[0]) / model[graphYAxis],	//value of X, when Y = +1
	];
	
	console.log(projOnSides);
}

//draws the graph (but not points on the graph)	
function drawGraph()
{
	graphBkgrnCtx.fillStyle = graphBorderCol;
	fillRect(
		graphBkgrnCtx, 
		0, 
		0, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth,
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth
	);
	
	graphBkgrnCtx.fillStyle = graphCol;
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphAxisBarWidth, 
		graphBorder, 
		graphInnerMargin * 2 + graphSize,
		graphInnerMargin * 2 + graphSize
	);
	
	graphBkgrnCtx.fillStyle = graphLineSndCol;
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth, 
		graphBorder + graphInnerMargin + graphSize / 4 - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth, 
		graphBorder + graphInnerMargin + (graphSize * 3 / 4) - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth + graphSize / 4 - graphLineWidth / 2, 
		graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth + (graphSize * 3 / 4) - graphLineWidth / 2, 
		graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
	
	graphBkgrnCtx.fillStyle = graphLineCol;
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth, 
		graphBorder + graphInnerMargin + graphSize / 2 - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth + graphSize / 2 - graphLineWidth / 2, 
		graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
}

//draws the axis bars on the side of the graph
function drawGraphAxisBar()
{
	//X Axis Buttons
	graphBkgrnCtx.fillStyle = graphAxisBarCol;
	fillRect(
		graphBkgrnCtx, 
		graphBorder + graphAxisBarWidth, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	fillRect(
		graphBkgrnCtx, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	graphBkgrnCtx.fillStyle = graphTriCol;
	fillEquilatTri(
		graphBkgrnCtx, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		7.5, 
		0
	)
	fillEquilatTri(
		graphBkgrnCtx, 
		graphBorder + graphAxisBarWidth + graphAxisBarInnerWidth / 2,
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		7.5, 
		180
	)
	
	//Y Axis Buttons
	graphBkgrnCtx.fillStyle = graphAxisBarCol;
	fillRect(
		graphBkgrnCtx, 
		graphBorder, 
		graphBorder,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	fillRect(
		graphBkgrnCtx, 
		graphBorder, 
		graphBorder + graphSize + graphInnerMargin * 2 - graphAxisBarInnerWidth,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	graphBkgrnCtx.fillStyle = graphTriCol;
	fillEquilatTri(
		graphBkgrnCtx, 
		graphBorder + graphAxisBarInnerWidth / 2,
		graphBorder + graphAxisBarInnerWidth / 2,
		7.5, 
		90
	)
	fillEquilatTri(
		graphBkgrnCtx, 
		graphBorder + graphAxisBarInnerWidth / 2,
		graphBorder + graphSize + graphInnerMargin * 2 - graphAxisBarInnerWidth / 2,
		7.5, 
		270
	)
	
	graphBkgrnCtx.fillStyle = graphAxisBarCol;
	
	//X Label (as in words not ml label)
	fillRect(
		graphBkgrnCtx, 
		graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphSize + graphInnerMargin * 2 - (graphBorder * 2) - (graphAxisBarInnerWidth * 2), 
		graphAxisBarInnerWidth
	);
	
	
	//Y Label (as in words not ml label)
	fillRect(
		graphBkgrnCtx, 
		graphBorder, 
		graphBorder * 2 + graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth,
		graphSize + graphInnerMargin * 2 - (graphBorder * 2) - (graphAxisBarInnerWidth * 2)
	);
	
	//feature Count Box
	fillRect(
		graphBkgrnCtx, 
		graphBorder, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	graphBkgrnCtx.textAlign = "center";
	graphBkgrnCtx.fillStyle = graphTextCol;
	graphBkgrnCtx.font = graphTextSize + "px Arial";
	
	graphBkgrnCtx.beginPath();
	if (graphXAxis == 0)
	{
		graphBkgrnCtx.fillText(
			"Label",
			graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth, 
			graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		);
	}
	else
	{
		graphBkgrnCtx.fillText(
			"Feature " + graphXAxis + " / " + featureCount,
			graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth, 
			graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		);
	}
	
	graphBkgrnCtx.beginPath();
	graphBkgrnCtx.save();
	graphBkgrnCtx.translate(
		graphBorder + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		graphBorder * 2 + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth
	);
	graphBkgrnCtx.rotate(-90 * Math.PI / 180);
	
	if (graphYAxis == 0)
	{
		graphBkgrnCtx.fillText(
			"Label", 0, 0
		);
	}
	else
	{
		graphBkgrnCtx.fillText(
			"Feature " + graphYAxis + " / " + featureCount, 0, 0
		);
	}
	
	graphBkgrnCtx.restore()
}

//draws all points on the graph
function drawAllPointsOnGraph()
{
	graphPointsCtx.clearRect(0, 0, graphPointsCanvas.width, graphPointsCanvas.height);
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		drawPointOnGraph(i);
	}
}

//draws only the point at the index
function drawPointOnGraph(index)
{
	if (
		graphPoints[index][graphXAxis] == undefined ||
		graphPoints[index][graphYAxis] == undefined
	)
	{
		
	}
	else
	{
		var tempPoint = graphPointToDisplayPoint(
			graphPoints[index][graphXAxis], 
			graphPoints[index][graphYAxis]
		);
		
		graphPointsCtx.beginPath();
		if(index != selectedPoint)
		{
			graphPointsCtx.fillStyle = graphPointsCol;
		}
		else
		{
			graphPointsCtx.fillStyle = graphPointsSelCol;
		}
		
		graphPointsCtx.arc(
			tempPoint[0],
			tempPoint[1],
			graphPointRad, 
			0, 2 * Math.PI
		);
		graphPointsCtx.fill();
	}
}

//shows the x, y coordinate of the mouse the graph while mouse is over the graph
//otherwise clear the section which would show that info
function graphLocReport(x, y)
{
	graphBkgrnCtx.clearRect(
		0, 
		(graphBorder + graphInnerMargin) * 2 + graphSize + graphAxisBarWidth, 
		(graphBorder + graphInnerMargin) * 2 + graphSize - ((buttonBorder * 2 + buttonSize) * 2), 
		(graphBorder + graphInnerMargin) * 2 + graphSize + graphLocReportTextSize + graphAxisBarWidth
	);
	
	if (
		x < graphBorder + graphInnerMargin + graphAxisBarWidth ||
		y < graphBorder + graphInnerMargin ||
		x > graphBorder + graphInnerMargin + graphAxisBarWidth + graphSize ||
		y > graphBorder + graphInnerMargin + graphSize 
	)
	{
		return;
	}
	
	graphBkgrnCtx.fillStyle = graphTextCol;
	graphBkgrnCtx.font= graphLocReportTextSize + "px Arial";
	graphBkgrnCtx.textAlign = "left";
	
	graphBkgrnCtx.fillText(
		(((x - graphBorder - graphInnerMargin - graphAxisBarWidth) * 2 / graphSize) - 1),
		0, 
		graphLocReportTextSize + (graphBorder + graphInnerMargin) * 2 + graphSize + graphAxisBarWidth
	);
	
	graphBkgrnCtx.fillText(
		(((graphSize + graphBorder + graphInnerMargin - y) * 2 / graphSize) - 1),
		graphTextWidth, 
		graphLocReportTextSize + (graphBorder + graphInnerMargin) * 2 + graphSize + graphAxisBarWidth
	);
}

//converts a x, y on the graph to a x, y in pixels on the browser screen
function graphPointToDisplayPoint(x, y)
{
	return [
		((x + 1) / 2 * graphSize) + graphAxisBarWidth + graphBorder + graphInnerMargin, 
		((1 - y) / 2 * graphSize) + graphBorder + graphInnerMargin
	];
}

//converts a x, y in pixels on the browser screen to a x, y on the graph
function displayPointToGraphPoint(x, y)
{
	return [ 
		((x - graphAxisBarWidth - graphBorder - graphInnerMargin) * 2 / graphSize) - 1,  
		1 - ((y - graphBorder - graphInnerMargin) * 2 / graphSize)
	];
}
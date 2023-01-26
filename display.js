"use strict"

//===FORMATTING VALUES===
//default margin for all elements
var margin;

//colors of graph elements
var graphBorderCol;
var graphCol;
var graphLineCol;
var graphLineSndCol;
var graphTextCol;
var graphTriCol;
var graphPointsCol;

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
var graphAxisBarWidth;
var graphAxisBarInnerWidth;
var graphPointRad;

//feature on each axis (label if 0)
var graphXAxis;
var graphYAxis;

//size of command line elements
var commandLineRecordTextSize;
var commandLineRecordTab;

//set display values and draw display elements
function displayInit()
{
	margin = 5.0;
	
	graphBorderCol = "#dbdbdb";
	graphLineCol = "#dbdbdb";
	graphLineSndCol = "#eeeeee";
	graphCol = "#ffffff";
	graphTextCol = "#000000"
	graphTriCol = "#000000"
	graphPointsCol = "#4ca6ff";
	
	graphBorder = 2.0;
	graphInnerMargin = 5.0;
	graphSize = 512.0;
	graphLineWidth = 2.0;
	graphLineLength = 0.95;
	graphLocReportTextSize = 14;
	graphTextSize = 14;
	
	graphPointRad = 2.5;
	
	graphXAxis = 1;
	graphYAxis = 0;
	
	graphAxisBarCol = "#ffffff";
	graphAxisBarInnerWidth = 20.0;
	graphAxisBarWidth = graphAxisBarInnerWidth + (graphBorder * 1.0);
	
	buttonBorder = 2.0;
	buttonSize = 32.0;
	
	commandLineRecordTextSize = 14;
	commandLineRecordTab = 90;
	
	drawGraph();
	drawGraphAxisBar();
	
	document.querySelector('#inputText').style.left = (margin * 2) + "px";
	document.querySelector('#inputText').style.top = (margin * 4 + (graphBorder + graphInnerMargin) * 2 + graphSize + graphLocReportTextSize + graphAxisBarWidth) + "px";
	document.querySelector('#inputText').style.width = (graphSize + (graphInnerMargin) * 2 + graphAxisBarWidth) + "px";
}

//draws the graph (but not points on the graph)	
function drawGraph()
{
	ctx.fillStyle = graphBorderCol;
	fillRect(
		ctx, 
		margin, 
		margin, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth,
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth
	);
	
	ctx.fillStyle = graphCol;
	fillRect(
		ctx, 
		margin + graphBorder + graphAxisBarWidth, 
		margin + graphBorder, 
		graphInnerMargin * 2 + graphSize,
		graphInnerMargin * 2 + graphSize
	);
	
	ctx.fillStyle = graphLineSndCol;
	fillRect(
		ctx, 
		margin + graphBorder + graphInnerMargin + graphAxisBarWidth, 
		margin + graphBorder + graphInnerMargin + graphSize / 4 - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		ctx, 
		margin + graphBorder + graphInnerMargin + graphAxisBarWidth, 
		margin + graphBorder + graphInnerMargin + (graphSize * 3 / 4) - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		ctx, 
		margin + graphBorder + graphInnerMargin + graphAxisBarWidth + graphSize / 4 - graphLineWidth / 2, 
		margin + graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
	fillRect(
		ctx, 
		margin + graphBorder + graphInnerMargin + graphAxisBarWidth + (graphSize * 3 / 4) - graphLineWidth / 2, 
		margin + graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
	
	ctx.fillStyle = graphLineCol;
	fillRect(
		ctx, 
		margin + graphBorder + graphInnerMargin + graphAxisBarWidth, 
		margin + graphBorder + graphInnerMargin + graphSize / 2 - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		ctx, 
		margin + graphBorder + graphInnerMargin + graphAxisBarWidth + graphSize / 2 - graphLineWidth / 2, 
		margin + graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
}

//draws the axis bars on the side of the graph
function drawGraphAxisBar()
{
	//X Axis Buttons
	ctx.fillStyle = graphAxisBarCol;
	fillRect(
		ctx, 
		margin + graphBorder + graphAxisBarWidth, 
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	fillRect(
		ctx, 
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize, 
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	ctx.fillStyle = graphTriCol;
	fillEquilatTri(
		ctx, 
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		7.5, 
		0
	)
	fillEquilatTri(
		ctx, 
		margin + graphBorder + graphAxisBarWidth + graphAxisBarInnerWidth / 2,
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		7.5, 
		180
	)
	
	//Y Axis Buttons
	ctx.fillStyle = graphAxisBarCol;
	fillRect(
		ctx, 
		margin + graphBorder, 
		margin + graphBorder,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	fillRect(
		ctx, 
		margin + graphBorder, 
		margin + graphBorder + graphSize + graphInnerMargin * 2 - graphAxisBarInnerWidth,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	ctx.fillStyle = graphTriCol;
	fillEquilatTri(
		ctx, 
		margin + graphBorder + graphAxisBarInnerWidth / 2,
		margin + graphBorder + graphAxisBarInnerWidth / 2,
		7.5, 
		90
	)
	fillEquilatTri(
		ctx, 
		margin + graphBorder + graphAxisBarInnerWidth / 2,
		margin + graphBorder + graphSize + graphInnerMargin * 2 - graphAxisBarInnerWidth / 2,
		7.5, 
		270
	)
	
	ctx.fillStyle = graphAxisBarCol;
	
	//X Label (as in words not ml label)
	fillRect(
		ctx, 
		margin + graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth, 
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphSize + graphInnerMargin * 2 - (graphBorder * 2) - (graphAxisBarInnerWidth * 2), 
		graphAxisBarInnerWidth
	);
	
	
	//Y Label (as in words not ml label)
	fillRect(
		ctx, 
		margin + graphBorder, 
		margin + graphBorder * 2 + graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth,
		graphSize + graphInnerMargin * 2 - (graphBorder * 2) - (graphAxisBarInnerWidth * 2)
	);
	
	//feature Count Box
	fillRect(
		ctx, 
		margin + graphBorder, 
		margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	ctx.textAlign = "center";
	ctx.fillStyle = graphTextCol;
	ctx.font = graphTextSize + "px Arial";
	
	ctx.beginPath();
	if (graphXAxis == 0)
	{
		ctx.fillText(
			"Label",
			margin + graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth, 
			margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		);
	}
	else
	{
		ctx.fillText(
			"Feature " + graphXAxis + " / " + featureCount,
			margin + graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth, 
			margin + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		);
	}
	
	ctx.beginPath();
	ctx.save();
	ctx.translate(
		margin + graphBorder + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		margin + graphBorder * 2 + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth
	);
	ctx.rotate(-90 * Math.PI / 180);
	
	if (graphYAxis == 0)
	{
		ctx.fillText(
			"Label", 0, 0
		);
	}
	else
	{
		ctx.fillText(
			"Feature " + graphYAxis + " / " + featureCount, 0, 0
		);
	}
	
	ctx.restore()
}

//draws all points on the graph
function drawAllPointsOnGraph()
{
	pointsCtx.clearRect(0, 0, pointsCanvas.width, pointsCanvas.height);
	
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
		
		pointsCtx.beginPath();
		pointsCtx.fillStyle = graphPointsCol;
		pointsCtx.arc(
			tempPoint[0],
			tempPoint[1],
			graphPointRad, 
			0, 2 * Math.PI
		);
		pointsCtx.fill();
	}
}

//shows the x, y coordinate of the mouse the graph while mouse is over the graph
//otherwise clear the section which would show that info
function graphLocReport(x, y)
{
	ctx.clearRect(
		margin, 
		margin + (graphBorder + graphInnerMargin) * 2 + graphSize + graphAxisBarWidth, 
		(graphBorder + graphInnerMargin) * 2 + graphSize - ((buttonBorder * 2 + buttonSize) * 2 + margin), 
		margin + (graphBorder + graphInnerMargin) * 2 + graphSize + graphLocReportTextSize + graphAxisBarWidth
	);
	
	if (
		x < graphBorder + graphInnerMargin + margin + graphAxisBarWidth ||
		y < graphBorder + graphInnerMargin + margin ||
		x > graphBorder + graphInnerMargin + margin + graphAxisBarWidth + graphSize ||
		y > graphBorder + graphInnerMargin + margin + graphSize 
	)
	{
		return;
	}
	
	ctx.fillStyle = "#000000";
	ctx.font= graphLocReportTextSize + "px Arial";
	ctx.textAlign = "left";
	
	ctx.fillText(
		(((x - graphBorder - graphInnerMargin - margin - graphAxisBarWidth) * 2 / graphSize) - 1) + ", " + (((graphSize + graphBorder + graphInnerMargin + margin - y) * 2 / graphSize) - 1),
		margin, 
		graphLocReportTextSize + (margin + graphBorder + graphInnerMargin) * 2 + graphSize + graphAxisBarWidth
	);
}

//console output
function printRecord()
{
	var inputsize = 
		Number(window.getComputedStyle(document.querySelector('#inputText'), null).getPropertyValue("height").slice(0, -2)) + 
		Number(window.getComputedStyle(document.querySelector('#inputText'), null).getPropertyValue("padding-top").slice(0, -2)) + 
		Number(window.getComputedStyle(document.querySelector('#inputText'), null).getPropertyValue("padding-bottom").slice(0, -2)) + 
		Number(window.getComputedStyle(document.querySelector('#inputText'), null).getPropertyValue("border-top-width").slice(0, -2)) + 
		Number(window.getComputedStyle(document.querySelector('#inputText'), null).getPropertyValue("border-bottom-width").slice(0, -2))
	;
	
	consoleCtx.clearRect(0, 0, consoleCanvas.width, consoleCanvas.height);	
	consoleCtx.fillStyle = "#000000";
	consoleCtx.font = commandLineRecordTextSize + "px Arial";
	consoleCtx.textAlign = "left";
	
	for (var i = 0; i < lineRecordLen; i++)
	{
		for (var j = 0; j < lineRecord[i].length; j++)
		{
			consoleCtx.fillText(
				lineRecord[i][j],
				margin + (j * commandLineRecordTab), 
				margin * 6 + (graphBorder + graphInnerMargin) * 2 + graphSize + graphLocReportTextSize + inputsize + graphAxisBarWidth + 
					(commandLineRecordTextSize * i)
			);
		}
	}
}

//converts a x, y on the graph to a x, y in pixels on the browser screen
function graphPointToDisplayPoint(x, y)
{
	return [
		((x + 1) / 2 * graphSize) + graphAxisBarWidth + graphBorder + graphInnerMargin + margin, 
		((1 - y) / 2 * graphSize) + graphBorder + graphInnerMargin + margin
	];
}

//converts a x, y in pixels on the browser screen to a x, y on the graph
function displayPointToGraphPoint(x, y)
{
	return [ 
		((x - graphAxisBarWidth - graphBorder - graphInnerMargin - margin) * 2 / graphSize) - 1,  
		1 - ((y - graphBorder - graphInnerMargin - margin) * 2 / graphSize)
	];
}

//===helper functions===
function fillRect(ACtx, x, y, w, h)
{
	ACtx.beginPath();
	ACtx.moveTo(x, 		y);
	ACtx.lineTo(x + w,	y);
	ACtx.lineTo(x + w,	y + h);
	ACtx.lineTo(x,		y + h);
	ACtx.lineTo(x,		y);
	ACtx.fill();
}

function fillEquilatTri(ACtx, cx, cy, size, angle)
{
	ACtx.beginPath();
	ACtx.moveTo(cx + Math.cos((angle)		* Math.PI / 180) * size,	cy - Math.sin((angle)		* Math.PI / 180) * size);
	ACtx.lineTo(cx + Math.cos((angle + 120)	* Math.PI / 180) * size,	cy - Math.sin((angle + 120)	* Math.PI / 180) * size);
	ACtx.lineTo(cx + Math.cos((angle + 240)	* Math.PI / 180) * size,	cy - Math.sin((angle + 240)	* Math.PI / 180) * size);
	ACtx.lineTo(cx + Math.cos((angle)		* Math.PI / 180) * size,	cy - Math.sin((angle)		* Math.PI / 180) * size);
	ACtx.fill();
}
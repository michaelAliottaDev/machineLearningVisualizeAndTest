"use strict"
//display data related specifically to the graph module

//===FORMATTING VALUES===
//canvas specifically for the graph points (so they can be cleared without also redrawing the graph background)
var pointsCanvas;
var pointsCtx;

//canvas specifically for the model (so it can be overlaid over the graph)
var modelCanvas;
var modelCtx;

//"background" canvas
var canvas;
var ctx;

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

//set display values and draw display elements
function graphDisplayInit()
{
	canvas = document.querySelector('#baseCanvas');
	ctx = baseCanvas.getContext('2d');
	
	pointsCanvas = document.querySelector('#graphPointsCanvas');
	pointsCtx = pointsCanvas.getContext('2d');
	
	modelCanvas = document.querySelector('#graphModelCanvas');
	modelCtx = modelCanvas.getContext('2d');
	
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
	
	canvas.width	= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth;
	canvas.height	= graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + graphLocReportTextSize;
	
	switchToGraphDisplay();
}

function switchToGraphDisplay()
{
	drawGraph();
	drawGraphAxisBar();
	drawAllPointsOnGraph();
}

//draws the graph (but not points on the graph)	
function drawGraph()
{
	ctx.fillStyle = graphBorderCol;
	fillRect(
		ctx, 
		0, 
		0, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth,
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth
	);
	
	ctx.fillStyle = graphCol;
	fillRect(
		ctx, 
		graphBorder + graphAxisBarWidth, 
		graphBorder, 
		graphInnerMargin * 2 + graphSize,
		graphInnerMargin * 2 + graphSize
	);
	
	ctx.fillStyle = graphLineSndCol;
	fillRect(
		ctx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth, 
		graphBorder + graphInnerMargin + graphSize / 4 - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		ctx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth, 
		graphBorder + graphInnerMargin + (graphSize * 3 / 4) - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		ctx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth + graphSize / 4 - graphLineWidth / 2, 
		graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
	fillRect(
		ctx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth + (graphSize * 3 / 4) - graphLineWidth / 2, 
		graphBorder + graphInnerMargin,
		graphLineWidth, 
		graphSize
	);
	
	ctx.fillStyle = graphLineCol;
	fillRect(
		ctx, 
		graphBorder + graphInnerMargin + graphAxisBarWidth, 
		graphBorder + graphInnerMargin + graphSize / 2 - graphLineWidth / 2, 
		graphSize,
		graphLineWidth
	);
	fillRect(
		ctx, 
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
	ctx.fillStyle = graphAxisBarCol;
	fillRect(
		ctx, 
		graphBorder + graphAxisBarWidth, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	fillRect(
		ctx, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	ctx.fillStyle = graphTriCol;
	fillEquilatTri(
		ctx, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		7.5, 
		0
	)
	fillEquilatTri(
		ctx, 
		graphBorder + graphAxisBarWidth + graphAxisBarInnerWidth / 2,
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2,
		7.5, 
		180
	)
	
	//Y Axis Buttons
	ctx.fillStyle = graphAxisBarCol;
	fillRect(
		ctx, 
		graphBorder, 
		graphBorder,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	fillRect(
		ctx, 
		graphBorder, 
		graphBorder + graphSize + graphInnerMargin * 2 - graphAxisBarInnerWidth,
		graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth
	);
	
	ctx.fillStyle = graphTriCol;
	fillEquilatTri(
		ctx, 
		graphBorder + graphAxisBarInnerWidth / 2,
		graphBorder + graphAxisBarInnerWidth / 2,
		7.5, 
		90
	)
	fillEquilatTri(
		ctx, 
		graphBorder + graphAxisBarInnerWidth / 2,
		graphBorder + graphSize + graphInnerMargin * 2 - graphAxisBarInnerWidth / 2,
		7.5, 
		270
	)
	
	ctx.fillStyle = graphAxisBarCol;
	
	//X Label (as in words not ml label)
	fillRect(
		ctx, 
		graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
		graphSize + graphInnerMargin * 2 - (graphBorder * 2) - (graphAxisBarInnerWidth * 2), 
		graphAxisBarInnerWidth
	);
	
	
	//Y Label (as in words not ml label)
	fillRect(
		ctx, 
		graphBorder, 
		graphBorder * 2 + graphAxisBarInnerWidth, 
		graphAxisBarInnerWidth,
		graphSize + graphInnerMargin * 2 - (graphBorder * 2) - (graphAxisBarInnerWidth * 2)
	);
	
	//feature Count Box
	fillRect(
		ctx, 
		graphBorder, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize,
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
			graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth, 
			graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		);
	}
	else
	{
		ctx.fillText(
			"Feature " + graphXAxis + " / " + featureCount,
			graphBorder * 2 + graphAxisBarWidth + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth, 
			graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		);
	}
	
	ctx.beginPath();
	ctx.save();
	ctx.translate(
		graphBorder + graphAxisBarInnerWidth / 2 + (graphTextSize / 4),
		graphBorder * 2 + graphAxisBarInnerWidth + graphSize / 2 + graphInnerMargin - graphBorder - graphAxisBarInnerWidth
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
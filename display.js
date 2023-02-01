"use strict"

//===FORMATTING VALUES===
//size of secondary display elements
var secDispBorder;
var secDispSize;
var secDispTextSize;
var secDispCellHeight;
var secDispCellWidth;
var secDispCellInnerMargin;
var secDispCellDivWidth;
var secDispInnerMargin;
var secDispSelAxisX;
var secDispSelAxisY;
var secDispTitleHeight;

var displayContainer;

//set display values and draw display elements
function displayInit()
{
	graphXAxis = 1;
	graphYAxis = 0;
	
	secDispBorder = 2.0;
	secDispSize = 512.0;
	secDispTextSize = 14;
	secDispCellHeight = 20;
	secDispCellWidth = 90;
	secDispCellInnerMargin = 2.0;
	secDispCellDivWidth = 2.0;
	secDispInnerMargin = 5.0;
	secDispSelAxisX = 0;
	secDispSelAxisY = 0;
	secDispTitleHeight = 20.0;
	
	displayContainer = document.querySelector('#displayContainer');
}

function drawSecDisp()
{
	ctx.fillStyle = graphBorderCol;
	fillRect(
		ctx, 
		graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth, 
		0, 
		secDispBorder * 2 + secDispInnerMargin * 2 + secDispSize,
		secDispBorder * 2 + secDispInnerMargin * 2 + secDispSize + secDispTitleHeight
	);
	
	ctx.fillStyle = graphCol;
	fillRect(
		ctx, 
		secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth, 
		secDispBorder, 
		secDispInnerMargin * 2 + secDispSize,
		secDispInnerMargin * 2 + secDispSize
	);
	
	ctx.fillStyle = graphLineCol
	
	for (var i = 1; i < featureCount + 3; i++)
	{
		ctx.beginPath();
		ctx.fillRect(
			secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth - secDispCellDivWidth + 
			i * (secDispInnerMargin * 2 + secDispCellInnerMargin * 2 + secDispCellWidth + secDispCellDivWidth),
			secDispBorder + secDispInnerMargin,
			secDispCellDivWidth,
			secDispSize - secDispInnerMargin
		);
	}
	
	for (var i = 1; i < 20; i++)
	{
		ctx.beginPath();
		ctx.fillRect(
			secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + secDispInnerMargin,
			secDispBorder,
			secDispSize - secDispInnerMargin,
			secDispCellDivWidth
		);
	}
	
	ctx.fillStyle = graphTextCol;
	ctx.textAlign = "center";
	
	ctx.fillText(
		"Index",
		secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + secDispInnerMargin + secDispCellInnerMargin + secDispCellWidth * 0.5,
		secDispBorder + secDispInnerMargin + secDispCellHeight + secDispCellInnerMargin
	);
	
	ctx.fillStyle = graphBorderCol;
	for (var j = 0; j < graphPointsLen; j++)
	{
		ctx.fillText(
			j,
			secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + secDispInnerMargin + secDispCellInnerMargin + secDispCellWidth * 0.5,
			secDispBorder * 2 + secDispInnerMargin * 2 + secDispCellHeight * 2 + secDispCellInnerMargin * 2 + 
			j * (secDispBorder + secDispInnerMargin + secDispCellHeight + secDispCellInnerMargin)
		);
	}
	
	ctx.fillText(
		"Label",
		secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + secDispInnerMargin * 3 + secDispCellInnerMargin * 3 + secDispCellWidth * 1.5 + secDispCellDivWidth,
		secDispBorder + secDispInnerMargin + secDispCellHeight + secDispCellInnerMargin
	);
		
	for (var j = 0; j < graphPointsLen; j++)
	{
		ctx.fillText(
			graphPoints[0][j],
			secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + secDispInnerMargin * 3 + secDispCellInnerMargin * 3 + secDispCellWidth * 1.5 + secDispCellDivWidth,
			secDispBorder * 2 + secDispInnerMargin * 2 + secDispCellHeight * 2 + secDispCellInnerMargin * 2 + 
			j * (secDispBorder + secDispInnerMargin + secDispCellHeight + secDispCellInnerMargin)
		);
	}
	
	for (var i = 0; i < featureCount; i++)
	{
		ctx.fillText(
			"Feature " + (1 + i),
			secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + secDispInnerMargin * 5 + secDispCellInnerMargin * 5 + secDispCellWidth * 2.5 + secDispCellDivWidth * 2 + 
			i * (secDispInnerMargin * 2 + secDispCellInnerMargin * 2 + secDispCellWidth),
			secDispBorder + secDispInnerMargin + secDispCellHeight + secDispCellInnerMargin
		);
		
		/*for (var j = 0; j < graphPointsLen; j++)
		{
			ctx.beginPath();
			ctx.fillText(
				graphPoints[i + 1][j],
				margin * 2 + secDispBorder + graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth + secDispInnerMargin * (5 + (i * 2)) + secDispCellInnerMargin * (5 + (i * 2)) + secDispCellWidth * (2.5 + i) + secDispCellDivWidth * 2,
				margin + secDispBorder * j + secDispInnerMargin * j + secDispCellHeight * j + secDispCellInnerMargin * j
			);
		}*/
	}
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

//shows the x, y coordinate of the mouse the graph while mouse is over the graph
//otherwise clear the section which would show that info
function graphLocReport(x, y)
{
	ctx.clearRect(
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
	
	ctx.fillStyle = "#000000";
	ctx.font= graphLocReportTextSize + "px Arial";
	ctx.textAlign = "left";
	
	ctx.fillText(
		(((x - graphBorder - graphInnerMargin - graphAxisBarWidth) * 2 / graphSize) - 1) + ", " + (((graphSize + graphBorder + graphInnerMargin - y) * 2 / graphSize) - 1),
		0, 
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
"use strict"

//===FORMATTING VALUES===
var margin;

var graphBorderCol;
var graphCol;
var graphLineCol;
var graphLineSndCol;
var graphBorder;
var graphSize;
var graphLineWidth;
var graphLineLength;
var graphInnerMargin;
var graphLocReportTextSize;

var graphAxisBarCol;
var graphAxisBarWidth;
var graphAxisBarInnerWidth;

var labelBarSize;
var graphPointRad;
var labelSwatches;
var labelSwatchesLen;
var selectedLabel;
var selectedLabelSwatchRad;
var selectedLabelSwatchCol;
var labelTextSize;

var buttonBorder;
var buttonCol;
var buttonBorderCol;
var buttonSize;

var commandLineRecordTextSize;
var commandLineRecordTab;

function displayInit()
{
	margin = 5.0;
	
	graphBorderCol = "#dbdbdb";
	graphLineCol = "#dbdbdb";
	graphLineSndCol = "#eeeeee";
	graphCol = "#ffffff";
	
	buttonCol = "#ffffff";
	buttonBorderCol = "#dbdbdb";
	
	graphBorder = 2.0;
	graphInnerMargin = 5.0;
	graphSize = 512.0;
	graphLineWidth = 2.0;
	graphLineLength = 0.95;
	graphLocReportTextSize = 14;
	
	graphAxisBarCol = "#ffffff";
	graphAxisBarInnerWidth = 20.0;
	graphAxisBarWidth = graphAxisBarInnerWidth + (graphBorder * 1.0);
	
	labelBarSize = 16.0;
	graphPointRad = 4.0;
	labelSwatches = [
		"#ff5500",
		"#00aaff"
	];
	selectedLabelSwatchRad = 6.0;
	selectedLabelSwatchCol = "#ffffff";
	selectedLabel = 0;
	
	labelSwatchesLen = 2;
	
	buttonBorder = 2.0;
	buttonSize = 32.0;
	
	commandLineRecordTextSize = 14;
	commandLineRecordTab = 60;
	labelTextSize = 11;
	
	drawGraph();
	drawGraphAxisBar();
	//drawSaveLoadButtons();
	//drawLinearModel([0.0, 1.0, 1.0]);
	
	document.querySelector('#inputText').style.left = (margin * 2) + "px";
	document.querySelector('#inputText').style.top = (margin * 4 + (graphBorder + graphInnerMargin) * 2 + graphSize + graphLocReportTextSize + graphAxisBarWidth) + "px";
	document.querySelector('#inputText').style.width = (graphSize + (graphInnerMargin) * 2 + graphAxisBarWidth) + "px";
}
	
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
	
	ctx.fillStyle = "#000000";
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
	
	ctx.fillStyle = "#000000";
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
}

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

function drawAllPointsOnGraph()
{
	pointsCtx.clearRect(0, 0, pointsCanvas.width, pointsCanvas.height);
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		drawPointOnGraph(i);
	}
}

function drawLinearModel(model)
{
	// +--0--+
	// |  |  |
	// 3--+--1
	// |  |  |
	// +--2--+
	var boarderPoints = [
		//grey line
		(0 - model[0] + model[2]) / model[1], //value of f0 when f1 = -1 and label = 0
		(0 - model[0] - model[2]) / model[1], //value of f0 when f1 = 1  and label = 0
		(0 - model[0] + model[1]) / model[2], //value of f1 when f0 = -1 and label = 0
		(0 - model[0] - model[1]) / model[2], //value of f1 when f0 = 1  and label = 0
		//orange line
		(-1 - model[0] - model[2]) / model[1], //value of f0 when f1 = 1  and label = -1
		(-1 - model[0] - model[1]) / model[2], //value of f1 when f0 = 1  and label = -1
		(-1 - model[0] + model[2]) / model[1], //value of f0 when f1 = -1 and label = -1
		(-1 - model[0] + model[1]) / model[2], //value of f1 when f0 = -1 and label = -1
		//blue line
		(1 - model[0] - model[2]) / model[1], //value of f0 when f1 = 1  and label = 1
		(1 - model[0] - model[1]) / model[2], //value of f1 when f0 = 1  and label = 1
		(1 - model[0] + model[2]) / model[1], //value of f0 when f1 = -1 and label = 1
		(1 - model[0] + model[1]) / model[2]  //value of f1 when f0 = -1 and label = 1
	];
	
	//getting the label value for each corner
	// 3 | 0
	// --+--
	// 2 | 1
	var cornerPoints = [
		model[0] + model[1] + model[2],
		model[0] + model[1] - model[2],
		model[0] - model[1] - model[2],
		model[0] - model[1] + model[2]
	];
	
	var progress = 0;
	var displayPoints = [];
	var cornerCirc = [];
	var memorize = [
		graphPointToDisplayPoint(1.0, 1.0),
		graphPointToDisplayPoint(1.0, -1.0),
		graphPointToDisplayPoint(-1.0, -1.0),
		graphPointToDisplayPoint(-1.0, 1.0)
	];
	var temp = [];
	
	for (var i = 0; i < 4 && progress < 2; i++)
	{
		if (boarderPoints[i] >= -1 && boarderPoints[i] <= 1)
		{
			if (i < 2)
			{
				displayPoints[progress] = graphPointToDisplayPoint(boarderPoints[i], (i * 2) - 1);
			}
			else 
			{
				displayPoints[progress] = graphPointToDisplayPoint(((i - 2) * 2) - 1, boarderPoints[i]);
			}
			
			progress++;
		}
	}
	
	modelCtx.beginPath();
	modelCtx.strokeStyle = "#000000";
	modelCtx.moveTo(displayPoints[0][0], displayPoints[0][1]);
	modelCtx.lineTo(displayPoints[1][0], displayPoints[1][1]);
	modelCtx.stroke();
	
	modelCtx.strokeStyle = labelSwatches[0];
	modelCtx.fillStyle = labelSwatches[0];
	progress = 0;
	
	for (var i = 0; i < 4 && progress < 2; i++)
	{
		if (boarderPoints[i + 4] >= -1 && boarderPoints[i + 4] <= 1)
		{
			if (i % 2 == 0)
			{
				displayPoints[progress] = graphPointToDisplayPoint(boarderPoints[4 + i], 1.0 - i);
			}
			else
			{
				displayPoints[progress] = graphPointToDisplayPoint(2.0 - i, boarderPoints[4 + i]);
			}
			
			cornerCirc[progress] = i;
			progress++;
		}
	}
	
	if (progress >= 2)
	{
		modelCtx.beginPath();
		modelCtx.moveTo(displayPoints[0][0], displayPoints[0][1]);
		modelCtx.lineTo(displayPoints[1][0], displayPoints[1][1]);
		modelCtx.stroke();
	}
	
	modelCtx.beginPath();
	modelCtx.moveTo(displayPoints[0][0], displayPoints[0][1]);
	modelCtx.lineTo(displayPoints[1][0], displayPoints[1][1]);
	
	console.log(cornerPoints, cornerCirc);
	
	progress = -1;

	for(var i = 0; i < 4 || progress >= 0; i++)
	{
		for(var j = 0; j < 2; j++)
		{
			if (cornerCirc[j] == i % 4)
			{
				if (progress == -1)
				{
					progress = j;
					modelCtx.moveTo(displayPoints[j][0], displayPoints[j][1]);
				}
				else
				{
					modelCtx.lineTo(displayPoints[j][0], displayPoints[j][1]);
					if (progress == j)
					{
						progress = -2;
					}
				}
			}
		}
		
		if (cornerPoints[i % 4] <= -1.0)
		{
			if (progress == -1)
			{
				progress = 2 + (i % 4);
				modelCtx.moveTo(memorize[i % 4][0], memorize[i % 4][1]);
			}
			else
			{
				modelCtx.lineTo(memorize[i % 4][0], memorize[i % 4][1]);
				if (progress == 2 + (i % 4))
				{
					progress = -2;
				}
			}
		}
	}
	
	if (progress != -1)
	{
		modelCtx.globalAlpha = 0.5;
		modelCtx.fill();
		modelCtx.globalAlpha = 1.0;
	}
	
	modelCtx.strokeStyle = labelSwatches[1];
	modelCtx.fillStyle = labelSwatches[1];
	progress = 0;
	
	for (var i = 0; i < 4 && progress < 2; i++)
	{
		if (boarderPoints[i + 8] >= -1 && boarderPoints[i + 8] <= 1)
		{
			if (i % 2 == 0)
			{
				displayPoints[progress] = graphPointToDisplayPoint(boarderPoints[8 + i], 1.0 - i);
			}
			else
			{
				displayPoints[progress] = graphPointToDisplayPoint(2.0 - i, boarderPoints[8 + i]);
			}
			
			cornerCirc[progress] = i;
			progress++;
		}
	}
	
	
	if (progress >= 2)
	{
		modelCtx.beginPath();
		modelCtx.moveTo(displayPoints[0][0], displayPoints[0][1]);
		modelCtx.lineTo(displayPoints[1][0], displayPoints[1][1]);
		modelCtx.stroke();
	}
	
	modelCtx.beginPath();
	modelCtx.moveTo(displayPoints[0][0], displayPoints[0][1]);
	modelCtx.lineTo(displayPoints[1][0], displayPoints[1][1]);
	
	console.log(cornerPoints, cornerCirc);
	
	progress = -1;

	for(var i = 0; i < 4 || progress >= 0; i++)
	{
		for(var j = 0; j < 2; j++)
		{
			if (cornerCirc[j] == i % 4)
			{
				if (progress == -1)
				{
					progress = j;
					modelCtx.moveTo(displayPoints[j][0], displayPoints[j][1]);
				}
				else
				{
					modelCtx.lineTo(displayPoints[j][0], displayPoints[j][1]);
					if (progress == j)
					{
						progress = -2;
					}
				}
			}
		}
		
		if (cornerPoints[i % 4] >= 1.0)
		{
			if (progress == -1)
			{
				progress = 2 + (i % 4);
				modelCtx.moveTo(memorize[i % 4][0], memorize[i % 4][1]);
			}
			else
			{
				modelCtx.lineTo(memorize[i % 4][0], memorize[i % 4][1]);
				if (progress == 2 + (i % 4))
				{
					progress = -2;
				}
			}
		}
	}
	
	if (progress != -1)
	{
		modelCtx.globalAlpha = 0.5;
		modelCtx.fill();
		modelCtx.globalAlpha = 1.0;
	}
	
	console.log(boarderPoints);
}

function drawPointOnGraph(index)
{
	pointsCtx.beginPath();
	pointsCtx.fillStyle = labelSwatches[graphPoints[index][2]];
	pointsCtx.arc(
		((graphPoints[index][0] + 1) / 2 * graphSize) + graphBorder + graphInnerMargin + margin, 
		((1 - graphPoints[index][1]) / 2 * graphSize) + graphBorder + graphInnerMargin + margin,		
		graphPointRad, 
		0, 2 * Math.PI
	);
	pointsCtx.fill();
}

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

function graphPointToDisplayPoint(x, y)
{
	return [
		((x + 1) / 2 * graphSize) + graphAxisBarWidth + graphBorder + graphInnerMargin + margin, 
		((1 - y) / 2 * graphSize) + graphBorder + graphInnerMargin + margin
	];
}

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
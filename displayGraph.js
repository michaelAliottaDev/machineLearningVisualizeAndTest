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
var graphModelCol;
var graphLossCol;

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
var graphModelRad;
var graphLossRad;
var graphLossAlpha;

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
	graphModelCol = "#00cccc";
	graphLossCol = "#ff3333";
	
	graphBorder = 2.0;
	graphInnerMargin = 5.0;
	graphSize = 512.0;
	graphLineWidth = 2.0;
	graphLineLength = 0.95;
	graphLocReportTextSize = 14;
	graphTextSize = 14;
	graphTextWidth = 90;
	graphPointRad = 2.5;
	graphModelRad = 4.0;
	graphLossRad = 1.0;
	graphLossAlpha = 0.5;
	
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
	//commandLineInput.style.width	= (graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth) + "px";
	//commandLineOutput.style.width	= (graphBorder * 2 + graphInnerMargin * 2 + graphSize + graphAxisBarWidth) + "px";

	drawGraph();
	drawGraphAxisBar();
	drawAllPointsOnGraph();
}

function drawLoss()
{
	var projPoint;
	var lossTotal = 0.0;
	var realExmpCount = 0;
	var realFeatCount = 0;
	
	for (var i = 0; i < graphPointsLen; i++)
	{
		if (graphPoints[i][0] !== undefined)
		{
			projPoint = model[0];
			realExmpCount++;
			
			for (var j = 1; j < featureCount + 1; j++)
			{
				if (graphPoints[i][j] !== undefined)
				{
					projPoint += model[j] * graphPoints[i][j];
					realFeatCount++;
				}
			}
			
			if (projPoint > 1)
			{
				projPoint = 1;
			}
			
			if (projPoint < -1)
			{
				projPoint = -1;
			}
			
			lossTotal += (graphPoints[i][0] - projPoint) * (graphPoints[i][0] - projPoint);
		}
	}
	
	graphModelCtx.strokeStyle = graphLossCol;
	graphModelCtx.fillStyle = graphLossCol;
	graphModelCtx.lineWidth = graphLossRad;
	
	graphModelCtx.textAlign = "right";
	graphModelCtx.font = graphTextSize + "px Arial";
	
	graphModelCtx.fillText(
		lossTotal / graphPointsLen,
		graphBorder + graphInnerMargin + graphSize + graphAxisBarWidth,
		graphBorder + graphInnerMargin + graphSize - graphTextSize * 2
	);
	
	graphModelCtx.fillText(
		lossTotal / realExmpCount,
		graphBorder + graphInnerMargin + graphSize + graphAxisBarWidth,
		graphBorder + graphInnerMargin + graphSize - graphTextSize
	);
	
	graphModelCtx.fillText(
		lossTotal / realFeatCount,
		graphBorder + graphInnerMargin + graphSize + graphAxisBarWidth,
		graphBorder + graphInnerMargin + graphSize
	);
	
	graphModelCtx.globalAlpha = graphLossAlpha;
	
	if (graphXAxis == 0 && graphYAxis == 0)
	{
		//both are the label(?) (we're done here)
		graphModelCtx.globalAlpha = 1.0;
		return;
	}
	else if (graphXAxis == 0)
	{
		//x axis is the label
		for (var i = 0; i < graphPointsLen; i++)
		{
			if (graphPoints[i][graphYAxis] !== undefined)
			{
				graphModelCtx.beginPath();
				
				projPoint = graphPointToDisplayPoint(
					graphPoints[i][0],
					graphPoints[i][graphYAxis]
				);
				graphModelCtx.moveTo(projPoint[0], projPoint[1]);
	
				projPoint = graphPointToDisplayPoint(
					model[0] + (graphPoints[i][graphYAxis] * model[graphYAxis]),
					graphPoints[i][graphYAxis]
				);
				graphModelCtx.lineTo(projPoint[0], projPoint[1]);
				
				graphModelCtx.stroke();
			}
		}
	}
	else if (graphYAxis == 0)
	{
		//y axis is the label
		for (var i = 0; i < graphPointsLen; i++)
		{
			if (graphPoints[i][graphXAxis] !== undefined)
			{
				graphModelCtx.beginPath();
				
				projPoint = graphPointToDisplayPoint(
					graphPoints[i][graphXAxis], 
					graphPoints[i][0]
				);
				graphModelCtx.moveTo(projPoint[0], projPoint[1]);
	
				projPoint = graphPointToDisplayPoint(
					graphPoints[i][graphXAxis], 
					model[0] + (graphPoints[i][graphXAxis] * model[graphXAxis])
				);
				graphModelCtx.lineTo(projPoint[0], projPoint[1]);
				
				graphModelCtx.stroke();
			}
		}
	}
	else
	{
		//neither is the label (we're done here)
		graphModelCtx.globalAlpha = 1.0;
		return;
	}
	
	
	graphModelCtx.globalAlpha = 1.0;
}

function drawModel()
{
	var dispProg = 0;
	var dispPoints = [];
	
	var projOnSides;
	
	graphModelCtx.clearRect(0, 0, graphModelCanvas.width, graphModelCanvas.height);
	
	if (graphXAxis == 0 && graphYAxis == 0)
	{
		//both are the label(?)
		projOnSides = [
			[1, 1],
			[-1, -1]
		];
	}
	else if (graphXAxis == 0)
	{
		//x axis is the label
		projOnSides = [
			[-1,	(-1 - model[0]) / model[graphYAxis]],	//label set to -1,		calc feature val
			[1,		(1 - model[0]) / model[graphYAxis]],	//label set to 1,		calc feature val
			[model[0] - model[graphYAxis],	-1],			//feature set to -1,	calc label val
			[model[0] + model[graphYAxis],	1]				//feature set to 1,		calc label val
		];
	}
	else if (graphYAxis == 0)
	{
		//y axis is the label
		projOnSides = [
			[(-1 - model[0]) / model[graphXAxis],	-1],	//label set to -1,		calc feature val
			[(1 - model[0]) / model[graphXAxis],	1],		//label set to 1,		calc feature val
			[-1,	model[0] - model[graphXAxis]],			//feature set to -1,	calc label val
			[1,		model[0] + model[graphXAxis]]			//feature set to 1,		calc label val
		];
	}
	else
	{
		//neither is the label (we're done here)
		return;
	}
	
	for (var i = 0; i < projOnSides.length; i++)
	{
		if (projOnSides[i][0] >= -1 && projOnSides[i][0] <= 1 && projOnSides[i][1] >= -1 && projOnSides[i][1] <= 1)
		{
			dispPoints[dispProg] = graphPointToDisplayPoint(projOnSides[i][0], projOnSides[i][1]);
			dispProg++;
		}
	}
	
	graphModelCtx.strokeStyle = graphModelCol;
	graphModelCtx.lineWidth = graphModelRad;
	graphModelCtx.beginPath();
	graphModelCtx.moveTo(dispPoints[0][0], dispPoints[0][1]);
	
	for (var i = 1; i < dispProg; i++)
	{
		if(
			dispPoints[i][0] != dispPoints[i - 1][0] ||
			dispPoints[i][1] != dispPoints[i - 1][1]
		)
		{
			graphModelCtx.lineTo(dispPoints[i][0], dispPoints[i][1]);
			i = dispProg;
		}
	}
	
	graphModelCtx.stroke();
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
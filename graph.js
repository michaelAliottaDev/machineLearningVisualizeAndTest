"use strict"

//an array of graph points
//always in the form
//[n][0] = Label
//[n][m] = Feature (m)
var graphPoints;
var graphPointsLen;

var featureCount;
var selectedPoint;

//always in the form
//[0] = Bias
//[1] = Feature (m) weight
var model;
var modelActive;

//initializes values of the graph
function graphInit()
{
	graphPoints = [];
	graphPointsLen = 0;
	
	featureCount = 1;
	selectedPoint = -1;
	
	modelActive = false;
}

//adds a point to the graph data
function placeGraphPoint(x, y)
{
	graphPoints[graphPointsLen] = [];
	graphPoints[graphPointsLen][graphXAxis] = x;
	graphPoints[graphPointsLen][graphYAxis] = y;
	graphPointsLen++;
}

function addToSelectedGraphPoint(x, y)
{
	if (graphPoints[selectedPoint][graphXAxis] === undefined)
	{
		graphPoints[selectedPoint][graphXAxis] = x;
	}
	
	if (graphPoints[selectedPoint][graphYAxis] === undefined)
	{
		graphPoints[selectedPoint][graphYAxis] = y;
	}
}

//resets graph data
function clearGraph()
{
	graphInit();
	drawAllPointsOnGraph();
}

function changeSelectedPoint(index)
{
	if (index >= 0 && index < graphPointsLen && index == Math.floor(index))
	{
		selectedPoint = index;
	}
	else
	{
		selectedPoint = -1;
	}
	
	drawAllPointsOnGraph();
	highlightSelected();
}

function activateModel()
{
	//initialize the model with a bias of 0 and all weights set to 1
	//seems like as good a default as any
	model = [0];
	
	for (var i = 0; i < featureCount; i++)
	{
		model[i + 1] = 1.0;
	}
}
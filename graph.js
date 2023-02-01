"use strict"

//an array of graph points
//always in the form
//[n][0] = Label
//[n][m] = Feature (m)
var graphPoints;
var graphPointsLen;

var featureCount;

//always in the form
//[0] = Bias
//[1] = Feature (m) weight
var model;

//initializes values of the graph
function graphInit()
{
	graphPoints = [[0, 1.0, 1.0, 1.0]];
	graphPointsLen = 1;
	
	featureCount = 3;
}

//adds a point to the graph data
function placeGraphPoint(x, y)
{
	graphPoints[graphPointsLen] = [];
	graphPoints[graphPointsLen][graphXAxis] = x;
	graphPoints[graphPointsLen][graphYAxis] = y;
	graphPointsLen++;
}

//resets graph data
function clearGraph()
{
	graphInit();
	drawAllPointsOnGraph();
}
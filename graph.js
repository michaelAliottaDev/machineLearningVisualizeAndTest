"use strict"

//an array of graph points
//always in the form
//[n][0] = Label
//[n][m] = Feature (m - 1)
var graphPoints;
var graphPointsLen;

var featureCount;

//always in the form
//[0] = Bias
//[1] = Feature (m - 1) weight
var model;

function graphInit()
{
	graphPoints = [];
	graphPointsLen = 0;
	
	featureCount = 1;
}

function placeGraphPoint(x, y)
{
	graphPoints[graphPointsLen] = [];
	graphPoints[graphPointsLen][graphXAxis] = x;
	graphPoints[graphPointsLen][graphYAxis] = y;
	graphPointsLen++;
}

function clearGraph()
{
	graphPoints = [];
	graphPointsLen = 0;
	drawAllPointsOnGraph();
}
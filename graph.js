"use strict"

//an array of graph points
//always in the form
//[n][0] = Feature 0 value (X Coordinate) 
//[n][1] = Feature 1 value (Y Coordinate)
//[n][2] = Label
var graphPoints;
var graphPointsLen;

//[n][0] = Bias
//[n][m] = Feature (m - 1) Weight
var graphFunction;

function graphInit()
{
	graphPoints = [];
	graphPointsLen = 0;
	graphFunction = [0.0, 1.0, 1.0];
}

function placeGraphPoint(x, y)
{
	graphPoints[graphPointsLen] = [x, y, selectedLabel];
	graphPointsLen++;
}

function clearGraph()
{
	graphPoints = [];
	graphPointsLen = 0;
	drawAllPointsOnGraph();
}
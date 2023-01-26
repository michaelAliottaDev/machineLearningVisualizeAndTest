"use strict"

window.onload = init;

//canvas specifically for the graph points (so they can be cleared without also redrawing the graph background)
var pointsCanvas;
var pointsCtx;

//canvas specifically for the model (so it can be overlaid over the graph)
var modelCanvas;
var modelCtx;

//canvas specifically for console response text
var consoleCanvas;
var consoleCtx;

//"background" canvas
var canvas;
var ctx;

function init()
{
	canvas = document.querySelector('#baseCanvas');
	ctx = baseCanvas.getContext('2d');
	
	pointsCanvas = document.querySelector('#graphPointsCanvas');
	pointsCtx = pointsCanvas.getContext('2d');
	
	modelCanvas = document.querySelector('#graphModelCanvas');
	modelCtx = modelCanvas.getContext('2d');
	
	consoleCanvas = document.querySelector('#lineRespCanvas');
	consoleCtx = consoleCanvas.getContext('2d');
	
	graphInit();
	displayInit();
	inputInit();
	saveLoadInit();
	commandLineInit();
}
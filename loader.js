"use strict"

window.onload = init;

var pointsCanvas;
var pointsCtx;

var modelCanvas;
var modelCtx;

var consoleCanvas;
var consoleCtx;

var canvas;
var ctx;

var saveLoadIcons;

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
	
	saveLoadIcons = document.getElementById("saveLoadIcons");
	
	graphInit();
	displayInit();
	inputInit();
	saveLoadInit();
	commandLineInit();
}
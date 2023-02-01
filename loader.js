"use strict"

window.onload = init;

//canvas specifically for console response text
var consoleCanvas;
var consoleCtx;

function init()
{
	consoleCanvas = document.querySelector('#lineRespCanvas');
	consoleCtx = consoleCanvas.getContext('2d');
	
	graphInit();
	displayInit();
	graphDisplayInit();
	inputInit();
	saveLoadInit();
	commandLineInit();
}
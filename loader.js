"use strict"

window.onload = init;

function init()
{
	graphInit();
	displayInit();
	graphDisplayInit();
	dataGridDisplayInit();
	inputInit();
	saveLoadInit();
	commandLineInit();
	
	switchToGraphDisplay();
}
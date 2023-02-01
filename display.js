"use strict"

//===FORMATTING VALUES===
//size of secondary display elements
var secDispBorder;
var secDispSize;
var secDispTextSize;
var secDispCellHeight;
var secDispCellWidth;
var secDispCellInnerMargin;
var secDispCellDivWidth;
var secDispInnerMargin;
var secDispSelAxisX;
var secDispSelAxisY;
var secDispTitleHeight;

//"background" canvas
var canvas;
var ctx;

var displayContainer;

//set display values and draw display elements
function displayInit()
{
	graphXAxis = 1;
	graphYAxis = 0;
	
	secDispBorder = 2.0;
	secDispSize = 512.0;
	secDispTextSize = 14;
	secDispCellHeight = 20;
	secDispCellWidth = 90;
	secDispCellInnerMargin = 2.0;
	secDispCellDivWidth = 2.0;
	secDispInnerMargin = 5.0;
	secDispSelAxisX = 0;
	secDispSelAxisY = 0;
	secDispTitleHeight = 20.0;
	
	displayContainer = document.querySelector('#displayContainer');
}

//===helper functions===
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
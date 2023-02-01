"use strict"

//===FORMATTING VALUES===
//"background" canvas
var canvas;
var ctx;

var displayContainer;

var displayMode;

//set display values and draw display elements
function displayInit()
{
	canvas = document.querySelector('#baseCanvas');
	ctx = baseCanvas.getContext('2d');
	
	displayContainer = document.querySelector('#displayContainer');
	displayMode = 0;
}

function switchDisplayTo(index)
{
	displayMode = index;
	
	if (index != 1)
	{
		pointsCanvas.width	= 0;
		pointsCanvas.height	= 0;
		modelCanvas.width	= 0;
		modelCanvas.height	= 0;
	}
	
	switch (index)
	{
		case 0:
			switchToGraphDisplay();
			break;
		case 1:
			switchToDataGridDisplay();
			break;
	}
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
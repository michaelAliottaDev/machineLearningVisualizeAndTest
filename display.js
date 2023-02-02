"use strict"

//===FORMATTING VALUES===
var canvasGallery;

var displayContainer;

var displayMode;
var modes;

//set display values and draw display elements
function displayInit()
{
	canvasGallery = [];
	modes = 2;
	
	displayContainer = document.querySelector('#displayContainer');
	displayMode = 0;
	
	for (var i = 0; i < modes; i++)
	{
		canvasGallery[i] = [];
	}
}

function switchDisplayTo(index)
{
	for (var i = 0; i < canvasGallery[displayMode].length; i++)
	{
		canvasGallery[displayMode][i].style.visibility = "hidden";
	}
	
	displayMode = index;
	
	for (var i = 0; i < canvasGallery[displayMode].length; i++)
	{
		canvasGallery[displayMode][i].style.visibility = "visible";
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
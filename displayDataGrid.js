"use strict"
//===CANVASES===
//"background" canvas
var dataGridBkgrnCanvas;
var dataGridBkgrnCtx;

var dataGridValuesCanvas;
var dataGridValuesCtx;

var dataGridHiLightCanvas;
var dataGridHiLightCtx;

//===FORMATTING VALUES===
//colors of data grid elements
var dataGridBorderCol;
var dataGridCol;
var dataGridLineCol;
var dataGridTextCol;
var dataGridSelCol;

//size of data grid elements
var dataGridBorder;
var dataGridTextSize;
var dataGridCellHeight;
var dataGridCellWidth;
var dataGridCellInnerMargin;
var dataGridCellDivWidth;
var dataGridIndexCellWidth;
var dataGridInnerMargin;
var dataGridSelAxisX;
var dataGridSelAxisY;
var dataGridTitleHeight;
var dataGridWidth;
var dataGridHeight;

var dataGridStrRow;
var dataGridStrCol;

//set display values of the data grid
function dataGridDisplayInit()
{
	dataGridBkgrnCanvas = document.querySelector('#dataGridBkgrnCanvas');
	canvasGallery[1][0] = dataGridBkgrnCanvas;
	dataGridBkgrnCtx = dataGridBkgrnCanvas.getContext('2d');
	
	dataGridHiLightCanvas = document.querySelector('#dataGridHiLightCanvas');
	canvasGallery[1][1] = dataGridHiLightCanvas;
	dataGridHiLightCtx = dataGridHiLightCanvas.getContext('2d');
	
	dataGridValuesCanvas = document.querySelector('#dataGridValuesCanvas');
	canvasGallery[1][2] = dataGridValuesCanvas;
	dataGridValuesCtx = dataGridValuesCanvas.getContext('2d');
	
	dataGridBorderCol = "#dbdbdb";
	dataGridLineCol = "#dbdbdb";
	dataGridCol = "#ffffff";
	dataGridTextCol = "#000000";
	dataGridSelCol = "#80ff80";
	
	dataGridBorder = 2.0;
	dataGridTextSize = 14;
	dataGridCellHeight = 20;
	dataGridCellWidth = 90;
	dataGridIndexCellWidth = 20;
	dataGridCellInnerMargin = 2.0;
	dataGridCellDivWidth = 2.0;
	dataGridInnerMargin = 5.0;
	dataGridSelAxisX = 0;
	dataGridSelAxisY = 0;
	dataGridTitleHeight = 20.0;
	
	dataGridWidth = dataGridCellInnerMargin * 22 + dataGridIndexCellWidth + dataGridCellWidth * 10 + dataGridCellDivWidth * 9;
	dataGridHeight = dataGridCellInnerMargin * 40 + dataGridCellHeight * 20 + dataGridCellDivWidth * 19;
	
	dataGridStrRow = 0;
	dataGridStrCol = 0;
}

function switchToDataGridDisplay()
{
	dataGridBkgrnCanvas.width		= dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridWidth;
	dataGridBkgrnCanvas.height		= dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridHeight;
	dataGridValuesCanvas.width		= dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridWidth;
	dataGridValuesCanvas.height		= dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridHeight;
	dataGridHiLightCanvas.width		= dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridWidth;
	dataGridHiLightCanvas.height	= dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridHeight;
	displayContainer.style.width	= (dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridWidth) + "px";
	displayContainer.style.height	= (dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridHeight) + "px";
	//commandLineInput.style.width	= (dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridWidth) + "px";
	//commandLineOutput.style.width	= (dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridWidth) + "px";
	
	drawDataGrid();
	highlightSelected();
}

function highlightSelected()
{
	dataGridHiLightCtx.clearRect(0, 0, dataGridHiLightCanvas.width, dataGridHiLightCanvas.height);
	
	if (
		selectedPoint >= 0 &&
		selectedPoint >= dataGridStrRow && 
		selectedPoint < graphPointsLen && 
		selectedPoint < dataGridStrRow + 20
	)
	{
		dataGridHiLightCtx.fillStyle = dataGridSelCol;
		
		fillRect(
			dataGridHiLightCtx, 
			dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin, 
			dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridCellHeight + dataGridCellDivWidth +
				(selectedPoint - dataGridStrRow) * (dataGridCellHeight + dataGridCellInnerMargin * 2 + dataGridCellDivWidth), 
			dataGridWidth - dataGridCellInnerMargin * 2,
			dataGridCellHeight
		);
	}
}

function drawDataGrid()
{
	dataGridBkgrnCtx.clearRect(0, 0, dataGridBkgrnCanvas.width, dataGridBkgrnCanvas.height);
	dataGridValuesCtx.clearRect(0, 0, dataGridValuesCanvas.width, dataGridValuesCanvas.height);
	
	dataGridBkgrnCtx.fillStyle = dataGridBorderCol;
	fillRect(
		dataGridBkgrnCtx, 
		0, 
		0, 
		dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridWidth,
		dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridHeight
	);
	
	dataGridBkgrnCtx.fillStyle = dataGridCol;
	fillRect(
		dataGridBkgrnCtx, 
		dataGridBorder, 
		dataGridBorder, 
		dataGridInnerMargin * 2 + dataGridWidth,
		dataGridInnerMargin * 2 + dataGridHeight
	);
	
	//vertical lines
	dataGridValuesCtx.fillStyle = dataGridLineCol;
	fillRect(
		dataGridValuesCtx, 
		dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 2 + dataGridIndexCellWidth, 
		dataGridBorder + dataGridInnerMargin, 
		dataGridCellDivWidth,
		dataGridHeight
	);
	
	for (var i = 0; i + dataGridStrCol < featureCount && i < 9; i++)
	{
		fillRect(
			dataGridValuesCtx, 
			dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 4 + dataGridIndexCellWidth + dataGridCellWidth + dataGridCellDivWidth + 
				i * (dataGridCellInnerMargin * 2 + dataGridCellWidth + dataGridCellDivWidth),
			dataGridBorder + dataGridInnerMargin, 
			dataGridCellDivWidth,
			dataGridHeight
		);
	}
	
	//horizontal lines
	for (var i = 0; i + dataGridStrRow < graphPointsLen && i < 19; i++)
	{
		fillRect(
			dataGridValuesCtx,  
			dataGridBorder + dataGridInnerMargin,
			dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 2 + dataGridCellHeight + 
				i * (dataGridCellInnerMargin * 2 + dataGridCellHeight + dataGridCellDivWidth),
			dataGridWidth,
			dataGridCellDivWidth
		);
	}
	
	//Index Labels
	dataGridValuesCtx.fillStyle = dataGridTextCol;
	dataGridValuesCtx.font= dataGridTextSize + "px Arial";
	dataGridValuesCtx.textAlign = "center";
	
	dataGridValuesCtx.fillText(
		"#",
		dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin + dataGridIndexCellWidth / 2, 
		dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin + dataGridCellHeight / 2 + dataGridTextSize / 3
	);
	
	for (var i = 0; i + dataGridStrRow < graphPointsLen && i < 20; i++)
	{
		dataGridValuesCtx.fillText(
			(i + 1 + dataGridStrCol) + "",
			dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin + dataGridIndexCellWidth / 2,
			dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridCellHeight * (3 / 2) + dataGridCellDivWidth + dataGridTextSize / 3 +
				i * (dataGridCellInnerMargin * 2 + dataGridCellHeight + dataGridCellDivWidth)
		);
	}
	
	//Column Labels
	for (var i = 0; i + dataGridStrCol < featureCount + 1 && i < 10; i++)
	{
		if (i + dataGridStrCol == 0)
		{
			dataGridValuesCtx.fillText(
				"Label",
				dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridIndexCellWidth + dataGridCellDivWidth + dataGridCellWidth / 2 + 
					i * (dataGridCellInnerMargin * 2 + dataGridCellWidth + dataGridCellDivWidth),
				dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin + dataGridCellHeight / 2 + dataGridTextSize / 3
			);
		}
		else
		{
			dataGridValuesCtx.fillText(
				"Feature " + (i + dataGridStrCol),
				dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridIndexCellWidth + dataGridCellDivWidth + dataGridCellWidth / 2 + 
					i * (dataGridCellInnerMargin * 2 + dataGridCellWidth + dataGridCellDivWidth),
				dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin + dataGridCellHeight / 2 + dataGridTextSize / 3
			);
		}
	}
	
	//Values
	for (var i = 0; i + dataGridStrRow < graphPointsLen && i < 20; i++)
	{
		for (var j = 0; j + dataGridStrCol < featureCount + 1 && j < 10; j++)
		{
			if (graphPoints[i + dataGridStrRow][j + dataGridStrCol] !== undefined)
			{
				dataGridValuesCtx.fillText(
					graphPoints[i + dataGridStrRow][j + dataGridStrCol] + "",
					dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridIndexCellWidth + dataGridCellDivWidth + dataGridCellWidth / 2 + 
						j * (dataGridCellInnerMargin * 2 + dataGridCellWidth + dataGridCellDivWidth),
					dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridCellHeight * (3 / 2) + dataGridCellDivWidth + dataGridTextSize / 3 +
						i * (dataGridCellInnerMargin * 2 + dataGridCellHeight + dataGridCellDivWidth)
				);
			}
			else
			{
				dataGridValuesCtx.fillText(
					"--",
					dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridIndexCellWidth + dataGridCellDivWidth + dataGridCellWidth / 2 + 
						j * (dataGridCellInnerMargin * 2 + dataGridCellWidth + dataGridCellDivWidth),
					dataGridBorder + dataGridInnerMargin + dataGridCellInnerMargin * 3 + dataGridCellHeight * (3 / 2) + dataGridCellDivWidth + dataGridTextSize / 3 +
						i * (dataGridCellInnerMargin * 2 + dataGridCellHeight + dataGridCellDivWidth)
				);
			}
		}
	}
}
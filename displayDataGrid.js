"use strict"
//colors of data grid elements
var dataGridBorderCol;
var dataGridCol;
var dataGridLineCol;
var dataGridTextCol;

//size of data grid elements
var dataGridBorder;
var dataGridSize;
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

//set display values of the data grid
function dataGridDisplayInit()
{
	dataGridBorderCol = "#dbdbdb";
	dataGridLineCol = "#dbdbdb";
	dataGridCol = "#ffffff";
	dataGridTextCol = "#000000"
	
	dataGridBorder = 2.0;
	dataGridSize = 512.0;
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
}

function switchToDataGridDisplay()
{
	drawDataGrid();
}

function drawDataGrid()
{
	ctx.fillStyle = dataGridBorderCol;
	fillRect(
		ctx, 
		0, 
		0, 
		dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridSize,
		dataGridBorder * 2 + dataGridInnerMargin * 2 + dataGridSize
	);
	
	ctx.fillStyle = dataGridCol;
	fillRect(
		ctx, 
		dataGridBorder, 
		dataGridBorder, 
		dataGridInnerMargin * 2 + dataGridSize,
		dataGridInnerMargin * 2 + dataGridSize
	);
}
"use strict"

function onlyFullPoints()
{
	var properPoints = [];
	var properPointsLen = 0;
	
	var eligible;
	
	//sets properPoints to a list of points (from graphPoints) but only the ones with each label/features defined
	//also sets properPointsLen to the length of properPoints
	for (var i = 0; i < graphPointsLen; i++)
	{
		eligible = true;
		
		for (var j = 0; j < featureCount + 1 && eligible; j++)
		{
			if (graphPoints[i][j] === undefined)
			{
				eligible = false;
			}
		}
		
		if (eligible)
		{	
			properPoints[properPointsLen] = [];
			
			for (var j = 0; j <= featureCount && eligible; j++)
			{
				properPoints[properPointsLen][j] = graphPoints[i][j];
			}
			
			properPointsLen++;
		}
	}
	
	return properPoints;
}

function calcApplyGradientToModel()
{
	//<new model> = <old model> - (<learning rate> / <number of examples>) * (<transpose feature matrix> * (<feature matrix> * <old model> - <labels>))
	
	//gets only examples with label and all features defined
	//(the program might be storing examples with empty values)
	var properPoints = onlyFullPoints();
	var properPointsLen = properPoints.length;
	
	//matrix with each 1 as the first value then all the features for each example
	var aX = [];
	//vector of labels for each example
	var aY = [];
	
	//will be = (<learning rate> / <number of examples>) * (<transpose feature matrix> * (<feature matrix> * <old model> - <labels>))
	//or the value we modify the matrix by
	var modelModifer = [];
	//a temporary value we use to calculate modelModifer
	var tempVector = [];
	
	//I just picked a dummy value
	var learningRate = 1.0;
	
	//setting values of aX and aY
	for (var i = 0; i < properPointsLen; i++)
	{
		aY[i] = properPoints[i][0];
		
		aX[i] = [1];
		
		for (var j = 1; j < featureCount + 1; j++)
		{
			aX[i][j] = properPoints[i][j];
		}
	}
	
	//setting tempVector to <feature matrix> * <old model> - <labels>
	for (var i = 0; i < properPointsLen; i++)
	{
		tempVector[i] = 0;
		
		for (var j = 0; j < featureCount + 1; j++)
		{
			tempVector[i] += aX[i][j] * model[j];
		}
		
		tempVector[i] -= aY[i];
	}
	
	//setting modelModifer to <transpose feature matrix> * tempVector
	//then multiplying each value of modelModifer by <learning rate> / <number of examples>
	for (var i = 0; i < featureCount + 1; i++)
	{
		modelModifer[i] = 0;
		
		for (var j = 0; j < properPointsLen; j++)
		{
			modelModifer[i] += aX[j][i] * tempVector[j];
		}
		
		modelModifer[i] *= learningRate / properPointsLen;
	}
	
	//subtracting modelModifer from model to set model to the new model value
	for (var i = 0; i < featureCount + 1; i++)
	{
		model[i] -= modelModifer[i];
	}
}
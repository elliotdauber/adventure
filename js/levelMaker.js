// var template = 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

// var templateLarge = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

// var templateExtraLarge = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

var templateExtraLarge = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

var reachabilityTest = [1,1,1,1,1,1,1,1,1,1,1,1,1,40,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1,0,50,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,43,53,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,51,41,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,52,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,42,1,1,1,1,1,1,1,1,1,1,1];

var randomLevelsArray = [];

const HORIZANTAL = 0;
const VERTICAL = 1;

const NEGATIVE = 0;
const POSITIVE = 1;

const TEMPLATE_COLS = 16;
const TEMPLATE_ROWS = 12;

const LARGE_TEMPLATE_COLS = 24;
const LARGE_TEMPLATE_ROWS = 18;

const EXTRA_LARGE_TEMPLATE_COLS = 50;//30;
const EXTRA_LARGE_TEMPLATE_ROWS = 32;//18;

function randomInt(min, max) {
	var random = Math.random();
	var num = random*(max+1-min)+min;
	return Math.floor(num);
}

function levelMaker(template, cols, rows) {
	this.grid = template.slice();
	this.cols = cols;
	this.rows = rows;
	this.walls = [];
	this.numDoors = 0;

	this.hasBoss = false; //used to pipe boss levels into random level grids, usually stays false though
	this.entryQuestPrerequisites = [];

	this.getCols = function() {
		return this.cols;
	}
	this.getRows = function() {
		return this.rows;
	}
	this.getIndex = function(col, row) {
		return row*this.cols + col;
	}
	this.getOriginWall = function() {
		if (!this.walls.length) {
			return null;
		}
		var wallIndex = Math.floor(Math.random()*this.walls.length);
		return this.walls[wallIndex];
	}

	this.drawWallFromEdge = function(side, start, length) {
		var lastIndex;
		for (var i = 1; i < length+1; i++) { //plus one is only to check if we should place door
			var col;
			var row;
			if (side == 0) {
				col = start;
				row = i;
			} else if (side == 1) {
				col = (this.cols-1)-i;
				row = start;
			} else if (side == 2) {
				col = start
				row = (this.rows-1)-i;
			} else if (side == 3) {
				col = i;
				row = start;
			}

			var index = row*this.cols + col;
			// var checkIndexPos;
			// var checkIndexNeg;
			// if (side == 0 || side == 2) {
			// 	checkIndexNeg = index-1;
			// 	checkIndexPos = index+1;
			// } else {
			// 	checkIndexNeg = index-(row*this.cols);
			// 	checkIndexPos = index+(row*this.cols);
			// }

			// if (this.grid[checkIndexNeg] == TRACK_WALL) {
			// 	this.grid[checkIndexNeg] = TRACK_DOOR;
			// }
			// if (this.grid[checkIndexPos] == TRACK_WALL) {
			// 	this.grid[checkIndexNeg] = TRACK_DOOR;
			// }

			if (i == length-1) {
				lastIndex = index;
			}
			if (i == length) {
				if (this.grid[index] == TRACK_WALL && this.isCorridor(index)) {
					// console.log("adding door");
					this.grid[lastIndex] = TRACK_DOOR;
					this.numDoors++;
				}
				break;
			} 
			this.grid[index] = TRACK_WALL;
		}
	}

	this.drawWallFromWall = function(wall) {
		var lastIndex;
		for (var i = 1; i < wall.length+1; i++) { //plus one is only to check if we should place door
			var col;
			var row;
			var gridStart = wall.gridStart;
			if (wall.orientation == VERTICAL) {
				col = wall.start;
				if (wall.direction == POSITIVE) {
					row = gridStart + i;
				} else {
					row = gridStart - i;
				}
			} else if (wall.orientation == HORIZANTAL) {
				row = wall.start;
				if (wall.direction == POSITIVE) {
					col = gridStart + i;
				} else {
					col = gridStart - i;
				}
			} 
			//var index = this.getIndex(col, row);
			var index = row*this.cols + col;
			if (i == wall.length-1) {
				lastIndex = index;
			}
			if (i == wall.length) {
				if (this.grid[index] == TRACK_WALL && this.isCorridor(index)) {
					// console.log("adding door");
					this.grid[lastIndex] = TRACK_DOOR;
					this.numDoors++;
				}
				break;
			} 
			this.grid[index] = TRACK_WALL;
			if (i == 1) {
			}
		}
	}

	this.isLegalWallFromEdge = function(side, start, length) {
		for (var i = 1; i < length; i++) {
			var col;
			var row;
			if (side == 0) {
				col = start;
				row = i;
			} else if (side == 1) {
				col = (this.cols-1)-i;
				row = start;
			} else if (side == 2) {
				col = start
				row = (this.rows-1)-i;
			} else if (side == 3) {
				col = i;
				row = start;
			}
			//var index = this.getIndex(col, row);
			var index = row*this.cols + col;

			if (this.grid[index] != TRACK_ROAD) {
				return false;
			}
		}
		return true;
	}

	this.isLegalWallFromWall = function(newWall, fromWall, newWallDirection, newWallLength, start) {
		var fromWallOrientation = fromWall.orientation;
		start = Math.floor(start);
		for (var i = 1; i < newWallLength; i++) {
			var col;
			var row;
			if (fromWallOrientation == HORIZANTAL && newWallDirection == POSITIVE) {
				row = fromWall.start + i;
				col = start;
			} else if (fromWallOrientation == HORIZANTAL && newWallDirection == NEGATIVE) {
				row = fromWall.start - i;
				col = start;
			} else if (fromWallOrientation == VERTICAL && newWallDirection == POSITIVE) {
				row = start
				col = fromWall.start + i
			} else if (fromWallOrientation == VERTICAL && newWallDirection == NEGATIVE) {
				row = start
				col = fromWall.start - i;
			}
			var index = row*this.cols + col;

			if (this.grid[index] != TRACK_ROAD) {
				return false;
			}
		}
		return true;
	}

	this.addElement = function(picCode, num, canPlaceCorridor) {
		for (var i = 0; i < num; i++) {
			while (true) {
				var randomIndex = Math.random()*this.cols*this.rows;
				randomIndex = Math.floor(randomIndex);
				if (this.grid[randomIndex] == TRACK_ROAD) {
					if (!canPlaceCorridor && (this.isCorridor(randomIndex) || this.isCorridor(this.indexNorth(randomIndex)) 
						|| this.isCorridor(this.indexEast(randomIndex)) || this.isCorridor(this.indexSouth(randomIndex)) 
						|| this.isCorridor(this.indexWest(randomIndex)))) {
							continue;
					}
					this.grid[randomIndex] = picCode;
					break;
				}
			}
		}
	}

	this.isDoorInCorridorRow = function(index) {
		var indexLeft = index;
		var indexRight = index;
		while (this.grid[indexLeft] != TRACK_WALL) {
			if (this.grid[indexLeft] == TRACK_DOOR) {
				return true;
			}
			indexLeft--;
		}
		while (this.grid[indexRight] != TRACK_WALL) {
			if (this.grid[indexRight] == TRACK_DOOR) {
				return true;
			}
			indexRight++;
		}
		return false;
	}

	this.isCorridor = function(index) {
		var north = index-this.cols;
		var south = index+this.cols;
		var east = index-1;
		var west = index+1;
		var northWall = this.grid[north] == TRACK_WALL
		var southWall = this.grid[south] == TRACK_WALL
		var eastWall = this.grid[east] == TRACK_WALL
		var westWall = this.grid[west] == TRACK_WALL
		if (northWall && southWall && !eastWall && !westWall) {
			return true;
		}
		if (eastWall && westWall && !northWall && !southWall) {
			return true;
		}
		return false;
	}

	this.addCorridoors = function(maxDoors) { //works, but could be a lot better
		var newDoorCounter = 0;
		for (var col = 1; col < this.cols-1; col++) {
			var indexes = [];
			var doorExists = false;
			for (var row = 1; row < this.rows-1; row++) {
				var index = this.getIndex(col, row)
				if (this.grid[index] == TRACK_ROAD && this.isCorridor(index) && !this.isDoorInCorridorRow(index)) {
					indexes.push(index);
				}
				if (this.grid[index] == TRACK_DOOR) {
					doorExists = true;
				}
			}
			if (!doorExists && indexes.length > 0) {
				var randomNum = Math.floor(Math.random()*indexes.length);
				var randomIndex = indexes[randomNum];
				this.grid[randomIndex] = TRACK_DOOR;
				this.numDoors++;
				newDoorCounter++;
				if (newDoorCounter == maxDoors) {
					return;
				}
			}
		}
	}

	function countNulls(array) {
		var counter = 0;
		for (var i = 0; i < array.length; i++) {
			if (array[i] == null) {
				counter++;
			}
		}
		return counter;
	}

	this.makeLevel = function() {
		var savedGrid = this.grid.slice();
		var gridIsValid = false;
		var northIndex = this.grid.indexOf(NORTH);
		var southIndex = this.grid.indexOf(SOUTH);
		var eastIndex = this.grid.indexOf(EAST);
		var westIndex = this.grid.indexOf(WEST);
		while (!gridIsValid) {
			this.walls = [];
			for (var i = 0; i < randomInt(16, 22); i++) { //comment out to test for exits (if using premade level)
				//console.log("working");
				var newWall = new Wall(this);
				newWall.build();
				this.walls.push(newWall);
			}

			var shopTypes = [SHOP, BLACKSMITH, ARMORER, GEMSMITH, FARMER];
			var randomShop = randomInt(0, 4);
			var shopType = shopTypes[randomShop];
			this.addElement(TELEPORT, 1, false);
			this.addElement(DECOR, randomInt(6, 12), false);
			this.addElement(shopType, 1, false);
			this.addElement(CHEST, randomInt(0, 2), false);

			var numNorthReached;
			var numSouthReached;
			var numEastReached;
			var numWestReached;
			if (northIndex != -1) {
				numNorthReached = this.findReachableExits(this.indexSouth(northIndex), 0, []);
			}
			if (southIndex != -1) {
				numSouthReached = this.findReachableExits(this.indexNorth(southIndex), 0, []);
			}
			if (eastIndex != -1) {
				numEastReached = this.findReachableExits(this.indexWest(eastIndex), 0, []);
			}
			if (westIndex != -1) {
				numWestReached = this.findReachableExits(this.indexEast(westIndex), 0, []);
			}
			var minExitsReached = 2;
			var output = [numNorthReached, numSouthReached, numEastReached, numWestReached]
			if (countNulls(output) > output.length-minExitsReached) {
				minExitsReached = 1; //maybe change this
			}
			var numInvalid = 0;
			for (var i = 0; i < output.length; i++) {
				if (output[i] != null && output[i] < minExitsReached) {
					numInvalid++;
				}
			}

			var opaqueTiles = [TRACK_WALL, TELEPORT, DECOR, shopType, CHEST];
			var foundInvalid = false;
			if (!(northIndex == -1 && southIndex == -1 && eastIndex == -1 && westIndex == -1)) { //this if statement is mostly for gridMaker, as theres no exits in the random levels
				for (var i = 1; i < 8; i++) {
					for (var j = 1; j < 8; j++) {
						var index = Math.round(this.getIndex(i*this.cols/8, j*this.rows/8));
						if (opaqueTiles.indexOf(this.grid[index]) == -1 && this.findReachableExits(index, 0, []) < 1) {
							foundInvalid = true;
							break;
						}
					}
					if (foundInvalid) {
						break;
					}
				}
			}

			if (numInvalid == 0 && !foundInvalid) {
				gridIsValid = true;
			} else {
				this.grid = savedGrid.slice();
			}
		}

		//put "opaque" tiles above!!!
		var pinkPortal = randomInt(0,1);
		var greenPortal = randomInt(0,1);
		this.addCorridoors(this.cols-2);
		this.addElement(SPIKES_IN, randomInt(3, 7), true);
		this.addElement(SPIKES_OUT, randomInt(3, 7), true);
		this.addElement(TRACK_KEY, this.numDoors-1, true); //maybe remove +2 when creating doors is fixed
		this.addElement(APPLE, randomInt(1, 4), true);
		this.addElement(GRAPES, randomInt(1, 3), true);
		this.addElement(GHOST_START, randomInt(3, 8), true);
		this.addElement(ZOMBIE_START, randomInt(3, 8), true);
		this.addElement(SPIDER_START, randomInt(3, 8), true);
		this.addElement(LEVEL_UP, randomInt(0, 1), true);
		this.addElement(PORTAL_IN, pinkPortal*2, true);
		this.addElement(GREEN_PORTAL_IN, greenPortal*2, true);
	}

	this.link = function(directionConstant, index, spawnConstant, spawnIndex) {
		this.grid[index] = directionConstant;
		this.grid[spawnIndex] = spawnConstant;
	}

	this.findReachableExits = function(index, numReached, visited) {
		//idea: if you cant reach more than 50 or 60 percent, you fail
		var tileHere = this.grid[index];
		var passableTiles = [TRACK_ROAD, TRACK_DOOR, SPAWN_NORTH, SPAWN_EAST, SPAWN_WEST, SPAWN_SOUTH];
		if (passableTiles.indexOf(tileHere) == -1) {
			if (tileHere == NORTH || tileHere == SOUTH || tileHere == EAST || tileHere == WEST) {
				numReached++;
			}
			return numReached;
		}
		if (visited.indexOf(index) == -1) {
			visited.push(index);
		} else {
			return numReached;
		}
		var indexNorth = this.indexNorth(index)
		var indexSouth = this.indexSouth(index)
		var indexEast = this.indexEast(index)
		var indexWest = this.indexWest(index)

		numReached += this.findReachableExits(indexNorth, 0, visited);
		numReached += this.findReachableExits(indexSouth, 0, visited);
		numReached += this.findReachableExits(indexEast, 0, visited);
		numReached += this.findReachableExits(indexWest, 0, visited);
		return numReached;
	}


	this.indexSouth = function(index) {
		return index+this.cols;
	}

	this.indexNorth = function(index) {
		return index-this.cols;
	}

	this.indexEast = function(index) {
		return index+1;
	}

	this.indexWest = function(index) {
		return index-1;
	}

	this.findWallInDirection = function(index, directionFunction) {
		while (this.grid[directionFunction.call(this, index)] != TRACK_WALL) {
			index = directionFunction.call(this, index);
		}
		return index;
	}

	this.goUntilWall = function(index, directionFunctionFront, directionFunctionRight, exitIndex) {
		var exitsCounter = 0;
		while (this.grid[directionFunctionFront.call(this, index)] != TRACK_WALL) {
			var side = directionFunctionRight.call(this, index);
			if (this.grid[side] == TRACK_WALL) {
				index = directionFunctionFront.call(this, index);
			} else if (this.grid[side] == exitIndex) {
				exitsCounter++;
				index = directionFunctionFront.call(this, index);
			} else {
				index = side;
			}
		}
		return {
			exitsFound: exitsCounter,
			newIndex: index
		};
	}

	this.howManyExitsReachable = function(startIndex) {
		var exitsCounter = 0;
		var index = this.findWallInDirection(startIndex, this.indexSouth);

		console.log("looking for exits");
		var goEastResult = this.goUntilWall(index, this.indexEast, this.indexSouth, SOUTH);
		index = goEastResult.newIndex;
		exitsCounter += goEastResult.exitsFound;

		var goNorthResult = this.goUntilWall(index, this.indexNorth, this.indexEast, EAST);
		index = goNorthResult.newIndex;
		exitsCounter += goNorthResult.exitsFound;

		var goWestResult = this.goUntilWall(index, this.indexWest, this.indexNorth, NORTH);
		index = goWestResult.newIndex;
		exitsCounter += goWestResult.exitsFound;

		var goSouthResult = this.goUntilWall(index, this.indexSouth, this.indexWest, WEST);
		index = goSouthResult.newIndex;
		exitsCounter += goSouthResult.exitsFound;
		console.log("EXITS FOUND: "+exitsCounter);
		return exitsCounter;
	}

	// this.howManyExitsReachable = function(startIndex) {
	// 	var exitsCounter = 0;
	// 	var turnsMade = 0;
	// 	var start = this.findWallInDirection(startIndex, this.indexSouth);
	// 	var index = start;
	// 	while (index != start && turnsMade > 0) { //fix this condition
	// 		return true;
	// 	}
	// }

	// this.newDoorForReachability = function(index) {
	// 	var guess1;
	// 	var guess2;
	// 	if (index >= this.grid.length / 2) { //vertical
	// 		guess1 = this.findWallInDirection(index, this.indexNorth)-this.cols;
	// 	} else {
	// 		guess1 = this.findWallInDirection(index, this.indexSouth)+this.cols;
	// 	}

	// 	var col = index%this.cols;
	// 	if (col >= this.cols / 2) { //horizantal
	// 		guess2 = this.findWallInDirection(index, this.indexWest)-1;
	// 	} else {
	// 		guess2 = this.findWallInDirection(index, this.indexEast)+1;
	// 	}

	// 	if (Math.random() < 0.5) {
	// 		return guess1;
	// 	}
	// 	return guess2;
	// }

	// this.isIndexOnEdge = function(index) {
	// 	var row = Math.floor(index/this.cols);
	// 	var col = index % this.cols;
	// 	if (row == 0 || row == this.rows-1 || col == 0 || col == this.cols-1) {
	// 		return true;
	// 	}
	// 	return false;
	// }

	// this.testForExits = function(numExits) {
	// 	console.log(this.grid);
	// 	var completedIndexes = [];

	// 	for (var index = 0; index < this.grid.length; index++) {
	// 		console.log("trying index "+index);
	// 		var newDoorIndex = null;
	// 		if (this.grid[index] != TRACK_ROAD && this.grid[index] != TRACK_DOOR) {
	// 			continue;
	// 		}
	// 		while (this.howManyExitsReachable(index) < numExits) {
	// 			console.log("while loop");
	// 			if (newDoorIndex) {
	// 				//this.grid[newDoorIndex] = TRACK_WALL;
	// 				//this.numDoors--;
	// 				console.log("door didn't work");
	// 			}
	// 			newDoorIndex = this.newDoorForReachability(index);
	// 			this.grid[newDoorIndex] = TRACK_DOOR;
	// 			this.numDoors++;
	// 			console.log("adding door, trying...")
	// 		}
	// 	}
	// }
}






function Wall(levelMaker) {
	this.levelMaker = levelMaker;
	var cols = this.levelMaker.getCols();
	var rows = this.levelMaker.getRows();

	this.buildFromWall = function() {
		var wall = this.levelMaker.getOriginWall();
		if (wall != null) {
			var newWallDirection;
			var lowerBound = wall.gridStart;
			var upperBound = wall.gridEnd;
			var start = Math.random()*(upperBound-lowerBound)+lowerBound;
			start = Math.floor(start);
			var newWallLength;
			var orientation;
			var gridStart;
			var gridEnd;
			var random = Math.random();
			if (random < 0.5) {
				newWallDirection = NEGATIVE;
			} else {
				newWallDirection = POSITIVE;
			}

			if (wall.orientation == HORIZANTAL) {
				newWallLength = Math.random()*(cols-3-5)+5;
				orientation = VERTICAL;
				if (newWallDirection == NEGATIVE) {
					gridEnd = wall.start;
					gridStart = gridEnd - length+1;
				} else {
					gridStart = wall.start;
					gridEnd = gridStart + length-1;
				}
			} else if (wall.orientation == VERTICAL) {
				newWallLength = Math.random()*(rows-3-5)+5;
				orientation = HORIZANTAL;
				if (newWallDirection == NEGATIVE) {
					gridEnd = wall.start;
					gridStart = gridEnd - length+1;
				} else {
					gridStart = wall.start;
					gridEnd = gridStart + length-1;
				}
			}

			newWallLength = Math.floor(newWallLength);

			if (this.levelMaker.isLegalWallFromWall(this, wall, newWallDirection, newWallLength, start)) {
				this.orientation = orientation;
				this.length = newWallLength;
				this.start = start;
				this.gridStart = gridStart;
				this.gridEnd = gridEnd;
				this.direction = newWallDirection;
				this.levelMaker.drawWallFromWall(this);
				return true;
			}
		}
		return false;
	}

	this.buildFromEdge = function() {
		var side = Math.floor(Math.random()*4);
		var start;
		var length;
		var orientation;
		var gridStart;
		var gridEnd;
		// north:0, east:1, south:2, west:3
		if (side == 0 || side == 2) {
			start = Math.random()*(cols-2)+1;
			length = Math.random()*(rows-3-3)+3;
			orientation = VERTICAL;
			if (side == 0) {
				gridStart = 0;
				gridEnd = gridStart + length-1;
			} else {
				gridEnd = rows - 1;
				gridStart = gridEnd - length+1;
			}
		} else if (side == 1 || side == 3) {
			start = Math.random()*(rows-2)+1;
			length = Math.random()*(cols-3-3)+3;
			orientation = HORIZANTAL;
			if (side == 1) {
				gridEnd = cols - 1;
				gridStart = gridEnd - length+1;
			} else {
				gridStart = 0;
				gridEnd = gridStart + length-1;
			}
		}

		start = Math.floor(start);
		length = Math.floor(length);
		
		if (this.levelMaker.isLegalWallFromEdge(side, start, length)) {
			this.side = side;
			this.start = start;
			this.length = length;
			this.orientation = orientation;
			this.gridStart = gridStart;
			this.gridEnd = gridEnd;
			this.levelMaker.drawWallFromEdge(this.side, this.start, this.length);
			return true;
		}
		return false;
	}

	this.build = function() {
		while (true) {
			var edgeOrWall = Math.random();
			if (edgeOrWall < 0.7) {
				if (this.buildFromWall()) {
					break;
				}
			} else {
				if (this.buildFromEdge()) {
					break;
				}
			}
		}
	}
}

function drawRandomLevel(array) {
	var index = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for (var row = 0; row < TEMPLATE_ROWS; row++) {
		for (var col = 0; col < TEMPLATE_COLS; col++) {
			var tileKindHere = array[index];
			var useImg = trackPics[tileKindHere];
			if (tileHasTransparency(tileKindHere)) {
				ctx.drawImage(trackPics[TRACK_ROAD], drawTileX, drawTileY);
			}
			ctx.drawImage(useImg, drawTileX, drawTileY);
			drawTileX += TRACK_W;
			index++;
		}
		drawTileY += TRACK_H;
		drawTileX = 0; //reset for next row
	}
}

function randomLevelTest() {
	var randomLevel = new levelMaker(template, TEMPLATE_COLS, TEMPLATE_ROWS);
	randomLevel.makeLevel();
	drawRandomLevel(randomLevel.grid);
}

var randomLevelsArray = [];

function randomLevelsArrayTest() {
	makeRandomLevelsArray(9);
	var num = 8;
	randomLevelsArray[num].makeLevel();
	drawRandomLevel(randomLevelsArray[num].grid);
}

function findFreeSpace(gridArray) { //not used
  var coords = {
  	x: 0,
  	y: 0
  }
  while (true) {
    coords.x = randomInt(0, canvas.width);
    coords.y = randomInt(0, canvas.height);
    if (gridArray[getIndexFromXY(coords.x, coords.y)] == TRACK_ROAD) {
      return coords;
    }
  }
}

function createPlayableRandomLevels(numLevels, bossLevel, NPCArray, QuestItemsArray) {
	if (arguments.length > 1) {
		makeRandomLevelsArray(numLevels, bossLevel);
	} else {
		makeRandomLevelsArray(numLevels);
	}
	allLevelsArray = [];
	var startIndex = randomInt(0, numLevels-1);
	var pinkPortalKeyIndex = randomInt(0, numLevels-1);
	var greenPortalKeyIndex = randomInt(0, numLevels-1);
	for (var i = 0; i < NPCArray.length; i++) {
		NPCArray[i].randomLevelNumber = randomInt(0, numLevels-1);
	}
	for (var i = 0; i < QuestItemsArray.length; i++) {
		QuestItemsArray[i].randomLevelNumber = randomInt(0, numLevels-1);
	}

	var levelHereCounter = 0;
	for (var i = 0; i < randomLevelsArray.length; i++) {

		if (randomLevelsArray[i] != null) {
			var randomNPCs = [];
			var randomQuestItems = [];

			if (!randomLevelsArray[i].hasBoss) {
				randomLevelsArray[i].makeLevel();
			}

			if (levelHereCounter == pinkPortalKeyIndex) {
				randomLevelsArray[i].addElement(PORTAL_KEY, 1);
			}
			if (levelHereCounter == greenPortalKeyIndex) {
				randomLevelsArray[i].addElement(GREEN_PORTAL_KEY, 1);
			}

			for (var j = 0; j < NPCArray.length; j++) {
				if (NPCArray[j].randomLevelNumber == levelHereCounter) {
					if (randomLevelsArray[i].hasBoss) {
						if (levelHereCounter == numLevels) {
							var lastLevelIndex = i-1;
							while (!allLevelsArray[lastLevelIndex]) {
								lastLevelIndex--;
							}
							var randomCoords = findFreeSpace(allLevelsArray[lastLevelIndex].mapArray);
							NPCArray[j].x = randomCoords.x;
							NPCArray[j].y = randomCoords.y;
							allLevelsArray[lastLevelIndex].NPCArray.push(NPCArray[j])
						} else {
							NPCArray[j].randomLevelNumber++;
						}
					} else {
						var randomCoords = findFreeSpace(randomLevelsArray[i].grid);
						NPCArray[j].x = randomCoords.x;
						NPCArray[j].y = randomCoords.y;
						randomNPCs.push(NPCArray[j]);
					}
				}
			}

			for (var j = 0; j < QuestItemsArray.length; j++) {
				if (QuestItemsArray[j].randomLevelNumber == levelHereCounter) {
					if (randomLevelsArray[i].hasBoss) {
						if (levelHereCounter == numLevels) {
							var lastLevelIndex = i-1;
							while (!allLevelsArray[lastLevelIndex]) {
								lastLevelIndex--;
							}
							var randomCoords = findFreeSpace(allLevelsArray[lastLevelIndex].mapArray);
							QuestItemsArray[j].x = randomCoords.x;
							QuestItemsArray[j].y = randomCoords.y;
							QuestItemsArray[lastLevelIndex].QuestItemsArray.push(QuestItemsArray[j])
						} else {
							QuestItemsArray[j].randomLevelNumber++;
						}
					} else {
						var randomCoords = findFreeSpace(randomLevelsArray[i].grid);
						QuestItemsArray[j].x = randomCoords.x;
						QuestItemsArray[j].y = randomCoords.y;
						randomQuestItems.push(QuestItemsArray[j]);
					}
				}
			}

			var theme = randomInt(0, 3); //CHANGE IF ADDING MORE THEMES
			var newLevelClass = new levelClass(i)
									.setMapArray(randomLevelsArray[i].grid)
									.setThemeConstant(theme)
									.setNPCArray(randomNPCs)
									.setQuestItemsArray(randomQuestItems)
									.setEntryQuestPrerequisites(randomLevelsArray[i].entryQuestPrerequisites);
			if (randomLevelsArray[i].hasBoss) {
				newLevelClass.setAsBossLevel();
			}
			allLevelsArray.push(newLevelClass);
			if (startIndex == levelHereCounter) {
				if (randomLevelsArray[i].hasBoss) {
					if (levelHereCounter == numLevels) {
						var lastLevelIndex = i-1;
						while (!allLevelsArray[lastLevelIndex]) {
							lastLevelIndex--;
						}
						currentLevel = allLevelsArray[lastLevelIndex]
					} else {
						startIndex++;
					}
				} else {
					currentLevel = newLevelClass;
					spawn = TELEPORT;
				}
			}
			levelHereCounter++;
		} else {
			allLevelsArray.push(null);
		}
	}
	linkLevels(allLevelsArray);
	//randomArea = new areaClass(allLevelsArray, currentLevel, "random", null);
}

function createLinks(level1, level2, direction1To2) {
	//only level 1 can be a boss level!
	var rows = level1.rows;
	var cols = level1.cols;
	var pos;
	var level1Index;
	var level2Index;
	var level1SpawnIndex;
	var level2SpawnIndex;
	var direction1To2Constant;
	var direction2To1Constant;

	var boss = false;
	if (level1.hasBoss) {
		boss = true;
	}

	if (direction1To2 == "north") {
		if (boss) {
			pos = level1.grid.indexOf(NORTH) % cols;
		} else {
			pos = randomInt(2, cols-3);
		}
		level1Index = pos;
		level2Index = cols*(rows-1)+pos;
		level1SpawnIndex = level1Index+cols;
		level2SpawnIndex = level2Index-cols;
		direction1To2Constant = NORTH;
		direction2To1Constant = SOUTH;
	} else if (direction1To2 == "south") { //doesn't get called as of now
		if (boss) {
			pos = level1.grid.indexOf(SOUTH) % cols;
		} else {
			pos = randomInt(2, cols-3);
		}
		level1Index = cols*(rows-1)+pos;
		level2Index = pos;
		level1SpawnIndex = level1Index-cols;
		level2SpawnIndex = level2Index+cols;
		direction1To2Constant = SOUTH;
		direction2To1Constant = NORTH;
	} else if (direction1To2 == "east") {
		if (boss) {
			pos = Math.floor(level1.grid.indexOf(EAST) / cols);
		} else {
			pos = randomInt(2, rows-3);
		}
		level1Index = cols*(pos+1)-1;
		level2Index = cols*pos;
		level1SpawnIndex = level1Index-1;
		level2SpawnIndex = level2Index+1;
		direction1To2Constant = EAST;
		direction2To1Constant = WEST;
	} else if (direction1To2 == "west") { //doesn't get called as of now
		if (boss) {
			pos = Math.floor(level1.grid.indexOf(WEST) / cols);
		} else {
			pos = randomInt(2, rows-3);
		}
		level1Index = cols*pos;
		level2Index = cols*(pos+1)-1;
		level1SpawnIndex = level1Index+1;
		level2SpawnIndex = level2Index-1;
		direction1To2Constant = WEST;
		direction2To1Constant = EAST;
	}

	if (!boss) {
		level1.link(direction1To2Constant, level1Index, direction1To2Constant+10, level1SpawnIndex);
	}
	level2.link(direction2To1Constant, level2Index, direction2To1Constant+10, level2SpawnIndex);
}

function randomizeArray(array, numSwaps) {
	for (var i = 0; i < numSwaps; i++) {
		var index1 = randomInt(0, array.length-1);
		var index2 = randomInt(0, array.length-1);
		var temp = array[index1];
		array[index1] = array[index2];
		array[index2] = temp;
	}
}

function getCallStackSize() {
    var count = 0;
    var fn = arguments.callee;
    while ((fn = fn.caller)) {
        count++;
    }
    return count;
}

function findReachableLevels(index, levelsArray, visited) {
	//needs more work
	var level = levelsArray[index];
	if (visited.indexOf(index) == -1) {
		visited.push(index);
	} else {
		return;
	}
	var indexNorth = index - ALL_LEVELS_COLS;
	var indexSouth = index + ALL_LEVELS_COLS;
	var indexEast = index + 1;
	var indexWest = index - 1;

	if (levelsArray[indexNorth] && level.grid.indexOf(NORTH) != -1) {
		findReachableLevels(indexNorth, levelsArray, visited);
	}
	if (levelsArray[indexSouth] && level.grid.indexOf(SOUTH) != -1) {
		findReachableLevels(indexSouth, levelsArray, visited);
	}
	if (levelsArray[indexEast] && level.grid.indexOf(EAST) != -1) {
		findReachableLevels(indexEast, levelsArray, visited);
	}
	if (levelsArray[indexWest] && level.grid.indexOf(WEST) != -1) {
		findReachableLevels(indexWest, levelsArray, visited);
	}
}

function makeRandomLevelsArray(numLevels, bossLevel) {
	var isMapValid = false
	while (!isMapValid) {
		makeRandomLevelsArrayHelper(numLevels);
		if (arguments.length > 1 && !addBossRoomToRandomLevels(bossLevel)) {
			continue;
		}
		isMapValid = checkRandomLevelsArray(numLevels);
	}
}

function addBossRoomToRandomLevels(bossLevel) {
	var bossLevelMaker = new levelMaker(bossLevel.mapArray, EXTRA_LARGE_TEMPLATE_COLS, EXTRA_LARGE_TEMPLATE_ROWS);
	bossLevelMaker.hasBoss = true;
	bossLevelMaker.entryQuestPrerequisites = bossLevel.entryQuestPrerequisites.slice();
	//how do i make the directions on the left evaluate to ints?
	var directionMapping = {
		NORTH: ALL_LEVELS_COLS,
		SOUTH: -ALL_LEVELS_COLS,
		EAST: -1,
		WEST: 1,
	}
	var direction = bossLevel.exits[randomInt(0, bossLevel.exits.length-1)];
	// var oppositeDirection = directionMapping[direction]
	var oppositeDirection = -ALL_LEVELS_COLS; // temporary, until above line works
	var validLevels = [];
	for (var i = 0; i < randomLevelsArray.length; i++) {
		if (!randomLevelsArray[i]) {
			continue;
		}
		var col = i % ALL_LEVELS_COLS;
		var row = Math.floor(i / ALL_LEVELS_COLS);
		if (!randomLevelsArray[i+oppositeDirection] && col != 0 && col != ALL_LEVELS_COLS-1 && row != 0 && row != ALL_LEVELS_ROWS-1) {
			validLevels.push(i);
		}
	}
	if (validLevels.length == 0) return false;
	var index = validLevels[randomInt(0, validLevels.length-1)];
	var levelToAttach = randomLevelsArray[index];

	if (direction == NORTH) {
		randomLevelsArray[index+ALL_LEVELS_COLS] = bossLevelMaker;
		createLinks(bossLevelMaker, levelToAttach, "north");
	} else if (direction == SOUTH) {
		randomLevelsArray[index-ALL_LEVELS_COLS] = bossLevelMaker;
		createLinks(bossLevelMaker, levelToAttach, "south");
	} else if (direction == EAST) {
		randomLevelsArray[index-1] = bossLevelMaker;
		createLinks(bossLevelMaker, levelToAttach, "east");
	} else if (direction == WEST) {
		randomLevelsArray[index+1] = bossLevelMaker;
		createLinks(bossLevelMaker, levelToAttach, "west");
	}
	return true;
}

function checkRandomLevelsArray(numLevels) {
	if (numLevels > 1) {
		for (var i = 0; i < randomLevelsArray.length; i++) {
			if (!randomLevelsArray[i]) {
				continue;
			}
			var curr = randomLevelsArray[i].grid;
			var hasNorth = (curr.indexOf(NORTH) != -1);
			var hasEast = (curr.indexOf(EAST) != -1);
			var hasSouth = (curr.indexOf(SOUTH) != -1);
			var hasWest = (curr.indexOf(WEST) != -1);
			if (!(hasNorth || hasEast || hasSouth || hasWest)) {
				return false;
			}

			var visited = [];
			findReachableLevels(i, randomLevelsArray, visited);
			if (visited.length < numLevels) {
				console.log(randomLevelsArray[i]+ " couldn't reach all other levels");
				return false;
			}
		}
	}
	return true;
}

function makeRandomLevelsArrayHelper(numLevels) {
	randomLevelsArray = [];
	for (var i = 0; i < numLevels; i++) {
		var newRandomLevel = new levelMaker(templateExtraLarge, EXTRA_LARGE_TEMPLATE_COLS, EXTRA_LARGE_TEMPLATE_ROWS);
		randomLevelsArray.push(newRandomLevel);
	}
	//array now populated with empty levels, still need to call makeLevel
	var maxExtraDims = Math.ceil(numLevels/6); //6 is arbitrary
	if (numLevels > 50) { 
		maxExtraDims = Math.ceil(numLevels/15);
	} else if (numLevels > 20) { 
		maxExtraDims = Math.ceil(numLevels/10);
	}
	var minExtraDims = Math.ceil(maxExtraDims/2);
	var gridCols = Math.floor(Math.sqrt(numLevels))+randomInt(minExtraDims, maxExtraDims);
	var gridRows = Math.ceil(numLevels/gridCols)+randomInt(minExtraDims, maxExtraDims);
	var gridTotal = gridCols * gridRows;

	//changes the global scope variables
	ALL_LEVELS_COLS = gridCols;
	ALL_LEVELS_ROWS = gridRows;

	for (var i = numLevels; i < gridTotal; i++) {
		randomLevelsArray.push(null); //find a way to put this in a random spot?
	}
	randomizeArray(randomLevelsArray, 100);
	//now array has dimensions, and null where there is no object
	var linksMade = 0;
	for (var i = 0; i < randomLevelsArray.length; i++) {
		var curr = randomLevelsArray[i];
		if (curr != null) {
			var col = i % gridCols;
			var row = Math.floor(i/gridCols)
			var indexNorth = i - gridCols;
			var indexSouth = i + gridCols;
			var indexEast = i + 1;
			var indexWest = i - 1;
			if (row != 0 && randomLevelsArray[indexNorth] != null && Math.random() < 0.7) {
				createLinks(curr, randomLevelsArray[indexNorth], "north");
				linksMade++;
			}
			if (col != gridCols-1 && randomLevelsArray[indexEast] != null && Math.random() < 0.7) {
				createLinks(curr, randomLevelsArray[indexEast], "east");
				linksMade++;
			}
		}
	}
}



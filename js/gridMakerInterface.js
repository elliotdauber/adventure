var gridMakerCols;
var gridMakerRows;
var gridMakerArray;
var gridMakerTheme;
const GRID_X = 100;
const GRID_Y = 100;
const GRID_W = 1200;
const GRID_H = 600;

const PIC_DIM = 50;
const PIC_CHOICE_Y = 50
var selectedPic = null;
var picsShift = 0;
var picChoicesArray = [];

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_I = 73;
const KEY_O = 79;
const KEY_P = 80;
const KEY_S = 83;
const KEY_C = 67;
const KEY_DELETE = 8;
const KEY_ENTER = 13;
const KEY_NEXTTHEME = 190;
const KEY_LASTTHEME = 188;
const KEY_SHIFT = 16;

var storedGrids = [];
var currStoredGrid = 0;
var showingStoredGrids = false;

var showingGrid = true;

const NUM_THEMES = 4;

function copyToClipboard(toCopy) {
  const el = document.createElement('textarea');
  el.value = toCopy;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

window.onload = function() {
	canvas = document.getElementById('gridCanvas');
	ctx = canvas.getContext('2d');
	ctx.font = "15px Georgia";

	canvas.addEventListener('mousedown', handleMouseClick);
	canvas.addEventListener('mousemove', handleMousemove);
	canvas.addEventListener('mouseup', handleMouseup);
	document.addEventListener('keydown', keyPressed);

	makeGrid();
}

function mouseInBounds(x, y, X, Y, WIDTH, HEIGHT) {
	if (x > X && x < X+WIDTH && y > Y && y < Y+HEIGHT) {
		return true;
	} else return false;
}

function handleMouseClick(evt) {

	const GRID_BOX_W = Math.min(GRID_W/gridMakerCols, GRID_H/gridMakerRows);
	const GRID_BOX_H = GRID_BOX_W;
	const GRID_SCALAR = GRID_BOX_W/PIC_DIM;

	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	for (var i = 0; i < 25; i++) {
		if (mouseInBounds(mouseX, mouseY, GRID_X+(i*PIC_DIM)-PIC_DIM/2, PIC_CHOICE_Y-PIC_DIM/2, PIC_DIM, PIC_DIM)) {
			selectedPic = picChoicesArray[i];
			console.log("clicked:"+i);
			console.log("selected: "+selectedPic);
		}
	}

	if (mouseInBounds(mouseX, mouseY, GRID_X, GRID_Y, GRID_W, GRID_H)) {
		var x = mouseX-GRID_X;
		var y = mouseY-GRID_Y;

		var col = Math.floor(x/GRID_BOX_W);
		var row = Math.floor(y/GRID_BOX_H);
		var index = gridMakerCols * row + col;
		selectedPic = gridMakerArray[index];
		gridMakerArray[index] = TRACK_ROAD;
		console.log("selected: "+selectedPic);
	}
}

function handleMousemove(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (selectedPic == null) {
		return;
	}

	drawImageRotatedScaled(trackPics[selectedPic][gridMakerTheme], mouseX, mouseY, 0, 1);
}

function handleMouseup(evt) {
	const GRID_BOX_W = Math.min(GRID_W/gridMakerCols, GRID_H/gridMakerRows);
	const GRID_BOX_H = GRID_BOX_W;
	const GRID_SCALAR = GRID_BOX_W/PIC_DIM;

	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (selectedPic == null) {
		return;
	}

	if (!mouseInBounds(mouseX, mouseY, GRID_X, GRID_Y, GRID_BOX_W*gridMakerCols, GRID_BOX_H*gridMakerRows)) {
		console.log("out of bounds");
		selectedPic = null;
		return;
	}

	console.log("in bounds");

	var x = mouseX-GRID_X;
	var y = mouseY-GRID_Y;

	var col = Math.floor(x/GRID_BOX_W);
	var row = Math.floor(y/GRID_BOX_H);
	var index = gridMakerCols * row + col;
	console.log("INDEX: "+index);
	gridMakerArray[index] = selectedPic;
	selectedPic = null;
}

function saveGrid(grid) {
	var name = window.prompt("Enter a name for this level");
	storedGrids.push([name, grid]);
}

function createWallBorder() {
	console.log("creating border");
	for (var i = 0; i < gridMakerCols*gridMakerRows; i++) {
		var row = Math.floor(i/gridMakerCols);
		var col = i % gridMakerCols;
		if (row == 0 || row == gridMakerRows-1 || col == 0 || col == gridMakerCols-1) {
			gridMakerArray[i] = TRACK_WALL;
		}
	}
}

function makeEmptyGrid() {
	gridMakerArray = new Array(gridMakerCols*gridMakerRows);
	for (var i = 0; i < gridMakerArray.length; i++) {
		gridMakerArray[i] = 0;
	}
}

function makeTemplate() {
	makeEmptyGrid();
	createWallBorder();
}

function createRandomGrid() {
	console.log("making random");
	makeTemplate();
	//gridMakerArray = reachabilityTest; //remove to stop reachability test
	var randomLevel = new levelMaker(gridMakerArray, gridMakerCols, gridMakerRows);
	randomLevel.makeLevel();
	gridMakerArray = randomLevel.grid;
}

function keyPressed(evt) {
	console.log(evt.keyCode);
	if (evt.keyCode == KEY_LEFT_ARROW) {
		if (showingStoredGrids) {
			if (currStoredGrid == 0) {
				currStoredGrid = storedGrids.length-1;
			} else {
				currStoredGrid--;
			}
		} else {
			picsShift-=1;
		}
	} else if (evt.keyCode == KEY_RIGHT_ARROW) {
		if (showingStoredGrids) {
			currStoredGrid++;
		} else {
			picsShift+=1;
		}
	} else if (evt.keyCode == KEY_I) {
		createWallBorder();
	} else if (evt.keyCode == KEY_O) {
		createRandomGrid();
	} else if (evt.keyCode == KEY_DELETE) {
		makeEmptyGrid();
	} else if (evt.keyCode == KEY_C) {
		copyToClipboard("["+gridMakerArray+"]");
	} else if (evt.keyCode == KEY_SHIFT) {
		showingGrid = !showingGrid;
	} else if (evt.keyCode == KEY_P) {
		saveGrid(gridMakerArray);
	} else if (evt.keyCode == KEY_S) {
		showingStoredGrids = !showingStoredGrids;
	} else if (evt.keyCode == KEY_ENTER && showingStoredGrids) {
		gridMakerArray = storedGrids[currStoredGrid%storedGrids.length][1];
		showingStoredGrids = false;
	} else if (evt.keyCode == KEY_NEXTTHEME) {
		gridMakerTheme = (gridMakerTheme+1)%NUM_THEMES;
		console.log(gridMakerTheme);
	} else if (evt.keyCode == KEY_LASTTHEME) {
		if (gridMakerTheme == 0) {
			gridMakerTheme = NUM_THEMES-1;
		} else {
			gridMakerTheme = (gridMakerTheme-1)%NUM_THEMES;
		}
	}
}

function getInputArray() {
	var inputCols = window.prompt("Enter number of columns: ");
	gridMakerCols = parseInt(inputCols);
	//console.log(gridMakerCols);
	var inputRows = window.prompt("Enter number of rows: ");
	gridMakerRows = parseInt(inputRows);
	//console.log(gridMakerRows);
	arrayInput = window.prompt("Enter an array: ");
	if (arrayInput == "") {
		makeEmptyGrid();
	} else {
		gridMakerArray = arrayInput.split(",");
		for (var i = 0; i < gridMakerArray.length; i++) {
			gridMakerArray[i] = parseInt(gridMakerArray[i]);
		}
	}
	//console.log(gridMakerArray);
	gridMakerTheme = window.prompt("0: Dungeon, 1: Forest, 2: Beach, 3: Moon");
}

function drawGridTiles(grid) {
	const GRID_BOX_W = Math.min(GRID_W/gridMakerCols, GRID_H/gridMakerRows);
	const GRID_BOX_H = GRID_BOX_W;
	const GRID_SCALAR = GRID_BOX_W/PIC_DIM;


	var index = 0;
	var drawTileX = GRID_X+GRID_BOX_W/2;
	var drawTileY = GRID_Y+GRID_BOX_H/2;
	for (var row = 0; row < gridMakerRows; row++) {
		for (var col = 0; col < gridMakerCols; col++) {
			var tileKindHere = grid[index];
			var useImg = trackPics[tileKindHere][gridMakerTheme];
			if (tileHasTransparency(tileKindHere)) {
				drawImageRotatedScaled(trackPics[TRACK_ROAD][gridMakerTheme], drawTileX, drawTileY, 0, GRID_SCALAR);
			}
			drawImageRotatedScaled(useImg, drawTileX, drawTileY, 0, GRID_SCALAR);
			if (tileKindHere == NORTH || tileKindHere == SPAWN_NORTH) {
				colorCircle(drawTileX, drawTileY, GRID_BOX_W/8, "blue");
			} else if (tileKindHere == EAST ||tileKindHere == SPAWN_EAST) {
				colorCircle(drawTileX, drawTileY, GRID_BOX_W/8, "red");
			} else if (tileKindHere == SOUTH ||tileKindHere == SPAWN_SOUTH) {
				colorCircle(drawTileX, drawTileY, GRID_BOX_W/8, "purple");
			} else if (tileKindHere == WEST ||tileKindHere == SPAWN_WEST) {
				colorCircle(drawTileX, drawTileY, GRID_BOX_W/8, "yellow");
			}
			//console.log(drawTileX, drawTileY);
			drawTileX += GRID_BOX_W;
			index++;
		}
		drawTileY += GRID_BOX_H;
		drawTileX = GRID_X+GRID_BOX_W/2; //reset for next row
	}
}

function drawGrid() {
	var lineColor;
	if (gridMakerTheme == 0) {
		lineColor = "white";
	} else if (gridMakerTheme >= 1) {
		lineColor = "black";
	} 

	const GRID_BOX_W = Math.min(GRID_W/gridMakerCols, GRID_H/gridMakerRows);
	const GRID_BOX_H = GRID_BOX_W;
	const GRID_SCALAR = GRID_BOX_W/50;

	for (var row = 0; row < gridMakerRows+1; row++) {
		var y = GRID_Y+row*GRID_BOX_H;
		colorRect(GRID_X, y, GRID_BOX_W*gridMakerCols, 1, lineColor);
	}
	//console.log("cols:"+ gridMakerCols);
	//console.log(typeof gridMakerCols);
	for (var col = 0; col < gridMakerCols+1; col++) {
		var x = GRID_X+col*GRID_BOX_W;
		colorRect(x, GRID_Y, 1, GRID_BOX_H*gridMakerRows, lineColor);
	}
}

function drawControls() {
	const CONTROLS_Y = canvas.height-25;
	if (showingStoredGrids) {
		colorText("ENTER: load", 50, CONTROLS_Y, "black");
		colorText("< / >: change theme", 150, CONTROLS_Y, "black");
		colorText("Arrow Keys: change stored grid", 300, CONTROLS_Y, "black");
		return;
	}

	colorText("I: add border", 50, CONTROLS_Y, "black");
	colorText("O: random", 150, CONTROLS_Y, "black");
	colorText("DELETE: empty", 250, CONTROLS_Y, "black");
	colorText("P: save", 400, CONTROLS_Y, "black");
	colorText("S: view saved", 500, CONTROLS_Y, "black");
	colorText("SHIFT: toggle grid", 600, CONTROLS_Y, "black");
	colorText("< / >: change theme", 750, CONTROLS_Y, "black");
	colorText("Arrow Keys: scroll pics", 900, CONTROLS_Y, "black");
}

function drawTileChoices() {
	picChoicesArray = [];
	var pic = 0;
	var i = picsShift%trackPics.length;
	//console.log("pic choices");
	while (pic < 25) {
		if (trackPics[i]) {
			picChoicesArray.push(i);
			//console.log(i);
			drawImageRotatedScaled(trackPics[i][gridMakerTheme], GRID_X+(pic*PIC_DIM), PIC_DIM, 0, 1);
			if (i == NORTH || i == SPAWN_NORTH) {
				colorCircle(GRID_X+(pic*PIC_DIM), PIC_DIM, PIC_DIM/8, "blue");
			} else if (i == EAST || i == SPAWN_EAST) {
				colorCircle(GRID_X+(pic*PIC_DIM), PIC_DIM, PIC_DIM/8, "red");
			} else if (i == SOUTH || i == SPAWN_SOUTH) {
				colorCircle(GRID_X+(pic*PIC_DIM), PIC_DIM, PIC_DIM/8, "purple");
			} else if (i == WEST || i == SPAWN_WEST) {
				colorCircle(GRID_X+(pic*PIC_DIM), PIC_DIM, PIC_DIM/8, "yellow");
			}
			pic++
		}
		i++;
	}
}

function viewStoredGrids() {
	if (storedGrids.length == 0) {
		colorText("No stored grids", 20, 20, "black");
		return
	}
	var currStoredGridModded = currStoredGrid%storedGrids.length;
	var storedGridNum = currStoredGridModded+1;
	colorText("Viewing grid "+storedGridNum, 20, 20, "black");
	colorText(storedGrids[currStoredGridModded][0], 20, 40, "black");
	drawGridTiles(storedGrids[currStoredGridModded][1]);
}

function gridMakerInterface() {
	colorRect(0, 0, canvas.width, canvas.height, "white");
	drawControls();
	if (showingStoredGrids) {
		viewStoredGrids();
		return;
	}
	drawGridTiles(gridMakerArray);
	if (showingGrid) {
		drawGrid();
	}
	drawTileChoices();
}

function makeGrid() {
	loadTrackImages();
	getInputArray();
	setInterval(gridMakerInterface, 20);
}
const TRACK_W = 50;
const TRACK_H = 50;
const TRACK_COLS = 50;//30;
const TRACK_ROWS = 32;//18;
const TRACK_COLS_ON_SCREEN = 24;
const TRACK_ROWS_ON_SCREEN = 12;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_START = 2;
const TRACK_GOAL = 3;
const TRACK_DOOR = 4;
const TRACK_KEY = 5;
const TELEPORT = 6;
const PORTAL_IN = 7;
const PORTAL_KEY = 9;
const ZOMBIE_START = 10;
const GHOST_START = 11;
const APPLE = 12;
const ZOMBIE_SPOT_TAKEN = 13; //dont think this is used
const DECOR = 14;
const LEVEL_UP = 15;
const SHOP = 16;
const TRACK_ICE = 17;
const GRAPES = 18;
const GREEN_PORTAL_IN = 19;
const GREEN_PORTAL_KEY = 21;
const CHEST = 22;
const SPIKES_IN = 23;
const SPIKES_OUT = 24;
const CAGE = 25; //not initialized, used in bossCageAttack

const BLACKSMITH = 60;
const ARMORER = 61;
const GEMSMITH = 62;
const FARMER = 63;

const SPIDER_START = 30;
const WEB = 31;
const POISON = 32;

const NORTH = 40;
const EAST = 41;
const SOUTH = 42;
const WEST = 43;

const SPAWN_NORTH = 50;
const SPAWN_EAST = 51;
const SPAWN_SOUTH = 52;
const SPAWN_WEST = 53;

const BOMB_BOSS_START = 90;

//damaged enemy pics -- here on a formality, never initialized
const ZOMBIE_DAMAGED = 110;
const GHOST_DAMAGED = 111;
const SPIDER_DAMAGED = 130;


function returnTileType(col, row) {
	if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
		var index = getIndex(col, row);
		return trackGrid[index];
	} else {
		return TRACK_WALL;
	}
}

function getIndexFromXY(x, y) {
	var col = Math.floor(x / TRACK_W);
	var row = Math.floor(y / TRACK_H);
	return getIndex(col, row);
}

function getIndex(col, row) {
	return TRACK_COLS * row + col;
}

function getRow(index) {
	return Math.floor(index / TRACK_COLS);
}

function getCol(index) {
	var row = getRow(index);
	return index - TRACK_COLS * row;
}

function tileHasTransparency(image) {
	if (image == TRACK_ROAD || image == TRACK_WALL) {
		return false;
	} else return true;
}

function isBlockNearbyXY(x, y, block) {
	var bottom = trackGrid[getIndexFromXY(x, y + 16)] == block;
	var top = trackGrid[getIndexFromXY(x, y - 16)] == block;
	var left = trackGrid[getIndexFromXY(x - 16, y)] == block;
	var right = trackGrid[getIndexFromXY(x + 16, y)] == block;
	return bottom || top || left || right;
}

function getInventoryLocation(player) {
	if (inventoryQuadrant == 0) {
		player.INV_X = (TRACK_COLS_ON_SCREEN - 4) * TRACK_W + 10;
		player.INV_Y = TRACK_H + 10;
	} else if (inventoryQuadrant == 1) {
		player.INV_X = TRACK_W + 10;
		player.INV_Y = TRACK_H + 10;
	} else if (inventoryQuadrant == 2) {
		player.INV_X = TRACK_W + 10;
		player.INV_Y = (TRACK_ROWS_ON_SCREEN - 1) * TRACK_H - 10 - player.INV_H;
	} else if (inventoryQuadrant == 3) {
		player.INV_X = (TRACK_COLS_ON_SCREEN - 4) * TRACK_W + 10;
		player.INV_Y = (TRACK_ROWS_ON_SCREEN - 1) * TRACK_H - 10 - player.INV_H;
	}
}


function drawTracks() {
	var index = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for (var row = 0; row < TRACK_ROWS; row++) {
		for (var col = 0; col < TRACK_COLS; col++) {
			var tileKindHere = trackGrid[index];
			var useImg = trackPics[tileKindHere][currentLevel.theme];
			if (tileHasTransparency(tileKindHere)) {
				ctx.drawImage(trackPics[TRACK_ROAD][currentLevel.theme], drawTileX, drawTileY);
			}
			ctx.drawImage(useImg, drawTileX, drawTileY);
			drawTileX += TRACK_W;
			index++;
		}
		drawTileY += TRACK_H;
		drawTileX = 0; //reset for next row
	}
}

function isAdjacent(player, enemy, max) {
	var playerCol = Math.floor(player.x / TRACK_W);
	var playerRow = Math.floor(player.y / TRACK_H);
	var enemyCol = Math.floor(enemy.x / TRACK_W);
	var enemyRow = Math.floor(enemy.y / TRACK_H);
	var colDiff = Math.abs(playerCol - enemyCol);
	var rowDiff = Math.abs(playerRow - enemyRow);
	if ((colDiff <= max && rowDiff <= max) && (colDiff != max || rowDiff != max)) return true;
	return false;
}

function isAdjacentXY(player, enemy, maxX, maxY) {
	var dX = Math.abs(player.x - enemy.x);
	var dY = Math.abs(player.y - enemy.y);
	if (dX <= maxX && dY <= maxY) return true;
	return false;
}
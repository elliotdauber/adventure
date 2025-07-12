var spawn = 2;

const DUNGEON_THEME = 0;
const FOREST_THEME = 1;
const BEACH_THEME = 2;
const MOON_THEME = 3;

const THEME_SETTINGS_ARRAY = [
	{
		//dungeon theme
		wallTransparency: false
	},
	{
		//forest theme
		wallTransparency: false
	},
	{
		//beach theme
		wallTransparency: true
	},
	{
		//moon theme
		wallTransparency: true
	}
];

var trackGrid = [];

var teleporting = false;
var showingCharOnMap = true;

var spikes; //array containing the indexes of spikes
var spikesInterval;

var levelsPosArray = [];


function linkLevels(array) {
	for (var i = 0; i < array.length; i++) {
		var curr = array[i];
		if (curr != null) {
			var col = i % ALL_LEVELS_COLS;
			var row = Math.floor(i/ALL_LEVELS_COLS)
			var indexNorth = i - ALL_LEVELS_COLS;
			var indexSouth = i + ALL_LEVELS_COLS;
			var indexEast = i + 1;
			var indexWest = i - 1;
			if (row != 0 && array[indexNorth] != null && curr.mapArray.indexOf(NORTH) != -1) {
				curr.north = array[indexNorth];
			}
			if (row != ALL_LEVELS_ROWS-1 && array[indexSouth] != null && curr.mapArray.indexOf(SOUTH) != -1) {
				curr.south = array[indexSouth];
			}
			if (col != 0 && array[indexWest] != null && curr.mapArray.indexOf(WEST) != -1) {
				curr.west = array[indexWest];
			}
			if (col != ALL_LEVELS_COLS-1 && array[indexEast] != null && curr.mapArray.indexOf(EAST) != -1) {
				curr.east = array[indexEast];
			}
		}
	}
}

function drawMapCharButton() {
	var color;
	var text;
	if (!showingCharOnMap) {
		color = "#E0E0E0";
		text = "Show Player";
	} else {
		color = "#828282";
		text = "Hide Player";
	}
	colorRect(GC.MAP_CHAR_BUTTON_X, GC.MAP_CHAR_BUTTON_Y, GC.MAP_CHAR_BUTTON_W, GC.MAP_CHAR_BUTTON_H, color);
	colorText(text, GC.MAP_CHAR_BUTTON_X+8, GC.MAP_CHAR_BUTTON_Y + 20, "black");
}

function drawTeleportButton() {
	if (!teleporting) {
		color = "#828282";
	} else {
		color = "#E0E0E0";
	}
	colorRect(GC.TELEPORT_X, GC.TELEPORT_Y, GC.TELEPORT_W, GC.TELEPORT_H, color);
	colorText("Teleport", GC.TELEPORT_X+22, GC.TELEPORT_Y + 20, "black");
}

function getMapAreaScalar(array) {
	var mapAreaScalarX = 4/ALL_LEVELS_COLS;
	var mapAreaScalarY = 3/ALL_LEVELS_ROWS;
	var mapAreaScalar = mapAreaScalarX
	if (mapAreaScalarY < mapAreaScalarX) {
		mapAreaScalar = mapAreaScalarY;
	}
	return mapAreaScalar;
}

function showMap(array) {
	levelsPosArray = [];
	var mapAreaScalar = getMapAreaScalar(array);

	//this is clunky, TODO new vars
	GC.MAP_LEVEL_W *= mapAreaScalar;
	GC.MAP_LEVEL_H *= mapAreaScalar;
	GC.MAP_LEVEL_GAP *= mapAreaScalar;
	GC.MAP_CONNECT_W *= mapAreaScalar;
	GC.MAP_WALL_DIM *= mapAreaScalar; 

	var offsetX = (GC.MAP_AREA_W - (GC.MAP_LEVEL_W+GC.MAP_LEVEL_GAP)*ALL_LEVELS_COLS + GC.MAP_LEVEL_GAP)/2;
	var offsetY = (GC.MAP_AREA_H - (GC.MAP_LEVEL_H+GC.MAP_LEVEL_GAP)*ALL_LEVELS_ROWS + GC.MAP_LEVEL_GAP)/2;

	ctx.save()
	ctx.translate(camPanX, camPanY);
	colorRect(GC.MAP_X-5, GC.MAP_Y-5, GC.MAP_W+10, GC.MAP_H+10, "#828282");
	colorRect(GC.MAP_X, GC.MAP_Y, GC.MAP_W, GC.MAP_H, "#565656");
	drawMapCharButton();
	drawTeleportButton();

	for (var i = 0; i < array.length; i++) {
		var curr = array[i];
		if (curr != null) {
			var col = i % ALL_LEVELS_COLS;
			var row = Math.floor(i/ALL_LEVELS_COLS)
			var indexNorth = i - ALL_LEVELS_COLS;
			var indexEast = i + 1;
			var x = GC.MAP_LEVEL_W*(col)+(GC.MAP_LEVEL_GAP*col)+GC.MAP_AREA_X+offsetX;
			var y = GC.MAP_LEVEL_H*(row)+(GC.MAP_LEVEL_GAP*row)+GC.MAP_AREA_Y+offsetY;

			var localPosArray = [curr, x, y, GC.MAP_LEVEL_W, GC.MAP_LEVEL_H];
			levelsPosArray.push(localPosArray);

			//UPDATE WHEN UPDATING THEMES!!
			var levelColor;
			if (!curr.visited) levelColor = "#E0E0E0";
			else if (curr.theme == DUNGEON_THEME) levelColor = "#444444";
			else if (curr.theme == FOREST_THEME) levelColor = "#60C669";
			else if (curr.theme == BEACH_THEME) levelColor = "#D6C876";
			else if (curr.theme == MOON_THEME) levelColor = "#B3B3B3";

			colorRect(x, y, GC.MAP_LEVEL_W, GC.MAP_LEVEL_H, levelColor);
			if (curr.visited) {
				var referenceArray = curr.mapArray.slice();
				for (var j = 0; j < referenceArray.length; j++) {
					var tile = referenceArray[j];
					if (tile == 1) {
						var wallCol = j%TRACK_COLS;
						var wallRow = Math.floor(j/TRACK_COLS);
						colorRect(x + wallCol*GC.MAP_WALL_DIM, y + wallRow*GC.MAP_WALL_DIM, GC.MAP_WALL_DIM, GC.MAP_WALL_DIM, "#353535");
					} else if (tile == 40 || tile == 41 || tile == 42 || tile == 43) {
						var wallCol = j%TRACK_COLS;
						var wallRow = Math.floor(j/TRACK_COLS);
						colorRect(x + wallCol*GC.MAP_WALL_DIM, y + wallRow*GC.MAP_WALL_DIM, GC.MAP_WALL_DIM, GC.MAP_WALL_DIM, "green");
					}
				}
			}

			if (row != 0 && curr.north != null) {
				var connectX = x + (0.5*GC.MAP_LEVEL_W) - (0.5*GC.MAP_CONNECT_W)
				if (curr.visited || curr.north.visited) {
					connectX = x + (getCol(curr.mapArray.indexOf(NORTH)))*GC.MAP_WALL_DIM - 3*GC.MAP_CONNECT_W/8;
				}
				colorRect(connectX, y, GC.MAP_CONNECT_W, -GC.MAP_LEVEL_GAP, "coral");
			}	
			if (col != ALL_LEVELS_COLS-1 && curr.east != null) {
				var connectY = y + (0.5*GC.MAP_LEVEL_H) - (0.5*GC.MAP_CONNECT_W);
				if (curr.visited || curr.east.visited) {
					connectY = y + (getRow(curr.mapArray.indexOf(EAST)))*GC.MAP_WALL_DIM - 3*GC.MAP_CONNECT_W/8;
				}
				colorRect(x + GC.MAP_LEVEL_W, connectY, GC.MAP_LEVEL_GAP, GC.MAP_CONNECT_W, "coral");
			}
			if (curr.NPCArray.length) {
				for (var j = 0; j < curr.NPCArray.length; j++) {
					var currNPC = curr.NPCArray[j];
					if (currNPC.quests[currNPC.currentQuestNum].checkPrerequisites()) {
						colorRectOutline(x, y, GC.MAP_LEVEL_W-GC.MAP_WALL_DIM, GC.MAP_LEVEL_H-GC.MAP_WALL_DIM, GC.MAP_WALL_DIM, "gold");
						break;
					}
				}
			}
			for (var j = 0; j < curr.questItemsArray.length; j++) {
				var currItem = curr.questItemsArray[j];
				if (currItem.pickedUp) {
					continue;
				}
				for (var k = 0; k < warrior.quests.length; k++) {
					var currQuest = warrior.quests[k];
					for (var z = 0; z < currQuest.conditionList.length; z++) {
						if (currQuest.conditionList[z].item.name == currItem.name) {
							colorRectOutline(x, y, GC.MAP_LEVEL_W-GC.MAP_WALL_DIM, GC.MAP_LEVEL_H-GC.MAP_WALL_DIM, GC.MAP_WALL_DIM, "mediumpurple");
							break;
						}
					}
				}
			}
			if (curr.hasBoss) {
				ctx.globalAlpha = 0.4;
				if (curr.checkEntryQuestPrerequisites()) {
					colorRect(x, y, GC.MAP_LEVEL_W, GC.MAP_LEVEL_H, "green");
				} else {
					colorRect(x, y, GC.MAP_LEVEL_W, GC.MAP_LEVEL_H, "red");
				}
				ctx.globalAlpha = 1;
			}
			if (showingCharOnMap && curr == currentLevel) {
				var locationX = x+(0.5*GC.MAP_LEVEL_W);
				var locationY =  y + (0.5*GC.MAP_LEVEL_H);
				drawImageRotatedScaled(warrior.facePic, locationX, locationY, 0, 0.75);
				drawImageRotatedScaled(warrior.inventory[warrior.currInv]["armor"].pic[warrior.class], locationX, locationY, 0, 0.75);
				drawImageRotatedScaled(warrior.inventory[warrior.currInv]["helmet"].pic[warrior.class], locationX, locationY, 0, 0.75);
				drawImageRotatedScaled(warrior.inventory[warrior.currInv]["shield"].pic[warrior.class], locationX, locationY, 0, 0.75);
				drawImageRotatedScaled(warrior.inventory[warrior.currInv]["weapon"].pic[warrior.class], locationX, locationY, 0, 0.75);
				drawImageRotatedScaled(warrior.inventory[warrior.currInv]["boots"].pic[warrior.class], locationX, locationY, 0, 0.75);
			}
		}
	}
	GC.MAP_LEVEL_W /= mapAreaScalar;
	GC.MAP_LEVEL_H /= mapAreaScalar;
	GC.MAP_LEVEL_GAP /= mapAreaScalar;
	GC.MAP_CONNECT_W /= mapAreaScalar;
	GC.MAP_WALL_DIM /= mapAreaScalar; 
	ctx.restore();
}

function handleMapClicks(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (mouseInBounds(mouseX, mouseY, GC.MAP_CHAR_BUTTON_X, GC.MAP_CHAR_BUTTON_Y, GC.MAP_CHAR_BUTTON_W, GC.MAP_CHAR_BUTTON_H)) {
		showingCharOnMap = !showingCharOnMap;
	}
	if (mouseInBounds(mouseX, mouseY, GC.TELEPORT_X, GC.TELEPORT_Y, GC.TELEPORT_W, GC.TELEPORT_H)) {
		teleporting = !teleporting;
	}

	if (teleporting) {
		for (var i = 0; i < levelsPosArray.length; i++) {
			var level = levelsPosArray[i][0];
			var x = levelsPosArray[i][1];
			var y = levelsPosArray[i][2];
			var w = levelsPosArray[i][3];
			var h = levelsPosArray[i][4];
			if (mouseInBounds(mouseX, mouseY, x, y, w, h) && level.visited && warrior.exp >= warrior.teleportCost) { //clean up, use helper function for loading
				teleporting = false;
				warrior.exp -= warrior.teleportCost;
				spawn = TELEPORT;
				currentLevel.enemies = enemies.slice();
				currentLevel.chests = chests.slice();
				currentLevel.shops = shops.slice();
				currentLevel.mapArray = trackGrid.slice();
				loadLevel(level);
				currentLevel = level;
			}
		}
	}
}

function handleSpikes(mapArray) {
	clearInterval(spikesInterval);
	spikes = [];
	for (var i = 0; i < mapArray.length; i++) {
		if (mapArray[i] == SPIKES_IN || mapArray[i] == SPIKES_OUT) {
			spikes.push(i);
		}
	}
	spikesInterval = setInterval(function() {
					for (var i = 0; i < spikes.length; i++) {
						var currIndex = spikes[i];
						if (trackGrid[currIndex] == SPIKES_OUT) {
							trackGrid[currIndex] = SPIKES_IN;
						} else if (trackGrid[currIndex] == SPIKES_IN) {
							trackGrid[currIndex] = SPIKES_OUT;
						}
					}
				}, 2000);
}

function reloadLevel(level) {
	spawn = TELEPORT;
	warrior.reset(charPic, "Warrior");
	warrior.health = warrior.maxHealth;
	warrior.mana = warrior.maxMana;
}

function loadLevel(level) { 
	trackGrid = level.mapArray.slice();
	warrior.reset(charPic, "Warrior");
	enemyCounter = 0;
	var counter = 0;
	resetProjectilesAndEnemies(); 
	if (level.enemies == null) {
		for (var i = 0; i < trackGrid.length; i++) {
			var enemy;
			var enemyFound = false;
			if (trackGrid[i] == GHOST_START) {
				enemy = spawnGhost();
				enemyFound = true;
			} else if (trackGrid[i] == ZOMBIE_START) {
				enemy = spawnZombie();
				enemyFound = true;
			} else if (trackGrid[i] == SPIDER_START) {
				enemy = spawnSpider();
				enemyFound = true;
			} else if (trackGrid[i] == BOMB_BOSS_START) {
				enemy = spawnBombBoss();
				enemyFound = true;
			}
			if (enemyFound) {
				enemy.reset();
				enemies.push(enemy);
				counter ++;
			}
		}
		level.enemies = enemies;
	} else {
		enemies = level.enemies;
	}

	if (level.chests == null) {
		spawnChests(4, 50, GC.ALL_CHEST_ITEMS);
	} else {
		chests = level.chests;
	}

	if (level.shops == null) {
		spawnShops(14, 32);
	} else {
		shops = level.shops;
	}
	handleSpikes(level.mapArray);
	if (!level.visited) {
		level.visited = true;
		warrior.numLevelsVisited++;
		level.levelDifficulty = 1 + warrior.numLevelsVisited*0.1;
		new Notification("New room discovered!", "#F5F566");
	}
	coins.clear(); //removes all coins when you leave level!
	levelLoading = true;
	setTimeout(function() {levelLoading = false;}, 150)
}

function levelClass(name) {
	this.theme;
	this.north = null;
	this.east = null;
	this.south = null;
	this.west = null;
	this.mapArray;
	this.name = name;
	this.enemies = null;
	this.chests = null;
	this.shops = null;
	this.visited = false;
	this.NPCArray = [];
	this.questItemsArray = [];
	this.levelDifficulty = 1; //default

	this.hasBoss = false;
	this.exits = [];
	this.entryQuestPrerequisites = [];

	//TODO: add functionality to change size of rooms
	this.cols;
	this.rows;

	//TODO: make it possible to spawn different items on different levels (also maybe some items more liekly to spawn than others)
	this.chestItems;
	this.shopItems;

	this.checkEntryQuestPrerequisites = function() {
		for (var i = 0; i < this.entryQuestPrerequisites.length; i++) {
			if (!this.entryQuestPrerequisites[i].completed) {
				return false;
			}
		}
		return true;
	}
}

levelClass.prototype.setMapArray = function(array) {
	this.mapArray = array;
	return this;
};

levelClass.prototype.setThemeConstant = function(theme) {
	this.theme = theme;
	return this;
};

levelClass.prototype.setNPCArray = function(array) {
	this.NPCArray = array;
	return this;
};

levelClass.prototype.setQuestItemsArray = function(array) {
	this.questItemsArray = array;
	return this;
};

levelClass.prototype.setAsBossLevel = function() {
	this.hasBoss = true;
	return this;
};

levelClass.prototype.setExits = function(exitsArray) {
	this.exits = exitsArray
	return this;
};

levelClass.prototype.setEntryQuestPrerequisites = function(questArray) {
	this.entryQuestPrerequisites = questArray;
	return this;
};


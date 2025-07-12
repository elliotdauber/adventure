var randomAreasArray = [];
var currentRandomArea = 0;

function loadArea(area) {
	currentArea = area;
	currentLevel = area.firstLevel;
	allLevelsArray = area.levelArray;
	linkLevels(allLevelsArray);
	loadLevel(currentLevel);
}

function areaNextObject() {
	this.trackCodes = [];
	this.areas = [];
}

areaNextObject.prototype.addPair = function(trackCode, nextArea) {
	this.trackCodes.push(trackCode); 
	this.areas.push(nextArea); 
	return this;
};

var area1;
var area2 = new areaClass(area2Levels, area2Start, "area 2", null);

var area1Next = new areaNextObject()
					.addPair(TRACK_GOAL, area2);

function areaClass(levelArray, firstLevel, name, next) {
	this.levelArray = levelArray;
	this.firstLevel = firstLevel;
	this.name = name;
	this.visited = false;
	this.next = next; //this will probably be some sort of array at some point
}

function randomAreaClass(numLevels, NPCArray, questItemsArray, bossRoom) {
	this.numLevels = numLevels;
	this.levelArray = [];
	// this.firstLevel = firstLevel;
	this.NPCArray = NPCArray;
	this.questItemsArray = questItemsArray;
	this.bossRoom = bossRoom; //this will probably be some sort of array at some point

	this.createLevels = function() {
		createPlayableRandomLevels(this.numLevels, this.bossRoom, this.NPCArray, this.questItemsArray);
	}
}

area1 = new areaClass(area1Levels, lobby, "area 1", area1Next);


var currentArea = area1;

//var allAreasArray = [area1, area2];


function setRandomAreas(numRandomLevels) {
	var randomArea1 = new randomAreaClass(numRandomLevels, [iceCreamNPC], [questCar, questCar2, questHeart], bossRoom);
	var randomArea2 = new randomAreaClass(10, [kyleNPC], [questBaseball, questBaseballBat], bossRoom);

	randomAreasArray = [
		randomArea1,
		randomArea2
	]
	currentRandomArea = 0;
}

function loadNextRandomArea() {
	spawn = TELEPORT
	if (currentRandomArea < randomAreasArray.length) {
		randomAreasArray[currentRandomArea].createLevels();
	}
	currentRandomArea++;
	if (currentRandomArea != 1) {
		loadLevel(currentLevel); //first one is loaded in mainAdv.js
	}
}


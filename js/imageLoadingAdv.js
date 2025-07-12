var HUD  = document.createElement("img");

var charPic = document.createElement("img");

var ghostFrozen = document.createElement("img");
var zombieFrozen = document.createElement("img");
var spiderFrozen = document.createElement("img");

var ghostBurning = document.createElement("img");
var zombieBurning = document.createElement("img");
var spiderBurning = document.createElement("img");

var coinPic = document.createElement("img");
var mediumCoinPic = document.createElement("img");
var highCoinPic = document.createElement("img");

var healthCounter = document.createElement("img");
var healthCounterEmpty = document.createElement("img");
var keyCounter = document.createElement("img");
var portalKeyCounter = document.createElement("img");
var greenPortalKeyCounter = document.createElement("img");

var companionEye = document.createElement("img");
var companionMonster = document.createElement("img");
var companionOrb = document.createElement("img");

var burningEffectIconPic = document.createElement("img");
var lifeStealEffectIconPic = document.createElement("img");
var knockbackEffectIconPic = document.createElement("img");
var reflectDamageEffectIconPic = document.createElement("img");
var speedDefenseEffectIconPic = document.createElement("img");

var fireballPic = document.createElement("img");
var lightningPic = document.createElement("img");
var snowflakePic = document.createElement("img");

var fireballRadialPic = document.createElement("img");
var lightningRadialPic = document.createElement("img");
var snowflakeRadialPic = document.createElement("img");

var fireballMultishotPic = document.createElement("img");
var lightningBouncingPic = document.createElement("img");
var snowflakeRotatingPic =  document.createElement("img");
var fireballSpiralingPic =  document.createElement("img");

var bombPic =  document.createElement("img");

var healthAuraPic = document.createElement("img");
var healthRegenAuraPic = document.createElement("img");
var defenseAuraPic = document.createElement("img");
var damageAuraPic = document.createElement("img");

var healthAuraDisplayPic = document.createElement("img");
var healthRegenAuraDisplayPic = document.createElement("img");
var defenseAuraDisplayPic = document.createElement("img");
var damageAuraDisplayPic = document.createElement("img");

var redGemPic = document.createElement("img");
var blueGemPic = document.createElement("img");
var greenGemPic = document.createElement("img");
var blackGemPic = document.createElement("img");
var whiteGemPic = document.createElement("img");
var purpleGemPic = document.createElement("img");

var redGemTrianglePic = document.createElement("img");
var blueGemTrianglePic = document.createElement("img");
var greenGemTrianglePic = document.createElement("img");
var blackGemTrianglePic = document.createElement("img");
var whiteGemTrianglePic = document.createElement("img");
var purpleGemTrianglePic = document.createElement("img");

var redGemDiamondPic = document.createElement("img");
var blueGemDiamondPic = document.createElement("img");
var greenGemDiamondPic = document.createElement("img");
var blackGemDiamondPic = document.createElement("img");
var whiteGemDiamondPic = document.createElement("img");
var purpleGemDiamondPic = document.createElement("img");

var bruteFace = document.createElement("img");
var nerdFace = document.createElement("img");
var wizardFace = document.createElement("img");

var nakedTorso = document.createElement("img");
var nakedFeet = document.createElement("img");

var questExclamationPic = document.createElement("img");
var questQuestionPic = document.createElement("img");

var skillsPageButton = document.createElement("img");

var trackPics = [];

var picsToLoad = 0;

function launch() {
	picsToLoad--;
	if (picsToLoad == 0) {
			imageLoadingDoneStartGame();
	}
}

function loadCharacterPics(itemCode, filename, type) {
	if (type == "armor") {
		armorPics[itemCode] = document.createElement("img");
		beginLoading(armorPics[itemCode], filename);
	} else if (type == "helmet") {
		helmetPics[itemCode] = document.createElement("img");
		beginLoading(helmetPics[itemCode], filename);
	} else if (type == "shield") {
		shieldPics[itemCode] = document.createElement("img");
		beginLoading(shieldPics[itemCode], filename);
	} else if (type == "weapon") {
		weaponPics[itemCode] = document.createElement("img");
		beginLoading(weaponPics[itemCode], filename);
	} else if (type == "boots") {
		bootsPics[itemCode] = document.createElement("img");
		beginLoading(bootsPics[itemCode], filename);
	}
}

function beginLoading(image, filename) {
	image.src = "images/" + filename; //this could be in the wrong spot
	image.onload = launch; 
	// image.src = "images/" + filename;
}

function loadTrackImage(trackCode, filenames) {
	var theme1 = document.createElement("img");
	var theme2 = document.createElement("img");
	var theme3 = document.createElement("img");
	var theme4 = document.createElement("img");
	trackPics[trackCode] = {
		0: theme1, //DUNGEON_THEME
		1: theme2, //FOREST_THEME
		2: theme3, //BEACH_THEME
		3: theme4 //MOON_THEME
	};
	if (filenames.length == 1) {
		beginLoading(theme1, filenames[0]);
		beginLoading(theme2, filenames[0]);
		beginLoading(theme3, filenames[0]);
		beginLoading(theme4, filenames[0]);
	} else {
		beginLoading(theme1, filenames[0]);
		beginLoading(theme2, filenames[1]);
		beginLoading(theme3, filenames[2]);
		beginLoading(theme4, filenames[3]);
	}
}

function loadTrackImages() { //PICS FOR GRID MAKER INTERFACE, THIS FUNCTION NOT USED IN GAME
	var trackImageList = [
		{trackType: TRACK_ROAD, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]}, //dungeonGround.png
		{trackType: TRACK_WALL, filenames: ["brick.png", "treeWall.png", "water6.png", "space.png"]}, //brick.png
		{trackType: DECOR, filenames: ["boulderDecor.png", "oakTree.png", "palmTree.png", "boulderDecor.png"]}, 
		{trackType: TRACK_GOAL, filenames: ["star.png"]}, 
		{trackType: TRACK_DOOR, filenames: ["door.png"]},
		{trackType: TRACK_KEY, filenames: ["key.png"]},
		{trackType: PORTAL_IN, filenames: ["portal.png"]},
		{trackType: PORTAL_KEY, filenames: ["pinkPortalKey.png"]},
		{trackType: GREEN_PORTAL_KEY, filenames: ["greenPortalKey.png"]},

		{trackType: GHOST_START, filenames: ["ghost.png"]},
		{trackType: ZOMBIE_START, filenames: ["zombie.png"]},
		{trackType: SPIDER_START, filenames: ["spider.png"]},
		{trackType: BOMB_BOSS_START, filenames: ["bombBoss.png"]},

		{trackType: WEB, filenames: ["web.png"]}, 
		{trackType: POISON, filenames: ["poisonCloud.png"]}, 

		{trackType: APPLE, filenames: ["appleSmall.png"]},
		{trackType: GRAPES, filenames: ["grapesSmall.png"]},
		{trackType: LEVEL_UP, filenames: ["levelUp.png"]},

		{trackType: CAGE, filenames: ["cage.png"]},

		{trackType: SHOP, filenames: ["shop.png"]},
		{trackType: BLACKSMITH, filenames: ["blacksmith.png"]},
		{trackType: ARMORER, filenames: ["armorer.png"]},
		{trackType: GEMSMITH, filenames: ["gemsmith.png"]},
		{trackType: FARMER, filenames: ["farmer.png"]},

		{trackType: TRACK_ICE, filenames: ["ice80.png", "snow.png", "snow.png", "snow.png"]},
		{trackType: GREEN_PORTAL_IN, filenames: ["greenPortal.png"]},
		{trackType: CHEST, filenames: ["chest.png"]},
		{trackType: TELEPORT, filenames: ["teleport.png"]},

		{trackType: SPIKES_IN, filenames: ["spikesInLight.png", "spikesInNormal.png", "spikesInNormal.png", "spikesInNormal.png"]},
		{trackType: SPIKES_OUT, filenames: ["spikesOutDungeon.png", "spikesOutForest.png", "spikesOutBeach.png", "spikesOutForest.png"]},

		{trackType: NORTH, filenames: ["northExit.png", "treesNorthExit.png","bridgeNorthExit.png", "moonNorthExit.png"]},
		{trackType: EAST, filenames: ["eastExit.png", "treesEastExit.png", "bridgeEastExit.png", "moonEastExit.png"]}, 
		{trackType: SOUTH, filenames: ["southExit.png", "treesSouthExit.png", "bridgeSouthExit.png", "moonSouthExit.png"]},
		{trackType: WEST, filenames: ["westExit.png", "treesWestExit.png", "bridgeWestExit.png", "moonWestExit.png"]}, 
		{trackType: SPAWN_NORTH, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]}, 
		{trackType: SPAWN_EAST, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]}, 
		{trackType: SPAWN_SOUTH, filenames: ["dungeonGround.png", "grassRoad.png","sand.png", "moonFloor.png"]}, 
		{trackType: SPAWN_WEST, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]} 
		];

		for (var i = 0; i < trackImageList.length; i++) {
			picsToLoad+=5; //this ensures we won't load the game when using gridBuilder program, CHANGE WHEN ADDING THEMES
			loadTrackImage(trackImageList[i].trackType, trackImageList[i].filenames);
		}
}

function loadImages() {
	var imageList = [
		{image: HUD, filename: "HUD4.png"}, 

		{image: charPic, filename: "warrior.png"}, 
		{image: companionEye, filename: "companion.png"}, 
		{image: companionMonster, filename: "companionMonster.png"}, 
		{image: companionOrb, filename: "companionOrb.png"}, 

		{image: ghostFrozen, filename: "ghostFrozen.png"},
		{image: zombieFrozen, filename: "zombieFrozen.png"},
		{image: spiderFrozen, filename: "spiderFrozen.png"},

		{image: ghostBurning, filename: "ghostBurning.png"},
		{image: zombieBurning, filename: "zombieBurning.png"},
		{image: spiderBurning, filename: "spiderBurning.png"},

		{image: coinPic, filename: "coin.png"}, 
		{image: mediumCoinPic, filename: "blueCoin.png"}, 
		{image: highCoinPic, filename: "redCoin.png"}, 

		{image: burningEffectIconPic, filename: "burningEffectIcon.png"},
		{image: lifeStealEffectIconPic, filename: "lifeStealEffectIcon.png"},  
		{image: knockbackEffectIconPic, filename: "knockbackEffectIcon.png"}, 
		{image: reflectDamageEffectIconPic, filename: "reflectEffectIcon.png"}, 
		{image: speedDefenseEffectIconPic, filename: "speedDefenseEffectIcon.png"}, 

		{image: fireballPic, filename: "fireball.png"},
		{image: lightningPic, filename: "lightning.png"},  
		{image: snowflakePic, filename: "snowflake.png"},  

		{image: fireballRadialPic, filename: "fireballRadial.png"},
		{image: lightningRadialPic, filename: "lightningRadial.png"},  
		{image: snowflakeRadialPic, filename: "snowflakeRadial.png"},

		{image: fireballMultishotPic, filename: "fireballMultishot.png"}, 
		{image: lightningBouncingPic, filename: "lightningBouncing.png"},
		{image: snowflakeRotatingPic, filename: "snowflakeRotating.png"},
		{image: fireballSpiralingPic, filename: "fireballSpiraling.png"},

		{image: bombPic, filename: "bomb.png"},

		{image: healthAuraPic, filename: "healthBoostAura.png"},
		{image: healthRegenAuraPic, filename: "healthRegenAura.png"},
		{image: defenseAuraPic, filename: "defenseAura.png"},
		{image: damageAuraPic, filename: "damageAura.png"},

		{image: healthAuraDisplayPic, filename: "healthBoostAuraDisplay.png"},
		{image: healthRegenAuraDisplayPic, filename: "healthRegenAuraDisplay.png"},
		{image: defenseAuraDisplayPic, filename: "defenseAuraDisplay.png"},
		{image: damageAuraDisplayPic, filename: "damageAuraDisplay.png"},

		{image: redGemPic, filename: "redGem.png"},
		{image: blueGemPic, filename: "blueGem.png"},
		{image: greenGemPic, filename: "greenGem.png"},
		{image: blackGemPic, filename: "blackGem.png"},
		{image: whiteGemPic, filename: "whiteGem.png"},
		{image: purpleGemPic, filename: "purpleGem.png"},

		{image: redGemTrianglePic, filename: "redGemTriangle.png"},
		{image: blueGemTrianglePic, filename: "blueGemTriangle.png"},
		{image: greenGemTrianglePic, filename: "greenGemTriangle.png"},
		{image: blackGemTrianglePic, filename: "blackGemTriangle.png"},
		{image: whiteGemTrianglePic, filename: "whiteGemTriangle.png"},
		{image: purpleGemTrianglePic, filename: "purpleGemTriangle.png"},

		{image: redGemDiamondPic, filename: "redGemDiamond.png"},
		{image: blueGemDiamondPic, filename: "blueGemDiamond.png"},
		{image: greenGemDiamondPic, filename: "greenGemDiamond.png"},
		{image: blackGemDiamondPic, filename: "blackGemDiamond.png"},
		{image: whiteGemDiamondPic, filename: "whiteGemDiamond.png"},
		{image: purpleGemDiamondPic, filename: "purpleGemDiamond.png"},

		{image: bruteFace, filename: "bruteFace.png"}, 
		{image: nerdFace, filename: "nerdFace.png"}, 
		{image: wizardFace, filename: "wizardFace.png"}, 

		{image: nakedTorso, filename: "nakedTorso.png"}, 
		{image: nakedFeet, filename: "nakedFeet.png"}, 	

		{image: questExclamationPic, filename: "questExclamation.png"},
		{image: questQuestionPic, filename: "questQuestion.png"},

		{image: healthCounter, filename: "heart.png"},
		{image: healthCounterEmpty, filename: "emptyHeart.png"},
		{image: keyCounter, filename: "key.png"},
		{image: portalKeyCounter, filename: "pinkPortalKey.png"},
		{image: greenPortalKeyCounter, filename: "greenPortalKey.png"},

		{image: skillsPageButton, filename: "skillsTriangleButton.png"},

		{trackType: TRACK_ROAD, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]}, 
		{trackType: TRACK_START, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]}, //dungeonGround.png
		{trackType: TRACK_WALL, filenames: ["brick.png", "treeWall.png", "water6.png", "space.png"]}, //brick.png
		{trackType: DECOR, filenames: ["boulderDecor.png", "oakTree.png", "palmTree.png", "boulderDecor.png"]}, 
		{trackType: TRACK_GOAL, filenames: ["star.png"]}, 
		{trackType: TRACK_DOOR, filenames: ["door.png"]},
		{trackType: TRACK_KEY, filenames: ["key.png"]},
		{trackType: PORTAL_IN, filenames: ["portal.png"]},
		{trackType: PORTAL_KEY, filenames: ["pinkPortalKey.png"]},
		{trackType: GREEN_PORTAL_KEY, filenames: ["greenPortalKey.png"]},

		{trackType: GHOST_START, filenames: ["ghost.png"]},
		{trackType: ZOMBIE_START, filenames: ["zombie.png"]},
		{trackType: SPIDER_START, filenames: ["spider.png"]},
		{trackType: BOMB_BOSS_START, filenames: ["bombBoss.png"]},

		{trackType: GHOST_DAMAGED, filenames: ["ghostDamaged.png"]}, 
		{trackType: ZOMBIE_DAMAGED, filenames: ["zombieDamaged.png"]}, 	
		{trackType: SPIDER_DAMAGED, filenames: ["spiderDamaged.png"]}, 

		{trackType: WEB, filenames: ["web.png"]}, 
		{trackType: POISON, filenames: ["poisonCloud.png"]}, 

		{trackType: APPLE, filenames: ["appleSmall.png"]},
		{trackType: GRAPES, filenames: ["grapesSmall.png"]},
		{trackType: LEVEL_UP, filenames: ["levelUp.png"]},

		{trackType: CAGE, filenames: ["cage.png"]},

		{trackType: SHOP, filenames: ["shop.png"]},
		{trackType: BLACKSMITH, filenames: ["blacksmith.png"]},
		{trackType: ARMORER, filenames: ["armorer.png"]},
		{trackType: GEMSMITH, filenames: ["gemsmith.png"]},
		{trackType: FARMER, filenames: ["farmer.png"]},

		{trackType: TRACK_ICE, filenames: ["ice80.png", "snow.png", "snow.png", "snow.png"]}, //ice80.png
		{trackType: GREEN_PORTAL_IN, filenames: ["greenPortal.png"]},
		{trackType: CHEST, filenames: ["chest.png"]},
		{trackType: TELEPORT, filenames: ["teleport.png"]},

		{trackType: SPIKES_IN, filenames: ["spikesInLight.png", "spikesInNormal.png", "spikesInNormal.png", "spikesInNormal.png"]},
		{trackType: SPIKES_OUT, filenames: ["spikesOutDungeon.png", "spikesOutForest.png", "spikesOutBeach.png", "spikesOutDungeon.png"]},

		{trackType: NORTH, filenames: ["northExit.png", "treesNorthExit.png","bridgeNorthExit.png", "moonNorthExit.png"]},
		{trackType: EAST, filenames: ["eastExit.png", "treesEastExit.png", "bridgeEastExit.png", "moonEastExit.png"]}, 
		{trackType: SOUTH, filenames: ["southExit.png", "treesSouthExit.png", "bridgeSouthExit.png", "moonSouthExit.png"]},
		{trackType: WEST, filenames: ["westExit.png", "treesWestExit.png", "bridgeWestExit.png", "moonWestExit.png"]}, 
		{trackType: SPAWN_NORTH, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]}, 
		{trackType: SPAWN_EAST, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]}, 
		{trackType: SPAWN_SOUTH, filenames: ["dungeonGround.png", "grassRoad.png","sand.png", "moonFloor.png"]}, 
		{trackType: SPAWN_WEST, filenames: ["dungeonGround.png", "grassRoad.png", "sand.png", "moonFloor.png"]} 
		];

	//picsToLoad = imageList.length;

	picsToLoad = 0;
	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i]. charImg != undefined) {
			picsToLoad++;
			loadCharacterPics(imageList[i].charImg, imageList[i].filename, imageList[i].type);
		} else if (imageList[i].image != undefined) {
			picsToLoad++;
			beginLoading(imageList[i].image, imageList[i].filename);
		} else {
			picsToLoad+=4; //change this if adding more themes
			loadTrackImage(imageList[i].trackType, imageList[i].filenames);
		}
		
	}
}
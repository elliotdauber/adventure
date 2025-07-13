var showingWinScreen = false;
var showingLoseScreen = false;

var mouseOverHUD = false;
var mouseOverMinimap = false;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_F = 70; //eat apple
const KEY_R = 82; //eat grapes

const KEY_Q = 81; //toggle minimap
const KEY_E = 69; //action
const KEY_SPACE = 32; //restart level
const KEY_I = 73;
const KEY_O = 79;
const KEY_M = 77; //quests
const KEY_N = 78; //map
const KEY_B = 66; //stats/skills
const KEY_V = 86; //inventory
const KEY_SHIFT = 16; //block
const KEY_ENTER = 13;
const KEY_NEXTSONG = 190;
const KEY_LASTSONG = 188;
const NUMKEYS = [49, 50, 51, 52, 53, 54, 55, 56, 57]; //starts at 1
const KEY_ESC = 27; //pause


const KEY_Z = 90; //aura1
const KEY_X = 88; //aura2
const KEY_C = 67; //aura3, gridMakerInterface (copy)
const KEY_P = 80; //music play/pause, gridMakerInterface (save)

function setupInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	canvas.addEventListener('mousedown', handleMouseDown);
	canvas.addEventListener('mouseup', handleMouseUp);

	warrior.setupInput(KEY_W, KEY_D, KEY_S, KEY_A); //up, right, down, left
}

function handleMouseDown(evt) {
	if (gamePaused) {
		handleSliderInput(evt);
	} else if (selectedTab == "stats") {
		handleStatsScreenMousedown(evt);
	}
}

function handleMouseUp(evt) {
	if (gamePaused) {
		handleSliderUp(evt);
	} else if (selectedTab == "stats") {
		handleStatsScreenMouseup(evt);
	}
}

function handleMouseClick(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	if (selectedTab != null) {
		handleTabClicks(mouseX, mouseY);
	}

	var chestClicked = false
	if (warrior.inChest) {
		chestClicked = handleMouseclickChest(evt);
	}

	if (showingWinScreen) {
		showingWinScreen = false;
	} else if (showingLoseScreen) {
		showingLoseScreen = false;
		reloadLevel(currentLevel);
	} else if (!gameStarted) {
		handleMouseClickOpeningScreen(evt);
	} else if (gamePaused) {
		handleSettingsClicks(mouseX, mouseY);
	} else if (selectedTab == "map") {
		handleMapClicks(evt);
	} else if (selectedTab == "quests") {
		handleQuestScreenClicks(evt);
	} else if (selectedTab == "inventory") {
		handleMouseclickInventoryScreen(evt);
	} else if (warrior.shopping) {
		handleMouseclickShopScreen(evt);
	} else if (selectedTab == null && !chestClicked && !gamePaused) {
		warrior.attack(mouseX, mouseY)
	}
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	if (!gameStarted) {
		handleMousemoveOpeningScreen(evt);
		return;
	}
	if (gamePaused) {
		handleSliderMove(evt);
		return;
	}

	if (mouseY > canvas.height - TRACK_H * 3) {
		mouseOverHUD = true;
	} else {
		mouseOverHUD = false;
	}

	if (gameStarted && !gameLoading && mouseX <= GC.MINIMAP_X + GC.MINIMAP_W + 15 && mouseY <= GC.MINIMAP_Y + GC.MINIMAP_H + 15) {
		mouseOverMinimap = true;
	} else {
		mouseOverMinimap = false;
	}

	if (selectedTab == "quests") {
		handleQuestScreenMousemove(evt);
	} else if (selectedTab == "inventory") {
		handleInventoryScreenMouse(evt);
	}
}

function keySet(keyEvent, char, setTo) {
	if (keyEvent.keyCode == char.controlKeyLeft) {
		char.keyHeld_West = setTo;
	}
	if (keyEvent.keyCode == char.controlKeyRight) {
		char.keyHeld_East = setTo;
	}
	if (keyEvent.keyCode == char.controlKeyUp) {
		char.keyHeld_North = setTo;
	}
	if (keyEvent.keyCode == char.controlKeyDown) {
		char.keyHeld_South = setTo;
	}
}

function keyPressed(evt) {
	handleKeyPressHUD(evt);

	//for testing
	// if (evt.keyCode == KEY_ENTER) {
	// 	var compIndex = getIndexFromXY(warrior.companion.x, warrior.companion.y);
	// 	var playerIndex = getIndexFromXY(warrior.x, warrior.y);
	// 	var path = new Vector();
	// 	warrior.companion.findPlayer(compIndex, playerIndex, path);
	// 	console.log(path);
	// }

	if (!warrior.activeAura) {
		if (evt.keyCode == KEY_Z) {
			warrior.auraOptions.getElemAtIndex(0).begin(warrior);
		} else if (evt.keyCode == KEY_X) {
			warrior.auraOptions.getElemAtIndex(1).begin(warrior);
		} else if (evt.keyCode == KEY_C) {
			warrior.auraOptions.getElemAtIndex(2).begin(warrior);
		}
	}


	// console.log(evt.keyCode);
	if (evt.keyCode == KEY_P) {
		backgroundMusic.startOrStopMusic();
	}
	if (evt.keyCode == KEY_NEXTSONG) {
		changeMusic("next");
	}
	if (evt.keyCode == KEY_LASTSONG) {
		changeMusic("last");
	}
	if (evt.keyCode == KEY_SPACE) {
		//swap weapons
		var temp = warrior.inventory[warrior.currInv]["weapon"];
		warrior.inventory[warrior.currInv]["weapon"] = warrior.inventory[(warrior.currInv + 1) % 2]["weapon"];
		warrior.inventory[(warrior.currInv + 1) % 2]["weapon"] = temp;
	}

	if (evt.keyCode == KEY_Q) {
		showingMinimap = !showingMinimap;
	}

	if (evt.keyCode == KEY_N) {
		if (selectedTab == null) {
			selectedTab = "map";
			walkingSound.pause();
		} else if (selectedTab != "map") {
			selectedTab = "map";
		} else {
			selectedTab = null;
			warrior.shopping = false;
		}
	}

	if (evt.keyCode == KEY_M) {
		if (selectedTab == null) {
			selectedTab = "quests";
			walkingSound.pause();
		} else if (selectedTab != "quests") {
			selectedTab = "quests";
		} else {
			selectedTab = null;
			warrior.shopping = false;
		}
	}

	if (evt.keyCode == KEY_B) {
		if (selectedTab == null) {
			selectedTab = "stats";
			walkingSound.pause();
		} else if (selectedTab != "stats") {
			selectedTab = "stats";
		} else {
			selectedTab = null;
			warrior.shopping = false;
		}
	}

	if (evt.keyCode == KEY_V) {
		if (selectedTab == null) {
			selectedTab = "inventory";
			walkingSound.pause();
		} else if (selectedTab != "inventory") {
			selectedTab = "inventory";
		} else {
			selectedTab = null;
			warrior.shopping = false;
		}
	}

	if (evt.keyCode == KEY_SHIFT) {
		warrior.blocking = true;
	}

	else if (evt.keyCode == KEY_ESC) {
		if (warrior.talkingToNPC) {
			warrior.talkingToNPC = false;
			warrior.currentNPC = null;
			warrior.questDialogueIndex = 0;
			return;
		}
		gamePaused = !gamePaused;
	}

	if (evt.keyCode == KEY_F && warrior.health < warrior.maxHealth) {
		for (var i = 0; i < warrior.numBagItems; i++) {
			if (warrior.bag[i].name == "apple") {
				warrior.bag.splice(i, 1);
				warrior.numBagItems--;
				appleEffect();
				break;
			}
		}
	}

	if (evt.keyCode == KEY_R && warrior.mana < warrior.maxMana) {
		for (var i = 0; i < warrior.numBagItems; i++) {
			if (warrior.bag[i].name == "grapes") {
				warrior.bag.splice(i, 1);
				warrior.numBagItems--;
				grapeEffect();
				break;
			}
		}
	}

	if (evt.keyCode == KEY_E) { //make helper functions here!


		var trackCol = Math.floor(warrior.x / TRACK_W);
		var trackRow = Math.floor(warrior.y / TRACK_H);
		var tileHere = returnTileType(trackCol, trackRow);
		var index = getIndex(trackCol, trackRow);

		if (tileHere == TELEPORT) {
			selectedTab = "map";
			teleporting = true;
			return;
		}

		if (tileHere == PORTAL_IN) {
			if (!warrior.hasPortalKey) {
				new Notification("Need portal key!", "pink");
				return;
			}
			var portalIndex = 0;
			while (trackGrid[portalIndex] != PORTAL_IN || portalIndex == index) {
				portalIndex++;
			}
			var row = getRow(portalIndex);
			var col = getCol(portalIndex);
			warrior.x = col * TRACK_W + TRACK_W / 2;
			warrior.y = row * TRACK_H + TRACK_H / 2;
			return;
		} else if (tileHere == GREEN_PORTAL_IN) {
			if (!warrior.hasGreenPortalKey) {
				new Notification("Need portal key!", "lightgreen");
				return;
			}
			var portalIndex = 0;
			while (trackGrid[portalIndex] != GREEN_PORTAL_IN || portalIndex == index) {
				portalIndex++;
			}
			var row = getRow(portalIndex);
			var col = getCol(portalIndex);
			warrior.x = col * TRACK_W + TRACK_W / 2;
			warrior.y = row * TRACK_H + TRACK_H / 2;
			return;
		}

		if (tileHere == APPLE) {
			warrior.handleApple(index);
			return;
		} else if (tileHere == GRAPES) {
			warrior.handleGrapes(index);
			return;
		}


		if (!warrior.talkingToNPC) {
			for (var i = 0; i < currentLevel.NPCArray.length; i++) {
				var currentNPC = currentLevel.NPCArray[i];
				if (isAdjacent(warrior, currentNPC, 1)) {
					walkingSound.pause();
					warrior.talkingToNPC = true;
					warrior.currentNPC = currentNPC;
					var currQuest = warrior.currentNPC.quests[warrior.currentNPC.currentQuestNum];
					if (currQuest && !currQuest.givenQuest && !currQuest.checkPrerequisites()) {
						showingQuestNotReady = true; //change to showingQuestsUnavailable
					} else if (currQuest && currQuest.givenQuest && !currQuest.checkConditionLists()) {
						showingQuestIncomplete = true;
					} else if (warrior.currentNPC.currentQuestNum >= warrior.currentNPC.quests.length) {
						showingOutOfQuests = true;
					} else if (currQuest && currQuest.givenQuest && !currQuest.completed && currQuest.checkConditionLists()) {
						new Notification("Quest completed!", "#C598E1");
						warrior.numQuests--;
						warrior.exp += currQuest.expYield;
						warrior.numCoins += currQuest.coinYield;
						for (var i = 0; i < currQuest.itemYield.length; i++) {
							if (warrior.numBagItems < warrior.bagSize) {
								warrior.bag.push(currQuest.itemYield[i]);
								warrior.numBagItems++;
							}
						}
						warrior.quests.splice(currQuest.questsArrayIndex, 1);
						currQuest.completed = true;
						warrior.completedQuests.push(currQuest);
						showingQuestFinish = true;
					}
					return;
				}
			}
		} else if (warrior.talkingToNPC && (showingQuestIncomplete || showingOutOfQuests || showingQuestNotReady)) {
			warrior.talkingToNPC = false;
			warrior.currentNPC = null;
			showingQuestIncomplete = false;
			showingOutOfQuests = false;
			showingQuestNotReady = false;
			return;
		} else if (warrior.talkingToNPC && showingQuestFinish) {
			showingQuestFinish = false;
			warrior.currentNPC.currentQuestNum++;
			warrior.talkingToNPC = false;
			warrior.currentNPC = null;
			return;
		} else if (warrior.talkingToNPC && !showingQuestFinish && !showingQuestIncomplete) {
			var currQuest = warrior.currentNPC.quests[warrior.currentNPC.currentQuestNum];
			warrior.questDialogueIndex += 1;
			if (warrior.questDialogueIndex == currQuest.story.length) {
				currQuest.givenQuest = true;
				warrior.talkingToNPC = false;
				currQuest.questsArrayIndex = warrior.numQuests;
				warrior.quests.push(currQuest);
				checkForQuestItemsAtStart(currQuest);
				warrior.numQuests++;
				warrior.questDialogueIndex = 0;
				new Notification("New quest recieved (M)", "#C598E1");
			}
			return;
		}

		if (!warrior.inChest) {
			var chestCounter = 0;
			for (var i = 0; i < TRACK_COLS * TRACK_ROWS; i++) {
				if (trackGrid[i] == CHEST && isAdjacent(chests[chestCounter], warrior, 1)) {
					warrior.currentChest = chests[chestCounter];
					if (warrior.currentChest.isLocked && warrior.keys != 0) {
						chestOpen.play();
						warrior.inChest = true;
						outputCanvasStatus = "showingChest";
						warrior.keys--;
						warrior.currentChest.isLocked = false;
					} else if (!warrior.currentChest.isLocked) {
						chestOpen.play();
						warrior.inChest = true;
						outputCanvasState = "showingChest";
					} else {
						new Notification("Not enough keys!");
					}
					console.log(warrior.currentChest.items);
					return;
				}
				if (trackGrid[i] == CHEST) {
					chestCounter++;
				}
			}
		} else if (warrior.inChest) {
			warrior.inChest = false;
			return;
		}
		if (!warrior.shopping) {
			var shopCounter = 0;
			for (var i = 0; i < TRACK_COLS * TRACK_ROWS; i++) {
				if ((trackGrid[i] == SHOP || trackGrid[i] == BLACKSMITH || trackGrid[i] == ARMORER ||
					trackGrid[i] == GEMSMITH || trackGrid[i] == FARMER) && isAdjacent(shops[shopCounter], warrior, 1)) {
					warrior.currentShop = shops[shopCounter];
					warrior.shopping = true;
					selectedTab = "shop";
					walkingSound.pause();
					return;
				}
				if (trackGrid[i] == SHOP || trackGrid[i] == BLACKSMITH || trackGrid[i] == ARMORER ||
					trackGrid[i] == GEMSMITH || trackGrid[i] == FARMER) {
					shopCounter++;
				}
			}
		} else if (selectedTab == "shop") {
			warrior.shopping = false;
			selectedTab = null;
		} else {
			selectedTab = "shop";
		}
	}
	keySet(evt, warrior, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	if (evt.keyCode == KEY_SHIFT) {
		warrior.blocking = false;
	}
	keySet(evt, warrior, false);
}
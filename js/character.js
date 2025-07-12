function charClass(className) {
	this.x;
	this.y;
	this.class = className;
	this.baseSpeed;
	this.speed;
	this.iceSpeed = 15;
	this.name = "untitled character";
	this.score = 2;

	this.baseAttackRate;
	this.attackRate;
	this.canAttack = true;

	this.baseDamage;
	this.damage;

	this.baseDefense;
	this.defense;

	this.keys = 0;
	this.hasPortalKey = false;
	this.hasGreenPortalKey = false;

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_East = false;
	this.keyHeld_West = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.exp = 1000;
	this.levelExp;

	this.maxHealth;
	this.health;

	this.maxMana = 10;
	this.mana = 10;
	this.manaRegenSpeed = 0.3; //points per second
	this.manaRegenInterval = setInterval(function() {
								warrior.mana += warrior.manaRegenSpeed;
								if (warrior.mana > warrior.maxMana) {
									warrior.mana = warrior.maxMana;
								}}, 1000);

	this.shopping = false;
	this.currentShop = null;

	this.inventory1;
	this.inventory2;

	this.bossesKilled = new Vector();
	this.caged = false;

	this.setInventoryItems = function() {
		let weapon1 = createItemCopy(weapons[0]);
		let armor1 = createItemCopy(armors[0]);
		let helmet1 = createItemCopy(helmets[0]);
		let boots1 = createItemCopy(boots[0]);
		let shield1 = createItemCopy(shields[0]);

		this.inventory1 = {
			"weapon": weapon1,
			"armor": armor1,
			"helmet": helmet1,
			"boots": boots1,
			"shield": shield1
		}

		let weapon2 = createItemCopy(weapons[2]);

		this.inventory2 = {
			"weapon": weapon2,
			"armor": null,
			"helmet": null,
			"boots": null,
			"shield": null
		}

	}

	this.setInventoryItems();

	this.inventory = {
		0: this.inventory1,
		1: this.inventory2
	}

	this.currInv = 0;

	this.talkingToNPC = false;
	this.currentNPC = null;
	this.questDialogueIndex = 0;
	this.quests = [];
	this.completedQuests = [];
	this.numQuests = 0;
	this.questBag = []; //holds quest items

	this.numBagItems = 0;
	this.bag = [];
	this.bagSize = 20;

	//this.inventoryMisc = ["iPhone"];

	this.onIce = false;
	this.iceBoots = false //change this to make an inventory item that i can display
	this.iceDirection;

	this.inChest = false;
	this.currentChest = null;

	this.teleportCost = 500;

	this.companion = null;

	this.facePic;

	this.blocking = false;

	this.availableStatPerks = 0;
	this.availableSpellPerks = 0;
	this.nextLevelUp = 2;

	this.projectiles = new Vector();

	this.currentSpell = fireballSpell;
	this.allSpells = [fireballSpell, lightningSpell, snowflakeSpell, fireballRadialSpell, snowflakeRadialSpell, lightningRadialSpell, fireballMultishotSpell, snowflakeRotatingSpell, lightningBouncingSpell, fireballSpiralingSpell, meteorSpell];
	this.spellOptions = new Vector();
	this.spellOptions.push(fireballSpell);
	this.spellOptions.push(lightningSpell);
	this.spellOptions.push(snowflakeSpell);
	this.spellOptions.push(meteorSpell)

	this.activeAura = null;
	this.allAuras = [healthAura, damageAura, defenseAura, healthRegenAura];
	this.auraOptions = new Vector();
	this.auraOptions.push(healthAura);
	this.auraOptions.push(damageAura);
	this.auraOptions.push(defenseAura);

	this.canTakeSpikeDamage = true;

	this.numCoins = 0;
	this.maxNumCoins = this.numCoins;

	this.numLevelsVisited = 0;

	this.burning = false;
	this.burningDamage = 0; //just a default

	this.setupInput = function(up, right, down, left) {
		this.controlKeyUp = up;
		this.controlKeyRight = right;
		this.controlKeyDown = down;
		this.controlKeyLeft = left;
	};

	this.reset = function(image, charName) {
		this.name = charName;

		for (var row = 0; row < TRACK_ROWS; row++) {
			for (var col = 0; col < TRACK_COLS; col++) {
				var index = getIndex(col, row);
				if (trackGrid[index] == spawn) {
					if (spawn == TRACK_START) {
						trackGrid[index] = TRACK_ROAD;
					}
					this.x = col * TRACK_W + TRACK_W/2;
					this.y = row * TRACK_H + TRACK_H/2;

					this.companion.reset();	
					return;
				}
			}
		}
	};

	this.checkLevelUp = function() {
		var level = Math.floor(this.exp/this.levelExp)+1;
		if (level > this.nextLevelUp) {
			this.nextLevelUp = level+1;
		}
		if (level == this.nextLevelUp) {
			this.availableStatPerks++;
			this.availableSpellPerks++;
			this.nextLevelUp++;
			this.health = this.maxHealth;
			this.mana = this.maxMana;
			new Notification("You leveled up!", "lightblue");
			setTimeout(function() {new Notification("New stat upgrade (B)", "lightgreen");}, 5000);
			setTimeout(function() {new Notification("New skill upgrade (B)", "lightgreen");}, 10000);
		}
	}

	this.handleIce = function() {
		var index = getIndexFromXY(this.x, this.y);
		if (trackGrid[index] == TRACK_WALL) {
			this.onIce = false;
			if (trackGrid[getIndexFromXY(this.x, this.y-this.speed)] == TRACK_ICE) {
				this.y -= this.iceSpeed;
			} else if (trackGrid[getIndexFromXY(this.x, this.y+this.speed)] == TRACK_ICE) {
				this.y += this.iceSpeed;
			} else if (trackGrid[getIndexFromXY(this.x-this.speed, this.y)] == TRACK_ICE) {
				this.x -= this.iceSpeed;
			} else if (trackGrid[getIndexFromXY(this.x+this.speed, this.y)] == TRACK_ICE) {
				this.x += this.iceSpeed;
			}
			return;
		}
		if (trackGrid[index] != TRACK_ICE) {
			this.onIce = false;
			return;
		} else {
			if (this.iceDirection == "up") {
				this.y -= this.iceSpeed;
			} else if (this.iceDirection == "down"){
				this.y += this.iceSpeed;
			} else if (this.iceDirection == "left"){
				this.x -= this.iceSpeed;
			} else if (this.iceDirection == "right"){
				this.x += this.iceSpeed;
			}
		}
	};

	this.move = function() {
		if (this.burning) {
			this.takeDamage(this.burningDamage);
		}
		this.checkLevelUp();

		if (this.companion.alive) {
			this.companion.move();
			this.companion.attack();
		}

		var soundCheckerX = this.x;
		var soundCheckerY = this.y;
		var nextX = this.x;
		var nextY = this.y;

		var currentIndex = getIndexFromXY(this.x, this.y);

		var coinsSize = coins.size();
		for (var i = 0; i < coinsSize; i++) {
			var coin = coins.getElemAtIndex(i);
			if (isAdjacentXY(this, coin, 15, 15)) {
				this.numCoins += coin.value;
				this.maxNumCoins = Math.max(this.maxNumCoins, this.numCoins);
				coins.remove(coin.index, 1);
			}
		}

		//ice handling edge case, try to work this in with other ice handling below
		if (trackGrid[currentIndex] == TRACK_ICE) { //this means we have slid into a wall from ice
			//console.log("icy");
			this.iceDirection = "none"
			if (this.keyHeld_North) {
				this.iceDirection = "up";
			} else if (this.keyHeld_South) {
				this.iceDirection = "down";
			} else if (this.keyHeld_East) {
				this.iceDirection = "right";
			} else if (this.keyHeld_West) {
				this.iceDirection = "left";
			}
			if (this.iceDirection != "none") {
				this.onIce = true;
				this.handleIce();
			}
			return;
		}

		var step;
		if (trackGrid[currentIndex] == WEB) {
			step = 1;
		} else {
			step = this.speed;
		}

		if (this.keyHeld_North) {
			nextY -= step;
		}
		if (this.keyHeld_South) {
			nextY += step;
		} 
		if (this.keyHeld_East) {
			nextX += step;
		}
		if (this.keyHeld_West) {
			nextX -= step;
		}

		var trackCol = Math.floor(nextX/TRACK_W);
		var trackRow = Math.floor(nextY/TRACK_H);
		var tileHere = returnTileType(trackCol, trackRow);
		var index = getIndex(trackCol, trackRow);

		
		if (tileHere == POISON) { //implement status effects (poison, burning, frozen(slow), stunned) -- show on bottom right of canvas2
			this.takeDamage(0.01);
		}

		for (var i = 0; i < currentLevel.questItemsArray.length; i++) {
			var questItem = currentLevel.questItemsArray[i];
			if (!questItem.pickedUp && Math.abs(nextX - questItem.x) < 30 && Math.abs(nextY - questItem.y) < 30) {
				warrior.questBag.push(questItem);
				questItem.pickedUp = true;
				new Notification("Picked up quest item!", "#BA6FE8");
				for (var j = 0; j < warrior.quests.length; j++) {
					var conditions = warrior.quests[j].conditionList;
					for (var k = 0; k < conditions.length; k++) {
						if (conditions[k].name == questItem.name) {
							conditions[k].reduceCounter(1);
						}
					}
				}
			}
		}

		if (gameMode == "story") {
			if (currentArea.next != null) {
				for (var i = 0; i < currentArea.next.trackCodes.length; i++) {
					if (trackGrid[index] == currentArea.next.trackCodes[i]) {
						loadArea(currentArea.next.areas[i]);
						return;
					}
				}
			}
		} else if (gameMode == "random" && tileHere == TRACK_GOAL) {
			var numBossesAlive = 0;
			if (currentLevel.hasBoss) {
				for (var i = 0; i < enemies.length; i++) {
					if (enemies[i].isBoss && enemies[i].alive) {
						numBossesAlive++;
					}
				}
			}
			if (numBossesAlive == 0) {
				loadNextRandomArea();
			}
		}



		//bad execution, but need something that makes it so you can't go on top of an enemy
		// for (var i = 0; i < enemies.length; i++) {
		// 	if (enemies[i].alive && Math.abs(nextX - enemies[i].x) < 35 && Math.abs(nextY - enemies[i].y) < 35) {
		// 		return;
		// 	}
		// } 

		//TODO: tidy this up
		//slices maybe should be deep copies
		//maybe show quests that still need to be completed to reach boss
		if (tileHere == NORTH && currentLevel.north.checkEntryQuestPrerequisites()) {
			spawn = SPAWN_SOUTH;
			currentLevel.enemies = enemies.slice();
			currentLevel.chests = chests.slice();
			currentLevel.shops = shops.slice();
			currentLevel.mapArray = trackGrid.slice();
			loadLevel(currentLevel.north);
			currentLevel = currentLevel.north;
		} else if (tileHere == EAST && currentLevel.east.checkEntryQuestPrerequisites()) {
			spawn = SPAWN_WEST;
			currentLevel.enemies = enemies.slice();
			currentLevel.chests = chests.slice();
			currentLevel.shops = shops.slice();
			currentLevel.mapArray = trackGrid.slice();
			loadLevel(currentLevel.east);
			currentLevel = currentLevel.east;
		} else if (tileHere == SOUTH && currentLevel.south.checkEntryQuestPrerequisites()) {
			spawn = SPAWN_NORTH;
			currentLevel.enemies = enemies.slice();
			currentLevel.chests = chests.slice();
			currentLevel.shops = shops.slice();
			currentLevel.mapArray = trackGrid.slice();
			loadLevel(currentLevel.south);
			currentLevel = currentLevel.south;
		} else if (tileHere == WEST && currentLevel.west.checkEntryQuestPrerequisites()) {
			spawn = SPAWN_EAST;
			currentLevel.enemies = enemies.slice();
			currentLevel.chests = chests.slice();
			currentLevel.shops = shops.slice();
			currentLevel.mapArray = trackGrid.slice();
			loadLevel(currentLevel.west);
			currentLevel = currentLevel.west;
		}


		else if (tileHere == TRACK_KEY) {
			keyPickup.play();
			trackGrid[index] = TRACK_ROAD;
			this.keys++;
		} 
		else if (tileHere == PORTAL_KEY) {
			keyPickup.play();
		  	trackGrid[index] = TRACK_ROAD;
		 	this.hasPortalKey = true;
		} else if (tileHere == GREEN_PORTAL_KEY) {
			keyPickup.play();
		  	trackGrid[index] = TRACK_ROAD;
		 	this.hasGreenPortalKey = true;
		} 
		else if (tileHere == TRACK_DOOR && this.keys > 0) {
			doorOpen.play();
			trackGrid[index] = TRACK_ROAD;
			this.keys--;
		} else if (tileHere == APPLE && (this.health < this.maxHealth || applesAutomatic)) {
			this.handleApple(index);
		} else if (tileHere == GRAPES && (this.mana < this.maxMana || grapesAutomatic)) {
			this.handleGrapes(index);
		} else if (tileHere == LEVEL_UP) {
			warrior.exp += warrior.levelExp;
			trackGrid[index] = TRACK_ROAD;
		} else if (tileHere == SPIKES_OUT && this.canTakeSpikeDamage) {
			this.takeDamage(this.maxHealth/4);
			this.canTakeSpikeDamage = false;
			setTimeout(function() {
							warrior.canTakeSpikeDamage = true;
						}, 500)
		} else if (tileHere == TRACK_ICE) {
			var currCol = Math.floor(this.x/TRACK_W);
			var currRow = Math.floor(this.y/TRACK_H);
			var direction;
			if (currCol == trackCol - 1) { //NOTE: handle edge case where you approach from the corner
				this.iceDirection = "right";
			} else if (currCol == trackCol + 1) {
				this.iceDirection = "left";
			} else if (currRow == trackRow - 1) {
				this.iceDirection = "down";
			} else if (currRow == trackRow + 1) {
				this.iceDirection = "up";
			}
			this.x = nextX;
			this.y = nextY;
			this.onIce = true;
			this.handleIce();
		} else if ((tileHere == TRACK_ROAD && !isBlockNearbyXY(nextX, nextY, TRACK_WALL 
			&& !isBlockNearbyXY(nextX, nextY, SHOP)))|| tileHere == PORTAL_IN || tileHere == GREEN_PORTAL_IN || tileHere == SPAWN_NORTH || 
			tileHere == SPAWN_EAST || tileHere == SPAWN_SOUTH || tileHere == SPAWN_WEST || tileHere == TELEPORT || tileHere == SPIKES_IN || 
			tileHere == SPIKES_OUT || tileHere == WEB || tileHere == POISON || tileHere == APPLE || tileHere == GRAPES || tileHere == TRACK_GOAL) {
			this.x = nextX;
			this.y = nextY;
		} else if ((this.keyHeld_North || this.keyHeld_South) && trackGrid[getIndexFromXY(this.x, nextY)] == TRACK_ROAD) {
			this.y = nextY;
		} else if ((this.keyHeld_East || this.keyHeld_West) && trackGrid[getIndexFromXY(nextX, this.y)] == TRACK_ROAD) {
			this.x = nextX;
		}

		//TODO: Change above two cases to all walkable blocks, not just TRACK_ROAD

		if (soundCheckerX != this.x || soundCheckerY != this.y) {
			if (!playingWalkSound) {
				playingWalkSound = true;
				walkingSound.startOrStopMusic();
			}
		} else {
			if (playingWalkSound) {
				playingWalkSound = false;
				walkingSound.startOrStopMusic();
			}
		}
	};

	this.meleeAttack = function() {
		var counter = 0;
		for (var i = 0; i < enemies.length; i++) {
			if (isAdjacent(this, enemies[i], 1) && this.canAttack && enemies[i].alive) {
				if (this.companion) {
					this.companion.target = enemies[i];
				}
				var currWeapon = this.inventory[this.currInv]["weapon"];
				var allPerks = [];
				if (currWeapon) {
					allPerks = currWeapon.effectFunctions;
				}
				for (var k = 0; k < currWeapon.gemsLength; k++) {
					allPerks = allPerks.concat(currWeapon.gems[k].effectFunctions);
				}
				for (var j = 0; j < allPerks.length; j++) {
					var curr = allPerks[j];
					var params = [enemies[i], curr.params.slice()]
					curr.attackFunction.apply(this, params);
				}
				enemies[i].takeDamage(this.damage);
				counter++;
				if (counter >= 3) {
					break;
				}
			}
		}
		this.canAttack = false;
		setTimeout(function() {warrior.canAttack = true;}, this.attackRate);
	}

	this.rangedAttack = function(x, y) {
		if (this.mana < this.currentSpell.manaCost) {
			return;
		}
		this.mana -= this.currentSpell.manaCost;
		this.currentSpell.attackFunction(x, y);
		this.canAttack = false;
		setTimeout(function() {warrior.canAttack = true;}, this.attackRate+this.currentSpell.attackRate);
	}

	this.attack = function(x, y) {
		if (!warrior.canAttack) {
			return;
		}
		swooshSound.play();
		if (this.inventory[this.currInv]["weapon"] == null || this.inventory[this.currInv]["weapon"].weaponType == "melee") {
			this.meleeAttack();
		} else if (this.inventory[this.currInv]["weapon"].weaponType == "ranged") {
			this.rangedAttack(x + camPanX, y + camPanY);
		}
	}

	this.handleApple = function(index) {
		if (this.health < this.maxHealth) {
			appleEffect();
			trackGrid[index] = TRACK_ROAD;
		} else if (this.numBagItems < this.bagSize) {
			var apple = getItem("apple", consumables);
			this.bag.push(apple);
			this.numBagItems++;
			trackGrid[index] = TRACK_ROAD;
		} else {
			this.x = nextX;
			this.y = nextY;
		}
	}

	this.handleGrapes = function(index) {
		if (this.mana < this.maxMana) {
			grapeEffect();
			trackGrid[index] = TRACK_ROAD;
		} else if (this.numBagItems < this.bagSize) {
			var grapes = getItem("grapes", consumables);
			this.bag.push(grapes);
			this.numBagItems++;
			trackGrid[index] = TRACK_ROAD;
		} else {
			this.x = nextX;
			this.y = nextY;
		}
	}

	this.takeDamage = function(damage, source) {
		if (this.blocking) { //TODO: doesnt cover burning/poison/other status effects
			return;
		}
		if (arguments.length > 1) {
			var currArmor = this.inventory[this.currInv]["armor"];
			var allPerks = [];
			if (currArmor) {
				allPerks = currArmor.effectFunctions;
			}
			if (this.activeAura) {
				allPerks = allPerks.concat(this.activeAura.effectFunctions);
			}
			for (var i = 0; i < allPerks.length; i++) {
				var curr = allPerks[i];
				var params = [source, damage, curr.params.slice()]
				curr.defenseFunction.apply(this, params);
			}
		}
		playerDamageSound.play();
		this.health -= (damage/this.defense)*(randomInt(8,12)*0.1); //from 80% to 120%
		if (this.health <= 0) {
			this.exp -= 500;
			if (this.exp < 0) {
				this.exp = 0;
			}
			showingLoseScreen = true;
		}
	};

	this.moveAndDrawProjectiles = function() {
		var projectilesSize = this.projectiles.size()
		for (var i = 0; i < projectilesSize; i++) {
			this.projectiles.getElemAtIndex(i).move();
			this.projectiles.getElemAtIndex(i).draw();
		}
	}

	this.draw = function() {
		if (this.burning) {
			console.log("character is burning!!")
		}
		if (this.activeAura) {
			this.activeAura.draw();
		}
		if (this.companion.alive) {
			this.companion.draw();
		}
		drawImageRotated(this.facePic, this.x, this.y, 0);
		if (this.inventory[this.currInv]["armor"] != null) {
			drawImageRotated(this.inventory[this.currInv]["armor"].pic[this.class], this.x, this.y, 0);
		} else {
			drawImageRotated(nakedTorso, this.x, this.y, 0);
		}

		if (this.inventory[this.currInv]["boots"] != null) {
			drawImageRotated(this.inventory[this.currInv]["boots"].pic[this.class], this.x, this.y, 0);
		} else {
			drawImageRotated(nakedFeet, this.x, this.y, 0);
		}

		if (this.inventory[this.currInv]["helmet"] != null) {
			drawImageRotated(this.inventory[this.currInv]["helmet"].pic[this.class], this.x, this.y, 0);
		}

		if (this.inventory[this.currInv]["weapon"] != null) {
			if (warrior.canAttack) {
				drawImageRotated(this.inventory[this.currInv]["weapon"].pic[this.class], this.x, this.y, 0);
			} else {
				drawImageRotated(this.inventory[this.currInv]["weapon"].pic[this.class], this.x + 9, this.y - 15, 7);
			}
		}

		if (this.blocking && this.inventory[this.currInv]["shield"] != null) {
			drawImageRotated(this.inventory[this.currInv]["shield"].pic[this.class], this.x, this.y, 0);
		}
		this.moveAndDrawProjectiles();
	};

	this.equip = function(item) {
		var type = item.type;
		var invItem = this.inventory[this.currInv][type];
		if (invItem != null) {
			this.bag.push(invItem); //add check to make sure there is space
			this.numBagItems++;
		}
		this.inventory[this.currInv][type] = item;
		this.setValuesFromInventory();
	};

	this.shop = function() {
		showBag();
		this.currentShop.drawShop();
	};

	this.buy = function(itemIndex) {
		if (this.numBagItems >= this.bagSize) {
			new Notification("Bag is full!");
			return;
		}
		var item = this.currentShop.items[itemIndex];
		var cost = item.cost;
		if (this.numCoins < cost) { 
			strikeSound.play();
			new Notification("Not enough coins!");
			return;
		}
		buyItem.play();
		this.numCoins -= cost;
		this.bag.push(item);
		this.numBagItems++;
		this.currentShop.items.splice(itemIndex, 1);
		this.currentShop.numItems--;
		this.setValuesFromInventory();
	};
	
	this.setDamageFromInventory = function() {
		this.damage = this.baseDamage;
		for (var i = 0; i < itemTypes.length; i++) {
			var type = itemTypes[i];
			if (this.inventory[this.currInv][type] == null) {
				continue;
			}
			this.damage += this.inventory[this.currInv][type].damage;
		}
		if (this.inventory[this.currInv]["weapon"] != null && this.inventory[this.currInv]["weapon"].weaponType == "ranged") {
			this.damage += this.currentSpell.damage;
		}
	};

	this.setDefenseFromInventory = function() {
		this.defense = this.baseDefense;
		for (var i = 0; i < itemTypes.length; i++) {
			var type = itemTypes[i];
			if (this.inventory[this.currInv][type] == null) {
				continue;
			}
			this.defense += this.inventory[this.currInv][type].defense;
		}
	};

	this.setSpeedFromInventory = function() {
		this.speed = this.baseSpeed;
		for (var i = 0; i < itemTypes.length; i++) {
			var type = itemTypes[i];
			if (this.inventory[this.currInv][type] == null) {
				continue;
			}
			this.speed += this.inventory[this.currInv][type].speed;
		}
	};

	this.setAttackRateFromInventory = function() {
		this.attackRate = this.baseAttackRate;
		for (var i = 0; i < itemTypes.length; i++) {
			var type = itemTypes[i];
			if (this.inventory[this.currInv][type] == null) {
				continue;
			}
			this.attackRate += this.inventory[this.currInv][type].attackRate;
		}
		if (this.inventory[this.currInv]["weapon"] != null && this.inventory[this.currInv]["weapon"].weaponType == "ranged") {
			this.attackRate += this.currentSpell.attackRate;
		}
	};

	this.setValuesFromInventory = function() {
		this.setDamageFromInventory();
		this.setDefenseFromInventory();
		this.setSpeedFromInventory();
		this.setAttackRateFromInventory();
	};
}

charClass.prototype.setSpeed = function(speed) {
	this.baseSpeed = speed;
	return this;
};

charClass.prototype.setAttackRate = function(attackRate) {
	this.baseAttackRate = attackRate;
	return this;
};

charClass.prototype.setDamage = function(damage) {
	this.baseDamage = damage;
	return this;
};

charClass.prototype.setLevelExp = function(levelExp) {
	this.levelExp = levelExp;
	return this;
};

charClass.prototype.setHealth = function(health) {
	this.maxHealth = health;
	this.health = health;
	return this;
};

charClass.prototype.setMana = function(mana) {
	this.maxMana = mana;
	this.mana = mana;
	return this;
};

charClass.prototype.setDefense = function(defense) {
	this.baseDefense = defense;
	return this;
};

charClass.prototype.setBag = function(item) {
	let newItem = Object.assign({}, item);
	this.bag = [newItem];
	this.numBagItems = this.bag.length;
	return this;
};

charClass.prototype.setFacePic = function(facePic) {
	this.facePic = facePic;
	return this;
};

charClass.prototype.setInvValues = function() {
	this.setValuesFromInventory();
	return this;
}
var selectedShopItem = null;
var selectedShopItemCol = null;
var selectedShopItemRow = null;
var selectedShopItemIndex = null;

var shops = [];

function spawnShops(minNumItems, maxNumItems) {
	shops = [];
	for (var row = 0; row < TRACK_ROWS; row++) {
		for (var col = 0; col < TRACK_COLS; col++) {
			var index = getIndex(col, row);
			var itemsArray;
			var type;
			if (trackGrid[index] == SHOP) {
				itemsArray = GC.ALL_SHOP_ITEMS;
				type = "Shop";
				console.log("shop at "+index);
			} else if (trackGrid[index] == BLACKSMITH) {
				itemsArray = weapons;
				type = "Blacksmith";
				console.log("blacksmith at "+index);
			} else if (trackGrid[index] == ARMORER) {
				itemsArray = armors.concat(helmets).concat(boots).concat(shields);
				type = "Armorer";
				console.log("armorer at "+index);
			} else if (trackGrid[index] == GEMSMITH) {
				itemsArray = allGems;
				type = "Gemsmith";
				console.log("gemsmith at "+index);
			} else if (trackGrid[index] == FARMER) {
				itemsArray = consumables;
				type = "Farmer";
				console.log("farmer at "+index);
			} else {
				continue;
			}
			var random = Math.floor(Math.random()*(maxNumItems-minNumItems)+minNumItems); //this max is exclusive
			newShop = new shopClass(type, random, itemsArray);
			newShop.x = col * TRACK_W + TRACK_W/2;	
			newShop.y = row * TRACK_H + TRACK_H/2;
			shops.push(newShop);
		}
	}
}

function shopClass(type, numItems, itemArray) {
	this.type = type;
	this.x;
	this.y;
	this.numItems = numItems;
	this.itemArray = itemArray;
	this.items = [];

	this.generateShopItems = function() {
		var numChoices = this.itemArray.length;
		for (i = 0; i < this.numItems; i++) {
			var random = Math.random()*numChoices;
			var index = Math.floor(random);
			var item = this.itemArray[index];
			if (item.cost > warrior.maxNumCoins+200) {
				i--; //bad style?
				continue;
			}
			var newItem = createItemCopy(item);
			this.items.push(newItem);
		}
	}
	this.generateShopItems();
}


function getShopItemUnderMouse(x, y) {
	var index = getItemIndexUnderMouse(x, y, GC.SHOP_GRID_X, GC.SHOP_GRID_Y, GC.SHOP_SLOTS_X, GC.SHOP_SLOTS_Y, GC.SHOP_ROW_SLOTS);
	if (index < warrior.currentShop.items.length) {
		return warrior.currentShop.items[index];
	} 
	return null;
}

function getShopBagItemUnderMouse(x, y) {
	var index = getItemIndexUnderMouse(x, y, GC.SHOP_BAG_X, GC.SHOP_BAG_Y, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, GC.BAG_ROW_SLOTS);
	if (index < warrior.bag.length) {
		return warrior.bag[index];
	} 
	return null;
}

function getItemIndexUnderMouse(x, y, gridX, gridY, gridSlotsX, gridSlotsY, numCols) {
	var relativeX = x - gridX;
	var relativeY = y - gridY;
	var col = Math.floor(relativeX/gridSlotsX);
	var row = Math.floor(relativeY/gridSlotsY);
	var index = col + row*numCols;
	return index;
}

function getItemColUnderMouse(x, y, gridX, gridY, gridSlotsX) {
	var relativeX = x - gridX;
	var relativeY = y - gridY;
	var col = Math.floor(relativeX/gridSlotsX);
	return col;
}

function getItemRowUnderMouse(x, y, gridX, gridY, gridSlotsY) {
	var relativeX = x - gridX;
	var relativeY = y - gridY;
	var row = Math.floor(relativeY/gridSlotsY);
	return row;
}

function clickShopBag(mouseX, mouseY) {
	selectedItemCol = getItemColUnderMouse(mouseX, mouseY, GC.SHOP_BAG_X, GC.SHOP_BAG_Y, GC.BAG_SLOTS_X);
	selectedItemRow = getItemRowUnderMouse(mouseX, mouseY, GC.SHOP_BAG_X, GC.SHOP_BAG_Y, GC.BAG_SLOTS_Y);
	selectedItem = getShopBagItemUnderMouse(mouseX, mouseY);
	console.log(selectedItem.name);
	selectedShopItem = null;
	selectedInvItem = null;
}

function clickShopInventory(mouseX, mouseY) {
	if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_SWAP_X, GC.SHOP_INV_SWAP_Y, GC.SHOP_INV_SWAP_W, GC.SHOP_INV_SWAP_H)) {
		if (selectedInvItem != null) {
			if (warrior.currInv == 0) {
				warrior.inventory[0][selectedInvItem.type] = warrior.inventory[1][selectedInvItem.type]
				warrior.inventory[1][selectedInvItem.type] = selectedInvItem;
			} else {
				warrior.inventory[1][selectedInvItem.type] = warrior.inventory[0][selectedInvItem.type]
				warrior.inventory[0][selectedInvItem.type] = selectedInvItem;
			}
			selectedInvItem = null;
			warrior.setValuesFromInventory();
			return;
		}
		if (warrior.currInv == 0) {
			warrior.currInv = 1;
		} else {
			warrior.currInv = 0;
		}
		warrior.setValuesFromInventory();
		return;
	}
	if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_UNEQUIP_X, GC.SHOP_INV_UNEQUIP_Y, GC.SHOP_INV_UNEQUIP_W, GC.SHOP_INV_UNEQUIP_H)) {
		if (selectedInvItem != null) {
			warrior.inventory[warrior.currInv][selectedInvItem.type] = null;
			warrior.bag.push(selectedInvItem);
			warrior.numBagItems++;
			selectedInvItem = null;
			warrior.setValuesFromInventory();
			return;
		}
	}
	if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_HELMET_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_HELMET_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		console.log("it worked ;)")
		selectedInvItem = warrior.inventory[warrior.currInv]["helmet"];
	} else if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_ARMOR_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_ARMOR_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["armor"];
	} else if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_SHIELD_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_SHIELD_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["shield"];
	} else if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_WEAPON_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_WEAPON_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["weapon"];
	} else if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_BOOTS_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_BOOTS_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["boots"];
	} else {
		selectedInvItem = null;
		return;
	}
	console.log(selectedInvItem.name)
	selectedItem = null;
	selectedShopItem = null;
}

function handleMouseclickShopScreen(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (mouseInBounds(mouseX, mouseY, GC.SHOP_BAG_X, GC.SHOP_BAG_Y, GC.BAG_LENGTH, GC.BAG_HEIGHT)) {
		clickShopBag(mouseX, mouseY);
		return;
	}
	if (mouseInBounds(mouseX, mouseY, GC.SHOP_INV_SHIELD_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_HELMET_Y-GC.BAG_SLOTS_Y/2, 200, 300)) {
		clickShopInventory(mouseX, mouseY);
		return
	}
	if (selectedShopItem != null && mouseInBounds(mouseX, mouseY, GC.SHOP_BUTTONS_X, GC.SHOP_BUY_Y, GC.SHOP_BUTTONS_W, GC.SHOP_BUTTONS_H)) {
		warrior.buy(selectedShopItemIndex);
		selectedShopItem = null;
		return;
	}
	if (selectedItem != null && mouseInBounds(mouseX, mouseY, GC.SHOP_BUTTONS_X, GC.SHOP_SELL_Y, GC.SHOP_BUTTONS_W, GC.SHOP_BUTTONS_H)) {
		if (warrior.currentShop.numItems >= 32) {
			new Notification("Shop is full!");
		} else {
			var index = selectedItemCol + selectedItemRow*GC.BAG_ROW_SLOTS;
			warrior.bag.splice(index, 1);
			warrior.numCoins += Math.round(selectedItem.cost/2);
			warrior.numBagItems--;
			warrior.currentShop.items.push(selectedItem);
			warrior.currentShop.numItems++;
			selectedItem = null;
		}
	}
	if (mouseInBounds(mouseX, mouseY, GC.SHOP_GRID_X, GC.SHOP_GRID_Y, GC.SHOP_LENGTH, GC.SHOP_HEIGHT)) {
		selectedShopItemCol = getItemColUnderMouse(mouseX, mouseY, GC.SHOP_GRID_X, GC.SHOP_GRID_Y, GC.SHOP_SLOTS_X);
		selectedShopItemRow = getItemRowUnderMouse(mouseX, mouseY, GC.SHOP_GRID_X, GC.SHOP_GRID_Y, GC.SHOP_SLOTS_Y);
		selectedShopItemIndex = getItemIndexUnderMouse(mouseX, mouseY, GC.SHOP_GRID_X, GC.SHOP_GRID_Y, GC.SHOP_SLOTS_X, GC.SHOP_SLOTS_Y, GC.SHOP_ROW_SLOTS);
		selectedShopItem = getShopItemUnderMouse(mouseX, mouseY);
		selectedInvItem = null;
		selectedItem = null;
		return;
	}
}

function showShopInventory() {
	const BORDER = 3;

	colorRect(GC.SHOP_INV_HELMET_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_HELMET_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "#828282");
	colorRect(GC.SHOP_INV_ARMOR_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_ARMOR_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "#828282");
	colorRect(GC.SHOP_INV_SHIELD_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_SHIELD_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "#828282");
	colorRect(GC.SHOP_INV_WEAPON_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_WEAPON_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "#828282");
	colorRect(GC.SHOP_INV_BOOTS_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_BOOTS_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "#828282");

	setAllToDefaultColor();

	var helmet = warrior.inventory[warrior.currInv]["helmet"];
	if (helmet) {
		helmetColor = determineItemTierColor(helmet);
	}
	colorRect(GC.SHOP_INV_HELMET_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_HELMET_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, helmetColor);
	if (helmet) {
		drawImageRotatedScaled(helmet.pic[warrior.class], GC.SHOP_INV_HELMET_X+helmet.bagOffsetX, GC.SHOP_INV_HELMET_Y+helmet.bagOffsetY, 0, helmet.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "helmet") {
		colorRectOutline(GC.SHOP_INV_HELMET_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_HELMET_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}


	var armor = warrior.inventory[warrior.currInv]["armor"];
	if (armor) {
		armorColor = determineItemTierColor(armor);
	}
	colorRect(GC.SHOP_INV_ARMOR_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_ARMOR_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, armorColor);
	if (armor) {
		drawImageRotatedScaled(armor.pic[warrior.class], GC.SHOP_INV_ARMOR_X+armor.bagOffsetX-2, GC.SHOP_INV_ARMOR_Y+armor.bagOffsetY, 0, armor.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "armor") {
		colorRectOutline(GC.SHOP_INV_ARMOR_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_ARMOR_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}


	var shield = warrior.inventory[warrior.currInv]["shield"];
	if (shield) {
		shieldColor = determineItemTierColor(shield);
	}
	colorRect(GC.SHOP_INV_SHIELD_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_SHIELD_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, shieldColor);
	if (shield) {
		drawImageRotatedScaled(shield.pic[warrior.class], GC.SHOP_INV_SHIELD_X+shield.bagOffsetX, GC.SHOP_INV_SHIELD_Y+shield.bagOffsetY, 0, shield.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "shield") {
		colorRectOutline(GC.SHOP_INV_SHIELD_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_SHIELD_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}

	var weapon  = warrior.inventory[warrior.currInv]["weapon"];
	if (weapon) {
		weaponColor = determineItemTierColor(weapon);
	}
	colorRect(GC.SHOP_INV_WEAPON_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_WEAPON_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, weaponColor);
	if (weapon) {
		drawImageRotatedScaled(weapon.pic[warrior.class], GC.SHOP_INV_WEAPON_X+weapon.bagOffsetX, GC.SHOP_INV_WEAPON_Y+weapon.bagOffsetY, 0, weapon.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "weapon") {
		colorRectOutline(GC.SHOP_INV_WEAPON_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_WEAPON_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}

	var boots = warrior.inventory[warrior.currInv]["boots"];
	if (boots) {
		bootsColor = determineItemTierColor(boots);
	}
	colorRect(GC.SHOP_INV_BOOTS_X-GC.BAG_SLOTS_X/2, GC.SHOP_INV_BOOTS_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, bootsColor);
	if (boots) {
		drawImageRotatedScaled(boots.pic[warrior.class], GC.SHOP_INV_BOOTS_X+boots.bagOffsetX, GC.SHOP_INV_BOOTS_Y+boots.bagOffsetY, 0, boots.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "boots") {
		colorRectOutline(GC.SHOP_INV_BOOTS_X-GC.BAG_SLOTS_X/2-BORDER, GC.SHOP_INV_BOOTS_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}

	colorRect(GC.SHOP_INV_SWAP_X, GC.SHOP_INV_SWAP_Y, GC.SHOP_INV_SWAP_W, GC.SHOP_INV_SWAP_H, "#E0E0E0");
	colorText("SWAP", GC.SHOP_INV_SWAP_X+10, GC.SHOP_INV_SWAP_Y+17, "#868686");

	if (selectedInvItem != null) {
		var lastFont = ctx.font;
		ctx.font = "13px Georgia";
		colorRect(GC.SHOP_INV_UNEQUIP_X, GC.SHOP_INV_UNEQUIP_Y, GC.SHOP_INV_UNEQUIP_W, GC.SHOP_INV_UNEQUIP_H, "#E0E0E0");
		colorText("UNEQUIP", GC.SHOP_INV_UNEQUIP_X+2, GC.SHOP_INV_UNEQUIP_Y+17, "#868686");	
		ctx.font = lastFont;
	}
}

function drawShopBagItems() {

	rowCounter = 0;
	for (var i = 0; i < warrior.numBagItems; i++) {
		var item = warrior.bag[i];
		var color = determineItemTierColor(item);
		var row = Math.floor(rowCounter/GC.BAG_ROW_SLOTS);
		colorRect(GC.SHOP_BAG_X+(i%GC.BAG_ROW_SLOTS)*GC.BAG_SLOTS_X, GC.SHOP_BAG_Y+(row*GC.BAG_SLOTS_Y), 
			GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, color);
		if (item.type == "consumable") {
			drawImageRotatedScaled(item.pic, GC.SHOP_BAG_X + GC.BAG_SLOTS_X*(i%GC.BAG_ROW_SLOTS+0.5)+item.bagOffsetX, 
			GC.SHOP_BAG_Y + GC.BAG_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale);
		} else {
			drawImageRotatedScaled(item.pic[warrior.class], GC.SHOP_BAG_X + GC.BAG_SLOTS_X*(i%GC.BAG_ROW_SLOTS+0.5)+item.bagOffsetX, 
			GC.SHOP_BAG_Y + GC.BAG_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale);
		}
		rowCounter++;
	}

	for (i = 0; i < GC.BAG_ROW_SLOTS+1; i++) {
		var x = GC.SHOP_BAG_X + i * (GC.BAG_LENGTH/GC.BAG_ROW_SLOTS);
		colorRect(x, GC.SHOP_BAG_Y, 3, GC.BAG_HEIGHT+3, "black");
	}
	for (i = 0; i < GC.BAG_COL_SLOTS+1; i++) {
		var y = GC.SHOP_BAG_Y + i * (GC.BAG_HEIGHT/GC.BAG_COL_SLOTS);
		colorRect(GC.SHOP_BAG_X, y, GC.BAG_LENGTH, 3, "black");
	}
}

function showShopItemSelection() { //could use helper function, pass in x and y coords
	var itemToShow = null;
	if (selectedItem != null) {
		itemToShow = selectedItem;
	} else if (selectedInvItem != null) {
		itemToShow = selectedInvItem;
	} else if (selectedShopItem != null) {
		itemToShow = selectedShopItem;
	}
	if (itemToShow == null) {
		return;
	}
	colorRect(GC.SHOP_ITEM_SELECT_BOX_X+10, GC.SHOP_ITEM_SELECT_BOX_Y+10, GC.ITEM_SELECT_BOX_W-20, GC.ITEM_SELECT_BOX_H-20, determineItemTierColor(itemToShow));
	

	var x = GC.SHOP_ITEM_SELECT_BOX_X+20;
	var y = GC.SHOP_ITEM_SELECT_BOX_Y+30;

	var textToShow;
	if (itemToShow == selectedShopItem) {
		textToShow = "Buy for: "+Math.ceil(itemToShow.cost);
	} else {
		textToShow = "Sell for: "+Math.ceil(itemToShow.cost/2);
	}
	colorText(textToShow, x, GC.SHOP_ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H-20, "black");
	colorText(itemToShow.name, x, y, "black");
	if (itemToShow.type == "consumable") {
		drawImageRotatedScaled(itemToShow.pic, GC.SHOP_ITEM_SELECT_BOX_X+GC.ITEM_SELECT_BOX_W/2+itemToShow.bagOffsetX*2, GC.SHOP_ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H/2+itemToShow.bagOffsetY*2, 0, itemToShow.bagScale*2);
		return;
	}
	drawImageRotatedScaled(itemToShow.pic[warrior.class], GC.SHOP_ITEM_SELECT_BOX_X+GC.ITEM_SELECT_BOX_W/2+itemToShow.bagOffsetX*2, GC.SHOP_ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H/2+itemToShow.bagOffsetY*2, 0, itemToShow.bagScale*2);

	//damage
	var damageColor = "black"
	var equippedDamage = 0;
	if (warrior.inventory[warrior.currInv][itemToShow.type] != null) {
		equippedDamage = warrior.inventory[warrior.currInv][itemToShow.type].damage;
	}
	if (itemToShow.damage > equippedDamage) {
		damageColor = "green";
	} else if (itemToShow.damage < equippedDamage) {
		damageColor = "red";
	}	
	colorText("Dmg: "+transformDamage(itemToShow.damage), x, y+25, damageColor);

	//defense
	var defenseColor = "black"
	var equippedDefense = 0;
	if (warrior.inventory[warrior.currInv][itemToShow.type] != null) {
		equippedDefense = warrior.inventory[warrior.currInv][itemToShow.type].defense;
	}
	if (itemToShow.defense > equippedDefense) {
		defenseColor = "green";
	} else if (itemToShow.defense < equippedDefense) {
		defenseColor = "red";
	}
	colorText("Def: "+transformDefense(itemToShow.defense), x+115, y+25, defenseColor);

	//attack rate
	var aRColor = "black"
	var equippedAR = 0
	if (warrior.inventory[warrior.currInv][itemToShow.type] != null) {
		equippedAR = warrior.inventory[warrior.currInv][itemToShow.type].attackRate;
	}
	if (itemToShow.attackRate < equippedAR) { //flipped for AR!!
		aRColor = "green";
	} else if (itemToShow.attackRate > equippedAR) {
		aRColor = "red";
	}
	colorText("AtR: "+transformAttackRate(itemToShow.attackRate), x, y+125, aRColor);

	//speed
	var speedColor = "black"
	var equippedSpeed = 0
	if (warrior.inventory[warrior.currInv][itemToShow.type] != null) {
		equippedSpeed = warrior.inventory[warrior.currInv][itemToShow.type].speed;
	}
	if (itemToShow.speed > equippedSpeed) {
		speedColor = "green";
	} else if (itemToShow.speed < equippedSpeed) {
		speedColor = "red";
	}
	colorText("Spd: "+transformSpeed(itemToShow.speed), x+115, y+125, speedColor);

	//effect icons
	for (var i = 0; i < itemToShow.effectFunctions.length; i++) {
		var icon = itemToShow.effectFunctions[i].icon;
		drawImageRotatedScaled(icon, GC.SHOP_ITEM_SELECT_BOX_X+GC.ITEM_SELECT_BOX_W - 25 - (25*i), GC.SHOP_ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H-25, 0, 0.7);
	}
}

function drawShopItems() {
	var shop = warrior.currentShop;
	rowCounter = 0;
	for (var i = 0; i < shop.numItems; i++) {
		var item = shop.items[i];
		var color = determineItemTierColor(item);
		var row = Math.floor(rowCounter/GC.SHOP_ROW_SLOTS);
		colorRect(GC.SHOP_GRID_X+(i%GC.SHOP_ROW_SLOTS)*GC.SHOP_SLOTS_X, GC.SHOP_GRID_Y+(row*GC.SHOP_SLOTS_Y), 
			GC.SHOP_SLOTS_X, GC.SHOP_SLOTS_Y, color);
		if (item.type == "consumable") {
			drawImageRotatedScaled(item.pic, GC.SHOP_GRID_X + GC.SHOP_SLOTS_X*(i%GC.SHOP_ROW_SLOTS+0.5)+item.bagOffsetX, 
			GC.SHOP_GRID_Y + GC.SHOP_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale);
		} else {
			drawImageRotatedScaled(item.pic[warrior.class], GC.SHOP_GRID_X + GC.SHOP_SLOTS_X*(i%GC.SHOP_ROW_SLOTS+0.5)+item.bagOffsetX, 
			GC.SHOP_GRID_Y + GC.SHOP_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale);
		}
		rowCounter++;
	}
}

function drawShopBackground() {
	colorRect(GC.MAP_X-5, GC.MAP_Y-5, GC.MAP_W+10, GC.MAP_H+10, "#828282");
	colorRect(GC.MAP_X, GC.MAP_Y, GC.MAP_W, GC.MAP_H, "#565656");

	colorRect(GC.SHOP_BAG_X-5, GC.SHOP_BAG_Y-5, GC.BAG_LENGTH+13, GC.BAG_HEIGHT+13, "#828282");
	colorRect(GC.SHOP_BAG_X, GC.SHOP_BAG_Y, GC.BAG_LENGTH, GC.BAG_HEIGHT, "#E0E0E0");

	colorRect(GC.SHOP_ITEM_SELECT_BOX_X, GC.SHOP_ITEM_SELECT_BOX_Y, GC.ITEM_SELECT_BOX_W, GC.ITEM_SELECT_BOX_H, "#828282")
	colorRect(GC.SHOP_ITEM_SELECT_BOX_X+10, GC.SHOP_ITEM_SELECT_BOX_Y+10, GC.ITEM_SELECT_BOX_W-20, GC.ITEM_SELECT_BOX_H-20, "#E0E0E0");

	colorRect(GC.SHOP_X, GC.SHOP_Y, GC.SHOP_W, GC.SHOP_H, "#E0E0E0");
	colorRect(GC.SHOP_SELECTION_AREA_X, GC.SHOP_SELECTION_AREA_Y, GC.SHOP_SELECTION_AREA_W, GC.SHOP_SELECTION_AREA_H, "#828282");

	colorRect(GC.SHOP_BUTTONS_X, GC.SHOP_BUY_Y, GC.SHOP_BUTTONS_W, GC.SHOP_BUTTONS_H, "#E0E0E0");
	colorText("BUY", GC.SHOP_BUTTONS_X+10, GC.SHOP_BUY_Y+32, "black");
	colorRect(GC.SHOP_BUTTONS_X, GC.SHOP_SELL_Y, GC.SHOP_BUTTONS_W, GC.SHOP_BUTTONS_H, "#E0E0E0");
	colorText("SELL", GC.SHOP_BUTTONS_X+10, GC.SHOP_SELL_Y+32, "black");

	colorText("COINS: "+warrior.numCoins, GC.SHOP_SELECTION_AREA_X, GC.SHOP_SELECTION_AREA_Y-20, "#E0E0E0");

	var lastFont = ctx.font;
	ctx.font = "40px Georgia";
	colorText(warrior.currentShop.type, GC.SHOP_X+GC.SHOP_W/2-warrior.currentShop.type.length*15, GC.SHOP_Y-10, "#E0E0E0")
	ctx.font = lastFont;
}

function handleShopSelectedItem() {
	colorRectOutline(GC.SHOP_GRID_X+selectedShopItemCol*GC.SHOP_SLOTS_X, GC.SHOP_GRID_Y+selectedShopItemRow*GC.SHOP_SLOTS_Y, 
		GC.SHOP_SLOTS_X, GC.SHOP_SLOTS_Y, 3, selectedInvColor);
}

function handleShopBagSelectedItem() {
	colorRectOutline(GC.SHOP_BAG_X+selectedItemCol*GC.BAG_SLOTS_X, GC.SHOP_BAG_Y+selectedItemRow*GC.BAG_SLOTS_Y, 
		GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, 3, selectedInvColor);
}


function drawShopGrid() {
	for (i = 0; i < GC.SHOP_ROW_SLOTS+1; i++) {
		var x = GC.SHOP_X + i * (GC.SHOP_LENGTH/GC.SHOP_ROW_SLOTS)+GC.SHOP_GRID_X_OFFSET;
		colorRect(x, GC.SHOP_GRID_Y, 3, GC.SHOP_HEIGHT+3, "black");
	}
	for (i = 0; i < GC.SHOP_COL_SLOTS+1; i++) {
		var y = GC.SHOP_Y + i * (GC.SHOP_HEIGHT/GC.SHOP_COL_SLOTS)+GC.SHOP_GRID_Y_OFFSET;
		colorRect(GC.SHOP_GRID_X, y, GC.SHOP_LENGTH, 3, "black");
	}
}

function showShopScreen() {
	ctx.save()
	ctx.translate(camPanX, camPanY);
	drawShopBackground();
	drawShopBagItems();
	drawShopItems();
	drawShopGrid();
	showShopInventory();
	showShopItemSelection();
	if (selectedShopItem != null) {
		handleShopSelectedItem();
	}
	if (selectedItem != null) {
		handleShopBagSelectedItem();
	}
	ctx.restore();
}


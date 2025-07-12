var selectedItem = null;
var selectedItemCol = null;
var selectedItemRow = null;

var handlingGems = false;

var selectedEffect = null;

var defaultButtonColor = "#E0E0E0";
var mouseoverButtonColor = "coral";
var settingsColor = defaultButtonColor;
var equipColor = defaultButtonColor;
var dropColor = defaultButtonColor;
var sellColor = defaultButtonColor;

selectedInvItem = null;

const unselectedInvColor = "#E0E0E0"
const selectedInvColor = "coral"

var helmetColor = unselectedInvColor;
var armorColor = unselectedInvColor;
var shieldColor = unselectedInvColor;
var weaponColor = unselectedInvColor;
var bootsColor = unselectedInvColor;

var commonItemColor = "#E0E0E0";
var uncommonItemColor = "lightgreen";
var rareItemColor = "lightblue";
var obscureItemColor = "mediumpurple";

function mouseInBounds(x, y, X, Y, WIDTH, HEIGHT) {
	if (x > X && x < X+WIDTH && y > Y && y < Y+HEIGHT) {
		return true;
	} else return false;
}

function clickInventory(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (mouseInBounds(mouseX, mouseY, GC.INV_CANVAS_HELMET_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_HELMET_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["helmet"];
		selectedItem = null;
		handlingGems = false;
	} else if (mouseInBounds(mouseX, mouseY, GC.INV_CANVAS_ARMOR_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_ARMOR_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["armor"];
		selectedItem = null;
		handlingGems = false;
	} else if (mouseInBounds(mouseX, mouseY, GC.INV_CANVAS_SHIELD_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_SHIELD_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["shield"];
		selectedItem = null;
		handlingGems = false;
	} else if (mouseInBounds(mouseX, mouseY, GC.INV_CANVAS_WEAPON_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_WEAPON_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["weapon"];
		selectedItem = null;
		handlingGems = false;
	} else if (mouseInBounds(mouseX, mouseY, GC.INV_CANVAS_BOOTS_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_BOOTS_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y)) {
		selectedInvItem = warrior.inventory[warrior.currInv]["boots"];
		selectedItem = null;
		handlingGems = false;
	} else if (mouseInBounds(mouseX, mouseY, GC.UNEQUIP_X, GC.UNEQUIP_Y, GC.UNEQUIP_W, GC.UNEQUIP_H)) {
		if (selectedInvItem != null) {
			warrior.inventory[warrior.currInv][selectedInvItem.type] = null;
			warrior.bag.push(selectedInvItem);
			warrior.numBagItems++;
			selectedInvItem = null;
			warrior.setValuesFromInventory();
		}
	} else if (mouseInBounds(mouseX, mouseY, GC.INV_SWAP_X, GC.INV_SWAP_Y, GC.INV_SWAP_W, GC.INV_SWAP_H)) {
		console.log("Swapped")
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
	}
	else {
		if (selectedInvItem != null) {
			selectedInvItem = null;
		} else {
			showingInventory = false;
		}
	}
}

function handleMouseclickInventoryScreen(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (mouseInBounds(mouseX, mouseY, GC.INV_BOX_X, GC.INV_BOX_Y, GC.INV_BOX_W, GC.INV_BOX_H)) {
		clickInventory(evt);
		return;
	}

	if (mouseInBounds(mouseX, mouseY, GC.BAG_X, GC.BAG_Y, GC.BAG_LENGTH, GC.BAG_HEIGHT) && !handlingGems) {
		selectedItemCol = getItemColUnderMouse(mouseX, mouseY, GC.BAG_X, GC.BAG_Y, GC.BAG_SLOTS_X)
		selectedItemRow = getItemRowUnderMouse(mouseX, mouseY, GC.BAG_X, GC.BAG_Y, GC.BAG_SLOTS_Y)
		selectedItem = getBagItemUnderMouse(mouseX, mouseY);
		selectedInvItem = null;
	} else if (selectedItem != null && selectedItem.type != "consumable" && mouseInBounds(mouseX, mouseY, GC.EQUIP_X, GC.EQUIP_Y, GC.EQUIP_W, GC.EQUIP_H)) {
		warrior.equip(selectedItem);
		var index = selectedItemCol + selectedItemRow*GC.BAG_ROW_SLOTS;
		warrior.bag.splice(index, 1);
		selectedItem = null;
		warrior.numBagItems--;
	} else if (mouseInBounds(mouseX, mouseY, GC.DROP_X, GC.DROP_Y, GC.DROP_W, GC.DROP_H) && selectedItem != null) {
		var index = selectedItemCol + selectedItemRow*GC.BAG_ROW_SLOTS;
		warrior.bag.splice(index, 1);
		selectedItem = null;
		warrior.numBagItems--;
	} else if (warrior.shopping && mouseInBounds(mouseX, mouseY, GC.SELL_X, GC.SELL_Y, GC.SELL_W, GC.SELL_H)) {
		var index = selectedItemCol + selectedItemRow*GC.BAG_ROW_SLOTS;
		warrior.bag.splice(index, 1);
		warrior.exp += selectedItem.cost/2;
		selectedItem = null;
		warrior.numBagItems--;
	} else if (selectedItem != null && selectedItem.type == "consumable" && selectedItem.useCondition() && mouseInBounds(mouseX, mouseY, GC.USE_X, GC.USE_Y, GC.USE_W, GC.USE_H)) {
		selectedItem.effectFunction(selectedItem);
		var index = selectedItemCol + selectedItemRow*GC.BAG_ROW_SLOTS;
		warrior.bag.splice(index, 1);
		selectedItem = null;
		warrior.numBagItems--;
	} else if (((selectedItem != null && selectedItem.numGemSlots > 0) || (selectedInvItem != null && selectedInvItem.numGemSlots > 0)) && mouseInBounds(mouseX, mouseY, GC.GEM_BUTTON_X, GC.GEM_BUTTON_Y, GC.GEM_BUTTON_W, GC.GEM_BUTTON_H)) {
		handlingGems = !handlingGems;
	} else if (mouseInBounds(mouseX, mouseY, GC.SETTINGS_X, GC.SETTINGS_Y, GC.SETTINGS_W, GC.SETTINGS_H)) {
		outputCanvasState = "showingSliders";
	} else if (handlingGems) {
		var itemToHandle;
		if (selectedItem != null) {
			itemToHandle = selectedItem;
		} else if (selectedInvItem != null) {
			itemToHandle = selectedInvItem;
		}
		if (mouseInBounds(mouseX, mouseY, GC.BAG_X, GC.BAG_Y, GC.BAG_LENGTH, GC.BAG_HEIGHT)) {
			var selected = getBagItemUnderMouse(mouseX, mouseY);
			var index = getItemIndexUnderMouse(mouseX, mouseY, GC.BAG_X, GC.BAG_Y, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, GC.BAG_ROW_SLOTS);
			if (selected != null && selected.type == "gem" && itemToHandle.gemsLength < itemToHandle.numGemSlots) {
				itemToHandle.addGem(selected);
				warrior.bag.splice(index, 1);
				warrior.numBagItems--;
			} else {
				selectedItemCol = getItemColUnderMouse(mouseX, mouseY, GC.BAG_X, GC.BAG_Y, GC.BAG_SLOTS_X)
				selectedItemRow = getItemRowUnderMouse(mouseX, mouseY, GC.BAG_X, GC.BAG_Y, GC.BAG_SLOTS_Y)
				selectedItem = selected;
				selectedInvItem = null;
				handlingGems = false;
			}
		} else {
			for (var i = 0; i < itemToHandle.gemsLength; i++) {
				var y = GC.ITEM_SELECT_BOX_Y+GC.GEM_BOX_SPACING*i; 
				if (mouseInBounds(mouseX, mouseY, GC.GEM_BOX_X, y, GC.GEM_BOX_W, GC.GEM_BOX_H)) {
					var gem = itemToHandle.gems[i];
					itemToHandle.removeGem(gem, i);
					warrior.bag.push(gem);
					warrior.numBagItems++;
				}
			}
		}
	}
}

function getBagItemUnderMouse(x, y) {
	var index = getItemIndexUnderMouse(x, y, GC.BAG_X, GC.BAG_Y, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, GC.BAG_ROW_SLOTS);
	if (index < warrior.bag.length) {
		return warrior.bag[index];
	} else {
		return null;
	}
}

function handleInventoryScreenMouse(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	var itemToShow = null;
	if (selectedItem != null) {
		itemToShow = selectedItem;
	} else if (selectedInvItem != null) {
		itemToShow = selectedInvItem;
	}
	if (itemToShow != null) {
		for (var i = 0; i < itemToShow.effectFunctions.length; i++) {
			var icon = itemToShow.effectFunctions[i].icon;
			var x = GC.ITEM_SELECT_BOX_X+GC.ITEM_SELECT_BOX_W - 25 - (25*i);
			var y =GC.ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H-25;
			var dims = 0.7 * 50;
			if (mouseInBounds(mouseX, mouseY, x - dims/2, y - dims/2, dims, dims)) {
				selectedEffect = itemToShow.effectFunctions[i];
				return;
			}
		}
	}
	selectedEffect = null;

	if (mouseInBounds(mouseX, mouseY, GC.EQUIP_X, GC.EQUIP_Y, GC.EQUIP_W, GC.EQUIP_H)) {
		equipColor = mouseoverButtonColor;
	} else {
		equipColor = defaultButtonColor;
	}
	if (mouseInBounds(mouseX, mouseY, GC.DROP_X, GC.DROP_Y, GC.DROP_W, GC.DROP_H)) {
		dropColor = mouseoverButtonColor;
	} else {
		dropColor = defaultButtonColor;
	}
	if (mouseInBounds(mouseX, mouseY, GC.SELL_X, GC.SELL_Y, GC.SELL_W, GC.SELL_H)) {
		sellColor = mouseoverButtonColor;
	} else {
		sellColor = defaultButtonColor;
	}
	if (mouseInBounds(mouseX, mouseY, GC.SETTINGS_X, GC.SETTINGS_Y, GC.SETTINGS_W, GC.SETTINGS_H)) {
		settingsColor = mouseoverButtonColor;
	} else {
		settingsColor = defaultButtonColor;
	}
	if (mouseInBounds(mouseX, mouseY, GC.USE_X, GC.USE_Y, GC.USE_W, GC.USE_H)) {
		useColor = mouseoverButtonColor;
	} else {
		useColor = defaultButtonColor;
	}
}

function drawBagItems() {
	rowCounter = 0;
	for (var i = 0; i < warrior.numBagItems; i++) {
		var item = warrior.bag[i];
		var color = determineItemTierColor(item);
		var row = Math.floor(rowCounter/GC.BAG_ROW_SLOTS);
		colorRect(GC.BAG_X+(i%GC.BAG_ROW_SLOTS)*GC.BAG_SLOTS_X, GC.BAG_Y+(row*GC.BAG_SLOTS_Y), 
			GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, color);
		if (item.type == "consumable") {
			drawImageRotatedScaled(item.pic, GC.BAG_X + GC.BAG_SLOTS_X*(i%GC.BAG_ROW_SLOTS+0.5)+item.bagOffsetX, 
			GC.BAG_Y + GC.BAG_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale);
		} else {
			drawImageRotatedScaled(item.pic[warrior.class], GC.BAG_X + GC.BAG_SLOTS_X*(i%GC.BAG_ROW_SLOTS+0.5)+item.bagOffsetX, 
			GC.BAG_Y + GC.BAG_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale);
		}
		rowCounter++;
	}
}

//move to graphicsCommon
function colorRectOutline(x, y, w, h, thickness, color) {
	colorRect(x, y, w+thickness, thickness, color); //top
	colorRect(x, y+h, w+thickness, thickness, color); //bottom
	colorRect(x, y, thickness, h+thickness, color); //left
	colorRect(x+w, y, thickness, h+thickness, color); //right
}

function handleItemSelection() {
	colorRectOutline(GC.BAG_X+selectedItemCol*GC.BAG_SLOTS_X, GC.BAG_Y+selectedItemRow*GC.BAG_SLOTS_Y, 
		GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, 3, selectedInvColor);

	if (selectedItem.type != "consumable" && selectedItem.type != "gem") {
		colorRect(GC.EQUIP_X, GC.EQUIP_Y, GC.EQUIP_W, GC.EQUIP_H, equipColor);
		colorText("EQUIP", GC.EQUIP_X+5, GC.EQUIP_Y+15, "black");
	}
	colorRect(GC.DROP_X, GC.DROP_Y, GC.DROP_W, GC.DROP_H, dropColor);
	colorText("DROP", GC.DROP_X+5, GC.DROP_Y+15, "black");
	if (selectedItem.type == "consumable") {
		colorRect(GC.USE_X, GC.USE_Y, GC.USE_W, GC.USE_H, useColor);
		colorText("USE", GC.USE_X+5, GC.USE_Y+15, "black");
	}
	if (selectedItem.numGemSlots > 0) {
		var gemButtonColor = "#E0E0E0";
		if (handlingGems) {
			gemButtonColor = "#828282";
		}
		colorRect(GC.GEM_BUTTON_X, GC.GEM_BUTTON_Y, GC.GEM_BUTTON_W, GC.GEM_BUTTON_H, gemButtonColor);
		colorText("GEMS", GC.GEM_BUTTON_X+25, GC.GEM_BUTTON_Y+17, "black");
	}
}

function handleInvItemSelection() { //dont think this is used? might be wrong
	if (selectedInvItem.numGemSlots > 0) {
		var gemButtonColor = "#E0E0E0";
		if (handlingGems) {
			gemButtonColor = "#828282";
		}
		colorRect(GC.GEM_BUTTON_X, GC.GEM_BUTTON_Y, GC.GEM_BUTTON_W, GC.GEM_BUTTON_H, gemButtonColor);
		colorText("GEMS", GC.GEM_BUTTON_X+25, GC.GEM_BUTTON_Y+17, "black");
	}
}

function drawSettingsButton() {
	colorRect(GC.SETTINGS_X, GC.SETTINGS_Y, GC.SETTINGS_W, GC.SETTINGS_H, settingsColor);
	colorText("SETTINGS", GC.SETTINGS_X+5, GC.SETTINGS_Y+15, "black");
}

function drawInventoryScreenBackground() {
	colorRect(GC.MAP_X-5, GC.MAP_Y-5, GC.MAP_W+10, GC.MAP_H+10, "#828282");
	colorRect(GC.MAP_X, GC.MAP_Y, GC.MAP_W, GC.MAP_H, "#565656");

	colorRect(GC.BAG_X-5, GC.BAG_Y-5, GC.BAG_LENGTH+13, GC.BAG_HEIGHT+13, "#828282");
	colorRect(GC.BAG_X, GC.BAG_Y, GC.BAG_LENGTH, GC.BAG_HEIGHT, "#E0E0E0");

	colorRect(GC.INV_BOX_X-10, GC.INV_BOX_Y-10, GC.INV_BOX_W+20, GC.INV_BOX_H+20, "#E0E0E0");
	colorRect(GC.INV_BOX_X, GC.INV_BOX_Y, GC.INV_BOX_W, GC.INV_BOX_H, "#828282");

	colorRect(GC.ITEM_SELECT_BOX_X, GC.ITEM_SELECT_BOX_Y, GC.ITEM_SELECT_BOX_W, GC.ITEM_SELECT_BOX_H, "#828282");
	colorRect(GC.ITEM_SELECT_BOX_X+10, GC.ITEM_SELECT_BOX_Y+10, GC.ITEM_SELECT_BOX_W-20, GC.ITEM_SELECT_BOX_H-20, "#E0E0E0");

	colorRect(GC.EFFECT_WINDOW_X-10, GC.EFFECT_WINDOW_Y-10, GC.EFFECT_WINDOW_W+20, GC.EFFECT_WINDOW_H+20, "#777777");
	colorRect(GC.EFFECT_WINDOW_X, GC.EFFECT_WINDOW_Y, GC.EFFECT_WINDOW_W, GC.EFFECT_WINDOW_H, "#999999");
}

function setAllToDefaultColor() {
	helmetColor = unselectedInvColor;
	armorColor = unselectedInvColor;
	shieldColor = unselectedInvColor;
	weaponColor = unselectedInvColor;
	bootsColor = unselectedInvColor;
}

function showInventory() {
	const BORDER = 3;

	colorRect(GC.INV_CANVAS_HELMET_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_HELMET_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "black");
	colorRect(GC.INV_CANVAS_ARMOR_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_ARMOR_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "black");
	colorRect(GC.INV_CANVAS_SHIELD_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_SHIELD_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "black");
	colorRect(GC.INV_CANVAS_WEAPON_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_WEAPON_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "black");
	colorRect(GC.INV_CANVAS_BOOTS_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_BOOTS_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER*2, GC.BAG_SLOTS_Y+BORDER*2, "black");

	setAllToDefaultColor();

	var helmet = warrior.inventory[warrior.currInv]["helmet"];
	if (helmet) {
		helmetColor = determineItemTierColor(helmet);
	}
	colorRect(GC.INV_CANVAS_HELMET_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_HELMET_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, helmetColor);
	if (helmet) {
		drawImageRotatedScaled(helmet.pic[warrior.class], GC.INV_CANVAS_HELMET_X+helmet.bagOffsetX, GC.INV_CANVAS_HELMET_Y+helmet.bagOffsetY, 0, helmet.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "helmet") {
		colorRectOutline(GC.INV_CANVAS_HELMET_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_HELMET_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}


	var armor = warrior.inventory[warrior.currInv]["armor"];
	if (armor) {
		armorColor = determineItemTierColor(armor);
	}
	colorRect(GC.INV_CANVAS_ARMOR_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_ARMOR_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, armorColor);
	if (armor) {
		drawImageRotatedScaled(armor.pic[warrior.class], GC.INV_CANVAS_ARMOR_X+armor.bagOffsetX-2, GC.INV_CANVAS_ARMOR_Y+armor.bagOffsetY, 0, armor.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "armor") {
		colorRectOutline(GC.INV_CANVAS_ARMOR_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_ARMOR_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}


	var shield = warrior.inventory[warrior.currInv]["shield"];
	if (shield) {
		shieldColor = determineItemTierColor(shield);
	}
	colorRect(GC.INV_CANVAS_SHIELD_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_SHIELD_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, shieldColor);
	if (shield) {
		drawImageRotatedScaled(shield.pic[warrior.class], GC.INV_CANVAS_SHIELD_X+shield.bagOffsetX, GC.INV_CANVAS_SHIELD_Y+shield.bagOffsetY, 0, shield.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "shield") {
		colorRectOutline(GC.INV_CANVAS_SHIELD_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_SHIELD_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}

	var weapon  = warrior.inventory[warrior.currInv]["weapon"];
	if (weapon) {
		weaponColor = determineItemTierColor(weapon);
	}
	colorRect(GC.INV_CANVAS_WEAPON_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_WEAPON_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, weaponColor);
	if (weapon) {
		drawImageRotatedScaled(weapon.pic[warrior.class], GC.INV_CANVAS_WEAPON_X+weapon.bagOffsetX, GC.INV_CANVAS_WEAPON_Y+weapon.bagOffsetY, 0, weapon.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "weapon") {
		colorRectOutline(GC.INV_CANVAS_WEAPON_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_WEAPON_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}

	var boots = warrior.inventory[warrior.currInv]["boots"];
	if (boots) {
		bootsColor = determineItemTierColor(boots);
	}
	colorRect(GC.INV_CANVAS_BOOTS_X-GC.BAG_SLOTS_X/2, GC.INV_CANVAS_BOOTS_Y-GC.BAG_SLOTS_Y/2, GC.BAG_SLOTS_X, GC.BAG_SLOTS_Y, bootsColor);
	if (boots) {
		drawImageRotatedScaled(boots.pic[warrior.class], GC.INV_CANVAS_BOOTS_X+boots.bagOffsetX, GC.INV_CANVAS_BOOTS_Y+boots.bagOffsetY, 0, boots.bagScale);
	}
	if (selectedInvItem && selectedInvItem.type == "boots") {
		colorRectOutline(GC.INV_CANVAS_BOOTS_X-GC.BAG_SLOTS_X/2-BORDER, GC.INV_CANVAS_BOOTS_Y-GC.BAG_SLOTS_Y/2-BORDER, GC.BAG_SLOTS_X+BORDER, GC.BAG_SLOTS_Y+BORDER, BORDER, selectedInvColor);
	}

	colorRect(GC.INV_SWAP_X, GC.INV_SWAP_Y, GC.INV_SWAP_W, GC.INV_SWAP_H, "#E0E0E0");
	colorText("SWAP", GC.INV_SWAP_X+15, GC.INV_SWAP_Y+17, "#868686");

	if (selectedInvItem != null) {
		colorRect(GC.UNEQUIP_X, GC.UNEQUIP_Y, GC.UNEQUIP_W, GC.UNEQUIP_H, "#E0E0E0");
		colorText("UNEQUIP", GC.UNEQUIP_X+2, GC.UNEQUIP_Y+17, "#868686");	
	}
}

function showGemSlots(itemToShow) {
	for (var i = 0; i < itemToShow.numGemSlots; i++) {
		if (itemToShow.gemsLength < i) {
			gem = itemToShow.gems[i];
		}
		var y = GC.ITEM_SELECT_BOX_Y+GC.GEM_BOX_SPACING*i 
		var border = GC.GEM_BOX_BORDER;
		colorRect(GC.GEM_BOX_X-border, y-border, GC.GEM_BOX_W+2*border, GC.GEM_BOX_H+2*border, "#828282");
		colorRect(GC.GEM_BOX_X, y, GC.GEM_BOX_W, GC.GEM_BOX_H, "#E0E0E0");
		if (i < itemToShow.gemsLength) {
			console.log("showing" + itemToShow)
			var gem = itemToShow.gems[i];
			drawImageRotatedScaled(gem.pic[warrior.class], GC.GEM_BOX_X+GC.GEM_BOX_W/2, y+GC.GEM_BOX_H/2, 0, gem.bagScale);

		}
	}
}

function determineItemTierColor(item) {
	var numEffects = item.effectFunctions.length;
	if (numEffects == 0) {
		return commonItemColor;
	}
	if (numEffects == 1) {
		return uncommonItemColor;
	}
	if (numEffects == 2) {
		return rareItemColor;
	}
	if (numEffects >= 3) {
		return obscureItemColor;
	}
}

function showItemSelection() {
	var itemToShow = null;
	if (selectedItem != null) {
		itemToShow = selectedItem;
	} else if (selectedInvItem != null) {
		itemToShow = selectedInvItem;
	}
	if (itemToShow == null) {
		return;
	}
	colorRect(GC.ITEM_SELECT_BOX_X+10, GC.ITEM_SELECT_BOX_Y+10, GC.ITEM_SELECT_BOX_W-20, GC.ITEM_SELECT_BOX_H-20, determineItemTierColor(itemToShow));

	var x = GC.ITEM_SELECT_BOX_X+20;
	var y = GC.ITEM_SELECT_BOX_Y+30;

	colorText("Sell for: "+Math.ceil(itemToShow.cost/2), x, GC.ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H-20, "black");
	colorText(itemToShow.name, x, y, "black");
	if (itemToShow.type == "consumable") {
		drawImageRotatedScaled(itemToShow.pic, GC.ITEM_SELECT_BOX_X+GC.ITEM_SELECT_BOX_W/2+itemToShow.bagOffsetX*2, GC.ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H/2+itemToShow.bagOffsetY*2, 0, itemToShow.bagScale*2);
		return;
	}
	drawImageRotatedScaled(itemToShow.pic[warrior.class], GC.ITEM_SELECT_BOX_X+GC.ITEM_SELECT_BOX_W/2+itemToShow.bagOffsetX*2, GC.ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H/2+itemToShow.bagOffsetY*2, 0, itemToShow.bagScale*2);

	
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
		drawImageRotatedScaled(icon, GC.ITEM_SELECT_BOX_X+GC.ITEM_SELECT_BOX_W - 25 - (25*i), GC.ITEM_SELECT_BOX_Y+GC.ITEM_SELECT_BOX_H-25, 0, 0.7);
	}

	showGemSlots(itemToShow);
}

function showEffectSelection() {
	if (selectedEffect == null) {
		return;
	}

	drawImageRotatedScaled(selectedEffect.icon, GC.EFFECT_WINDOW_X+GC.EFFECT_WINDOW_W - 30, GC.EFFECT_WINDOW_Y+GC.EFFECT_WINDOW_H - 30, 0, 1.5)

	colorText(selectedEffect.name, GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 20, "#E0E0E0");
	colorRect(GC.EFFECT_WINDOW_X + 10, GC.EFFECT_WINDOW_Y + 25, GC.EFFECT_WINDOW_W - 20, 3,"#E0E0E0");
	var linesMade = 1;

	var duration = selectedEffect.params[DURATION];
	var distance = selectedEffect.params[DISTANCE];
	var damage = selectedEffect.params[DAMAGE];
	var dps = selectedEffect.params[DPS];
	var speed = selectedEffect.params[SPEED];
	var percent = selectedEffect.params[PERCENT];
	var bounces = selectedEffect.params[BOUNCES];
	var probability = selectedEffect.params[PROBABILITY];

	if (duration) {
		colorText("Duration: "+duration/1000+" sec", GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
	if (damage) {
		colorText("Damage: "+transformDamage(damage), GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
	if (dps) {
		colorText("Damage: "+transformDamage(dps)+ "/sec", GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
	if (speed) {
		colorText("Speed: "+transformSpeed(speed), GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
	if (distance) {
		colorText("Distance: "+distance+" ft", GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
	if (percent) {
		colorText("Percent: "+percent+"%", GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
	if (bounces) {;
		colorText("Bounces: "+bounces, GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
	if (probability) {
		curr = selectedEffect.params[i];
		colorText("Probability: "+probability*100+"%", GC.EFFECT_WINDOW_X + 20, GC.EFFECT_WINDOW_Y + 25 + 20*linesMade, "black");
		linesMade++;
	}
}

function showInventoryScreen() {
	ctx.save();
	ctx.translate(camPanX, camPanY);
	var lastFont = ctx.font;
	ctx.font = "15px Georgia";

	drawInventoryScreenBackground();
	showInventory();
	showItemSelection();
	showEffectSelection();

	drawBagItems();

	for (i = 0; i < GC.BAG_ROW_SLOTS+1; i++) {
		var x = GC.BAG_X + i * (GC.BAG_LENGTH/GC.BAG_ROW_SLOTS);
		colorRect(x, GC.BAG_Y, 3, GC.BAG_HEIGHT+3, "black");
	}
	for (i = 0; i < GC.BAG_COL_SLOTS+1; i++) {
		var y = GC.BAG_Y + i * (GC.BAG_HEIGHT/GC.BAG_COL_SLOTS);
		colorRect(GC.BAG_X, y, GC.BAG_LENGTH, 3, "black");
	}

	if (selectedItem != null) {
		handleItemSelection();
	} else if (selectedInvItem != null) {
		handleInvItemSelection();
	}
	ctx.font = lastFont;
	ctx.restore();
}
// const BAG_SLOTS_X = 60;
// const BAG_SLOTS_Y = 60;
// const BAG_ROW_SLOTS = 10;
// const BAG_SLOTS = 20;
// const BAG_COL_SLOTS = BAG_SLOTS/BAG_ROW_SLOTS;

// const BAG_LENGTH = BAG_SLOTS_X*BAG_ROW_SLOTS;
// const BAG_HEIGHT = BAG_SLOTS_Y*BAG_COL_SLOTS;

// const BAG_X = (outputCanvas.width-BAG_LENGTH)/2;
// const BAG_Y = 10;

// var itemToPrint = null;
// var printX = 0;
// var printY = 0;

// var selectedItem = null;
// var selectedItemCol = null;
// var selectedItemRow = null;

// var defaultButtonColor = "white";
// var mouseoverButtonColor = "green";
// var settingsColor = defaultButtonColor;
// var equipColor = defaultButtonColor;
// var dropColor = defaultButtonColor;
// var sellColor = defaultButtonColor;

// function mouseInBounds(x, y, X, Y, WIDTH, HEIGHT) {
// 	if (x > X && x < X+WIDTH && y > Y && y < Y+HEIGHT) {
// 		return true;
// 	} else return false;
// }

// function handleMouseclickBag(evt) {
// 	var rect = outputCanvas.getBoundingClientRect();
// 	var root = document.documentElement;

// 	mouseX = evt.clientX - rect.left - root.scrollLeft;
// 	mouseY = evt.clientY - rect.top - root.scrollTop;

// 	if (mouseInBounds(mouseX, mouseY, BAG_X, BAG_Y, BAG_LENGTH, BAG_HEIGHT)) {
// 		selectedItemCol = getBagColUnderMouse(mouseX, mouseY);
// 		selectedItemRow = getBagRowUnderMouse(mouseX, mouseY);
// 		selectedItem = getBagItemUnderMouse(mouseX, mouseY);
// 		selectedInvItem = null;
// 	} else if (selectedItem != null && selectedItem.type != "consumable" && mouseInBounds(mouseX, mouseY, GC.EQUIP_X, GC.EQUIP_Y, GC.EQUIP_W, GC.EQUIP_H)) {
// 		warrior.equip(selectedItem);
// 		var index = selectedItemCol + selectedItemRow*BAG_ROW_SLOTS;
// 		warrior.bag.splice(index, 1);
// 		selectedItem = null;
// 		warrior.numBagItems--;
// 	} else if (mouseInBounds(mouseX, mouseY, GC.DROP_X, GC.DROP_Y, GC.DROP_W, GC.DROP_H) && selectedItem != null) {
// 		var index = selectedItemCol + selectedItemRow*BAG_ROW_SLOTS;
// 		warrior.bag.splice(index, 1);
// 		selectedItem = null;
// 		warrior.numBagItems--;
// 	} else if (warrior.shopping && mouseInBounds(mouseX, mouseY, GC.SELL_X, GC.SELL_Y, GC.SELL_W, GC.SELL_H)) {
// 		var index = selectedItemCol + selectedItemRow*BAG_ROW_SLOTS;
// 		warrior.bag.splice(index, 1);
// 		warrior.exp += selectedItem.cost/2;
// 		selectedItem = null;
// 		warrior.numBagItems--;
// 	}
// 	else if (selectedItem != null && selectedItem.type == "consumable" && selectedItem.useCondition() && mouseInBounds(mouseX, mouseY, GC.USE_X, GC.USE_Y, GC.USE_W, GC.USE_H)) {
// 		selectedItem.effectFunction(selectedItem);
// 		var index = selectedItemCol + selectedItemRow*BAG_ROW_SLOTS;
// 		warrior.bag.splice(index, 1);
// 		selectedItem = null;
// 		warrior.numBagItems--;
// 	}

// 	else if (mouseInBounds(mouseX, mouseY, GC.SETTINGS_X, GC.SETTINGS_Y, GC.SETTINGS_W, GC.SETTINGS_H)) {
// 		outputCanvasState = "showingSliders";
// 	}
// }

// function handleKeyPressBag(evt) {
// 	//add function here to use keypad to enter buttons instead of mouse
// }

// function getBagItemUnderMouse(x, y) {
// 	var index = getBagIndexUnderMouse(x, y);
// 	if (index < warrior.bag.length) {
// 		return warrior.bag[index];
// 	} else {
// 		return null;
// 	}
// }

// function getBagIndexUnderMouse(x, y) {
// 	var relativeX = x - BAG_X;
// 	var relativeY = y - BAG_Y;
// 	var col = Math.floor(relativeX/BAG_SLOTS_X);
// 	var row = Math.floor(relativeY/BAG_SLOTS_Y);
// 	var index = col + row*BAG_ROW_SLOTS;
// 	return index;
// }

// function getBagColUnderMouse(x, y) {
// 	var relativeX = x - BAG_X;
// 	var relativeY = y - BAG_Y;
// 	var col = Math.floor(relativeX/BAG_SLOTS_X);
// 	return col;
// }

// function getBagRowUnderMouse(x, y) {
// 	var relativeX = x - BAG_X;
// 	var relativeY = y - BAG_Y;
// 	var row = Math.floor(relativeY/BAG_SLOTS_Y);
// 	return row;
// }

// function drawItemName() {
// 	colorRect(printX, printY-20, 8*itemToPrint.name.length, 20, "white", outputCtx);
// 	colorText(itemToPrint.name, printX+3, printY-5, "black", outputCtx);
// }

// function handleBagMouse(evt) {
// 	var rect = outputCanvas.getBoundingClientRect();
// 	var root = document.documentElement;

// 	mouseX = evt.clientX - rect.left - root.scrollLeft;
// 	mouseY = evt.clientY - rect.top - root.scrollTop;

// 	if (mouseInBounds(mouseX, mouseY, BAG_X, BAG_Y, BAG_LENGTH, BAG_HEIGHT)) {
// 		itemToPrint = getBagItemUnderMouse(mouseX, mouseY);
// 	} else {
// 		itemToPrint = null;
// 	}
// 	if (itemToPrint != null) {
// 		printX = mouseX;
// 		printY = mouseY;
// 	}
// 	if (mouseInBounds(mouseX, mouseY, GC.EQUIP_X, GC.EQUIP_Y, GC.EQUIP_W, GC.EQUIP_H)) {
// 		equipColor = mouseoverButtonColor;
// 	} else {
// 		equipColor = defaultButtonColor;
// 	}
// 	if (mouseInBounds(mouseX, mouseY, GC.DROP_X, GC.DROP_Y, GC.DROP_W, GC.DROP_H)) {
// 		dropColor = mouseoverButtonColor;
// 	} else {
// 		dropColor = defaultButtonColor;
// 	}
// 	if (mouseInBounds(mouseX, mouseY, GC.SELL_X, GC.SELL_Y, GC.SELL_W, GC.SELL_H)) {
// 		sellColor = mouseoverButtonColor;
// 	} else {
// 		sellColor = defaultButtonColor;
// 	}
// 	if (mouseInBounds(mouseX, mouseY, GC.SETTINGS_X, GC.SETTINGS_Y, GC.SETTINGS_W, GC.SETTINGS_H)) {
// 		settingsColor = mouseoverButtonColor;
// 	} else {
// 		settingsColor = defaultButtonColor;
// 	}
// 	if (mouseInBounds(mouseX, mouseY, GC.USE_X, GC.USE_Y, GC.USE_W, GC.USE_H)) {
// 		useColor = mouseoverButtonColor;
// 	} else {
// 		useColor = defaultButtonColor;
// 	}
// }

// function drawBagItems() {
// 	rowCounter = 0;
// 	//console.log(warrior.numBagItems);
// 	for (var i = 0; i < warrior.numBagItems; i++) {
// 		var item = warrior.bag[i];
// 		//console.log(item.name);
// 		var row = Math.floor(rowCounter/BAG_ROW_SLOTS);
// 		if (item.type == "consumable") {
// 			drawImageRotatedScaled(item.pic, BAG_X + BAG_SLOTS_X*(i%BAG_ROW_SLOTS+0.5)+item.bagOffsetX, 
// 			BAG_Y + BAG_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale, outputCtx);
// 		} else {
// 			drawImageRotatedScaled(item.pic[warrior.class], BAG_X + BAG_SLOTS_X*(i%BAG_ROW_SLOTS+0.5)+item.bagOffsetX, 
// 			BAG_Y + BAG_SLOTS_Y*(row+0.5)+item.bagOffsetY, 0, item.bagScale, outputCtx);
// 		}
// 		rowCounter++;
// 	}
// }

// function handleItemSelection() {
// 	//console.log(selectedItemCol+","+selectedItemRow);
// 	colorRect(BAG_X+selectedItemCol*BAG_SLOTS_X, BAG_Y+selectedItemRow*BAG_SLOTS_Y, 
// 		BAG_SLOTS_X, BAG_SLOTS_Y, "green", outputCtx);
// 	if (selectedItem.type != "consumable") {
// 		colorRect(GC.EQUIP_X, GC.EQUIP_Y, GC.EQUIP_W, GC.EQUIP_H, equipColor, outputCtx);
// 		colorText("EQUIP", GC.EQUIP_X+5, GC.EQUIP_Y+15, "black", outputCtx);
// 	}
// 	colorRect(GC.DROP_X, GC.DROP_Y, GC.DROP_W, GC.DROP_H, dropColor, outputCtx);
// 	colorText("DROP", GC.DROP_X+5, GC.DROP_Y+15, "black", outputCtx);
// 	if (warrior.shopping) {
// 		colorRect(GC.SELL_X, GC.SELL_Y, GC.SELL_W, GC.SELL_H, sellColor, outputCtx);
// 		colorText("SELL", GC.SELL_X+5, GC.SELL_Y+15, "black", outputCtx);
// 	}
// 	if (selectedItem.type == "consumable") {
// 		colorRect(GC.USE_X, GC.USE_Y, GC.USE_W, GC.USE_H, useColor, outputCtx);
// 		colorText("USE", GC.USE_X+5, GC.USE_Y+15, "black", outputCtx);
// 	}
// }

// function drawSettingsButton() {
// 	colorRect(GC.SETTINGS_X, GC.SETTINGS_Y, GC.SETTINGS_W, GC.SETTINGS_H, settingsColor, outputCtx);
// 	colorText("SETTINGS", GC.SETTINGS_X+5, GC.SETTINGS_Y+15, "black", outputCtx);
// }

// function showBag() {
// 	//console.log(outputCanvasState);
// 	if (outputCanvasState == null) {
// 		outputCanvasState = "showingBag";
// 	} else if (outputCanvasState == "showingSliders") {
// 		showAudioSliders();
// 		return;
// 	}
// 	var lastFont = outputCtx.font;
// 	outputCtx.font = "15px Georgia";
// 	drawCanvas2General();

// 	if (selectedItem != null) {
// 		handleItemSelection();
// 	}
// 	for (i = 0; i < BAG_ROW_SLOTS+1; i++) {
// 		var x = BAG_X + i * (BAG_LENGTH/BAG_ROW_SLOTS);
// 		colorRect(x, BAG_Y, 3, BAG_HEIGHT+3, "black", outputCtx);
// 	}
// 	for (i = 0; i < BAG_COL_SLOTS+1; i++) {
// 		var y = BAG_Y + i * (BAG_HEIGHT/BAG_COL_SLOTS);
// 		colorRect(BAG_X, y, BAG_LENGTH, 3, "black", outputCtx);
// 	}
// 	drawBagItems();
// 	if (itemToPrint != null) {
// 		drawItemName();
// 	}
// 	drawSettingsButton();
// 	outputCtx.font = lastFont;

// }
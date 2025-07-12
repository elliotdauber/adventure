var chests = [];

//TODO: Mouse-over

function getChestIndexUnderMouse(x, y) {
	var length = warrior.currentChest.numItems*GC.BAG_SLOTS_X;
	var relativeX = x - (canvas.width-length-10); //REPLACE THESE WITH MEMBER VARIABLES
	var index = Math.floor(relativeX/GC.BAG_SLOTS_X);
	return index;
}

function getChestItemUnderMouse(x, y) {
	var index = getChestIndexUnderMouse(x, y);
	if (index < warrior.currentChest.numItems) {
		return warrior.currentChest.items[index];
	} else {
		return null;
	}
}

function handleMouseclickChest(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	var index = getChestIndexUnderMouse(mouseX, mouseY);
	var item = getChestItemUnderMouse(mouseX, mouseY);
	if (item == null || mouseY < 10 || mouseY > 10+10+GC.BAG_SLOTS_Y) {
		return false; 
	}
	if (item != null && warrior.numBagItems < warrior.bagSize) {
		warrior.bag.push(item);
		warrior.numBagItems++;
		warrior.currentChest.items.splice(index, 1);
		warrior.currentChest.itemsLeft--;
	} else if (warrior.numBagItems >= warrior.bagSize) {
		new Notfication("bag is full"); //not working :(
	}
	return true;
}

function spawnChests(maxNumItems, maxCoins, itemArray) {
	chests = [];
	for (var row = 0; row < TRACK_ROWS; row++) {
		for (var col = 0; col < TRACK_COLS; col++) {
			var index = getIndex(col, row);
			if (trackGrid[index] == CHEST) {
				var random = Math.floor(Math.random()*maxNumItems); //this max is exclusive
				var newChest = new chestClass(random);
				newChest.x = col * TRACK_W + TRACK_W/2;
				newChest.y = row * TRACK_H + TRACK_H/2;
				newChest.items = [];
				newChest.generateItems(itemArray);
				newChest.coinYield = randomInt(0, maxCoins);
				chests.push(newChest);
			}
		}
	}
}

function chestClass(numItems) {
	this.numItems = numItems;
	this.itemsLeft = this.numItems;
	this.x;
	this.y;
	this.isLocked = true;
	this.items;
	this.coinYield;
	this.opened = false;
	var chestGridLength = this.numItems*GC.BAG_SLOTS_X;
	var chestGridX = canvas.width-chestGridLength-10-10; //10 margin from border, with 10 margin border on right
	var chestGridY = 10+10; //same logic as above

	this.generateItems = function(itemArray) {
		for (var i = 0; i < this.numItems; i++) {
			var random = Math.random()*itemArray.length;
			var index = Math.floor(random);
			var item = itemArray[index];
			if (item.cost > warrior.maxNumCoins+200) {
				i--; //bad style?
				continue;
			}
			var newItem = createItemCopy(item);
			for (var j = 0; j < newItem.numGemSlots; j++) {
				if (Math.random() < 0.1) {
					var gem = allGems[randomInt(0, allGems.length-1)];
					var newGem = createItemCopy(gem);
					newItem.gems.push(newGem);
					newItem.gemsLength++;
				}
			}
			this.items.push(newItem);
		}
	}

	this.showItems = function() {
		if (!this.opened) {
			createCoins(this);
			this.opened = true;
		}
		ctx.save();
		ctx.translate(camPanX, camPanY);
		ctx.font = "20px Georgia";
		if (numItems == 0) {
			colorRect(canvas.width - 160, 10, 150, GC.BAG_SLOTS_Y+20, "#555555");
			colorRect(canvas.width - 150, 20, 130, GC.BAG_SLOTS_Y, "#E0E0E0")
			colorText("Empty Chest", canvas.width - 140, 55, "black");
		} else {
			colorRect(chestGridX-10, chestGridY-10, chestGridLength+20, GC.BAG_SLOTS_Y+20, "#555555");
			colorRect(chestGridX, chestGridY, chestGridLength, GC.BAG_SLOTS_Y, "#E0E0E0");
			for (i = 0; i < this.numItems+1; i++) {
				colorRect(chestGridX+(GC.BAG_SLOTS_X*i), chestGridY, 3, GC.BAG_SLOTS_Y+3, "black");
			}
			for (i = 0; i < 2; i++) {
				colorRect(chestGridX, chestGridY, chestGridLength, 3, "black");
				colorRect(chestGridX, chestGridY+GC.BAG_SLOTS_Y, chestGridLength, 3, "black");
			}
			for (i = 0; i < this.itemsLeft; i++) {
				var item = this.items[i];
				if (item.type == "consumable") {
					drawImageRotatedScaled(item.pic, chestGridX + GC.BAG_SLOTS_X*(i+0.5)+item.bagOffsetX, chestGridY+ GC.BAG_SLOTS_Y*0.5+item.bagOffsetY, 0, item.bagScale);
				} else {
					drawImageRotatedScaled(item.pic[warrior.class], chestGridX + GC.BAG_SLOTS_X*(i+0.5)+item.bagOffsetX, chestGridY+ GC.BAG_SLOTS_Y*0.5+item.bagOffsetY, 0, item.bagScale);
				}
			}
		}
		this.checkAdjacency();
		ctx.restore();
	}

	this.checkAdjacency = function() {
		if (!isAdjacent(warrior, this, 1)) {
			warrior.inChest = false;
			outputCanvasState = null;
		}
	}
}
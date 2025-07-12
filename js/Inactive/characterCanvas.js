// var characterCanvas, characterCtx;

// function characterCanvasSetup() {
// 	characterCanvas = document.getElementById('characterCanvas');
// 	characterCtx = characterCanvas.getContext('2d');
// 	characterCtx.font = "15px Georgia";

// 	characterCanvas.addEventListener('mousedown', clickCharacter);

// 	dontShowCharacter();
// }

// function clickCharacter(evt) {
// 	if (showingCharacterCanvas) {
// 		showingCharacterCanvas = false;
// 	} else {
// 		showingCharacterCanvas = true;
// 	}
// }

// function showEnemy(enemy) {
// 	colorRect(0, 0, characterCanvas.width, characterCanvas.height, "#E0E0E0", characterCtx);
// 	coloredOutlineRectCorners(0, 0, characterCanvas.width, characterCanvas.height, "black", characterCtx);
// 	colorText("ENEMY", 20, 25, "black", characterCtx);

// 	drawImageRotatedScaled(enemy.pic[currentLevel.theme], GC.CENTER_X, GC.CENTER_Y-15, 0, 1.5, characterCtx);

// 	for (var i = 0; i < enemy.maxHealth; i++) {
// 		var x = GC.ENEMY_HEALTH_START_X+(i+0.5)*GC.ENEMY_HEALTH_TOTAL_X/enemy.maxHealth
// 		if (i < enemy.health) {
// 			drawImageRotatedScaled(healthCounter, x, GC.ENEMY_HEALTH_Y, 0, 0.4, characterCtx);
// 		} else {
// 			drawImageRotatedScaled(healthCounterEmpty, x, GC.ENEMY_HEALTH_Y, 0, 0.4, characterCtx);
// 		}
// 	}
// }

// function drawCharacterCanvasGeneral() {
// 	colorRect(0, 0, characterCanvas.width, characterCanvas.height, "#E0E0E0", characterCtx);
// 	coloredOutlineRectCorners(0, 0, characterCanvas.width, characterCanvas.height, "black", characterCtx);
// 	colorText("CHARACTER ("+warrior.class+")", 20, 25, "black", characterCtx);
// }

// function showCharacter() { 

// 	//console.log("drawing on character canvas");
// 	drawImageRotatedScaled(warrior.facePic, GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	if (warrior.inventory[warrior.currInv]["armor"] != null) {
// 		drawImageRotatedScaled(warrior.inventory[warrior.currInv]["armor"].pic[warrior.class], GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	} else {
// 		drawImageRotatedScaled(nakedTorso, GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	}

// 	if (warrior.inventory[warrior.currInv]["boots"] != null) {
// 		drawImageRotatedScaled(warrior.inventory[warrior.currInv]["boots"].pic[warrior.class], GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	} else {
// 		drawImageRotatedScaled(nakedFeet, GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	}

// 	if (warrior.inventory[warrior.currInv]["helmet"] != null) {
// 		drawImageRotatedScaled(warrior.inventory[warrior.currInv]["helmet"].pic[warrior.class], GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	}

// 	if (warrior.inventory[warrior.currInv]["shield"] != null) {
// 		drawImageRotatedScaled(warrior.inventory[warrior.currInv]["shield"].pic[warrior.class], GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	}

// 	if (warrior.inventory[warrior.currInv]["weapon"] != null) {
// 		drawImageRotatedScaled(warrior.inventory[warrior.currInv]["weapon"].pic[warrior.class], GC.CENTER_X, GC.CENTER_Y, 0, GC.SCALAR, characterCtx);
// 	}
// }



// function dontShowCharacter() {
// 	colorRect(0, 0, characterCanvas.width, characterCanvas.height, "#565656", characterCtx);
// 	colorRect(0, 0, 135, 40, "#E0E0E0", characterCtx);
// 	coloredOutlineRectCorners(0, 0, 135, 40, "black", characterCtx);
// 	colorText("CHARACTER", 20, 25, "black", characterCtx);
// }

// function characterCanvasHandling() {
// 	if (showingCharacterCanvas) {
// 		drawCharacterCanvasGeneral();
// 		// for (var i = 0; i < enemies.length; i++) {
// 		// 	if (enemies[i].alive && isAdjacent(warrior, enemies[i], 2) && !warrior.shopping) {
// 		// 		showEnemy(enemies[i]);
// 		// 		return;
// 		// 	}
// 		// }{
// 		showCharacter();
// 	} else {
// 		dontShowCharacter();
// 	}
// }

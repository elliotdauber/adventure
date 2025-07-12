var showingQuestFinish = false;
var showingQuestIncomplete = false;
var showingOutOfQuests = false;

function handleKeyPressHUD(evt) {
	if (evt.keyCode == KEY_LEFT_ARROW) {
		var index = warrior.spellOptions.elements.indexOf(warrior.currentSpell);
		var newSpellIndex = (index-1) % warrior.spellOptions.size();
		if (newSpellIndex == -1) {
			newSpellIndex = warrior.spellOptions.size()-1;
		}
		warrior.currentSpell = warrior.spellOptions.getElemAtIndex(newSpellIndex);
		warrior.setValuesFromInventory();
		return;
	}
	if (evt.keyCode == KEY_RIGHT_ARROW) {
		var index = warrior.spellOptions.elements.indexOf(warrior.currentSpell);
		var newSpellIndex = (index+1) % warrior.spellOptions.size();
		warrior.currentSpell = warrior.spellOptions.getElemAtIndex(newSpellIndex);
		warrior.setValuesFromInventory();
		return;
	}
	var numEntered = evt.keyCode - 48;
	if (numEntered >= 0 && numEntered <= 9) {
		var index = (numEntered+9)%10;
		console.log("spell #"+index);
		if (index < warrior.spellOptions.size()) {
			warrior.currentSpell = warrior.spellOptions.getElemAtIndex(index);
			warrior.setValuesFromInventory();
		}
	}
}

function drawExp() {
	colorRect(GC.EXP_X, GC.EXP_Y, GC.EXP_W, GC.EXP_H, "#212121");
	var exp = warrior.exp%warrior.levelExp;
	var exp0to1 = exp/warrior.levelExp;
	colorRect(GC.EXP_X, GC.EXP_Y, exp0to1*GC.EXP_W, GC.EXP_H, "lightgreen");
	var level = Math.floor(warrior.exp/warrior.levelExp) + 1;
	colorText("level " + level, GC.EXP_X-55, GC.EXP_Y + 13, "white");
}

function drawAuraOptions() {
	for (var i = 0; i < warrior.auraOptions.size(); i++) {
		var aura = warrior.auraOptions.getElemAtIndex(i);
		drawImageRotatedScaled(aura.displayPic, GC.AURA_OPTIONS_FIRST_X + GC.AURA_OPTIONS_SPACING*i, GC.AURA_OPTIONS_Y, 0, 0.5);
	}
}

function drawSpellOptions() {
	for (var i = 0; i <= GC.NUM_SPELLS_SHOWN; i++) {
		var x = GC.SPELL_OPTIONS_FIRST_X+(i*GC.SPELL_OPTIONS_W);
		if (i < warrior.spellOptions.size()) {
			if (warrior.spellOptions.getElemAtIndex(i) == warrior.currentSpell) {
				colorRect(x, GC.SPELL_OPTIONS_Y, GC.SPELL_OPTIONS_W, GC.SPELL_OPTIONS_H, "green");
			}
			drawImageRotatedScaled(warrior.spellOptions.getElemAtIndex(i).displayPic, x+GC.SPELL_OPTIONS_W/2, GC.SPELL_OPTIONS_Y+GC.SPELL_OPTIONS_H/2, 0, 1.5);
		} else if (i < GC.NUM_SPELLS_SHOWN) {
			colorRect(x, GC.SPELL_OPTIONS_Y, GC.SPELL_OPTIONS_W, GC.SPELL_OPTIONS_H, "#537B84");
		}

		colorRect(x, GC.SPELL_OPTIONS_Y, 1, GC.SPELL_OPTIONS_W, "black")
	}
	colorRect(GC.SPELL_OPTIONS_FIRST_X, GC.SPELL_OPTIONS_Y, GC.SPELL_OPTIONS_W*GC.NUM_SPELLS_SHOWN, 1, "black");
	colorRect(GC.SPELL_OPTIONS_FIRST_X, GC.SPELL_OPTIONS_Y+GC.SPELL_OPTIONS_H, GC.SPELL_OPTIONS_W*GC.NUM_SPELLS_SHOWN, 1, "black");
}

function drawKeys() {
	if (warrior.hasPortalKey) {
		drawImageRotatedScaled(portalKeyCounter, canvas.width/2+360, canvas.height - 45, 0, 0.5)
	}
	if (warrior.hasGreenPortalKey) {
		drawImageRotatedScaled(greenPortalKeyCounter, canvas.width/2+380, canvas.height - 45, 0, 0.5)
	}
	var lastFont = ctx.font;
	ctx.font = "25px Georgia";
	colorText("x "+warrior.keys, canvas.width/2+320, canvas.height - 15, "black")
	ctx.font = lastFont;
}

function drawPowerupCountdowns() { //not used right now, find a place on screen to put countdowns, or remove them!
	for (var i = 0; i < numPowerups; i++) {
		var powerup = currentPowerups[i];
		console.log("time left"+powerup.timeLeft)
		var x = 850+i*50
		drawImageRotatedScaled(powerup.pic, x, GC.POWERUP_Y, 0, 0.5, outputCtx);
		colorRect(x-20, GC.POWERUP_Y+15, 40, 5, "black", outputCtx);
		colorRect(x-20, GC.POWERUP_Y+15, 40*(powerup.timeLeft/powerup.maxTime), 5, "green", outputCtx);
	}
}

function drawHealth() {
	colorCirclePartial(120+90, canvas.height-12-90, 90, warrior.health/warrior.maxHealth, "#c62828");
}

function drawMana() {
	colorCirclePartial(canvas.width-120-180+90, canvas.height-12-90, 90, warrior.mana/warrior.maxMana, "#2a3cc4");
}

function drawAppleGrapesCounters() {
	var lastFont = ctx.font;
	ctx.font = "25px Georgia";
	var numApples = 0;
	var numGrapes = 0;
	for (var i = 0; i < warrior.numBagItems; i++) {
		if (warrior.bag[i].name == "apple") {
			numApples++;
		} else if (warrior.bag[i].name == "grapes") {
			numGrapes++;
		}
	}
	var applePic = getItem("apple", consumables).pic;
	var grapesPic = getItem("grapes", consumables).pic;

	colorText(numApples, GC.APPLE_X, GC.POWERUP_Y, "white");
	colorText(numGrapes, GC.GRAPES_X, GC.POWERUP_Y, "white");
	ctx.font = lastFont;
}

function drawCoinCounter() {
	var lastFont = ctx.font;
	ctx.font = "25px Georgia";
	colorText("x", GC.COINS_X, GC.COINS_Y, "black");
	if (warrior.numCoins >= 1000) {
		ctx.font = "22px Georgia";
	} else if (warrior.numCoins >= 100) {
		ctx.font = "27px Georgia";
	} else {
		ctx.font = "35px Georgia";
	}
	colorText(warrior.numCoins, GC.COINS_X + 15, GC.COINS_Y, "black");
	ctx.font = lastFont;
}

function drawHUD() {
	ctx.save();
	ctx.translate(camPanX, camPanY);
	ctx.globalAlpha = 0.8;
	if (mouseOverHUD || getIndexFromXY(warrior.x, warrior.y) > TRACK_COLS*(TRACK_ROWS-3)) {
		ctx.globalAlpha = 0.6;
		drawHealth();
		drawMana();
		ctx.globalAlpha = 0.3
	} else {
		drawHealth();
		drawMana();
	}
	drawImageRotatedScaled(HUD, canvas.width/2, canvas.height-150, 0, 1);
	drawSpellOptions();
	drawAuraOptions();
	drawExp();
	drawCoinCounter();
	drawKeys();
	drawAppleGrapesCounters();
	ctx.restore();
}
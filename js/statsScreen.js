const STAT_BUTTON_UP_COLOR = "#828282";
const STAT_BUTTON_DOWN_COLOR = "#3A3A3A";

var healthButtonColor = STAT_BUTTON_UP_COLOR;
var manaButtonColor = STAT_BUTTON_UP_COLOR;
var damageButtonColor = STAT_BUTTON_UP_COLOR;
var defenseButtonColor = STAT_BUTTON_UP_COLOR;
var attackRateButtonColor = STAT_BUTTON_UP_COLOR;
var speedButtonColor = STAT_BUTTON_UP_COLOR;

var editingSkills = false;

var skillsToShowIndex = 0;
var skillsPagesArray = ["spells", "auras"];

function transformHealth(health) {
	return Math.ceil(health * 10);
}

function transformMana(mana) {
	return Math.ceil(mana * 10);
}

function transformDefense(defense) {
	return Math.ceil(defense * 10);
}

function transformDamage(damage) {
	return Math.ceil(damage * 5);
}

function transformSpeed(speed) {
	return Math.ceil(speed * 2);
}

function transformAttackRate(attackRate) {
	return Math.ceil((1100 - attackRate) / 20);
}

function findSelectedSpell(spell, mouseX, mouseY) {
	console.log(spell.skillTreeX - GC.SPELLS_BOX_DIMS / 2, spell.skillTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS);
	if (mouseInBounds(mouseX, mouseY, spell.skillTreeX - GC.SPELLS_BOX_DIMS / 2, spell.skillTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS)) {
		for (var i = 0; i < spell.prerequisites.length; i++) {
			var prereq = spell.prerequisites[i];
			if (prereq[0].rank < prereq[1]) {
				return false;
			}
		}
		if (editingSkills) {
			if (warrior.spellOptions.size() < 10 && !warrior.spellOptions.contains(spell) && spell.rank > 0) {
				warrior.spellOptions.push(spell);
			}
		} else if (warrior.availableSpellPerks > 0) {
			spell.rank++;
			warrior.availableSpellPerks--;
			if (spell.rank == 1 && warrior.spellOptions.size() < 10 && !warrior.spellOptions.contains(spell)) {
				warrior.spellOptions.push(spell);
			} else {
				spell.rankUpFunction(spell);
				warrior.setValuesFromInventory();
			}
		}
		return true;
	}
	for (var i = 0; i < spell.prerequisites.length; i++) {
		var prereq = spell.prerequisites[i];
		return findSelectedSpell(prereq[0], mouseX, mouseY);
	}
}

//pretty much same as above function, but made separate for for flexibility later on
function findSelectedAura(aura, mouseX, mouseY) {
	console.log(aura.auraTreeX - GC.SPELLS_BOX_DIMS / 2, aura.auraTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS);
	if (mouseInBounds(mouseX, mouseY, aura.auraTreeX - GC.SPELLS_BOX_DIMS / 2, aura.auraTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS)) {
		for (var i = 0; i < aura.prerequisites.length; i++) {
			var prereq = aura.prerequisites[i];
			if (prereq[0].rank < prereq[1]) {
				return false;
			}
		}
		if (editingSkills) {
			if (warrior.auraOptions.size() < 3 && !warrior.auraOptions.contains(aura) && aura.rank > 0) {
				warrior.auraOptions.push(aura);
			}
		} else if (warrior.availableSpellPerks > 0) {
			aura.rank++;
			warrior.availableSpellPerks--;
			if (aura.rank == 1 && warrior.auraOptions.size() < 3 && !warrior.auraOptions.contains(aura)) {
				warrior.auraOptions.push(aura);
			} else {
				aura.rankUpFunction(aura);
				warrior.setValuesFromInventory(); //probably dont need this for auras
			}
		}
		return true;
	}
	for (var i = 0; i < aura.prerequisites.length; i++) {
		var prereq = aura.prerequisites[i];
		return findSelectedAura(prereq[0], mouseX, mouseY);
	}
}

function handleMouseclickSpellEditing(mouseX, mouseY) {
	for (var i = 0; i < warrior.spellOptions.size(); i++) {
		if (mouseInBounds(mouseX, mouseY, GC.SPELL_OPTIONS_FIRST_X + GC.SPELL_OPTIONS_W * i, GC.SPELL_OPTIONS_Y, GC.SPELL_OPTIONS_W, GC.SPELL_OPTIONS_H)) {
			console.log("spell: " + i);
			warrior.spellOptions.remove(i, 1);
		}
	}
}

function handleMouseclickAuraEditing(mouseX, mouseY) {
	for (var i = 0; i < warrior.auraOptions.size(); i++) {
		if (mouseInBounds(mouseX, mouseY, GC.AURA_OPTIONS_FIRST_X + GC.AURA_OPTIONS_SPACING * i - GC.AURA_OPTIONS_BOX_W / 2, GC.AURA_OPTIONS_Y - GC.AURA_OPTIONS_BOX_H / 2, GC.AURA_OPTIONS_BOX_W, GC.AURA_OPTIONS_BOX_H)) {
			warrior.auraOptions.remove(i, 1);
		}
	}
}

function handleMouseclickSkillEditing(mouseX, mouseY) {
	if (skillsPagesArray[skillsToShowIndex] == "auras") {
		handleMouseclickAuraEditing(mouseX, mouseY);
	} else if (skillsPagesArray[skillsToShowIndex] == "spells") {
		handleMouseclickSpellEditing(mouseX, mouseY);
	}
}

function handleSpellsAreaClicks(mouseX, mouseY) {
	if (mouseInBounds(mouseX, mouseY, GC.SPELLS_EDIT_X, GC.SPELLS_EDIT_Y, GC.SPELLS_EDIT_W, GC.SPELLS_EDIT_H)) {
		editingSkills = !editingSkills;
		return;
	}
	if (mouseInBounds(mouseX, mouseY, GC.SKILLS_NEXT_BUTTON_X - GC.SKILLS_PAGE_BUTTONS_W / 2, GC.SKILLS_PAGE_BUTTONS_Y - GC.SKILLS_PAGE_BUTTONS_H / 2, GC.SKILLS_PAGE_BUTTONS_W, GC.SKILLS_PAGE_BUTTONS_H)) {
		skillsToShowIndex++;
		if (skillsToShowIndex == skillsPagesArray.length) {
			skillsToShowIndex = 0;
		}
		return;
	}
	if (mouseInBounds(mouseX, mouseY, GC.SKILLS_LAST_BUTTON_X - GC.SKILLS_PAGE_BUTTONS_W / 2, GC.SKILLS_PAGE_BUTTONS_Y - GC.SKILLS_PAGE_BUTTONS_H / 2, GC.SKILLS_PAGE_BUTTONS_W, GC.SKILLS_PAGE_BUTTONS_H)) {
		skillsToShowIndex--;
		if (skillsToShowIndex == -1) {
			skillsToShowIndex = skillsPagesArray.length - 1;
		}
		return;
	}
	if (skillsPagesArray[skillsToShowIndex] == "auras") {
		for (var i = 0; i < 3; i++) {
			var worked = findSelectedAura(warrior.allAuras[warrior.allAuras.length - 1 - i], mouseX, mouseY);
			if (worked) {
				return;
			}
		}
	} else if (skillsPagesArray[skillsToShowIndex] == "spells") {
		for (var i = 0; i < 3; i++) {
			var worked = findSelectedSpell(warrior.allSpells[warrior.allSpells.length - 1 - i], mouseX, mouseY);
			if (worked) {
				return;
			}
		}
	}
}

function handleStatsScreenMousedown(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (editingSkills) {
		handleMouseclickSkillEditing(mouseX, mouseY);
	}

	if (mouseInBounds(mouseX, mouseY, GC.SPELLS_AREA_X, GC.SPELLS_AREA_Y, GC.SPELLS_AREA_W, GC.SPELLS_AREA_H)) {
		handleSpellsAreaClicks(mouseX, mouseY);
		return;
	}

	if (warrior.availableStatPerks == 0) {
		return;
	}

	if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.HEALTH_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		healthButtonColor = STAT_BUTTON_DOWN_COLOR;
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.MANA_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		manaButtonColor = STAT_BUTTON_DOWN_COLOR;
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.DAMAGE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		damageButtonColor = STAT_BUTTON_DOWN_COLOR;
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.DEFENSE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		defenseButtonColor = STAT_BUTTON_DOWN_COLOR;
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.ATTACK_RATE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		attackRateButtonColor = STAT_BUTTON_DOWN_COLOR;
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.SPEED_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		speedButtonColor = STAT_BUTTON_DOWN_COLOR;
	} else {
		return;
	}
}

function handleStatsScreenMouseup(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (warrior.availableStatPerks == 0) {
		return;
	}

	healthButtonColor = STAT_BUTTON_UP_COLOR;
	manaButtonColor = STAT_BUTTON_UP_COLOR;
	damageButtonColor = STAT_BUTTON_UP_COLOR;
	defenseButtonColor = STAT_BUTTON_UP_COLOR;
	attackRateButtonColor = STAT_BUTTON_UP_COLOR;
	speedButtonColor = STAT_BUTTON_UP_COLOR;

	if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.HEALTH_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		warrior.maxHealth += 5 / transformHealth(1);
		warrior.health += 5 / transformHealth(1);
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.MANA_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		warrior.maxMana += 5 / transformMana(1);
		warrior.mana += 5 / transformHealth(1);
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.DAMAGE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		warrior.baseDamage += 1 / transformDamage(1);
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.DEFENSE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		warrior.baseDefense += 1 / transformDefense(1);
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.ATTACK_RATE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		warrior.baseAttackRate -= 20; //TODO: why is this a different method from above?
		console.log(warrior.baseAttackRate);
	} else if (mouseInBounds(mouseX, mouseY, GC.STAT_BUTTONS_X, GC.SPEED_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H)) {
		warrior.baseSpeed += 1 / transformSpeed(1);
	} else {
		return;
	}
	warrior.setValuesFromInventory();
	warrior.availableStatPerks--;
}

function drawPlus(centerX, centerY, length, width, color) {
	colorRect(centerX - length, centerY - width / 2, length * 2, width, color);
	colorRect(centerX - width / 2, centerY - length, width, length * 2, color);
}

function drawSpellAndPrerequisites(spell) {
	colorRect(spell.skillTreeX - GC.SPELLS_BOX_DIMS / 2, spell.skillTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS, "#E0E0E0");
	if (spell.rank > 0) {
		ctx.globalAlpha = 0.2;
		colorRect(spell.skillTreeX - GC.SPELLS_BOX_DIMS / 2, spell.skillTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS, "green");
		ctx.globalAlpha = 1;
	}
	drawImageRotatedScaled(spell.displayPic, spell.skillTreeX, spell.skillTreeY - 10, 0, 1);
	colorText(spell.rank, spell.skillTreeX - 5, spell.skillTreeY + 20, "black")
	for (var i = 0; i < spell.prerequisites.length; i++) {
		var prereq = spell.prerequisites[i]
		if (prereq[0].rank < prereq[1]) {
			ctx.globalAlpha = 0.3;
			colorRect(spell.skillTreeX - GC.SPELLS_BOX_DIMS / 2, spell.skillTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS, "black");
			ctx.globalAlpha = 1;
		}
		drawSpellAndPrerequisites(prereq[0])
		colorLine(spell.skillTreeX, spell.skillTreeY - GC.SPELLS_BOX_DIMS / 2, prereq[0].skillTreeX, prereq[0].skillTreeY + GC.SPELLS_BOX_DIMS / 2, "black")
	}
}

//pretty much same as above function, but made separate for for flexibility later on
function drawAuraAndPrerequisites(aura) {
	colorRect(aura.auraTreeX - GC.SPELLS_BOX_DIMS / 2, aura.auraTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS, "#E0E0E0");
	if (aura.rank > 0) {
		ctx.globalAlpha = 0.2;
		colorRect(aura.auraTreeX - GC.SPELLS_BOX_DIMS / 2, aura.auraTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS, "green");
		ctx.globalAlpha = 1;
	}
	drawImageRotatedScaled(aura.displayPic, aura.auraTreeX, aura.auraTreeY - 10, 0, 0.6);
	colorText(aura.rank, aura.auraTreeX - 5, aura.auraTreeY + 20, "black")
	for (var i = 0; i < aura.prerequisites.length; i++) {
		var prereq = aura.prerequisites[i]
		if (prereq[0].rank < prereq[1]) {
			ctx.globalAlpha = 0.3;
			colorRect(aura.auraTreeX - GC.SPELLS_BOX_DIMS / 2, aura.auraTreeY - GC.SPELLS_BOX_DIMS / 2, GC.SPELLS_BOX_DIMS, GC.SPELLS_BOX_DIMS, "black");
			ctx.globalAlpha = 1;
		}
		drawAuraAndPrerequisites(prereq[0])
		colorLine(aura.auraTreeX, aura.auraTreeY - GC.SPELLS_BOX_DIMS / 2, prereq[0].auraTreeX, prereq[0].auraTreeY + GC.SPELLS_BOX_DIMS / 2, "black")
	}
}

function showSpellsScreen() {
	colorRect(GC.SPELLS_AREA_X, GC.SPELLS_AREA_Y, GC.SPELLS_AREA_W, GC.SPELLS_AREA_H, "#828282");


	if (skillsPagesArray[skillsToShowIndex] == "auras") {
		for (var i = 0; i < 3; i++) {
			drawAuraAndPrerequisites(warrior.allAuras[warrior.allAuras.length - 1 - i]);
		}
	} else if (skillsPagesArray[skillsToShowIndex] == "spells") {
		for (var i = 0; i < 3; i++) {
			drawSpellAndPrerequisites(warrior.allSpells[warrior.allSpells.length - 1 - i]);
		}
	}
	var editButtonColor = "#E0E0E0";
	if (editingSkills) {
		editButtonColor = "#686868";
	}

	drawImageRotatedScaled(skillsPageButton, GC.SKILLS_LAST_BUTTON_X, GC.SKILLS_PAGE_BUTTONS_Y, Math.PI, 1);
	drawImageRotatedScaled(skillsPageButton, GC.SKILLS_NEXT_BUTTON_X, GC.SKILLS_PAGE_BUTTONS_Y, 0, 1);

	colorRect(GC.SPELLS_EDIT_X, GC.SPELLS_EDIT_Y, GC.SPELLS_EDIT_W, GC.SPELLS_EDIT_H, editButtonColor);
	colorText("EDIT", GC.SPELLS_EDIT_X + 5, GC.SPELLS_EDIT_Y + 20, "black");
}


function showStatsScreen() {

	const PLUS_X = GC.STAT_BUTTONS_X + GC.STAT_BUTTONS_W / 2;
	const PLUS_LENGTH = 10;
	const PLUS_WIDTH = 5;

	ctx.save();
	ctx.translate(camPanX, camPanY);
	var lastFont = ctx.font;
	colorRect(GC.MAP_X - 5, GC.MAP_Y - 5, GC.MAP_W + 10, GC.MAP_H + 10, "#828282");
	colorRect(GC.MAP_X, GC.MAP_Y, GC.MAP_W, GC.MAP_H, "#565656");

	var plusColor = "#E0E0E0"
	if (warrior.availableStatPerks == 0) {
		plusColor = "#565656"
	}

	ctx.font = "30px Georgia";
	colorText("Stats", 260, 115, "#E0E0E0");
	ctx.font = "15px Georgia";
	colorText("Stat Upgrades: " + warrior.availableStatPerks, 600, 517, "#E0E0E0");
	colorText("Skill Upgrades: " + warrior.availableSpellPerks, 740, 517, "#E0E0E0");
	ctx.font = "20px Georgia";

	showSpellsScreen();

	colorRect(GC.STAT_BUTTONS_X, GC.HEALTH_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H, healthButtonColor);
	colorText("Health: " + transformHealth(warrior.maxHealth), GC.STAT_BUTTONS_X + GC.STAT_TEXT_OFFSET_X, GC.HEALTH_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#E0E0E0");
	drawPlus(PLUS_X, GC.HEALTH_BUTTON_Y + GC.STAT_BUTTONS_H / 2, PLUS_LENGTH, PLUS_WIDTH, plusColor);

	colorRect(GC.STAT_BUTTONS_X, GC.MANA_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H, manaButtonColor);
	colorText("Mana: " + transformHealth(warrior.maxMana), GC.STAT_BUTTONS_X + GC.STAT_TEXT_OFFSET_X, GC.MANA_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#E0E0E0");
	drawPlus(PLUS_X, GC.MANA_BUTTON_Y + GC.STAT_BUTTONS_H / 2, PLUS_LENGTH, PLUS_WIDTH, plusColor);

	colorRect(GC.STAT_BUTTONS_X, GC.DAMAGE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H, damageButtonColor);
	colorText("Damage: " + transformDamage(warrior.baseDamage), GC.STAT_BUTTONS_X + GC.STAT_TEXT_OFFSET_X, GC.DAMAGE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#E0E0E0");
	drawPlus(PLUS_X, GC.DAMAGE_BUTTON_Y + GC.STAT_BUTTONS_H / 2, PLUS_LENGTH, PLUS_WIDTH, plusColor);

	colorRect(GC.STAT_BUTTONS_X, GC.DEFENSE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H, defenseButtonColor);
	colorText("Defense: " + transformDefense(warrior.baseDefense), GC.STAT_BUTTONS_X + GC.STAT_TEXT_OFFSET_X, GC.DEFENSE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#E0E0E0");
	drawPlus(PLUS_X, GC.DEFENSE_BUTTON_Y + GC.STAT_BUTTONS_H / 2, PLUS_LENGTH, PLUS_WIDTH, plusColor);

	colorRect(GC.STAT_BUTTONS_X, GC.ATTACK_RATE_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H, attackRateButtonColor);
	colorText("Attack Rate: " + transformAttackRate(warrior.baseAttackRate), GC.STAT_BUTTONS_X + GC.STAT_TEXT_OFFSET_X, GC.ATTACK_RATE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#E0E0E0");
	drawPlus(PLUS_X, GC.ATTACK_RATE_BUTTON_Y + GC.STAT_BUTTONS_H / 2, PLUS_LENGTH, PLUS_WIDTH, plusColor);

	colorRect(GC.STAT_BUTTONS_X, GC.SPEED_BUTTON_Y, GC.STAT_BUTTONS_W, GC.STAT_BUTTONS_H, speedButtonColor);
	colorText("Speed: " + transformSpeed(warrior.baseSpeed), GC.STAT_BUTTONS_X + GC.STAT_TEXT_OFFSET_X, GC.SPEED_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#E0E0E0");
	drawPlus(PLUS_X, GC.SPEED_BUTTON_Y + GC.STAT_BUTTONS_H / 2, PLUS_LENGTH, PLUS_WIDTH, plusColor);

	ctx.font = "15px Georgia";
	var damageChange = transformDamage(warrior.damage - warrior.baseDamage);
	if (damageChange > 0) {
		colorText("(+" + damageChange + ")", GC.STAT_CHANGE_X, GC.DAMAGE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#00c800");
	} else if (damageChange < 0) {
		colorText("(" + damageChange + ")", GC.STAT_CHANGE_X + GC.STAT_TEXT_OFFSET_X + 105, GC.DAMAGE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "red");
	}
	var defenseChange = transformDefense(warrior.defense - warrior.baseDefense);
	if (defenseChange > 0) {
		colorText("(+" + defenseChange + ")", GC.STAT_CHANGE_X, GC.DEFENSE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#00c800");
	} else if (defenseChange < 0) {
		colorText("(" + defenseChange + ")", GC.STAT_CHANGE_X + GC.STAT_TEXT_OFFSET_X + 105, GC.DEFENSE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "red");
	}
	var attackRateChange = transformAttackRate(warrior.attackRate) - transformAttackRate(warrior.baseAttackRate);
	if (attackRateChange > 0) {
		colorText("(+" + attackRateChange + ")", GC.STAT_CHANGE_X, GC.ATTACK_RATE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#00c800");
	} else if (attackRateChange < 0) {
		colorText("(" + attackRateChange + ")", GC.STAT_CHANGE_X + GC.STAT_TEXT_OFFSET_X + 105, GC.ATTACK_RATE_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "red");
	}
	var speedChange = transformSpeed(warrior.speed - warrior.baseSpeed);
	if (speedChange > 0) {
		colorText("(+" + speedChange + ")", GC.STAT_CHANGE_X, GC.SPEED_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "#00c800");
	} else if (speedChange < 0) {
		colorText("(" + speedChange + ")", GC.STAT_CHANGE_X + GC.STAT_TEXT_OFFSET_X + 105, GC.SPEED_BUTTON_Y + GC.STAT_TEXT_OFFSET_Y, "red");
	}

	showSpellsScreen();

	ctx.font = lastFont;
	ctx.restore();
}
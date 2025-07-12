var characterChoice;
var numRandomLevels = 10; //default

//move to global constants
var ALL_Y = 0;
var ALL_W = 0;
var ALL_H = 0;
var X_OFFSET = 0;
var Y_OFFSET = 0;

var BRUTE_X = 0;
var WIZARD_X = 0;
var NERD_X = 0;

var characterChoiceUnchosenColor = "#E0E0E0";
var characterChoiceChosenColor = "#A0A0A0";

var characterChoiceColors = [characterChoiceUnchosenColor, characterChoiceUnchosenColor, characterChoiceUnchosenColor];
var gameModeButtonColor = characterChoiceUnchosenColor;

function drawCharacterChoicePics(type, x, y, facePicFilename, companionPicFilename) {
	var facePic = document.createElement("img");
	facePic.src = "images/" + facePicFilename;

	var companionPic = document.createElement("img");
	companionPic.src = "images/" + companionPicFilename;

	drawImageRotatedScaled(facePic, x, y, 0, 3);
	drawImageRotatedScaled(warrior.inventory[warrior.currInv]["armor"].pic[type], x, y, 0, 3);
	drawImageRotatedScaled(warrior.inventory[warrior.currInv]["helmet"].pic[type], x, y, 0, 3)
	drawImageRotatedScaled(warrior.inventory[warrior.currInv]["weapon"].pic[type], x, y, 0, 3);
	drawImageRotatedScaled(warrior.inventory[warrior.currInv]["boots"].pic[type], x, y, 0, 3);
	drawImageRotatedScaled(warrior.inventory[warrior.currInv]["shield"].pic[type], x, y, 0, 3);
	drawImageRotatedScaled(companionPic, x + 50, y + 80, 0, 1.75);
}

function showCharacterChoiceScreen() {
	console.log("drawing char choice");
	var lastFont = ctx.font;

	ALL_Y = canvas.height / 4;
	ALL_W = canvas.width / 5;
	ALL_H = 300;
	X_OFFSET = 35;
	Y_OFFSET = 20;

	BRUTE_X = canvas.width / 6 - ALL_W / 2;
	WIZARD_X = canvas.width / 2 - ALL_W / 2;
	NERD_X = 5 * canvas.width / 6 - ALL_W / 2;

	const PIC_X_OFFSET = ALL_W / 2 + 5;
	const PIC_Y_OFFSET = ALL_H / 2 - 30;

	ctx.font = "50px Georgia";
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(10, 10, canvas.width - 20, canvas.height - 20, "#565656");
	colorText("WELCOME!", canvas.width / 2 - 135, 80, "#E0E0E0");
	ctx.font = "35px Georgia";
	colorText("Please choose a character", canvas.width / 2 - 190, 130, "#E0E0E0")

	colorRect(BRUTE_X, ALL_Y, ALL_W, ALL_H, characterChoiceColors[0]);
	colorText("BRUTE", BRUTE_X + X_OFFSET + 5, ALL_Y + ALL_H - Y_OFFSET, "#565656");
	drawCharacterChoicePics("Brute", BRUTE_X + PIC_X_OFFSET, ALL_Y + PIC_Y_OFFSET, "bruteFace.png", "companionMonster.png");


	colorRect(WIZARD_X, ALL_Y, ALL_W, ALL_H, characterChoiceColors[1]);
	colorText("WIZARD", WIZARD_X + X_OFFSET - 5, ALL_Y + ALL_H - Y_OFFSET, "#565656");
	drawCharacterChoicePics("Wizard", WIZARD_X + PIC_X_OFFSET, ALL_Y + PIC_Y_OFFSET, "wizardFace.png", "companion.png");


	colorRect(NERD_X, ALL_Y, ALL_W, ALL_H, characterChoiceColors[2]);
	colorText("NERD", NERD_X + X_OFFSET + 20, ALL_Y + ALL_H - Y_OFFSET, "#565656");
	drawCharacterChoicePics("Nerd", NERD_X + PIC_X_OFFSET, ALL_Y + PIC_Y_OFFSET, "nerdFace.png", "companionOrb.png");

	ctx.font = "30px Georgia";

	// Show random mode label and controls
	// colorText("Random Mode:", OSC.GAMEMODE_BOX_X - 5, OSC.GAMEMODE_BOX_Y - 20, "#E0E0E0")
	colorText("Number of levels:", OSC.GAMEMODE_BOX_X - 30, OSC.GAMEMODE_BOX_Y + 20, "#E0E0E0")

	// Always show random mode controls since we're now always in random mode
	skillsPageButton.src = "images/skillsTriangleButton.png";
	colorRect(OSC.NUM_LEVELS_BUTTON_X, OSC.NUM_LEVELS_BUTTON_Y, OSC.NUM_LEVELS_BUTTON_W, OSC.NUM_LEVELS_BUTTON_H, "#E0E0E0");
	colorText(numRandomLevels, OSC.NUM_LEVELS_BUTTON_X + OSC.NUM_LEVELS_BUTTON_W / 2 - 15, OSC.NUM_LEVELS_BUTTON_Y + 27, "#565656");
	drawImageRotatedScaled(skillsPageButton, OSC.UP_LEVEL_X, OSC.LEVEL_BUTTONS_Y, 3 * Math.PI / 2, 1);
	drawImageRotatedScaled(skillsPageButton, OSC.DOWN_LEVEL_X, OSC.LEVEL_BUTTONS_Y, Math.PI / 2, 1);

	colorRect(OSC.LOAD_X, OSC.LOAD_Y, OSC.LOAD_W, OSC.LOAD_H, "#E0E0E0");
	colorText("LOAD", OSC.LOAD_X + 10, OSC.LOAD_Y + 30, "#565656");
	ctx.font = lastFont;
}

function handleMouseClickOpeningScreen(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// Always in random mode, so always handle level number controls
	if (gameMode == "random") {
		if (mouseInBounds(mouseX, mouseY, OSC.UP_LEVEL_X - 12, OSC.LEVEL_BUTTONS_Y - 15, 24, 30)) {
			numRandomLevels++;
			return;
		}
		if (mouseInBounds(mouseX, mouseY, OSC.DOWN_LEVEL_X - 12, OSC.LEVEL_BUTTONS_Y - 15, 24, 30)) {
			numRandomLevels--;
			if (numRandomLevels < 1) {
				numRandomLevels = 1;
			}
			return;
		}
	}

	if (mouseInBounds(mouseX, mouseY, OSC.LOAD_X, OSC.LOAD_Y, OSC.LOAD_W, OSC.LOAD_H)) {
		getJson();
		return;
	}

	if (mouseInBounds(mouseX, mouseY, BRUTE_X, ALL_Y, ALL_W, ALL_H)) {
		characterChoice = "Brute";
		setCharacterStats();
		gameLoading = true;
		gameStarted = true;
		return;
	}
	if (mouseInBounds(mouseX, mouseY, WIZARD_X, ALL_Y, ALL_W, ALL_H)) {
		characterChoice = "Wizard";
		setCharacterStats();
		gameLoading = true;
		gameStarted = true;
		return;
	}
	if (mouseInBounds(mouseX, mouseY, NERD_X, ALL_Y, ALL_W, ALL_H)) {
		characterChoice = "Nerd";
		setCharacterStats();
		gameLoading = true;
		gameStarted = true;
		return;
	}
}

function handleMousemoveOpeningScreen(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// No longer have game mode button, so removed hover effect

	if (mouseInBounds(mouseX, mouseY, BRUTE_X, ALL_Y, ALL_W, ALL_H)) {
		characterChoiceColors[0] = characterChoiceChosenColor;
	} else {
		characterChoiceColors[0] = characterChoiceUnchosenColor;
	}

	if (mouseInBounds(mouseX, mouseY, WIZARD_X, ALL_Y, ALL_W, ALL_H)) {
		characterChoiceColors[1] = characterChoiceChosenColor;
	} else {
		characterChoiceColors[1] = characterChoiceUnchosenColor;
	}

	if (mouseInBounds(mouseX, mouseY, NERD_X, ALL_Y, ALL_W, ALL_H)) {
		characterChoiceColors[2] = characterChoiceChosenColor;
	} else {
		characterChoiceColors[2] = characterChoiceUnchosenColor;
	}
}

function setCompanionStats() {
	if (characterChoice == "Brute") {
		var newCompanion = new companionClass(warrior)
			.setSpeed(3)
			.setAttackRate(1000)
			.setAttackSpeed(3)
			.setDamage(0.75)
			.setHealth(10)
			.setDefense(1.25)
			.setPic(companionMonster)
			.setDamagedPic(companionMonster)
			.setProjectileColor("orange");
		warrior.companion = newCompanion;
	} else if (characterChoice == "Wizard") {
		var newCompanion = new companionClass(warrior)
			.setSpeed(5)
			.setAttackRate(600)
			.setAttackSpeed(4)
			.setDamage(1)
			.setHealth(8)
			.setDefense(1)
			.setPic(companionEye)
			.setDamagedPic(companionEye)
			.setProjectileColor("blue");
		warrior.companion = newCompanion;
	} else if (characterChoice == "Nerd") {
		var newCompanion = new companionClass(warrior)
			.setSpeed(6)
			.setAttackRate(250)
			.setAttackSpeed(6)
			.setDamage(1.5)
			.setHealth(10)
			.setDefense(2)
			.setPic(companionOrb)
			.setDamagedPic(companionOrb)
			.setProjectileColor("black");
		warrior.companion = newCompanion;
	}
}

function setCharacterStats() {
	if (characterChoice == "Brute") {
		var newWarrior = new charClass("Brute")
			.setSpeed(5)
			.setAttackRate(1000)
			.setDamage(4)
			.setLevelExp(1000)
			.setHealth(10)
			.setMana(10)
			.setDefense(1.5)
			// .setBag(consumables[1])
			.setFacePic(bruteFace)
			.setInvValues();
		warrior = newWarrior;
		setCompanionStats();
	} else if (characterChoice == "Wizard") {
		var newWarrior = new charClass("Wizard")
			.setSpeed(8)
			.setAttackRate(500)
			.setDamage(2)
			.setLevelExp(750)
			.setHealth(10)
			.setMana(20)
			.setDefense(1)
			// .setBag(weapons[2])
			.setFacePic(wizardFace)
			.setInvValues();
		warrior = newWarrior;
		setCompanionStats();
	} else if (characterChoice == "Nerd") {
		var newWarrior = new charClass("Nerd")
			.setSpeed(5)
			.setAttackRate(600)
			.setDamage(1)
			.setLevelExp(500)
			.setHealth(10)
			.setMana(10)
			.setDefense(1)
			// .setBag(consumables[3])
			.setFacePic(nerdFace)
			.setInvValues();
		warrior = newWarrior;
		setCompanionStats();
	}
}
